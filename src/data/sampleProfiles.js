export const SAMPLE_PROFILES = [
  {
    id: 'prof_ng_study',
    title: 'Study Permit - University of Toronto (Master of Science)',
    applicantName: 'Chidubem Okafor',
    streamId: 'study_permit',
    streamName: 'Study Permit (Outside Canada)',
    countryCode: 'NG',
    countryName: 'Nigeria',
    applicationNumber: 'S304918204',
    uci: '11-4820-9184',
    submissionDate: '2026-06-20',
    currentStageIndex: 3, // 0: submitted, 1: aor, 2: bil, 3: ime, 4: bgc, 5: ppr, 6: copr
    statusTitle: 'Medical Exam (IME) Passed // Eligibility Under Review',
    statusBadge: 'IN PROGRESS',
    statusTheme: 'cyan',
    intakeTerm: 'Fall 2026',
    institution: 'University of Toronto',
    fieldOfStudy: 'Computer Science (AI & Robotics)',
    estimatedCompletionDate: '2026-08-18',
    lastUpdated: '2026-08-05 (Ghost Update on Medical status)',
    timeline: [
      {
        stageId: 'submitted',
        title: 'Application & Tuition Receipt Submitted',
        date: '2026-06-20 14:22 UTC',
        status: 'completed',
        details: 'Submitted online via IRCC Portal. Full fee of $150 CAD + $85 CAD Biometrics paid.'
      },
      {
        stageId: 'aor',
        title: 'AOR Issued & Primary File Created',
        date: '2026-06-22 09:15 UTC',
        status: 'completed',
        details: 'UCI 11-4820-9184 linked. Visa office assigned: Nairobi / Lagos processing hub.'
      },
      {
        stageId: 'bil',
        title: 'Biometrics Completed at VFS Global Lagos',
        date: '2026-06-28 11:30 WAT',
        status: 'completed',
        details: 'Biometrics validity confirmed for 10 years (expires June 2036). Enrollment number BM-90281.'
      },
      {
        stageId: 'ime',
        title: 'Immigration Medical Exam Passed',
        date: '2026-08-04 16:40 WAT',
        status: 'completed',
        details: 'IME eMedical 4820199 approved by IRCC Health Branch (M1 rating - No danger to public health).'
      },
      {
        stageId: 'bgc',
        title: 'Eligibility & Background Check (BGC)',
        date: '2026-08-05 (Active Now)',
        status: 'active',
        details: 'Officer reviewing Letter of Acceptance (LOA) verification with U of T Registrar & CAD $20,635 Proof of Funds.'
      },
      {
        stageId: 'ppr',
        title: 'Original Passport Request (PPR / OPR)',
        date: 'Estimated: ~10-14 days',
        status: 'pending',
        details: 'Passport submission request will be issued once eligibility A11.2 decision is finalized.'
      },
      {
        stageId: 'copr',
        title: 'Port of Entry (POE) Letter of Introduction',
        date: 'Pending PPR stamping',
        status: 'pending',
        details: 'Study permit authorization letter required for airline boarding & Canadian border border services.'
      }
    ],
    actionItems: [
      {
        id: 'act_1',
        type: 'critical',
        title: 'Verify U of T DLI Confirmation',
        desc: 'Ensure your University of Toronto LOA has been validated in the IRCC DLI Verification Portal by admissions.',
        deadline: '2026-08-15',
        daysLeft: 8,
        actionLink: 'DLI Verification Portal',
        status: 'needs_action'
      },
      {
        id: 'act_2',
        type: 'warning',
        title: 'CAD Settlement Proof Refresh Ready',
        desc: 'Keep current 30-day updated bank statement ready in case of an Additional Document Request (ADR).',
        deadline: '2026-08-20',
        daysLeft: 13,
        actionLink: 'Document Locker',
        status: 'recommended'
      },
      {
        id: 'act_3',
        type: 'info',
        title: 'Prepare Pre-Arrival GIC / Scotiabank Account',
        desc: 'Prepare student living expense wire transfer once PPR is issued to ensure smooth border arrival.',
        deadline: '2026-08-30',
        daysLeft: 23,
        actionLink: 'Pre-Arrival Guide',
        status: 'info'
      }
    ],
    documents: [
      { id: 'doc_1', name: 'Letter of Acceptance (U of T)', type: 'PDF', status: 'verified', size: '2.4 MB', ocrScore: 99 },
      { id: 'doc_2', name: 'Provincial Attestation Letter (PAL Ontario)', type: 'PDF', status: 'verified', size: '1.1 MB', ocrScore: 98 },
      { id: 'doc_3', name: 'Proof of Funds ($32,500 CAD CAD / USD Bank)', type: 'PDF', status: 'verified', size: '4.8 MB', ocrScore: 96 },
      { id: 'doc_4', name: 'Statement of Purpose (Study Plan & Home Ties)', type: 'PDF', status: 'verified', size: '1.5 MB', ocrScore: 97 },
      { id: 'doc_5', name: 'Upfront Medical E-Medical Sheet', type: 'PDF', status: 'verified', size: '890 KB', ocrScore: 100 },
      { id: 'doc_6', name: 'Police Character Certificate (NPF HQ)', type: 'PDF', status: 'verified', size: '1.2 MB', ocrScore: 94 },
      { id: 'doc_7', name: 'IELTS Academic (Band 8.0 - L:8.5, R:8.5, W:7.5, S:7.5)', type: 'PDF', status: 'verified', size: '640 KB', ocrScore: 100 },
      { id: 'doc_8', name: 'Tuition Deposit First Term Receipt ($16,200 CAD)', type: 'PDF', status: 'verified', size: '1.3 MB', ocrScore: 98 }
    ],
    notes: 'Ghost update was detected on GCKey 48 hours ago: Medical transitioned from "You do not need a medical exam" to "You passed the medical exam". File is in final eligibility assessment.'
  },
  {
    id: 'prof_in_cec',
    title: 'Express Entry - Canadian Experience Class (CEC)',
    applicantName: 'Aarav Sharma',
    streamId: 'express_entry_cec',
    streamName: 'Express Entry - Canadian Experience Class',
    countryCode: 'IN',
    countryName: 'India',
    applicationNumber: 'E003819201',
    uci: '12-9018-3829',
    submissionDate: '2026-05-10',
    currentStageIndex: 4, // 0: submitted, 1: aor, 2: bil, 3: ime, 4: bgc, 5: ppr, 6: copr
    statusTitle: 'Background Check (Security & Criminality) in Final Stage',
    statusBadge: 'NEAR DECISION',
    statusTheme: 'purple',
    intakeTerm: 'N/A (PR Stream)',
    institution: 'Employed in Toronto, ON (NOC TEER 1 - Software Engineer)',
    fieldOfStudy: 'CRS Score: 514 (STEM Category Draw)',
    estimatedCompletionDate: '2026-08-25',
    lastUpdated: '2026-08-06 (IP2 Background Check initiated)',
    timeline: [
      {
        stageId: 'submitted',
        title: 'ITA Accepted & e-APR Submitted',
        date: '2026-05-10 18:00 EST',
        status: 'completed',
        details: 'Submitted within 60-day ITA window. RPRF fee of $575 CAD paid.'
      },
      {
        stageId: 'aor',
        title: 'e-AOR Issued & Primary CPC Ottawa Assigned',
        date: '2026-05-11 02:30 EST',
        status: 'completed',
        details: 'Centralized Processing Centre (CPC-Ottawa) handling primary eligibility verification.'
      },
      {
        stageId: 'bil',
        title: 'Biometrics Linked (Existing Canadian Visa Bio)',
        date: '2026-05-15 10:00 EST',
        status: 'completed',
        details: 'Valid biometrics on file enrolled previously under work permit.'
      },
      {
        stageId: 'ime',
        title: 'Medical Exam Passed (In-Canada Exemption)',
        date: '2026-05-24 14:10 EST',
        status: 'completed',
        details: 'Public policy medical exemption applied for in-Canada applicants.'
      },
      {
        stageId: 'bgc',
        title: 'Eligibility A11.2 Passed & BGC IP2 Security Active',
        date: '2026-08-02 (Active)',
        status: 'active',
        details: 'Eligibility: PASSED. Criminality: PASSED. Info Sharing: COMPLETE. Final Security screening underway.'
      },
      {
        stageId: 'ppr',
        title: 'PR Confirmation Portal Email (P1/P2)',
        date: 'Estimated: ~5-12 days',
        status: 'pending',
        details: 'Email invitation to declare presence in Canada and upload digital PR photo.'
      },
      {
        stageId: 'copr',
        title: 'e-CoPR & PR Card Mail Out',
        date: 'Pending Portal confirmation',
        status: 'pending',
        details: 'Electronic Confirmation of Permanent Residence download & 1st PR Card mailed to Ontario address.'
      }
    ],
    actionItems: [
      {
        id: 'act_ee_1',
        type: 'critical',
        title: 'Monitor Email for PR Portal (P1 Credentials)',
        desc: 'IRCC sends from @cic.gc.ca. Check spam folder daily for Primary Applicant email verification.',
        deadline: '2026-08-16',
        daysLeft: 9,
        actionLink: 'PR Portal Setup Guide',
        status: 'needs_action'
      },
      {
        id: 'act_ee_2',
        type: 'info',
        title: 'Ensure Digital PR Photo Complies with 50x70mm Specs',
        desc: 'Have white background photographer receipt ready to avoid portal photo rejection.',
        deadline: '2026-08-25',
        daysLeft: 18,
        actionLink: 'Document Locker',
        status: 'recommended'
      }
    ],
    documents: [
      { id: 'doc_ee_1', name: 'Canadian Experience Reference Letters (NOC 21232)', type: 'PDF', status: 'verified', size: '3.1 MB', ocrScore: 100 },
      { id: 'doc_ee_2', name: 'T4 Tax Slips & CRA NOA (2024 & 2025)', type: 'PDF', status: 'verified', size: '2.8 MB', ocrScore: 99 },
      { id: 'doc_ee_3', name: 'CELPIP General Score (L:11, R:12, W:10, S:10)', type: 'PDF', status: 'verified', size: '920 KB', ocrScore: 100 },
      { id: 'doc_ee_4', name: 'WES Credential Assessment (ECA Master degree)', type: 'PDF', status: 'verified', size: '1.4 MB', ocrScore: 100 },
      { id: 'doc_ee_5', name: 'Indian Police Clearance Certificate (PCC PSK)', type: 'PDF', status: 'verified', size: '1.2 MB', ocrScore: 98 },
      { id: 'doc_ee_6', name: 'Canadian RCMP Certified Criminal Record Check', type: 'PDF', status: 'verified', size: '1.0 MB', ocrScore: 100 }
    ],
    notes: 'Eligibility is already verified as PASSED on GCMS notes. BGC IP2 status indicates final supervisor approval is pending.'
  },
  {
    id: 'prof_ph_trv',
    title: 'Visitor Visa (TRV) - Manila to Vancouver',
    applicantName: 'Maria Santos',
    streamId: 'visitor_visa',
    streamName: 'Visitor Visa / TRV',
    countryCode: 'PH',
    countryName: 'Philippines',
    applicationNumber: 'V392810294',
    uci: '14-8192-0941',
    submissionDate: '2026-07-15',
    currentStageIndex: 2, // 0: submitted, 1: aor, 2: bil, 3: ime, 4: bgc, 5: ppr, 6: copr
    statusTitle: 'Biometrics Instruction Letter Issued // Action Required',
    statusBadge: 'ACTION REQUIRED',
    statusTheme: 'amber',
    intakeTerm: 'Tourism & Family Visit (September 2026)',
    institution: 'Visiting Family in British Columbia',
    fieldOfStudy: 'N/A (Visitor Stream)',
    estimatedCompletionDate: '2026-08-28',
    lastUpdated: '2026-07-28 (BIL Issued by IRCC)',
    timeline: [
      {
        stageId: 'submitted',
        title: 'Online Application & Fees Paid',
        date: '2026-07-15 08:30 PHT',
        status: 'completed',
        details: 'Fee paid: $100 CAD application fee + $85 CAD biometrics fee.'
      },
      {
        stageId: 'aor',
        title: 'Application Reference V392810294 Generated',
        date: '2026-07-16 03:00 PHT',
        status: 'completed',
        details: 'File placed in Manila Visa Office queue.'
      },
      {
        stageId: 'bil',
        title: 'Biometrics Instruction Letter (BIL) Generated',
        date: '2026-07-28 (Needs Appointment Booking)',
        status: 'active',
        details: 'Action required: 30-day deadline to attend appointment at VFS Global Manila or Cebu.'
      },
      {
        stageId: 'ime',
        title: 'Medical Examination',
        date: 'Exempt (< 6 months stay)',
        status: 'pending',
        details: 'Not required for short tourist stay of 3 weeks.'
      },
      {
        stageId: 'bgc',
        title: 'Eligibility Assessment & Ties to Home Country',
        date: 'Scheduled post-biometrics',
        status: 'pending',
        details: 'Review of employment certification, bank records & return ticket intent.'
      },
      {
        stageId: 'ppr',
        title: 'Original Passport Request (PPR)',
        date: 'Estimated: ~10-18 days after biometrics',
        status: 'pending',
        details: 'Passport submission to VFS for 10-year multiple-entry visa foil.'
      },
      {
        stageId: 'copr',
        title: 'Visa Counterfoil Stamped & Passport Return',
        date: 'Pending decision',
        status: 'pending',
        details: 'Courier 2-way passport delivery with Canadian V-1 visa sticker.'
      }
    ],
    actionItems: [
      {
        id: 'act_trv_1',
        type: 'critical',
        title: 'Book & Attend Biometrics Appointment at VFS Global',
        desc: 'You have 18 days remaining out of the 30-day BIL deadline to capture fingerprints and photo.',
        deadline: '2026-08-25',
        daysLeft: 18,
        actionLink: 'VFS Global Manila Portal',
        status: 'needs_action'
      },
      {
        id: 'act_trv_2',
        type: 'warning',
        title: 'Attach Approved Employer Leave of Absence Letter',
        desc: 'Ensure employer letter states approved return date to work in Manila after Canadian holiday.',
        deadline: '2026-08-20',
        daysLeft: 13,
        actionLink: 'Document Locker',
        status: 'recommended'
      }
    ],
    documents: [
      { id: 'doc_ph_1', name: 'Letter of Invitation from Sister in Vancouver (with PR card)', type: 'PDF', status: 'verified', size: '2.1 MB', ocrScore: 98 },
      { id: 'doc_ph_2', name: 'Bank Statement (BDO Unibank 6-month balance)', type: 'PDF', status: 'verified', size: '3.4 MB', ocrScore: 95 },
      { id: 'doc_ph_3', name: 'Certificate of Employment & Approved Leave Notice', type: 'PDF', status: 'verified', size: '1.2 MB', ocrScore: 97 },
      { id: 'doc_ph_4', name: 'Round-trip Flight Reservation & Travel Itinerary', type: 'PDF', status: 'verified', size: '980 KB', ocrScore: 96 }
    ],
    notes: 'Urgent task: Must schedule VFS Global biometrics before August 25, 2026 to prevent automatic refusal under IRPA R210.'
  },
  {
    id: 'prof_pk_spousal',
    title: 'Spousal Sponsorship (Outland) - Islamabad to Calgary',
    applicantName: 'Zainab & Bilal Khan',
    streamId: 'spousal_sponsorship',
    streamName: 'Spousal Sponsorship (Family Class Outland)',
    countryCode: 'PK',
    countryName: 'Pakistan',
    applicationNumber: 'F004928190',
    uci: '15-9201-4820',
    submissionDate: '2025-11-15',
    currentStageIndex: 4, // 0: submitted, 1: aor, 2: bil, 3: ime, 4: bgc, 5: ppr, 6: copr
    statusTitle: 'Sponsor Approved // Principal Applicant Relationship Review',
    statusBadge: 'IN PROGRESS',
    statusTheme: 'cyan',
    intakeTerm: 'Family Reunification (Calgary, AB)',
    institution: 'Canadian Citizen Sponsor: Bilal Khan',
    fieldOfStudy: 'Spousal Outland Class',
    estimatedCompletionDate: '2026-10-15',
    lastUpdated: '2026-08-01 (Pre-arrival services invitation sent)',
    timeline: [
      {
        stageId: 'submitted',
        title: 'Permanent Resident Spousal Package Submitted',
        date: '2025-11-15 11:00 UTC',
        status: 'completed',
        details: 'Online portal PR spousal stream. All statutory forms submitted.'
      },
      {
        stageId: 'aor',
        title: 'Sponsor AOR & SA (Sponsor Approval)',
        date: '2026-01-20 09:00 UTC',
        status: 'completed',
        details: 'Sponsor eligibility confirmed. File transferred to London / Abu Dhabi VO.'
      },
      {
        stageId: 'bil',
        title: 'Biometrics Completed at VFS Islamabad',
        date: '2026-02-14 13:00 PKT',
        status: 'completed',
        details: 'Biometrics recorded successfully.'
      },
      {
        stageId: 'ime',
        title: 'Medical Exam (IME) Passed',
        date: '2026-04-10 10:30 PKT',
        status: 'completed',
        details: 'IME validated by regional medical officer.'
      },
      {
        stageId: 'bgc',
        title: 'Relationship Genuineness (IMM 5532) & Security Check',
        date: '2026-07-25 (Active)',
        status: 'active',
        details: 'Officer reviewing chat logs, wedding documentation & security clearance checks.'
      },
      {
        stageId: 'ppr',
        title: 'Ready for Visa / PPR Email',
        date: 'Estimated: ~6-8 weeks',
        status: 'pending',
        details: 'Passport submission request for spouse.'
      },
      {
        stageId: 'copr',
        title: 'Confirmation of Permanent Residence (CoPR)',
        date: 'Pending PPR stamping',
        status: 'pending',
        details: 'CoPR document issued for landing in Canada.'
      }
    ],
    actionItems: [
      {
        id: 'act_sp_1',
        type: 'info',
        title: 'Review Pre-Arrival Settlement Services (YMCA/COSTI)',
        desc: 'Pre-arrival letter received. Take free Canadian orientation webinars while awaiting PPR.',
        deadline: '2026-09-01',
        daysLeft: 25,
        actionLink: 'Pre-Arrival Services',
        status: 'info'
      }
    ],
    documents: [
      { id: 'doc_sp_1', name: 'IMM 5532 Relationship Information and Evaluation', type: 'PDF', status: 'verified', size: '2.9 MB', ocrScore: 98 },
      { id: 'doc_sp_2', name: 'Official Nikahnama & NADRA Marriage Registration', type: 'PDF', status: 'verified', size: '4.1 MB', ocrScore: 100 },
      { id: 'doc_sp_3', name: 'Joint Photo Album, Trip Boarding Passes & Chat Logs', type: 'PDF', status: 'verified', size: '14.2 MB', ocrScore: 99 },
      { id: 'doc_sp_4', name: 'Sponsor Proof of Canadian Citizenship & 2025 NOA', type: 'PDF', status: 'verified', size: '2.5 MB', ocrScore: 100 }
    ],
    notes: 'Pre-arrival letter issued! In IRCC practice, pre-arrival invitation sent to principal applicant is a 95% positive indicator of eligibility satisfaction.'
  }
];
