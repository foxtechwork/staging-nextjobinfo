import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { ssgRoutes } from './routes-ssg'; // Use SSG routes without lazy loading
import RootLayout from '../RootLayout';
import { Route, Routes } from 'react-router-dom';
import { fetchPageData } from './data-fetcher';

export async function render(url: string) {
  const helmetContext: any = {};
  
  // Fetch data for this route during SSG
  const pageData = await fetchPageData(url);
  
  const html = renderToString(
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
    data: pageData, // Return the fetched data
  };
}
