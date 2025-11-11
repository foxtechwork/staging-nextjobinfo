-- Insert demo data into jobs_data table
INSERT INTO public.jobs_data (post_date, recruitment_board, exam_or_post_name, qualification, advt_no, last_date, state, page_link) VALUES
('2024-11-15', 'Union Public Service Commission', 'UPSC Civil Services Examination 2024', 'Graduate Degree', 'UPSC/2024/001', '2025-01-10', 'All India', 'https://upsc.gov.in/examinations/civil-services-examination'),
('2024-11-08', 'Staff Selection Commission', 'SSC CGL Tier-1 Examination 2024', 'Graduate Degree', 'SSC/CGL/2024/17727', '2024-12-30', 'All India', 'https://ssc.nic.in/Portal/Schemedetailsnew?enc=3iOiwiI6fCk%3d'),
('2024-11-12', 'Delhi Police', 'Delhi Police Constable Recruitment', '10+2', 'DP/2024/25000', '2024-12-25', 'Delhi', 'https://delhipolice.nic.in/recruitment'),
('2024-11-05', 'Uttar Pradesh Police', 'UP Police SI Recruitment 2024', 'Graduate Degree', 'UP/SI/2024/9534', '2025-01-15', 'Uttar Pradesh', 'https://uppbpb.gov.in/recruitment'),
('2024-11-20', 'State Bank of India', 'SBI Clerk Recruitment 2024 - 5000+ Vacancies', 'Graduate Degree', 'SBI/CLERK/2024/5000', '2024-12-15', 'All India', 'https://sbi.co.in/careers'),
('2024-11-10', 'Institute of Banking Personnel Selection', 'IBPS Clerk CWE XIII Notification', 'Graduate Degree', 'IBPS/CLERK/XIII/7855', '2025-01-05', 'All India', 'https://ibps.in/recruitment'),
('2024-11-22', 'Kendriya Vidyalaya Sangathan', 'KVS Teacher Recruitment 2024', 'B.Ed, Graduate', 'KVS/TEACHER/2024/13404', '2024-12-18', 'All India', 'https://kvsangathan.nic.in/recruitment'),
('2024-11-01', 'Delhi Subordinate Services Selection Board', 'DSSSB Teacher Recruitment', 'B.Ed, Graduate', 'DSSSB/TEACHER/2024/7236', '2025-01-08', 'Delhi', 'https://dsssb.delhi.gov.in/recruitment'),
('2024-11-14', 'Defence Research & Development Organisation', 'DRDO Scientist B Recruitment', 'B.E/B.Tech', 'DRDO/SCIENTIST/2024/1901', '2024-12-28', 'All India', 'https://drdo.gov.in/recruitment'),
('2024-11-08', 'Indian Space Research Organisation', 'ISRO Technical Assistant Recruitment', 'Diploma/B.E/B.Tech', 'ISRO/TA/2024/182', '2025-01-12', 'All India', 'https://isro.gov.in/recruitment'),
('2024-11-18', 'Railway Recruitment Board', 'Railway Group D Notification 2024', '10th Pass', 'RRB/GROUP-D/2024/35000', '2024-12-20', 'All India', 'https://indianrailways.gov.in/recruitment'),
('2024-11-25', 'Railway Recruitment Board', 'RRB NTPC Recruitment 2024', '10+2, Graduate', 'RRB/NTPC/2024/3552', '2025-01-20', 'All India', 'https://indianrailways.gov.in/recruitment'),
('2024-11-16', 'Border Security Force', 'BSF Constable Recruitment 2024', '10th Pass', 'BSF/CONSTABLE/2024/4189', '2024-12-22', 'All India', 'https://bsf.gov.in/recruitment'),
('2024-11-30', 'Indian Army', 'Indian Army Agniveer Recruitment', '10+2', 'ARMY/AGNIVEER/2024/46000', '2025-01-30', 'All India', 'https://joinindianarmy.nic.in/recruitment');

