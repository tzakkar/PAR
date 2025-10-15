import { z } from 'zod'

export const RiskItemSchema = z.object({
  name: z.string().min(1, 'Risk name is required'),
  description: z.string().min(1, 'Risk description is required'),
  analysis: z.string().min(1, 'Risk analysis is required'),
  likelihood: z.enum(['Low', 'Medium', 'High']),
  impact: z.enum(['Low', 'Medium', 'High']),
  responsePlan: z.string().min(1, 'Response plan is required'),
})

export const TimelineItemSchema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  label: z.string().min(1, 'Label is required'),
})

export const RevisionItemSchema = z.object({
  version: z.string().min(1, 'Version is required'),
  change: z.string().min(1, 'Change description is required'),
  by: z.string().min(1, 'Changed by is required'),
  changeDate: z.string().min(1, 'Change date is required'),
})

export const UploadedFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.string(),
  file: z.any(), // File object
})

export const AttachmentRefSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  note: z.string().optional(),
  files: z.array(UploadedFileSchema).optional(),
})

export const BudgetYearSchema = z.object({
  year: z.string().min(1, 'Year is required'),
  amount: z.string().min(1, 'Amount is required'),
  description: z.string().optional(),
})

export const ApprovedBudgetEntrySchema = z.object({
  id: z.string(),
  year: z.string().min(1, 'Year is required'),
  amount: z.string().min(1, 'Amount is required'),
  type: z.enum(['CAPEX', 'OPEX']),
  description: z.string().min(1, 'Description is required'),
})

export const ParDataSchema = z.object({
  // Project Details
  projectName: z.string().min(1, 'Project name is required'),
  programName: z.string().min(1, 'Program name is required'),
  projectDuration: z.string().min(1, 'Project duration is required'),
  expectedStart: z.string().min(1, 'Expected start is required'),
  priority: z.enum(['Strategic', 'High', 'Medium']),
  background: z.string().min(1, 'Background is required'),
  abstract: z.string().min(1, 'Abstract is required'),
  problemStatement: z.string().min(1, 'Problem statement is required'),
  objectives: z.array(z.string().min(1, 'Objective cannot be empty')).min(1, 'At least one objective is required'),
  inScope: z.array(z.string().min(1, 'In-scope item cannot be empty')).min(1, 'At least one in-scope item is required'),
  outOfScope: z.array(z.string().min(1, 'Out-of-scope item cannot be empty')).min(1, 'At least one out-of-scope item is required'),

  // Benefits & Impact Analysis
  operationalBenefits: z.array(z.string().min(1, 'Benefit cannot be empty')).min(1, 'At least one operational benefit is required'),
  financialImpact: z.array(z.string().min(1, 'Impact cannot be empty')).min(1, 'At least one financial impact is required'),
  digitalAlignment: z.array(z.string().min(1, 'Alignment cannot be empty')).min(1, 'At least one digital alignment is required'),

  // Risk Analysis
  risks: z.array(RiskItemSchema).min(1, 'At least one risk is required'),

  // Contracting Approach
  governanceAlignment: z.array(z.string().min(1, 'Alignment cannot be empty')).min(1, 'At least one governance alignment is required'),
  marketResearch: z.array(z.string().min(1, 'Research item cannot be empty')).min(1, 'At least one market research item is required'),
  finalSelection: z.string().min(1, 'Final selection is required'),
  contractingNotes: z.string().optional(),

  // Budget
  estimatedBudget: z.string().min(1, 'Estimated budget is required'),
  isMultiYear: z.boolean(),
  budgetYears: z.array(BudgetYearSchema),
  totalBudget: z.string(),
  approvedBudgetAtBoard: z.string().optional(),
  approvedBudgetEntries: z.array(ApprovedBudgetEntrySchema),

  // Timeline
  timeline: z.array(TimelineItemSchema).min(1, 'At least one timeline item is required'),

  // Approval
  approvalDecision: z.string().optional(),
  approvalSignoff: z.object({
    approverName: z.string().min(1, 'Approver name is required'),
    role: z.string().min(1, 'Role is required'),
    signDate: z.string().optional(),
  }).optional(),

  // Revision History
  revisions: z.array(RevisionItemSchema),

  // Attachments
  attachments: z.array(AttachmentRefSchema),
})

export type ParData = z.infer<typeof ParDataSchema>
export type RiskItem = z.infer<typeof RiskItemSchema>
export type TimelineItem = z.infer<typeof TimelineItemSchema>
export type RevisionItem = z.infer<typeof RevisionItemSchema>
export type AttachmentRef = z.infer<typeof AttachmentRefSchema>

