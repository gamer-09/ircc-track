// 100% Authentic IRCC Visa Streams & Statutory Requirements (IRPA / IRPR)
export const VISA_STREAMS = [
  {
    id: 'study_permit',
    name: 'Study Permit (Outside Canada)',
    category: 'Temporary Resident',
    officialForm: 'IMM 1294',
    statutoryFeeCAD: 150,
    biometricsFeeCAD: 85,
    officialStandardWeeks: 8,
    governingAct: 'IRPA Section 30 & IRPR Section 216',
    typicalSteps: [
      { 
        id: 'submitted', 
        title: 'Application & Statutory Fees Submitted', 
        desc: 'IMM 1294, IMM 5707 (Family Information), and fees ($150 CAD application + $85 CAD biometrics) confirmed via IRCC Portal / GCKey.',
        gcmsField: 'APP STATUS: Open | FEES: Received | BARCODE: Generated'
      },
      { 
        id: 'aor', 
        title: 'Acknowledgement of Receipt (AOR) & UCI Linked', 
        desc: 'IRCC creates official electronic case file in GCMS. Unique Client Identifier (10-digit UCI) assigned and routed to Regional Processing Office.',
        gcmsField: 'FILE CREATED: CPC-Edmonton / Outland VO | UCI: Validated'
      },
      { 
        id: 'bil', 
        title: 'Biometrics Instruction Letter (BIL) Enrolled', 
        desc: 'NIST 10-digit fingerprint scan and digital facial photo captured at VFS Global / ASC. Biometrics stamped valid for 10 calendar years.',
        gcmsField: 'BIOMETRICS: Completed (Valid 10 Yrs) | ENROLLMENT: NIST Match'
      },
      { 
        id: 'ime', 
        title: 'Immigration Medical Exam (IME) Assessed', 
        desc: 'Authorized IRCC Panel Physician submits eMedical sheet. Health Branch verifies M1 rating (No danger to public health / no excessive demand).',
        gcmsField: 'MEDICAL: Passed (Rating: M1) | EXPIRY: 12 Months from Exam'
      },
      { 
        id: 'bgc', 
        title: 'Eligibility (DLI & PAL) & Background Check', 
        desc: 'Officer audits DLI Acceptance, Provincial Attestation Letter (PAL), $20,635 CAD Living Expenses proof, and runs CPIC/CSIS security clearance.',
        gcmsField: 'ELIGIBILITY: Passed (R216/PAL Verified) | SECURITY: In Progress'
      },
      { 
        id: 'ppr', 
        title: 'Original Passport Request (PPR / OPR)', 
        desc: 'Final positive determination. IRCC issues 30-day passport transmission request to VFS Global for foil stamping (Counterfoil V-1 / S-1).',
        gcmsField: 'DECISION: Approved | VISA FOIL: Ready for Counterfoil Issue'
      },
      { 
        id: 'copr', 
        title: 'Port of Entry (POE) Letter of Introduction', 
        desc: 'Official POE Study Authorization letter generated. Present to CBSA Border Services Officer at Canadian airport to print physical Study Permit.',
        gcmsField: 'FINAL DISPOSITION: Document Generated (IMM 5838 POE Letter)'
      },
    ],
    mandatoryDocuments: [
      { code: 'LOA', name: 'Letter of Acceptance (LOA) from Designated Learning Institution (DLI)', requirement: 'Must show DLI number, student ID, program start/end dates, tuition cost, and conditions' },
      { code: 'PAL', name: 'Provincial Attestation Letter (PAL / TAL)', requirement: 'Mandatory under 2024-2026 IRCC regulations for undergraduate/college programs' },
      { code: 'POF', name: 'Proof of Financial Support ($20,635 CAD + 1st Year Tuition)', requirement: 'GIC certificate or 4-6 month bank statements with verifiable source of funds' },
      { code: 'SOP', name: 'Statement of Purpose / Study Plan Letter of Explanation', requirement: 'Explains academic progression, employment ties to home country, and departure intention' },
      { code: 'PASSPORT', name: 'Valid International Passport', requirement: 'Must have at least 6 months validity beyond intended duration of study' },
      { code: 'IME', name: 'Upfront eMedical Sheet (IMM 1017B)', requirement: 'From authorized IRCC Panel Physician in your country of residence' },
      { code: 'PCC', name: 'Police Clearance Certificate', requirement: 'From country of origin and any country resided in for 6+ consecutive months' }
    ]
  },
  {
    id: 'express_entry_cec',
    name: 'Express Entry - Canadian Experience Class (CEC)',
    category: 'Permanent Residence',
    officialForm: 'e-APR (Permanent Residence Portal)',
    statutoryFeeCAD: 515,
    rprfFeeCAD: 575,
    officialStandardWeeks: 20,
    governingAct: 'IRPA Section 12(2) & IRPR Section 87.1',
    typicalSteps: [
      { 
        id: 'submitted', 
        title: 'ITA Accepted & e-APR Submitted with Fees', 
        desc: 'Electronic Application for PR locked in within 60 days of Invitation to Apply. Application fee ($515 CAD) + RPRF ($575 CAD) confirmed.',
        gcmsField: 'e-APR: Locked | RPRF FEE: Paid | ITA STREAM: CEC'
      },
      { 
        id: 'aor', 
        title: 'e-AOR Issued & Primary Centralized Intake', 
        desc: 'Centralized Intake Office (CIO Sydney / CPC-Ottawa) receives e-APR. 6-month processing standard timer officially begins.',
        gcmsField: 'AOR GENERATED: CIO-Sydney | PRIMARY OFFICE: CPC-Ottawa'
      },
      { 
        id: 'bil', 
        title: 'Biometrics Linked & Police Clearance Audit', 
        desc: 'Valid Canadian biometrics verified from prior work permit. RCMP certified criminal record check + foreign PCCs validated.',
        gcmsField: 'BIOMETRICS: Linked (Valid) | CRIMINALITY: Passed (A36 Satisfied)'
      },
      { 
        id: 'ime', 
        title: 'Medical Examination Passed / Exemption Applied', 
        desc: 'IRCC Health Branch applies in-Canada public policy medical exemption or confirms valid IME on file.',
        gcmsField: 'MEDICAL: Passed (Public Policy Exemption / IME Valid)'
      },
      { 
        id: 'bgc', 
        title: 'Section 11.2 Eligibility & Security Screening', 
        desc: 'Case Officer confirms Canadian work experience (NOC TEER 0, 1, 2, 3), T4/NOA tax records, CLB language score, and CSIS/CBSA security clearance.',
        gcmsField: 'ELIGIBILITY: A11.2 MET | INFO-SHARING: Complete | SECURITY: IP2'
      },
      { 
        id: 'ppr', 
        title: 'PR Confirmation Portal Invitation (P1 / P2)', 
        desc: 'IRCC Client Portal sends email requesting confirmation of presence in Canada, port of entry details, and upload of digital PR photo.',
        gcmsField: 'DECISION: Approved | PORTAL CREDENTIALS: Dispatched'
      },
      { 
        id: 'copr', 
        title: 'Electronic CoPR (e-CoPR) & PR Card Delivery', 
        desc: 'e-CoPR signed electronically in portal conferring Permanent Resident status. 1st permanent resident card mailed to Canadian residential address.',
        gcmsField: 'STATUS: Permanent Resident | e-CoPR: Downloadable | PR CARD: Queued'
      }
    ],
    mandatoryDocuments: [
      { code: 'REF_LETTER', name: 'Canadian Employment Reference Letters', requirement: 'Must specify NOC TEER, exact job title, start/end dates, weekly hours (min 30 hrs/wk), wage, and bulleted duties matching NOC' },
      { code: 'TAX_RECORDS', name: 'CRA Notice of Assessment (NOA) & T4 Tax Slips', requirement: 'For each year of Canadian work experience claimed in CRS profile' },
      { code: 'LANG_TEST', name: 'CELPIP-General / IELTS General / PTE Core Score Card', requirement: 'Must be less than 2 years old at time of e-APR submission. TEER 0/1 requires CLB 7+; TEER 2/3 requires CLB 5+' },
      { code: 'ECA', name: 'Educational Credential Assessment (ECA report)', requirement: 'From WES, ICAS, IQAS, CES, or Canadian university degree copy (< 5 years old)' },
      { code: 'FOREIGN_PCC', name: 'Police Clearance Certificates', requirement: 'From every country lived in for 6+ consecutive months since the age of 18' }
    ]
  },
  {
    id: 'express_entry_fswp',
    name: 'Express Entry - Federal Skilled Worker (FSWP)',
    category: 'Permanent Residence',
    officialForm: 'e-APR (Outland Permanent Residence)',
    statutoryFeeCAD: 515,
    rprfFeeCAD: 575,
    officialStandardWeeks: 24,
    governingAct: 'IRPA Section 12(2) & IRPR Section 75',
    typicalSteps: [
      { 
        id: 'submitted', 
        title: 'e-APR Submitted with Proof of Settlement Funds', 
        desc: 'Application submitted with certified translations of foreign credentials, reference letters, and statutory fees.',
        gcmsField: 'e-APR: Ingested | SETTLEMENT FUNDS: Declared'
      },
      { 
        id: 'aor', 
        title: 'AOR Issued & File Assigned to Outland Visa Office', 
        desc: 'Centralized Intake Office (CIO) reviews completeness under R10. File transferred to primary processing embassy (e.g. London, New Delhi, Nairobi).',
        gcmsField: 'R10 COMPLETENESS: Passed | VISA OFFICE: Primary Assigned'
      },
      { 
        id: 'bil', 
        title: 'Biometrics Enrolled at VAC', 
        desc: 'Applicant and accompanying family members complete fingerprinting and photographs at nearest VFS Global / VAC.',
        gcmsField: 'BIOMETRICS: Completed & Linked | NIST MATCH: Verified'
      },
      { 
        id: 'ime', 
        title: 'Immigration Medical Exam (IME) Passed', 
        desc: 'Panel physician health screening assessed by Regional Medical Office (RMO). M1 grade recorded.',
        gcmsField: 'MEDICAL: Passed (M1) | ASSESSED BY: RMO'
      },
      { 
        id: 'bgc', 
        title: 'Eligibility A11.2, 67-Point Grid & Security Screening', 
        desc: 'Officer audits 6-factor selection grid (min 67/100 points), source of settlement funds, foreign job duties, and comprehensive 5-Eyes security checks.',
        gcmsField: 'FSWP 67-PT GRID: Met (74 Pts) | ELIGIBILITY: Passed | SECURITY: IP2'
      },
      { 
        id: 'ppr', 
        title: 'Passport Request (PPR / Ready for Visa)', 
        desc: 'Primary applicant and dependents receive official email instruction to submit physical passports to VAC for immigrant visa stamping.',
        gcmsField: 'DECISION: Approved | IMMIGRANT VISA: Stamping Authorized'
      },
      { 
        id: 'copr', 
        title: 'CoPR Document & Landing Visa Counterfoil', 
        desc: 'Physical passports returned with single-entry Permanent Resident visa counterfoil and Confirmation of Permanent Residence (IMM 5688) for landing.',
        gcmsField: 'CoPR ISSUED: IMM 5688 | EXPIRY: Tied to Medical Expiry Date'
      }
    ],
    mandatoryDocuments: [
      { code: 'FSWP_POF', name: 'Official Proof of Settlement Funds', requirement: 'Bank letter with 6-month average balance meeting exact IRCC family size thresholds' },
      { code: 'ECA_REPORT', name: 'Educational Credential Assessment (ECA)', requirement: 'From WES, ICAS, IQAS, CES (< 5 years old)' },
      { code: 'WORK_EXP', name: 'Foreign Work Experience Reference Letters', requirement: 'Must prove at least 1 continuous year of full-time (1,560 hrs) paid work in NOC TEER 0/1/2/3 within last 10 years' },
      { code: 'CLB_RESULTS', name: 'Language Test Results (CLB 7+ minimum)', requirement: 'IELTS General (min 6.0 in all bands) / CELPIP / PTE Core / TEF Canada' }
    ]
  },
  {
    id: 'visitor_visa',
    name: 'Visitor Visa / TRV (Temporary Resident Visa)',
    category: 'Temporary Resident',
    officialForm: 'IMM 5257',
    statutoryFeeCAD: 100,
    biometricsFeeCAD: 85,
    officialStandardWeeks: 6,
    governingAct: 'IRPA Section 20(1)(b) & IRPR Section 179',
    typicalSteps: [
      { 
        id: 'submitted', 
        title: 'IMM 5257 & Financial Evidence Submitted', 
        desc: 'Visitor portal submission complete. $100 CAD visa fee + $85 CAD biometrics confirmed.',
        gcmsField: 'TRV APP: Ingested | INTENDED DURATION: Temporary'
      },
      { 
        id: 'aor', 
        title: 'Application Reference V-Number Generated', 
        desc: 'IRCC GCKey creates tracking record. File enters primary embassy queue.',
        gcmsField: 'APP #: V-Series Generated | QUEUE: Automated Chinook Triage'
      },
      { 
        id: 'bil', 
        title: 'Biometrics Captured at VAC', 
        desc: 'Biometrics recorded. Stamped valid for 10 years across all Canadian temporary resident applications.',
        gcmsField: 'BIOMETRICS: Complete | VALIDITY: 10 Years'
      },
      { 
        id: 'ime', 
        title: 'Medical Screening (If Applicable)', 
        desc: 'Exempt for tourist stays under 6 months; required if stay exceeds 6 months or designated medical occupations.',
        gcmsField: 'MEDICAL: Exempt (< 6 Mos Non-Designated Country)'
      },
      { 
        id: 'bgc', 
        title: 'R179 Ties to Home Country & Purpose Assessment', 
        desc: 'Officer reviews employment stability, bank statement balances, family ties, previous travel history, and departure likelihood under IRPR R179(b).',
        gcmsField: 'R179 ASSESSMENT: In Progress | DUAL INTENT: Evaluated'
      },
      { 
        id: 'ppr', 
        title: 'Original Passport Submission Request', 
        desc: 'IRCC approves visitor visa and requests physical passport for multi-entry counterfoil stamping.',
        gcmsField: 'DECISION: Approved | FOIL: Multi-Entry V-1'
      },
      { 
        id: 'copr', 
        title: 'V-1 Multi-Entry Visa Foil Stamped in Passport', 
        desc: 'Multiple-entry visa valid up to passport validity (max 10 years) enabling up to 6 months per entry.',
        gcmsField: 'FOIL PRINTED: V-1 Multi-Entry | VALIDITY: Passport Expiry'
      }
    ],
    mandatoryDocuments: [
      { code: 'HOME_TIES', name: 'Proof of Ties to Country of Residence', requirement: 'Permanent employment letter with approved leave, business registration, or real estate property deed' },
      { code: 'BANK_PROOF', name: '4-6 Months Certified Bank Statements', requirement: 'Demonstrates sufficient liquid funds to support entire duration of Canadian stay without working' },
      { code: 'ITINERARY', name: 'Detailed Travel Itinerary & Purpose of Visit', requirement: 'Flight reservations, hotel bookings, or Letter of Invitation with Canadian host PR/Citizenship status copy' }
    ]
  },
  {
    id: 'spousal_sponsorship',
    name: 'Spousal Sponsorship (Family Class Outland/Inland)',
    category: 'Family Class',
    officialForm: 'IMM 1344 & IMM 5532',
    statutoryFeeCAD: 1080,
    rprfFeeCAD: 575,
    officialStandardWeeks: 52,
    governingAct: 'IRPA Section 12(1) & IRPR Section 117',
    typicalSteps: [
      { 
        id: 'submitted', 
        title: 'PR Spousal Package Submitted Online', 
        desc: 'IMM 1344 (Sponsorship Undertaking), IMM 5532 (Relationship Evaluation), and complete proof of union submitted.',
        gcmsField: 'SPOUSAL PACKAGE: Received | SPONSOR: Canadian Citizen/PR'
      },
      { 
        id: 'aor', 
        title: 'Sponsor AOR & Sponsor Approval (SA)', 
        desc: 'CPC-Mississauga confirms Canadian Sponsor eligibility. File transferred to Overseas Visa Office for Principal Applicant evaluation.',
        gcmsField: 'SPONSOR ELIGIBILITY: Approved | FILE TRANSFERRED: Outland VO'
      },
      { 
        id: 'bil', 
        title: 'Sponsored Spouse Biometrics & PCC Verification', 
        desc: 'Principal applicant attends VAC for biometrics and uploads nationwide police clearance certificates.',
        gcmsField: 'BIOMETRICS: Complete | CRIMINALITY: A36 Clearance Passed'
      },
      { 
        id: 'ime', 
        title: 'Immigration Medical Exam (IME) Passed', 
        desc: 'Panel physician health examination approved with family class excessive demand exemption (IRPA A38(2)).',
        gcmsField: 'MEDICAL: Passed (Excessive Demand Exempt under A38(2))'
      },
      { 
        id: 'bgc', 
        title: 'Relationship Genuineness (R4) & Security Audit', 
        desc: 'Officer evaluates marriage genuineness (photos, chat records, joint financial assets, cohabitation) and completes security check.',
        gcmsField: 'GENUINENESS R4: Satisfied | SECURITY: In Progress'
      },
      { 
        id: 'ppr', 
        title: 'Pre-Arrival Services Letter & Passport Request (PPR)', 
        desc: 'Pre-arrival settlement invitation issued; passport request sent to sponsored spouse.',
        gcmsField: 'PRE-ARRIVAL: Dispatched | PPR: Ready for Visa'
      },
      { 
        id: 'copr', 
        title: 'CoPR Issued & Permanent Residence Landed', 
        desc: 'Confirmation of Permanent Residence (IMM 5688) delivered to spouse conferring permanent resident status.',
        gcmsField: 'STATUS: Permanent Resident | UNDERTAKING: 3-Year Active'
      }
    ],
    mandatoryDocuments: [
      { code: 'IMM5532', name: 'IMM 5532 Relationship Information and Sponsorship Evaluation', requirement: 'Detailed chronology of relationship, marriage ceremonies, joint living arrangements, and family contact' },
      { code: 'MARRIAGE_CERT', name: 'Government Marriage Certificate / Statutory Common-law IMM 5409', requirement: 'Certified registration from national civil registrar with English/French certified translation' },
      { code: 'RELATION_PROOF', name: 'Proof of Joint Life & Cohabitation', requirement: 'Joint lease, joint bank account, photographs with family & friends across time, boarding passes from visits' },
      { code: 'SPONSOR_STATUS', name: 'Sponsor Status Proof & CRA Notice of Assessment (NOA)', requirement: 'Canadian Passport or PR Card + Option C / NOA printout confirming not receiving social assistance' }
    ]
  },
  {
    id: 'pgwp',
    name: 'Post-Graduation Work Permit (PGWP)',
    category: 'Work Permit',
    officialForm: 'IMM 5710',
    statutoryFeeCAD: 255,
    officialStandardWeeks: 14,
    governingAct: 'IRPR Section 205(c)(ii) - C43 Exemption & Section 186(w)',
    typicalSteps: [
      { 
        id: 'submitted', 
        title: 'IMM 5710 Submitted under Maintained Status', 
        desc: 'Submitted within 180 days of graduation. Section 186(w) authorization permits immediate full-time employment while waiting.',
        gcmsField: 'PGWP APP: Locked | MAINTAINED STATUS: Active under R186(w)'
      },
      { 
        id: 'aor', 
        title: 'WP-EXT (Work Permit Extension) Interim Letter', 
        desc: 'Automated IRCC letter generated confirming right to work for 120-180 days while file is in queue.',
        gcmsField: 'INTERIM WORK AUTH: Generated (WP-EXT Letter)'
      },
      { 
        id: 'bil', 
        title: 'Biometrics Verification', 
        desc: 'Existing biometric enrollment on file verified in IRCC GCMS database.',
        gcmsField: 'BIOMETRICS: Valid on Record'
      },
      { 
        id: 'ime', 
        title: 'Medical Check (Healthcare/Childcare Restrictions)', 
        desc: 'Validates if work permit requires public health restriction removal for hospital/teaching roles.',
        gcmsField: 'MEDICAL: Valid (No Healthcare Restrictions if IME on File)'
      },
      { 
        id: 'bgc', 
        title: 'DLI Full-Time Student Compliance Audit', 
        desc: 'Officer verifies continuous full-time student status during each academic term (except authorized leave / final term).',
        gcmsField: 'COMPLIANCE AUDIT: Full-Time Continuous Status Confirmed'
      },
      { 
        id: 'ppr', 
        title: 'Final Determination & Approval Letter', 
        desc: 'IRCC approves open work permit duration (up to 3 years for 2+ year master/degree programs).',
        gcmsField: 'DECISION: Approved | PERMIT DURATION: 36 Months'
      },
      { 
        id: 'copr', 
        title: 'Physical Open Work Permit Mailed to Canadian Address', 
        desc: 'Canada Post delivers physical paper Work Permit document (IMM 1442) to applicant residential address.',
        gcmsField: 'DOCUMENT PRINTED: IMM 1442 Work Permit | MAILED: Tracked CPC-Edmonton'
      }
    ],
    mandatoryDocuments: [
      { code: 'FINAL_TRANSCRIPT', name: 'Official Final Academic Transcript from DLI', requirement: 'Must confirm all degree requirements completed without outstanding credits' },
      { code: 'COMPLETION_LETTER', name: 'Official Letter of Program Completion from Registrar', requirement: 'States exact date degree requirements met, program length, and full-time attendance' },
      { code: 'STUDY_PERMIT', name: 'Copy of Valid Study Permit Held During Studies', requirement: 'Proves valid temporary resident status at time of program completion' }
    ]
  }
];