-- Insert corresponding job details
INSERT INTO public.job_details (job_id, row_html) VALUES
((SELECT job_id FROM public.jobs_data WHERE exam_or_post_name = 'UPSC Civil Services Examination 2024'), 
'<div class="job-details">
<h2>UPSC Civil Services Examination 2024</h2>
<h3>Important Details</h3>
<ul>
<li><strong>Organization:</strong> Union Public Service Commission</li>
<li><strong>Posts:</strong> 900 Vacancies</li>
<li><strong>Qualification:</strong> Graduate Degree</li>
<li><strong>Age Limit:</strong> 21-32 years</li>
<li><strong>Application Fee:</strong> ₹100 (Gen/OBC), Nil (SC/ST/PwD/Women)</li>
<li><strong>Salary:</strong> ₹56,100 - ₹2,25,000</li>
<li><strong>Selection Process:</strong> Prelims + Mains + Interview</li>
<li><strong>Last Date:</strong> January 10, 2025</li>
</ul>
<h3>How to Apply</h3>
<p>Candidates can apply online through the official UPSC website. Make sure to read the official notification carefully before applying.</p>
<h3>Important Links</h3>
<ul>
<li>Official Notification: <a href="https://upsc.gov.in" target="_blank">Download PDF</a></li>
<li>Apply Online: <a href="https://upsconline.nic.in" target="_blank">Click Here</a></li>
<li>Syllabus: <a href="https://upsc.gov.in/syllabus" target="_blank">View Syllabus</a></li>
</ul>
</div>'),

((SELECT job_id FROM public.jobs_data WHERE exam_or_post_name = 'SSC CGL Tier-1 Examination 2024'), 
'<div class="job-details">
<h2>SSC CGL Tier-1 Examination 2024</h2>
<h3>Important Details</h3>
<ul>
<li><strong>Organization:</strong> Staff Selection Commission</li>
<li><strong>Posts:</strong> 17,727 Vacancies</li>
<li><strong>Qualification:</strong> Graduate Degree</li>
<li><strong>Age Limit:</strong> 18-32 years (varies by post)</li>
<li><strong>Application Fee:</strong> ₹100 (Gen/OBC), Nil (SC/ST/PwD/Women)</li>
<li><strong>Salary:</strong> ₹25,500 - ₹81,100</li>
<li><strong>Selection Process:</strong> Tier-1 + Tier-2 + Tier-3 + Tier-4</li>
<li><strong>Last Date:</strong> December 30, 2024</li>
</ul>
<h3>Posts Available</h3>
<ul>
<li>Assistant Audit Officer</li>
<li>Assistant Section Officer</li>
<li>Inspector (Central Excise)</li>
<li>Inspector (Preventive Officer)</li>
<li>Sub Inspector</li>
<li>Tax Assistant</li>
</ul>
<h3>How to Apply</h3>
<p>Apply online through SSC official website. Ensure all details are correct before final submission.</p>
</div>'),

((SELECT job_id FROM public.jobs_data WHERE exam_or_post_name = 'Delhi Police Constable Recruitment'), 
'<div class="job-details">
<h2>Delhi Police Constable Recruitment</h2>
<h3>Important Details</h3>
<ul>
<li><strong>Organization:</strong> Delhi Police</li>
<li><strong>Posts:</strong> 25,000 Vacancies</li>
<li><strong>Qualification:</strong> 10+2</li>
<li><strong>Age Limit:</strong> 18-25 years</li>
<li><strong>Physical Standards:</strong> Height: 170cm (Male), 157cm (Female)</li>
<li><strong>Salary:</strong> ₹21,700 - ₹69,100</li>
<li><strong>Selection Process:</strong> Written Test + Physical Test + Medical Test</li>
<li><strong>Last Date:</strong> December 25, 2024</li>
</ul>
<h3>Selection Criteria</h3>
<ol>
<li>Computer Based Test (CBT)</li>
<li>Physical Efficiency & Measurement Test</li>
<li>Medical Examination</li>
<li>Document Verification</li>
</ol>
</div>');

-- Add more job details for remaining jobs
INSERT INTO public.job_details (job_id, row_html) VALUES
((SELECT job_id FROM public.jobs_data WHERE exam_or_post_name = 'Railway Group D Notification 2024'), 
'<div class="job-details">
<h2>Railway Group D Notification 2024</h2>
<h3>Important Details</h3>
<ul>
<li><strong>Organization:</strong> Railway Recruitment Board</li>
<li><strong>Posts:</strong> 35,000 Vacancies</li>
<li><strong>Qualification:</strong> 10th Pass</li>
<li><strong>Age Limit:</strong> 18-33 years</li>
<li><strong>Application Fee:</strong> ₹500 (Gen/OBC), ₹250 (SC/ST)</li>
<li><strong>Salary:</strong> ₹18,000 - ₹56,900</li>
<li><strong>Selection Process:</strong> CBT + Physical Test + Document Verification</li>
<li><strong>Last Date:</strong> December 20, 2024</li>
</ul>
<h3>Posts Available</h3>
<ul>
<li>Track Maintainer Grade-IV</li>
<li>Helper/Assistant</li>
<li>Porter</li>
<li>Pointsman</li>
</ul>
</div>'),

((SELECT job_id FROM public.jobs_data WHERE exam_or_post_name = 'SBI Clerk Recruitment 2024 - 5000+ Vacancies'), 
'<div class="job-details">
<h2>SBI Clerk Recruitment 2024</h2>
<h3>Important Details</h3>
<ul>
<li><strong>Organization:</strong> State Bank of India</li>
<li><strong>Posts:</strong> 5,000+ Vacancies</li>
<li><strong>Qualification:</strong> Graduate Degree</li>
<li><strong>Age Limit:</strong> 20-28 years</li>
<li><strong>Application Fee:</strong> ₹750 (Gen/OBC), ₹125 (SC/ST/PwD)</li>
<li><strong>Salary:</strong> ₹19,900 - ₹63,200</li>
<li><strong>Selection Process:</strong> Prelims + Mains + Language Proficiency Test</li>
<li><strong>Last Date:</strong> December 15, 2024</li>
</ul>
<h3>Benefits</h3>
<ul>
<li>Medical Benefits</li>
<li>Provident Fund</li>
<li>Gratuity</li>
<li>Quarters/House Rent Allowance</li>
</ul>
</div>');