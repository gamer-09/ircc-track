// IRCC Updated Proof of Funds / Cost of Living Requirements (2024 - 2026)
export const STUDY_PERMIT_FUNDS = {
  singleStudentCostOfLiving: 20635, // CAD per year (Updated IRCC baseline)
  firstDependentCostOfLiving: 5055,
  additionalDependentCostOfLiving: 5893,
  tuitionRule: 'First year tuition fee MUST be added on top of cost of living requirement',
  notes: 'IRCC requires proof of tuition payment + $20,635 CAD minimum for a single student. In Quebec, amounts follow CAQ standards.'
};

export const EXPRESS_ENTRY_FUNDS = [
  { familySize: 1, requiredCAD: 14690, requiredUSD: 10750 },
  { familySize: 2, requiredCAD: 18288, requiredUSD: 13380 },
  { familySize: 3, requiredCAD: 22483, requiredUSD: 16450 },
  { familySize: 4, requiredCAD: 27297, requiredUSD: 19970 },
  { familySize: 5, requiredCAD: 30959, requiredUSD: 22650 },
  { familySize: 6, requiredCAD: 34921, requiredUSD: 25550 },
  { familySize: 7, requiredCAD: 38883, requiredUSD: 28450 },
  { additionalEachCAD: 3962 }
];

export const ACCEPTABLE_FINANCIAL_DOCS = [
  { name: 'Official Bank Statement (4-6 months with average balance)', accepted: true, risk: 'Low', tip: 'Must be on official bank letterhead with branch contact and seal' },
  { name: 'Guaranteed Investment Certificate (GIC - Scotiabank, CIBC, RBC, ICICI)', accepted: true, risk: 'Zero', tip: 'Gold standard for Study Permit applicants' },
  { name: 'Educational Loan Sanction Letter (Disbursed or Unconditional)', accepted: true, risk: 'Low', tip: 'Must state unconditional disbursement without prior visa requirement' },
  { name: 'Provincial / Federal Scholarship Award Letter', accepted: true, risk: 'Zero', tip: 'Official university letter with funding breakdown' },
  { name: 'Fixed Deposit (FD) / Mutual Funds with Valuation Certificate', accepted: true, risk: 'Medium', tip: 'Include proof of immediate liquidity' },
  { name: 'Real Estate Property Valuation alone', accepted: false, risk: 'High', tip: 'Cannot be used as liquid settlement funds; only acceptable as proof of home ties' },
  { name: 'Unexplained Lump Sum Deposit made 1 week before application', accepted: false, risk: 'Critical', tip: 'High risk of refusal under R205/R216 without clear source-of-wealth documentation' }
];