// Default values for creating a new PAR
export const defaultParData: ParData = {
  // Project Details
  projectName: '',
  programName: '',
  projectDuration: '',
  expectedStart: new Date().toISOString().split('T')[0], // Default to today's date
  priority: 'Medium',
  background: '',
  abstract: 'This document outlines the approval request for conducting a comprehensive assessment of network and data centers to modernize and optimize the infrastructure for future needs.',
  problemStatement: '',
  objectives: [
    'Evaluate network design and identify areas for improvement',
    'Identify aging equipment and infrastructure components',
    'Optimize space, power, and cooling requirements',
    'Propose roadmap and costs for modernization',
    'Develop warehouse network design and implementation plan',
  ],
  inScope: [
    'Network infrastructure assessment and design',
    'Data center modernization planning',
    'Equipment lifecycle analysis',
    'Cost-benefit analysis',
    'Implementation roadmap development',
  ],
  outOfScope: [
    'Actual equipment procurement',
    'Physical infrastructure changes',
    'Staff training and change management',
    'Ongoing maintenance and support',
  ],

  // Benefits & Impact Analysis
  operationalBenefits: [
    'Improved network performance and reliability',
    'Enhanced security posture and compliance',
    'Reduced operational overhead and maintenance costs',
    'Better scalability for future growth',
    'Streamlined IT operations and management',
  ],
  financialImpact: [
    'Reduced total cost of ownership (TCO)',
    'Lower energy consumption and utility costs',
    'Decreased downtime and associated losses',
    'Improved ROI on IT investments',
    'Cost avoidance through proactive maintenance',
  ],
  digitalAlignment: [
    'Supports digital transformation initiatives',
    'Enables cloud-first strategy implementation',
    'Facilitates remote work capabilities',
    'Aligns with cybersecurity best practices',
    'Supports data analytics and AI initiatives',
  ],

  // Risk Analysis
  risks: [
    {
      name: 'Budget Overrun',
      description: 'Project costs may exceed initial estimates due to unforeseen technical challenges',
      analysis: 'Medium likelihood with high impact on project timeline and budget',
      likelihood: 'Medium',
      impact: 'High',
      responsePlan: 'Implement strict budget controls, regular cost reviews, and contingency planning',
    },
    {
      name: 'Technical Complexity',
      description: 'Integration challenges with existing legacy systems',
      analysis: 'High likelihood with medium impact on implementation timeline',
      likelihood: 'High',
      impact: 'Medium',
      responsePlan: 'Conduct thorough technical assessments and phased implementation approach',
    },
    {
      name: 'Resource Availability',
      description: 'Key technical resources may not be available when needed',
      analysis: 'Low likelihood with high impact on project delivery',
      likelihood: 'Low',
      impact: 'High',
      responsePlan: 'Secure resource commitments early and maintain backup resource plans',
    },
  ],

  // Contracting Approach
  governanceAlignment: [
    'Follows established procurement policies and procedures',
    'Aligns with IT governance framework and standards',
    'Ensures compliance with regulatory requirements',
    'Maintains transparency and accountability',
    'Supports strategic business objectives',
  ],
  marketResearch: [
    'Evaluated leading network equipment vendors',
    'Assessed cloud service provider capabilities',
    'Analyzed industry best practices and benchmarks',
    'Reviewed similar implementations in peer organizations',
    'Considered total cost of ownership and lifecycle costs',
  ],
  finalSelection: 'Selected vendor based on technical capability, cost-effectiveness, and proven track record in similar implementations. The chosen solution offers the best balance of performance, scalability, and long-term support.',
  contractingNotes: 'Contract includes performance guarantees, service level agreements, and clear escalation procedures.',

  // Budget
  estimatedBudget: '$2,500,000',
  isMultiYear: false,
  budgetYears: [
    {
      year: new Date().getFullYear().toString(),
      amount: '$2,500,000',
      description: 'Initial project budget'
    }
  ],
  totalBudget: '$2,500,000',
  approvedBudgetAtBoard: '',
  approvedBudgetEntries: [],

  // Timeline
  timeline: [
    {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      label: 'Overall Project Duration',
    },
    {
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      label: 'S1: Validation & Planning',
    },
    {
      startDate: '2024-04-01',
      endDate: '2024-08-31',
      label: 'S2: Design & Procurement',
    },
    {
      startDate: '2024-09-01',
      endDate: '2024-12-31',
      label: 'S3: Implementation & Testing',
    },
  ],

  // Approval
  approvalDecision: '',
  approvalSignoff: {
    approverName: '',
    role: '',
    signDate: '',
  },

  // Revision History
  revisions: [
    {
      version: '1.0',
      change: 'Initial version',
      by: 'Project Team',
      changeDate: new Date().toISOString().split('T')[0],
    },
  ],

  // Attachments
  attachments: [
    {
      title: 'Attachment 1 – Vendor Evaluation Matrix',
      note: 'Detailed comparison of potential vendors and solutions',
      files: [],
    },
    {
      title: 'Attachment 2 – Technical Architecture Diagram',
      note: 'High-level system architecture and integration points',
      files: [],
    },
    {
      title: 'Attachment 3 – Cost-Benefit Analysis',
      note: 'Detailed financial analysis and ROI projections',
      files: [],
    },
  ],
}

