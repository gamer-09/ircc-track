export const GCMS_STATUS_CODES = [
  {
    code: 'A11.2 MET',
    category: 'Eligibility Assessment',
    status: 'Positive',
    meaning: 'Section 11.2 of the Immigration and Refugee Protection Act (IRPA) satisfied. The applicant meets all minimum requirements declared in the Express Entry / Study stream profile without score dropping below draw cut-off.',
    actionRequired: 'None. Eligibility phase is officially completed.'
  },
  {
    code: 'A11.2 REVIEW REQUIRED (RR)',
    category: 'Eligibility Assessment',
    status: 'Warning',
    meaning: 'A case processing agent flagged an item (e.g. proof of funds currency calculation, reference letter NOC job duties match, or transcript verification) for senior Case Management Officer review.',
    actionRequired: 'Recommended to send clarifying bank statements or supplemental reference letters via IRCC Webform.'
  },
  {
    code: 'BGC IP1 (In Progress 1)',
    category: 'Background Check',
    status: 'Normal',
    meaning: 'Centralized Intake Office / primary office is checking criminality records and running initial RCMP / biometric database checks.',
    actionRequired: 'Routine stage. No action required.'
  },
  {
    code: 'BGC IP2 (In Progress 2)',
    category: 'Background Check',
    status: 'Normal / Advanced',
    meaning: 'File has moved to comprehensive security screening and information sharing with partner agencies (CBSA, CSIS, 5-Eyes intelligence sharing). Usually right before PPR.',
    actionRequired: 'Keep passport ready. Passport request is commonly triggered 1 to 4 weeks after IP2 completion.'
  },
  {
    code: 'COMPLEX / SCREENING',
    category: 'Security Check',
    status: 'High Delay',
    meaning: 'File has been routed to the Canada Border Services Agency (CBSA) or Canadian Security Intelligence Service (CSIS) for detailed non-proliferation or national security checks.',
    actionRequired: 'May take several additional months. File ATIP / CBSA GCMS notes to verify exactly when the security file was opened.'
  },
  {
    code: 'CRIMINALITY: PASSED',
    category: 'Police Check',
    status: 'Positive',
    meaning: 'All submitted Police Clearance Certificates (PCC) have been validated and no inadmissibility under IRPA A36 was found.',
    actionRequired: 'None. Police screening complete.'
  },
  {
    code: 'MEDICAL: M1 / M2 / M3',
    category: 'Health Assessment',
    status: 'Medical',
    meaning: 'M1 = No danger to public health and not expected to cause excessive demand on Canadian health services. M2 = Follow-up surveillance required. M3 = Inadmissible under excessive demand threshold.',
    actionRequired: 'If M1, no further action. If M2, comply with public health reporting post-landing.'
  },
  {
    code: 'INFO SHARING: COMPLETE',
    category: 'Biographic Verification',
    status: 'Positive',
    meaning: 'Automated reciprocal data sharing with USA (DHS/USCIS), UK, Australia, and New Zealand verified matching biometrics and travel histories without discrepancy.',
    actionRequired: 'None.'
  },
  {
    code: 'PUM (Port Under Maintenance / Pending Officer Review)',
    category: 'Queue Management',
    status: 'Normal',
    meaning: 'File is queued in the visa officer tray awaiting final sign-off.',
    actionRequired: 'No action required.'
  },
  {
    code: 'PPR / READY FOR VISA (RFV)',
    category: 'Final Decision',
    status: 'Milestone',
    meaning: 'Application approved! Passport Request or Portal email dispatched.',
    actionRequired: 'Submit physical passport with 2 photos within 30 days to VFS Global.'
  }
];

export const GCMS_ORDERING_GUIDE = {
  timeframe: '30 to 40 calendar days',
  feeCAD: '$5.00 CAD (or free via Canadian citizen/PR representative under ATIP)',
  officialPortal: 'https://atip-aiprp.apps.gc.ca/atip/welcome.do',
  reasonsToOrder: [
    'Application has exceeded standard processing time by > 20%',
    'You received an ambiguous Additional Document Request (ADR)',
    'Ghost update occurred with no visible portal text change',
    'To verify whether security screening or eligibility is holding the file'
  ]
};
