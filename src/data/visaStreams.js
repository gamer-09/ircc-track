export const VISA_STREAMS = [
  {
    id: 'study_permit',
    name: 'Study Permit (Outside Canada)',
    category: 'Temporary Resident',
    icon: 'GraduationCap',
    defaultStandardWeeks: 8,
    typicalSteps: [
      { id: 'submitted', title: 'Application Submitted', desc: 'Fees paid & confirmation received' },
      { id: 'aor', title: 'AOR Received', desc: 'Acknowledgement of Receipt issued by IRCC' },
      { id: 'bil', title: 'Biometrics Instruction (BIL)', desc: 'VAC biometric collection appointment' },
      { id: 'ime', title: 'Medical Exam (IME)', desc: 'Panel physician health screening' },
      { id: 'bgc', title: 'Eligibility & Background Check', desc: 'Criminality, Security & Proof of Funds review' },
      { id: 'ppr', title: 'Passport Request (PPR / OPR)', desc: 'Final decision positive - submit passport' },
      { id: 'copr', title: 'Port of Entry (POE) Letter Issued', desc: 'Travel authorization & study visa active' },
    ],
    mandatoryDocuments: [
      'Letter of Acceptance (LOA) & PAL / TAL (Provincial Attestation Letter)',
      'Proof of Financial Support (GIC / Bank Statement for $20,635 CAD + Tuition)',
      'Statement of Purpose (SOP) & Study Plan',
      'Valid International Passport (Min 6 months beyond intended stay)',
      'Biometrics (VAC Confirmation)',
      'Immigration Medical Exam (IME / Upfront eMedical sheet)',
      'Academic Transcripts & Certificates',
      'English / French Language Score (IELTS / PTE / TEF)'
    ]
  },
  {
    id: 'express_entry_cec',
    name: 'Express Entry - Canadian Experience Class (CEC)',
    category: 'Permanent Residence',
    icon: 'Briefcase',
    defaultStandardWeeks: 20,
    typicalSteps: [
      { id: 'submitted', title: 'ITA & e-APR Submitted', desc: 'Electronic Application for PR locked in' },
      { id: 'aor', title: 'e-AOR Issued', desc: 'Official PR application acknowledgement' },
      { id: 'bil', title: 'Biometrics & Police Clearance', desc: 'Biometrics linked & PCC validation' },
      { id: 'ime', title: 'Medical Exam Passed', desc: 'IME validated or medical exemption applied' },
      { id: 'bgc', title: 'Eligibility A11.2 & Security Check', desc: 'Work history, CRS score & CSIS/CBSA check' },
      { id: 'ppr', title: 'Ready for Visa / Portal Invite', desc: 'PR Confirmation portal credentials issued' },
      { id: 'copr', title: 'e-CoPR & PR Card Issuance', desc: 'Confirmation of Permanent Residence official' },
    ],
    mandatoryDocuments: [
      'Canadian Reference Letters with NOC / TEER match',
      'Language Test Results (CELPIP / IELTS / TEF < 2 years old)',
      'Educational Credential Assessment (ECA report)',
      'Police Clearance Certificates (PCC) for all countries lived > 6 months',
      'Proof of Funds (if applicable / exempt for CEC with job offer)',
      'Valid Passport & Digital Photos (IRCC PR specs)',
      'T4 Tax Slips & Notice of Assessments (NOA)',
      'Upfront Medical Report (IME)'
    ]
  },
  {
    id: 'express_entry_fswp',
    name: 'Express Entry - Federal Skilled Worker (FSWP)',
    category: 'Permanent Residence',
    icon: 'Globe',
    defaultStandardWeeks: 24,
    typicalSteps: [
      { id: 'submitted', title: 'e-APR PR Submitted', desc: 'Full application & fee receipt submitted' },
      { id: 'aor', title: 'AOR Issued', desc: 'Primary visa processing office assigned' },
      { id: 'bil', title: 'Biometrics Collected', desc: 'Fingerprints & facial photo at VAC' },
      { id: 'ime', title: 'Medical Passed', desc: 'Health screening approved' },
      { id: 'bgc', title: 'Eligibility & Comprehensive Security', desc: 'Proof of Funds, Criminality & Info Sharing' },
      { id: 'ppr', title: 'Passport Request (PPR)', desc: 'Visa counterfoil and landing documents stamped' },
      { id: 'copr', title: 'CoPR & Landing Visa', desc: 'Permanent resident landing authorized' },
    ],
    mandatoryDocuments: [
      'Proof of Settlement Funds (Bank letter with 6-month average balance)',
      'ECA (WES / ICAS / IQAS / CES) report',
      'Foreign Work Experience reference letters with detailed job duties',
      'Official Language Test Report Form (CLB 7+ minimum)',
      'Police Clearance Certificates from all countries lived in since age 18',
      'Valid Passport with 2+ blank pages',
      'Digital photos per IRCC PR specifications'
    ]
  },
  {
    id: 'visitor_visa',
    name: 'Visitor Visa / TRV (Temporary Resident)',
    category: 'Temporary Resident',
    icon: 'Plane',
    defaultStandardWeeks: 6,
    typicalSteps: [
      { id: 'submitted', title: 'Application Submitted', desc: 'Portal submission complete' },
      { id: 'aor', title: 'IRCC Application Number Issued', desc: 'Tracking active in GCKey' },
      { id: 'bil', title: 'Biometrics Enrolled', desc: 'Biometrics valid for 10 years' },
      { id: 'ime', title: 'Medical (If staying > 6 mos)', desc: 'Health check if applicable' },
      { id: 'bgc', title: 'Eligibility & Ties to Home Country', desc: 'Financial capability & return intention assessed' },
      { id: 'ppr', title: 'Passport Submission Letter', desc: 'Request to submit physical passport' },
      { id: 'copr', title: 'V-1 Visa Counterfoil Stamped', desc: 'Multiple-entry visa valid up to passport expiry' },
    ],
    mandatoryDocuments: [
      'Proof of Ties to Home Country (Property, Employment letter, Family ties)',
      'Bank Statements (Last 4 to 6 months with proof of income)',
      'Detailed Travel Itinerary & Purpose of Visit',
      'Letter of Invitation (if visiting family/friends in Canada) with host PR/Citizenship copy',
      'Current Employment Letter & Approved Leave of Absence',
      'Valid International Passport'
    ]
  },
  {
    id: 'spousal_sponsorship',
    name: 'Spousal Sponsorship (Family Class Outland/Inland)',
    category: 'Family Class',
    icon: 'HeartHandshake',
    defaultStandardWeeks: 52,
    typicalSteps: [
      { id: 'submitted', title: 'Application Submitted', desc: 'PR portal package locked in' },
      { id: 'aor', title: 'Sponsor AOR Issued', desc: 'Sponsor eligibility review initialized' },
      { id: 'bil', title: 'Biometrics & Medical Request', desc: 'Sponsored spouse completes biometrics & IME' },
      { id: 'ime', title: 'Sponsor Approval (SA)', desc: 'Sponsor approved; file transferred to Visa Office' },
      { id: 'bgc', title: 'Relationship Genuineness & Security', desc: 'IMM 5532 review, interviews (if needed) & security' },
      { id: 'ppr', title: 'Pre-Arrival Letter & PPR', desc: 'Settlement services invite & passport request' },
      { id: 'copr', title: 'CoPR / Landing Confirmation', desc: 'Spouse officially granted Permanent Residence' },
    ],
    mandatoryDocuments: [
      'IMM 5532 (Relationship Information & Sponsorship Evaluation)',
      'Marriage Certificate / Statutory Declaration of Common-law Union (IMM 5409)',
      'Proof of Relationship History (Photos, Chat logs, Joint lease/bills, Travel receipts)',
      'Sponsor Proof of Status (Canadian Passport, PR Card, or Birth Certificate)',
      'Sponsor Notice of Assessment (Option C / NOA for previous tax year)',
      'Sponsored Person Police Certificates & Medical Exam (IME)',
      'Valid Passports for both parties'
    ]
  },
  {
    id: 'pgwp',
    name: 'Post-Graduation Work Permit (PGWP)',
    category: 'Work Permit',
    icon: 'Award',
    defaultStandardWeeks: 14,
    typicalSteps: [
      { id: 'submitted', title: 'PGWP Submitted', desc: 'Interim work authorization active under Maintained Status' },
      { id: 'aor', title: 'WP-EXT Letter Generated', desc: 'Authorization to work while waiting for decision' },
      { id: 'bil', title: 'Biometrics Validated', desc: 'Existing biometrics verified' },
      { id: 'ime', title: 'Medical (if applicable)', desc: 'Medical validation for healthcare/childcare jobs' },
      { id: 'bgc', title: 'Full-Time Status & DLI Compliance', desc: 'Audit of continuous full-time study semesters' },
      { id: 'ppr', title: 'Final Decision & WP Approval', desc: 'Work permit document printed & mailed' },
      { id: 'copr', title: 'Physical Work Permit Delivered', desc: '3-year open work permit active in Canada' },
    ],
    mandatoryDocuments: [
      'Official Final Transcript from Designated Learning Institution (DLI)',
      'Formal Letter of Completion / Degree Conferral from Registrar',
      'Copy of Valid Study Permit & Passport',
      'Language Test Results (if applied under newer 2024+ PGWP streams)',
      'Explanation Letter for any authorized leave or part-time final term'
    ]
  }
];
