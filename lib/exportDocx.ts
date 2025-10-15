import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType, 
  HeadingLevel, 
  BorderStyle,
  ShadingType,
  UnderlineType,
  PageBreak
} from 'docx'
import { saveAs } from 'file-saver'
import { ParData } from '@/types/par'
import i18n from './i18n'
import { formatDate } from './utils'
import { parTheme, getThemeColors, getTypography, getSectionTitle, getTableConfig } from './theme'

export const exportDocx = async (data: ParData, locale: 'en' | 'ar' = 'en') => {
  const t = (key: string) => i18n.t(key, { lng: locale })
  const isRTL = locale === 'ar'
  const colors = getThemeColors(locale)
  const typography = getTypography(locale)
  
  const children: (Paragraph | Table)[] = []
  
  // Helper function to create styled paragraphs
  const createParagraph = (
    text: string, 
    options: {
      heading?: any
      bold?: boolean
      size?: number
      color?: string
      alignment?: any
      spacingBefore?: number
      spacingAfter?: number
    } = {}
  ) => {
    const {
      heading,
      bold = false,
      size = typography.base.sizePt * 2, // Convert pt to half-points
      color = colors.text,
      alignment = isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
      spacingBefore = 0,
      spacingAfter = typography.paragraph.spacingAfterPt * 20 // Convert pt to twips
    } = options

    return new Paragraph({
      children: [
        new TextRun({
          text,
          bold,
          size,
          color: color.replace('#', ''),
          font: isRTL ? typography.base.font : typography.base.font,
        }),
      ],
      alignment,
      heading,
      spacing: {
        before: spacingBefore * 20, // Convert pt to twips
        after: spacingAfter,
        line: Math.round(typography.paragraph.lineSpacing * 240), // Convert to twips
      },
    })
  }

  // Helper function to create styled headings
  const createHeading = (text: string, level: 'H1' | 'H2' | 'H3') => {
    const headingStyle = typography.headings[level]
    return createParagraph(text, {
      heading: level === 'H1' ? HeadingLevel.HEADING_1 : 
               level === 'H2' ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
      bold: headingStyle.bold,
      size: headingStyle.sizePt * 2,
      color: headingStyle.color,
      spacingBefore: headingStyle.spacingBeforePt,
      spacingAfter: headingStyle.spacingAfterPt,
    })
  }

  // Helper function to create bullet points
  const createBulletPoint = (text: string) => {
    return createParagraph(`• ${text}`, {
      alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
      spacingAfter: typography.lists.bullet.spacingAfterPt * 20,
    })
  }

  // Helper function to create styled tables
  const createStyledTable = (rows: TableRow[], headerBg = colors.tableHeaderBg) => {
    return new Table({
      rows,
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: colors.tableBorder.replace('#', '') },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: colors.tableBorder.replace('#', '') },
        left: { style: BorderStyle.SINGLE, size: 1, color: colors.tableBorder.replace('#', '') },
        right: { style: BorderStyle.SINGLE, size: 1, color: colors.tableBorder.replace('#', '') },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: colors.tableBorder.replace('#', '') },
        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: colors.tableBorder.replace('#', '') },
      },
    })
  }

  // Helper function to create table cells
  const createTableCell = (
    content: string | Paragraph,
    options: {
      bold?: boolean
      bgColor?: string
      alignment?: any
      width?: number
    } = {}
  ) => {
    const {
      bold = false,
      bgColor,
      alignment = isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
      width
    } = options

    const cellContent = typeof content === 'string' 
      ? new Paragraph({
          children: [
            new TextRun({
              text: content,
              bold,
              size: typography.base.sizePt * 2,
              color: colors.text.replace('#', ''),
            }),
          ],
          alignment,
        })
      : content

    return new TableCell({
      children: [cellContent],
      width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
      shading: bgColor ? {
        fill: bgColor.replace('#', ''),
        type: ShadingType.SOLID,
      } : undefined,
    })
  }

  // Title Page - Professional Cover Page
  // Blue header bar
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "",
          size: 240, // 12pt
        }),
      ],
      spacing: { before: 0, after: 0 },
      shading: {
        fill: colors.primary.replace('#', ''),
        type: ShadingType.SOLID,
      },
    })
  )

  // Main title
  children.push(
    createParagraph("Project Approval Request", {
      bold: true,
      size: 24 * 2, // 24pt
      color: colors.secondary,
      alignment: AlignmentType.CENTER,
      spacingBefore: 600,
      spacingAfter: 200,
    })
  )

  // Subtitle
  children.push(
    createParagraph(data.projectName || "IT Network & Data Center Design Modernization", {
      size: 16 * 2, // 16pt
      color: colors.mutedText,
      alignment: AlignmentType.CENTER,
      spacingBefore: 0,
      spacingAfter: 400,
    })
  )

  // Train Cover Image (using emoji as placeholder)
  children.push(
    createParagraph("🚄", {
      size: 48 * 2, // 48pt
      alignment: AlignmentType.CENTER,
      spacingBefore: 200,
      spacingAfter: 400,
    })
  )

  // Train description
  children.push(
    createParagraph("High-Speed Innovation", {
      size: 12 * 2, // 12pt
      color: colors.secondary,
      alignment: AlignmentType.CENTER,
      spacingBefore: 0,
      spacingAfter: 200,
    })
  )

  // Abstract section
  children.push(
    createParagraph("Abstract", {
      bold: true,
      size: 14 * 2, // 14pt
      color: colors.secondary,
      alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
      spacingBefore: 400,
      spacingAfter: 200,
    })
  )

  // Abstract content
  const abstractText = data.abstract || data.background || "This document outlines the approval request for conducting a comprehensive assessment of network and data centers to modernize and optimize the infrastructure for future needs."
  children.push(
    createParagraph(abstractText, {
      size: 11 * 2, // 11pt
      color: colors.text,
      alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
      spacingBefore: 0,
      spacingAfter: 600,
    })
  )

  // Page break after cover page
  children.push(new Paragraph({ children: [new PageBreak()] }))

  // Project Details Section
  children.push(
    createHeading(getSectionTitle('projectDetails', locale), 'H2')
  )
  
  // Project Details Table
  const projectDetailsRows = [
    new TableRow({
      children: [
        createTableCell(t('doc:projectName'), { bold: true, bgColor: colors.tableHeaderBg }),
        createTableCell(data.projectName),
      ],
    }),
    new TableRow({
      children: [
        createTableCell(t('doc:programName'), { bold: true, bgColor: colors.tableHeaderBg }),
        createTableCell(data.programName),
      ],
    }),
    new TableRow({
      children: [
        createTableCell(t('doc:projectDuration'), { bold: true, bgColor: colors.tableHeaderBg }),
        createTableCell(data.projectDuration),
      ],
    }),
    new TableRow({
      children: [
        createTableCell(t('doc:expectedStart'), { bold: true, bgColor: colors.tableHeaderBg }),
        createTableCell(formatDate(data.expectedStart)),
      ],
    }),
    new TableRow({
      children: [
        createTableCell(t('doc:priority'), { bold: true, bgColor: colors.tableHeaderBg }),
        createTableCell(data.priority),
      ],
    }),
  ]
  
  children.push(createStyledTable(projectDetailsRows))

  // Background
  children.push(
    createHeading(t('doc:background'), 'H3')
  )
  children.push(createParagraph(data.background))

  // Problem Statement
  children.push(
    createHeading(t('doc:problemStatement'), 'H3')
  )
  children.push(createParagraph(data.problemStatement))

  // Objectives
  children.push(
    createHeading(t('doc:objectives'), 'H3')
  )
  data.objectives.forEach((objective) => {
    children.push(createBulletPoint(objective))
  })

  // In Scope
  children.push(
    createHeading(t('doc:inScope'), 'H3')
  )
  data.inScope.forEach((item) => {
    children.push(createBulletPoint(item))
  })

  // Out of Scope
  children.push(
    createHeading(t('doc:outOfScope'), 'H3')
  )
  data.outOfScope.forEach((item) => {
    children.push(createBulletPoint(item))
  })

  // Page break before major section
  children.push(new Paragraph({ children: [new PageBreak()] }))

  // Benefits & Impact Analysis
  children.push(
    createHeading(getSectionTitle('benefitsImpact', locale), 'H2')
  )

  // Operational Benefits
  children.push(
    createHeading(t('doc:operationalBenefits'), 'H3')
  )
  data.operationalBenefits.forEach((benefit) => {
    children.push(createBulletPoint(benefit))
  })

  // Financial Impact
  children.push(
    createHeading(t('doc:financialImpact'), 'H3')
  )
  data.financialImpact.forEach((impact) => {
    children.push(createBulletPoint(impact))
  })

  // Digital Alignment
  children.push(
    createHeading(t('doc:digitalAlignment'), 'H3')
  )
  data.digitalAlignment.forEach((alignment) => {
    children.push(createBulletPoint(alignment))
  })

  // Page break before major section
  children.push(new Paragraph({ children: [new PageBreak()] }))

  // Risk Analysis
  children.push(
    createHeading(getSectionTitle('riskAnalysis', locale), 'H2')
  )
  
  // Risks Table with professional styling
  const riskConfig = getTableConfig('risks', locale)
  const riskTableRows = [
    new TableRow({
      children: riskConfig!.columns.map(col =>
        createTableCell(col.title, { 
          bold: true, 
          bgColor: colors.tableHeaderBg,
          alignment: AlignmentType.CENTER,
          width: col.widthPct
        })
      ),
    }),
    ...data.risks.map((risk, index) =>
      new TableRow({
        children: [
          createTableCell(risk.name, { width: 15 }),
          createTableCell(risk.description, { width: 25 }),
          createTableCell(risk.analysis, { width: 20 }),
          createTableCell(risk.likelihood, { width: 10 }),
          createTableCell(risk.impact, { width: 10 }),
          createTableCell(risk.responsePlan, { width: 20 }),
        ],
      })
    ),
  ]
  
  children.push(createStyledTable(riskTableRows))

  // Page break before major section
  children.push(new Paragraph({ children: [new PageBreak()] }))

  // Contracting Approach
  children.push(
    createHeading(getSectionTitle('contractingApproach', locale), 'H2')
  )

  // Governance Alignment
  children.push(
    createHeading(t('doc:governanceAlignment'), 'H3')
  )
  data.governanceAlignment.forEach((item) => {
    children.push(createBulletPoint(item))
  })

  // Market Research
  children.push(
    createHeading(t('doc:marketResearch'), 'H3')
  )
  data.marketResearch.forEach((item) => {
    children.push(createBulletPoint(item))
  })

  // Final Selection
  children.push(
    createHeading(t('doc:finalSelection'), 'H3')
  )
  children.push(createParagraph(data.finalSelection))

  if (data.contractingNotes) {
    children.push(
      createHeading(t('doc:contractingNotes'), 'H3')
    )
    children.push(createParagraph(data.contractingNotes))
  }

  // Page break before major section
  children.push(new Paragraph({ children: [new PageBreak()] }))

  // Budget
  children.push(
    createHeading(getSectionTitle('estimatedBudget', locale), 'H2')
  )
  
  const budgetRows = [
    new TableRow({
      children: [
        createTableCell(t('doc:estimatedBudget'), { bold: true, bgColor: colors.tableHeaderBg }),
        createTableCell(data.estimatedBudget),
      ],
    }),
    ...(data.approvedBudgetAtBoard ? [
      new TableRow({
        children: [
          createTableCell(t('doc:approvedBudgetAtBoard'), { bold: true, bgColor: colors.tableHeaderBg }),
          createTableCell(data.approvedBudgetAtBoard),
        ],
      })
    ] : []),
  ]
  
  children.push(createStyledTable(budgetRows))

  // Timeline
  children.push(
    createHeading(getSectionTitle('timeline', locale), 'H2')
  )
  
  const timelineConfig = getTableConfig('timeline', locale)
  const timelineTableRows = [
    new TableRow({
      children: timelineConfig!.columns.map(col =>
        createTableCell(col.title, { 
          bold: true, 
          bgColor: colors.tableHeaderBg,
          alignment: AlignmentType.CENTER,
          width: col.widthPct
        })
      ),
    }),
    ...data.timeline.map((item) =>
      new TableRow({
        children: [
          createTableCell(formatDate(item.startDate), { width: 25 }),
          createTableCell(formatDate(item.endDate), { width: 25 }),
          createTableCell(item.label, { width: 50 }),
        ],
      })
    ),
  ]
  
  children.push(createStyledTable(timelineTableRows))

  // Approval Decision
  if (data.approvalDecision) {
    children.push(new Paragraph({ children: [new PageBreak()] }))
    children.push(
      createHeading(getSectionTitle('approvalDecision', locale), 'H2')
    )
    children.push(createParagraph(data.approvalDecision))
  }

  // Approval Signoff
  if (data.approvalSignoff) {
    children.push(
      createHeading(getSectionTitle('approvalSignoff', locale), 'H2')
    )
    
    const signoffRows = [
      new TableRow({
        children: [
          createTableCell(t('doc:approverName'), { bold: true, bgColor: colors.tableHeaderBg }),
          createTableCell(data.approvalSignoff.approverName),
        ],
      }),
      new TableRow({
        children: [
          createTableCell(t('doc:role'), { bold: true, bgColor: colors.tableHeaderBg }),
          createTableCell(data.approvalSignoff.role),
        ],
      }),
      ...(data.approvalSignoff.signDate ? [
        new TableRow({
          children: [
            createTableCell(t('doc:signDate'), { bold: true, bgColor: colors.tableHeaderBg }),
            createTableCell(formatDate(data.approvalSignoff.signDate)),
          ],
        })
      ] : []),
    ]
    
    children.push(createStyledTable(signoffRows))
  }

  // Revision History
  if (data.revisions.length > 0) {
    children.push(new Paragraph({ children: [new PageBreak()] }))
    children.push(
      createHeading(getSectionTitle('revisionHistory', locale), 'H2')
    )
    
    const revisionConfig = getTableConfig('revisions', locale)
    const revisionTableRows = [
      new TableRow({
        children: revisionConfig!.columns.map(col =>
          createTableCell(col.title, { 
            bold: true, 
            bgColor: colors.tableHeaderBg,
            alignment: AlignmentType.CENTER,
            width: col.widthPct
          })
        ),
      }),
      ...data.revisions.map((revision) =>
        new TableRow({
          children: [
            createTableCell(revision.version, { width: 12 }),
            createTableCell(revision.change, { width: 44 }),
            createTableCell(revision.by, { width: 22 }),
            createTableCell(formatDate(revision.changeDate), { width: 22 }),
          ],
        })
      ),
    ]
    
    children.push(createStyledTable(revisionTableRows))
  }

  // Attachments
  if (data.attachments.length > 0) {
    children.push(new Paragraph({ children: [new PageBreak()] }))
    children.push(
      createHeading(getSectionTitle('attachments', locale), 'H2')
    )
    
    data.attachments.forEach((attachment, index) => {
      children.push(
        createParagraph(`Attachment ${index + 1}: ${attachment.title}`, {
          bold: true,
          spacingAfter: 100,
        })
      )
      
      if (attachment.note) {
        children.push(
          createParagraph(attachment.note, {
            color: colors.mutedText,
            spacingAfter: 200,
          })
        )
      }
    })
  }

  // Create document with professional styling
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 16838, // A4 landscape width in twips
              height: 11906, // A4 landscape height in twips
            },
            margin: {
              top: parTheme.page.marginsTwips.top,
              right: parTheme.page.marginsTwips.right,
              bottom: parTheme.page.marginsTwips.bottom,
              left: parTheme.page.marginsTwips.left,
            },
          },
        },
        children,
      },
    ],
  })

  // Generate and save
  const buffer = await Packer.toBuffer(doc)
  const blob = new Blob([new Uint8Array(buffer)], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  })
  
  const fileName = `Project-Approval-Request-${new Date().toISOString().split('T')[0]}.docx`
  saveAs(blob, fileName)
}