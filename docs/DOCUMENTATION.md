# Next Job Info - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [File Structure](#file-structure)
4. [Database Configuration](#database-configuration)
5. [Setup Instructions](#setup-instructions)
6. [Running the Project](#running-the-project)
7. [Data Management](#data-management)
8. [Page Generation](#page-generation)
9. [Dynamic Content](#dynamic-content)
10. [API Integration](#api-integration)

---

## Project Overview

Next Job Info is a job portal application that aggregates and displays government job notifications from various sources across India. The platform provides job listings by state, category, and recruitment board.

**Key Features:**
- Latest government job notifications
- State-wise job listings
- Category-based job filtering
- Job detail pages
- Email/WhatsApp subscription system
- Career guidance and interview preparation resources
- Mobile-responsive design

---

## Technology Stack

### Frontend
- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: 
  - Tailwind CSS (utility-first CSS framework)
  - shadcn/ui (component library)
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack Query (React Query) 5.83.0
- **SEO**: React Helmet Async 2.0.5

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: Supabase REST API
- **Edge Functions**: Supabase Edge Functions (Deno runtime)

### UI Components
- **Component Library**: shadcn/ui
- **Icons**: Lucide React 0.462.0
- **Charts**: Recharts 2.15.4
- **Date Picker**: React Day Picker 8.10.1
- **Form Handling**: React Hook Form 7.61.1 + Zod 3.25.76
- **Toast Notifications**: Sonner 1.7.4

---

## File Structure

```
next-job-info/
├── public/
│   ├── robots.txt                 # SEO robots configuration
│   ├── favicon.ico               # Site favicon
│   └── placeholder.svg           # Placeholder images
│
├── src/
│   ├── assets/                   # Static assets (images, logos)
│   │   └── logo.png
│   │
│   ├── components/               # Reusable React components
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx       # Main navigation header
│   │   │   ├── Footer.tsx       # Site footer
│   │   │   ├── LeftSidebar.tsx  # Left sidebar navigation
│   │   │   ├── RightSidebar.tsx # Right sidebar (ads, news)
│   │   │   └── Sidebar.tsx      # Generic sidebar component
│   │   │
│   │   ├── job/                 # Job-related components
│   │   │   └── JobCard.tsx      # Job listing card
│   │   │
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.tsx       # Button component
│   │   │   ├── card.tsx         # Card component
│   │   │   ├── dialog.tsx       # Dialog/Modal component
│   │   │   ├── table.tsx        # Table component
│   │   │   └── ...              # Other UI components
│   │   │
│   │   ├── ErrorBoundary.tsx    # Error boundary wrapper
│   │   ├── PerformanceMonitor.tsx # Performance monitoring
│   │   └── SubscribeDialog.tsx  # Subscription form dialog
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useJobs.ts          # Hook for fetching jobs
│   │   ├── useNews.ts          # Hook for fetching news
│   │   ├── use-mobile.tsx      # Mobile detection hook
│   │   └── use-toast.ts        # Toast notification hook
│   │
│   ├── integrations/           # Third-party integrations
│   │   └── supabase/
│   │       ├── client.ts       # Supabase client configuration
│   │       └── types.ts        # Auto-generated TypeScript types
│   │
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # Helper functions (cn, etc.)
│   │
│   ├── pages/                  # Page components (routes)
│   │   ├── Index.tsx           # Homepage wrapper
│   │   ├── Home.tsx            # Main homepage content
│   │   ├── StateJobs.tsx       # State-specific job listings
│   │   ├── StateSelection.tsx  # State selection page
│   │   ├── CategoryJobs.tsx    # Category-specific jobs
│   │   ├── JobDetails.tsx      # Individual job details
│   │   ├── About.tsx           # About page
│   │   ├── Contact.tsx         # Contact page
│   │   ├── Privacy.tsx         # Privacy policy
│   │   ├── Terms.tsx           # Terms of service
│   │   ├── Disclaimer.tsx      # Disclaimer page
│   │   ├── Resume.tsx          # Resume building
│   │   ├── InterviewPrep.tsx   # Interview preparation
│   │   ├── JobSearchTips.tsx   # Job search tips
│   │   ├── CareerGuidance.tsx  # Career guidance
│   │   ├── StudyMaterial.tsx   # Study materials
│   │   ├── MockTests.tsx       # Mock tests
│   │   ├── ComingSoon.tsx      # Coming soon page
│   │   ├── Support.tsx         # Support page
│   │   ├── Sitemap.tsx         # Sitemap
│   │   └── NotFound.tsx        # 404 page
│   │
│   ├── App.tsx                 # Main App component with routing
│   ├── main.tsx                # Application entry point
│   ├── index.css               # Global styles and design tokens
│   ├── App.css                 # Additional app styles
│   └── vite-env.d.ts          # Vite TypeScript definitions
│
├── supabase/
│   ├── config.toml             # Supabase project configuration
│   ├── migrations/             # Database migration files
│   └── functions/              # Edge functions (if any)
│
├── .env                        # Environment variables
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── vite.config.ts             # Vite configuration
├── components.json             # shadcn/ui configuration
└── README.md                   # Basic project information
```

---

## Database Configuration

### Supabase Setup

**Project Details:**
- Project ID: `bgshoswlkpxbmemzwwip`
- Project URL: `https://bgshoswlkpxbmemzwwip.supabase.co`
- Anon Key: (stored in `.env`)

### Database Schema

#### 1. **jobs_data** Table
Primary table for storing job listings.

**Columns:**
```sql
- job_id (uuid, primary key) - Unique job identifier
- recruitment_board (text, required) - Name of recruiting organization
- exam_or_post_name (text, required) - Job/Exam title
- post_date (date, required) - Job posting date
- last_date (date) - Application deadline
- state (text) - State/Location
- page_link (text) - Link to official notification
- qualification (text) - Educational requirements
- advt_no (text) - Advertisement number
- total_posts (integer, default: 10) - Number of vacancies
- raw_html_1, raw_html_2, raw_html_3 (text) - Raw HTML data
- more_information (text) - Additional details
- education_tags (jsonb, default: []) - Education classification
- job_type_tags (jsonb, default: []) - Job type classification
- job_area_tags (jsonb, default: []) - Job area classification
- experience_level_tags (jsonb, default: []) - Experience requirements
- post_position_tags (jsonb, default: []) - Position level tags
- job_posting_deadline_tags (jsonb, default: []) - Deadline tags
- is_active (boolean, default: true) - Active status
- Is_All_India (boolean) - All India job flag
- created_at (timestamp) - Record creation time
- updated_at (timestamp) - Last update time
```

**RLS Policies:**
- `Anyone can view jobs data` - Public read access
- `Authenticated users can insert/update/delete` - Admin operations

#### 2. **news** Table
Stores news and updates.

**Columns:**
```sql
- id (uuid, primary key)
- title (text, required)
- short_description (text, required)
- time_updated (text, required)
- source_link (text)
- type (text, default: 'new')
- is_active (boolean, default: true)
- created_at (timestamp)
- updated_at (timestamp)
```

**RLS Policies:**
- `Anyone can view active news` - Public read for active news
- `Authenticated users can manage` - Admin CRUD operations

#### 3. **subscriber** Table
Email/WhatsApp subscription management.

**Columns:**
```sql
- id (uuid, primary key)
- name (text, required)
- email (text, required)
- whatsapp_number (text, required)
- area_of_interest (text, required)
- created_at (timestamp)
- updated_at (timestamp)
```

**RLS Policies:**
- `Anyone can subscribe` - Public insert access
- `Only authenticated users can view` - Admin read access

#### 4. Supporting Tables
- **merge_raw_data** - Staging table for data merging
- **preprocessing_job_data** - Job data preprocessing
- **row_unique_freejobalert** - Unique records from FreeJobAlert
- **row_unique_mysarkarinaukri** - Unique records from MySarkariNaukri

### Database Functions

The database includes several utility functions:

1. **insert_freejobalert_bulk(jobs_data jsonb[])**
   - Bulk insert jobs with duplicate handling
   - Returns: processed, inserted, duplicate counts

2. **insert_jobs_batch(jobs_data jsonb[])**
   - Batch insert with conflict resolution
   - Returns: processed count, inserted IDs

3. **merge_unique_data()**
   - Merges data from multiple source tables
   - Handles deduplication

4. **remove_duplicate_from_merge_raw_data()**
   - Cleans duplicate records from merge table

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account
- Git (for version control)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd next-job-info
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_PROJECT_ID="bgshoswlkpxbmemzwwip"
VITE_SUPABASE_URL="https://bgshoswlkpxbmemzwwip.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key-here"
```

**Important:** Replace the publishable key with your actual Supabase anon key.

### 4. Database Setup

#### Option A: Using Supabase Dashboard
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Navigate to your project
3. Open SQL Editor
4. Run the `supabase-setup.sql` script

#### Option B: Using Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref bgshoswlkpxbmemzwwip

# Run migrations
supabase db push
```

### 5. Verify Setup
```bash
# Test the connection
npm run dev
```

Visit `http://localhost:8080` to verify the application is running.

---

## Running the Project

### Development Mode
```bash
npm run dev
```
- Runs on `http://localhost:8080`
- Hot Module Replacement (HMR) enabled
- TypeScript type checking

### Production Build
```bash
npm run build
```
- Creates optimized production build in `dist/` directory
- Minifies and bundles all assets

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally
- Useful for testing before deployment

### Type Checking
```bash
npm run type-check
```
- Runs TypeScript compiler in check mode

---

## Data Management

### How to Load Data

#### 1. **Manual Data Entry** (Supabase Dashboard)
1. Go to Supabase Dashboard → Table Editor
2. Select `jobs_data` table
3. Click "Insert row"
4. Fill in the required fields
5. Save

#### 2. **Bulk Import via SQL**
```sql
INSERT INTO jobs_data (
  recruitment_board,
  exam_or_post_name,
  post_date,
  last_date,
  state,
  qualification,
  total_posts,
  page_link
) VALUES
  ('UPSC', 'Civil Services Exam', '2024-02-01', '2024-03-01', 'All India', 'Graduate', 100, 'https://upsc.gov.in'),
  ('SSC', 'CGL Exam', '2024-02-01', '2024-03-15', 'All India', '12th Pass', 500, 'https://ssc.nic.in');
```

#### 3. **Using Database Functions** (n8n or API)
```javascript
import { supabase } from './supabase-client';

const jobsData = [
  {
    recruitment_board: "UPSC",
    exam_or_post_name: "Civil Services Exam",
    post_date: "2024-02-01",
    last_date: "2024-03-01",
    state: "All India",
    qualification: "Graduate",
    total_posts: 100,
    more_information: "https://upsc.gov.in"
  }
];

const { data, error } = await supabase
  .rpc('insert_jobs_batch', { jobs_data: jobsData });
```

#### 4. **Data Import Pipeline** (Recommended)
The project is designed to work with n8n workflows:

1. **Scrape job data** from sources (FreeJobAlert, MySarkariNaukri)
2. **Transform data** to match schema
3. **Call Supabase function** `insert_jobs_batch`
4. **Handle duplicates** automatically

**Example n8n Workflow:**
```json
{
  "operation": "invokeFunction",
  "function": "insert_jobs_batch",
  "parameters": {
    "jobs_data": "={{ $json.jobs }}"
  }
}
```

### Data Update Strategy

**Automatic Updates:**
- Use triggers for `updated_at` timestamp
- Database function handles duplicates via `ON CONFLICT`

**Manual Updates:**
```javascript
await supabase
  .from('jobs_data')
  .update({ is_active: false })
  .lt('last_date', new Date().toISOString());
```

---

## Page Generation

### Static Pages
Located in `src/pages/`, these pages are pre-defined routes:

**Informational Pages:**
- `/about` → About.tsx
- `/contact` → Contact.tsx
- `/privacy` → Privacy.tsx
- `/terms` → Terms.tsx
- `/disclaimer` → Disclaimer.tsx

**Resource Pages:**
- `/resume` → Resume.tsx
- `/interview-prep` → InterviewPrep.tsx
- `/job-search-tips` → JobSearchTips.tsx
- `/career-guidance` → CareerGuidance.tsx
- `/study-material` → StudyMaterial.tsx
- `/mock-tests` → MockTests.tsx

### Dynamic Pages

#### 1. **State-Based Job Listings**
Route: `/state/:stateName`
Component: `StateJobs.tsx`

```typescript
// Extracts state from URL
const { stateName } = useParams();

// Fetches jobs for that state
const { data: jobs } = useQuery({
  queryKey: ['jobs', stateName],
  queryFn: async () => {
    const { data } = await supabase
      .from('jobs_data')
      .select('*')
      .eq('state', stateName)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    return data;
  }
});
```

**Supported States:**
- Delhi, Maharashtra, Karnataka, Tamil Nadu, etc.
- Accessed via: `/state/delhi`, `/state/maharashtra`

#### 2. **Category-Based Job Listings**
Route: `/category/:category`
Component: `CategoryJobs.tsx`

**Categories:**
- Banking, Railway, SSC, UPSC, Teaching, Police, etc.

#### 3. **Job Details Page**
Route: `/job/:jobId`
Component: `JobDetails.tsx`

```typescript
const { jobId } = useParams();

const { data: job } = useQuery({
  queryKey: ['job', jobId],
  queryFn: async () => {
    const { data } = await supabase
      .from('jobs_data')
      .select('*')
      .eq('job_id', jobId)
      .single();
    return data;
  }
});
```

### Adding New Pages

1. **Create page component:**
```typescript
// src/pages/NewPage.tsx
import { Helmet } from "react-helmet-async";

const NewPage = () => {
  return (
    <>
      <Helmet>
        <title>New Page - Next Job Info</title>
        <meta name="description" content="Page description" />
      </Helmet>
      <div>
        {/* Page content */}
      </div>
    </>
  );
};

export default NewPage;
```

2. **Add route in App.tsx:**
```typescript
<Route path="/new-page" element={<NewPage />} />
```

3. **Add navigation link** (in Header.tsx or sidebar)

---

## Dynamic Content

### How Dynamic Content Works

#### 1. **Data Fetching with React Query**

**Custom Hook Example** (`src/hooks/useJobs.ts`):
```typescript
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useJobs = (state?: string, limit?: number) => {
  return useQuery({
    queryKey: ['jobs', state, limit],
    queryFn: async () => {
      let query = supabase
        .from('jobs_data')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (state) query = query.eq('state', state);
      if (limit) query = query.limit(limit);
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
```

**Usage in Component:**
```typescript
const { data: jobs, isLoading, error } = useJobs('Delhi', 20);
```

#### 2. **Real-time Updates**

Supabase supports real-time subscriptions:

```typescript
useEffect(() => {
  const channel = supabase
    .channel('jobs_changes')
    .on(
      'postgres_changes',
      { 
        event: '*', 
        schema: 'public', 
        table: 'jobs_data' 
      },
      (payload) => {
        // Refetch or update local state
        queryClient.invalidateQueries(['jobs']);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

#### 3. **Filtering and Searching**

**Filter by State:**
```typescript
.eq('state', stateName)
```

**Filter by Category:**
```typescript
.contains('job_type_tags', [category])
```

**Search by Keyword:**
```typescript
.or(`exam_or_post_name.ilike.%${keyword}%,recruitment_board.ilike.%${keyword}%`)
```

**Date Range:**
```typescript
.gte('last_date', startDate)
.lte('last_date', endDate)
```

#### 4. **Pagination**

```typescript
const pageSize = 20;
const { data: jobs } = useQuery({
  queryKey: ['jobs', page],
  queryFn: async () => {
    const from = page * pageSize;
    const to = from + pageSize - 1;
    
    const { data } = await supabase
      .from('jobs_data')
      .select('*')
      .range(from, to)
      .order('created_at', { ascending: false });
    
    return data;
  }
});
```

### Content Sources

1. **Database (Supabase)**
   - Job listings
   - News updates
   - Subscriber data

2. **Static Content**
   - About page
   - Privacy policy
   - Terms of service

3. **External APIs** (if integrated)
   - Government job portals
   - Notification aggregators

---

## API Integration

### Supabase Client Usage

**Initialize:**
```typescript
import { supabase } from "@/integrations/supabase/client";
```

**Select Query:**
```typescript
const { data, error } = await supabase
  .from('jobs_data')
  .select('*')
  .eq('state', 'Delhi')
  .limit(10);
```

**Insert:**
```typescript
const { data, error } = await supabase
  .from('subscriber')
  .insert({
    name: 'John Doe',
    email: 'john@example.com',
    whatsapp_number: '9876543210',
    area_of_interest: 'Banking'
  });
```

**Update:**
```typescript
const { error } = await supabase
  .from('jobs_data')
  .update({ is_active: false })
  .eq('job_id', jobId);
```

**Delete:**
```typescript
const { error } = await supabase
  .from('jobs_data')
  .delete()
  .eq('job_id', jobId);
```

### Edge Functions

Edge functions can be created in `supabase/functions/`:

**Example: Send Notification**
```typescript
// supabase/functions/send-notification/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { email, jobDetails } = await req.json()
  
  // Send email logic here
  
  return new Response(
    JSON.stringify({ success: true }),
    { headers: { "Content-Type": "application/json" } }
  )
})
```

**Invoke from Frontend:**
```typescript
const { data, error } = await supabase.functions.invoke('send-notification', {
  body: { email: 'user@example.com', jobDetails: {...} }
});
```

---

## SEO Configuration

### Meta Tags (React Helmet)

Each page includes SEO optimization:

```typescript
<Helmet>
  <title>Delhi Jobs - Next Job Info</title>
  <meta name="description" content="Latest government jobs in Delhi" />
  <meta name="keywords" content="delhi jobs, government jobs, sarkari naukri" />
  <link rel="canonical" href={window.location.href} />
  
  {/* Open Graph */}
  <meta property="og:title" content="Delhi Jobs" />
  <meta property="og:description" content="Latest government jobs" />
  <meta property="og:type" content="website" />
  
  {/* Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": job.exam_or_post_name,
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.recruitment_board
      }
    })}
  </script>
</Helmet>
```

### Robots.txt
Located at `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Deployment

### Static Site Generation (SSG) - Recommended

This project supports Static Site Generation to pre-render all pages for optimal performance and SEO.

**Setup SSG (First Time):**

1. Add scripts to `package.json`:
```json
"generate-routes": "tsx scripts/generate-routes.ts",
"build:ssg": "npm run generate-routes && vite-ssg build"
```

2. Generate and build:
```bash
npm run generate-routes
npm run build:ssg
```

**What Gets Generated:**
- All static pages (Home, About, Contact, etc.)
- 38 state-specific job listing pages
- 10 category pages (Banking, Railway, SSC, etc.)
- Individual pages for every active job in database

**Deploy the `dist/` folder to any hosting:**

- **Netlify**: `netlify deploy --prod --dir=dist`
- **Vercel**: `vercel --prod`
- **AWS S3**: `aws s3 sync dist/ s3://bucket`
- **Cloudflare Pages**: Connect Git repo
- **GitHub Pages**: Push dist/ to gh-pages branch

**Benefits:**
- ⚡ Instant page loads with pre-rendered HTML
- 🔍 Perfect SEO - all content indexed by search engines
- 💰 Lower hosting costs on CDN
- 📈 Scales to millions of users
- 🌐 Works on any static host

**Updating Content:**
```bash
# When database content changes
npm run build:ssg  # Regenerate all pages
# Then redeploy dist/ folder
```

**Complete Documentation:**
- See `SSG-README.md` for technical details
- See `SETUP-SSG.md` for quick setup guide

---

### Lovable Deployment (Alternative)
1. Click "Publish" button in Lovable interface
2. Site is automatically deployed
3. Available at: `yoursite.lovable.app`

**Note:** Lovable deployment uses client-side rendering. For best SEO and performance, use SSG deployment above.

### Custom Domain Setup
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is auto-generated

---

## Troubleshooting

### Common Issues

**1. Supabase Connection Error**
```
Error: Invalid Supabase URL or Key
```
**Solution:** Verify `.env` file has correct credentials

**2. TypeScript Errors**
```
Cannot find module '@/components/...'
```
**Solution:** Check `tsconfig.json` path mappings

**3. Build Errors**
```
Failed to resolve module
```
**Solution:** Run `npm install` to reinstall dependencies

**4. Database Query Errors**
```
RLS policy violation
```
**Solution:** Check Row Level Security policies in Supabase

---

## Contributing

### Development Workflow
1. Create feature branch
2. Make changes
3. Test locally
4. Submit pull request
5. Review and merge

### Code Style
- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write semantic HTML
- Use Tailwind utility classes

---

## Support

For questions or issues:
- Check documentation
- Review Supabase logs
- Contact support via Support page
- Join community Discord

---

## License

This project is proprietary. All rights reserved.

---

**Last Updated:** 2024
**Version:** 1.0.0
**Maintained by:** Next Job Info Team
