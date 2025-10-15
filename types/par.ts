export type RiskItem = {
  name: string
  description: string
  analysis: string // free text or enum low/med/high
  likelihood: 'Low' | 'Medium' | 'High'
  impact: 'Low' | 'Medium' | 'High'
  responsePlan: string
}

export type TimelineItem = {
  startDate: string // ISO
  endDate: string // ISO
  label: string // e.g., "S1 Validation & Planning"
}

export type RevisionItem = {
  version: string
  change: string
  by: string
  changeDate: string // ISO
}

export type AttachmentRef = {
  title: string // e.g., "Attachment 1 – Vendor Evaluation Matrix"
  note?: string // optional short description
  files?: UploadedFile[] // uploaded files
}

export type UploadedFile = {
  id: string
  name: string
  size: number
  type: string
  url: string // Data URL for preview
  file?: File // Optional File object
}

export type BudgetYear = {
  year: string // e.g., "2024", "2025"
  amount: string // currency string
  description?: string // optional description for this year
}

export type ApprovedBudgetEntry = {
  id: string
  year: string // e.g., "2024", "2025"
  amount: string // currency string
  type: 'CAPEX' | 'OPEX' // Capital Expenditure or Operational Expenditure
  description: string // description of the approved budget item
}

export interface ParData {
  // Project Details
  projectName: string
  programName: string
  projectDuration: string
  expectedStart: string // free text or ISO month
  priority: 'Strategic' | 'High' | 'Medium'
  background: string
  abstract: string
  problemStatement: string
  objectives: string[] // bullets
  inScope: string[] // bullets
  outOfScope: string[] // bullets

  // Benefits & Impact Analysis
  operationalBenefits: string[] // bullets
  financialImpact: string[] // bullets
  digitalAlignment: string[] // bullets

  // Risk Analysis
  risks: RiskItem[]

  // Contracting Approach
  governanceAlignment: string[]
  marketResearch: string[]
  finalSelection: string // free text (e.g., partner rationale)
  contractingNotes?: string

  // Budget
  estimatedBudget: string // currency string
  isMultiYear: boolean // whether project spans multiple years
  budgetYears: BudgetYear[] // yearly budget breakdown
  totalBudget: string // calculated total across all years
  approvedBudgetAtBoard?: string // legacy field for backward compatibility
  approvedBudgetEntries: ApprovedBudgetEntry[] // detailed approved budget entries

  // Timeline
  timeline: TimelineItem[] // include overall Start/End as first row

  // Approval
  approvalDecision?: string // Approved/Rejected/Pending with notes
  approvalSignoff?: {
    approverName: string
    role: string
    signDate?: string
  }

  // Revision History
  revisions: RevisionItem[]

  // Attachments (references list)
  attachments: AttachmentRef[]
}

export type WizardStep = 
  | 'project-details'
  | 'benefits-impact'
  | 'risks'
  | 'contracting'
  | 'budget-timeline'
  | 'approval-attachments'

export interface AppState {
  currentStep: WizardStep
  parData: ParData
  isDarkMode: boolean
  language: 'en' | 'ar'
  isPreviewMode: boolean
}

