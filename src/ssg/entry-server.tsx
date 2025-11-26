import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';
import { ssgRoutes } from './routes-ssg';
import RootLayout from '../RootLayout';
import { Route, Routes } from 'react-router-dom';
import { fetchPageData } from './data-fetcher';

export async function render(url: string) {
  const helmetContext: any = {};
  
  // Fetch data for this route during SSG
  const pageData = await fetchPageData(url);

  // Create a new QueryClient for SSR with pre-populated data
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: Infinity,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  // Pre-populate the QueryClient with fetched data
  if (pageData.news) {
    queryClient.setQueryData(['news'], pageData.news);
  }
  if (pageData.stats) {
    queryClient.setQueryData(['job-stats'], pageData.stats);
  }
  if (pageData.jobs) {
    // Only cache the raw jobs data
    // The useJobSearch hook will apply filters during rendering (both SSR and client)
    queryClient.setQueryData(['jobs'], pageData.jobs);
  }
  if (pageData.currentJob) {
    queryClient.setQueryData(['job-by-page-link', pageData.currentJob.page_link], pageData.currentJob);
    
    // Pre-populate related jobs with correct query key
    if (pageData.jobs) {
      const relatedJobs = pageData.jobs
        .filter((job: any) => 
          job.page_link !== pageData.currentJob.page_link &&
          (job.state === pageData.currentJob.state || job.Is_All_India === true)
        )
        .slice(0, 3);
      queryClient.setQueryData(
        ['related-jobs', pageData.currentJob.job_id, pageData.currentJob.state, pageData.currentJob.Is_All_India],
        relatedJobs
      );
    }
  }

  // Dehydrate the QueryClient for client-side hydration
  const dehydratedState = dehydrate(queryClient);
  
  // Render with QueryClientProvider so hooks can access pre-populated data
  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <RootLayout>
            <Routes>
              {ssgRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.Component />}
                />
              ))}
            </Routes>
          </RootLayout>
        </StaticRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );

  const { helmet } = helmetContext;
  
  return {
    html,
    helmet: {
      title: helmet?.title?.toString() || '',
      meta: helmet?.meta?.toString() || '',
      link: helmet?.link?.toString() || '',
      script: helmet?.script?.toString() || '',
    },
    dehydratedState, // Return dehydrated QueryClient state for client hydration
    data: pageData, // Return the fetched data (for backward compatibility)
  };
}
