import type { Job } from './schemas';

export class SSGValidationError extends Error {
  constructor(
    public field: string,
    public value: any,
    public context: string
  ) {
    super(`SSG Validation Failed: ${field} in ${context}`);
    this.name = 'SSGValidationError';
  }
}

export function validateJobForSSG(job: Job, context: string = 'unknown'): void {
  const errors: string[] = [];

  // Critical fields that must exist
  if (!job.exam_or_post_name || job.exam_or_post_name.trim().length < 10) {
    errors.push(`Title too short: "${job.exam_or_post_name}"`);
  }

  if (!job.page_link || job.page_link.trim().length === 0) {
    errors.push(`Missing page_link`);
  }

  if (!job.recruitment_board) {
    errors.push(`Missing Recruitment Board`);
  }

  // Validate page_link format (should be slug-friendly)
  if (job.page_link && !/^[a-z0-9-]+$/.test(job.page_link)) {
    errors.push(`Invalid page_link format: "${job.page_link}" (must be lowercase with hyphens)`);
  }

  // Check for reasonable length limits
  if (job.exam_or_post_name && job.exam_or_post_name.length > 500) {
    errors.push(`Title too long: ${job.exam_or_post_name.length} chars (max 500)`);
  }

  if (errors.length > 0) {
    throw new SSGValidationError(
      errors.join(', '),
      job,
      `Job ID ${job.job_id} (${context})`
    );
  }
}

export function validateBatchJobs(jobs: Job[]): void {
  const duplicateLinks = new Set<string>();
  const seenLinks = new Map<string, string>();

  jobs.forEach((job, index) => {
    // Validate individual job
    try {
      validateJobForSSG(job, `batch position ${index}`);
    } catch (error) {
      console.error(`❌ Job validation failed at index ${index}:`, error);
      throw error;
    }

    // Check for duplicate page_links
    if (job.page_link && seenLinks.has(job.page_link)) {
      duplicateLinks.add(job.page_link);
    } else if (job.page_link) {
      seenLinks.set(job.page_link, job.job_id);
    }
  });

  if (duplicateLinks.size > 0) {
    throw new Error(
      `❌ Duplicate page_links found: ${Array.from(duplicateLinks).join(', ')}`
    );
  }

  console.log(`✅ All ${jobs.length} jobs passed validation`);
}
