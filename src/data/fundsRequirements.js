// 100% Authentic IRCC Proof of Funds & Cost-of-Living Statutory Baselines (IRPA / IRPR)
// Updated according to official IRCC January 2024 - 2026 guidelines

export const STUDY_PERMIT_FUNDS = {
  singleStudentCostOfLiving: 20635, // CAD per year (75% of Statistics Canada Low-Income Cut-Off, updated Jan 1, 2024)
  firstDependentCostOfLiving: 5055,  // CAD for 1st accompanying family member
  additionalDependentCostOfLiving: 5893, // CAD for each subsequent dependent
  tuitionRule: 'First-year tuition fee MUST be added to the living expense baseline (e.g. $20,635 CAD + $18,000 Tuition = $38,635 CAD total required)',
  quebecCAQNote: 'For students destined to Quebec, cost of living requirements are set separately by the Ministère de l’Immigration, de la Francisation et de l’Intégration (MIFI) at approximately $15,078 CAD per year.',
  statutoryBasis: 'IRPR Section 220 (Financial Resources for Students)'
};

// Official Express Entry Settlement Funds Table (Effective 2024 - 2026 LICO update)
// Required for Federal Skilled Worker Program (FSWP) and Federal Skilled Trades Program (FSTP)
// Exempt for Canadian Experience Class (CEC) applicants or those authorized to work with a valid job offer
export const EXPRESS_ENTRY_FUNDS = [
  { familySize: 1, requiredCAD: 14690, requiredUSD: 10750, description: 'Single Applicant' },
  { familySize: 2, requiredCAD: 18288, requiredUSD: 13380, description: 'Applicant + Spouse / 1 Dependent' },
  { familySize: 3, requiredCAD: 22483, requiredUSD: 16450, description: 'Family of 3' },
  { familySize: 4, requiredCAD: 27297, requiredUSD: 19970, description: 'Family of 4' },
  { familySize: 5, requiredCAD: 30959, requiredUSD: 22650, description: 'Family of 5' },
  { familySize: 6, requiredCAD: 34921, requiredUSD: 25550, description: 'Family of 6' },
  { familySize: 7, requiredCAD: 38883, requiredUSD: 28450, description: 'Family of 7' },
  { additionalEachCAD: 3962, description: 'For each additional family member beyond 7' }
];

export const ACCEPTABLE_FINANCIAL_DOCS = [
  { 
    name: 'Guaranteed Investment Certificate (GIC - $20,635 CAD)', 
    accepted: true, 
    risk: 'Zero Risk', 
    provider: 'Scotiabank, CIBC, RBC, ICICI, SBI Canada, HSBC/RBC',
    tip: 'The gold standard for student proof of living expenses. Automatically satisfies IRPR Section 220.' 
  },
  { 
    name: 'Official Bank Statement (4 to 6 months with average balance)', 
    accepted: true, 
    risk: 'Low Risk', 
    provider: 'Any licensed commercial bank',
    tip: 'Must be on official bank letterhead with branch contact, account holder name, and stamped verification. Must demonstrate steady average balance.' 
  },
  { 
    name: 'Disbursed / Unconditional Educational Loan Sanction Letter', 
    accepted: true, 
    risk: 'Low Risk', 
    provider: 'Nationalized or licensed financial institution',
    tip: 'Must clearly state that funds are ready for immediate disbursement without a prior visa requirement clause.' 
  },
  { 
    name: 'Provincial / University Scholarship or Assistantship Award Letter', 
    accepted: true, 
    risk: 'Zero Risk', 
    provider: 'Canadian Designated Learning Institution (DLI)',
    tip: 'Official university letter outlining stipend, tuition waiver, and research/teaching assistantship amounts.' 
  },
  { 
    name: 'Fixed Deposit (FD) / Liquid Mutual Funds with Valuation Report', 
    accepted: true, 
    risk: 'Medium Risk', 
    provider: 'Licensed asset management firm',
    tip: 'Must include a bank letter confirming immediate liquidity without penalty or lock-in restrictions.' 
  },
  { 
    name: 'Real Estate / Land Property Valuation Alone (Non-Liquid)', 
    accepted: false, 
    risk: 'High Risk / Non-Compliant', 
    provider: 'Chartered valuation surveyor',
    tip: 'IRCC does NOT accept immovable property as liquid settlement funds. Property valuation can only be used as proof of economic ties to your home country.' 
  },
  { 
    name: 'Unexplained Sudden Lump-Sum Deposit (Borrowed Money)', 
    accepted: false, 
    risk: 'Critical Refusal Risk (IRPA R205 / R216)', 
    provider: 'Unverified source',
    tip: 'Deposits appearing days before application submission without documentary evidence of source (e.g. land sale deed, inheritance, verified bonus) trigger immediate refusal for non-genuine funds.' 
  }
];
