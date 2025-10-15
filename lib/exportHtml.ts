import { ParData } from '@/types/par'
import { formatDate } from './utils'
import { parTheme, getThemeColorsForHtml, getTypographyForHtml, getSectionTitleForHtml } from './theme'

export const exportHtml = (data: ParData, locale: 'en' | 'ar' = 'en') => {
  const isRTL = locale === 'ar'
  const colors = getThemeColorsForHtml(locale)
  const typography = getTypographyForHtml(locale)
  
  // Create clean HTML without any web page elements
  const html = `
<!DOCTYPE html>
<html lang="${locale}" dir="${isRTL ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Approval Request</title>
    <script>
        // Instructions for clean printing
        window.addEventListener('beforeprint', function() {
            // This helps ensure clean printing
            document.body.style.margin = '0';
            document.body.style.padding = '0';
        });
    </script>
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: '${typography.baseEN.font}', Arial, sans-serif;
            font-size: ${typography.baseEN.sizePt}pt;
            line-height: ${typography.paragraph.lineSpacing};
            color: ${colors.text};
            background: white;
            margin: 0;
            padding: 0;
        }
        
        /* Page setup for landscape A4 */
        @page {
            size: A4 landscape;
            margin: 1.5cm 1.5cm;
        }
        
        /* Cover page styles */
        .cover-page {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
            page-break-after: always;
        }
        
        .header-bar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%);
        }
        
        .cover-title {
            font-size: 24pt;
            font-weight: 300;
            color: ${colors.secondary};
            margin-bottom: 16pt;
            letter-spacing: 1px;
        }
        
        .cover-subtitle {
            font-size: 16pt;
            font-weight: 300;
            color: ${colors.mutedText};
            margin-bottom: 64pt;
        }
        
        .abstract-section {
            text-align: left;
            max-width: 500pt;
            margin: 0 auto;
        }
        
        .abstract-title {
            font-size: 14pt;
            font-weight: 300;
            color: ${colors.secondary};
            margin-bottom: 16pt;
            font-style: italic;
        }
        
        .abstract-text {
            font-size: 11pt;
            color: ${colors.text};
            font-style: italic;
            line-height: 1.4;
        }
        
        .train-cover-image {
            width: 100%;
            max-width: 500pt;
            height: 150pt;
            margin: 20pt 0;
            background: linear-gradient(90deg, #f8fafc 0%, #e2e8f0 50%, #ffffff 100%);
            border-radius: 8pt;
            position: relative;
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        
        .train-cover-image::before {
            content: '🚄';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48pt;
            z-index: 2;
        }
        
        .train-cover-image::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 40%;
            height: 100%;
            background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%);
            z-index: 1;
        }
        
        /* Content page styles */
        .content-page {
            width: 100%;
            min-height: 100vh;
            padding: 12pt;
        }
        
        .section-title {
            font-size: 14pt;
            font-weight: bold;
            color: ${colors.primary};
            margin: 8pt 0 8pt 0;
            padding-bottom: 2pt;
            border-bottom: 1px solid ${colors.primary}40;
        }
        
        .subsection-title {
            font-size: 12pt;
            font-weight: bold;
            color: ${colors.secondary};
            margin: 8pt 0 4pt 0;
        }
        
        .paragraph {
            margin-bottom: 8pt;
            text-align: justify;
        }
        
        .bullet-list {
            margin: 4pt 0;
            padding-left: 20pt;
        }
        
        .bullet-list li {
            margin-bottom: 2pt;
            list-style-type: disc;
        }
        
        /* Table styles */
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 8pt 0;
            font-size: 10pt;
        }
        
        .table th {
            background-color: ${colors.tableHeaderBg};
            color: ${colors.tableHeaderText};
            font-weight: bold;
            padding: 4pt;
            text-align: center;
            border: 1px solid ${colors.tableBorder};
        }
        
        .table td {
            padding: 3pt;
            border: 1px solid ${colors.tableBorder};
            vertical-align: top;
        }
        
        .table tr:nth-child(even) {
            background-color: ${colors.tableAltRowBg};
        }
        
        /* Page breaks */
        .page-break {
            page-break-before: always;
        }
        
        /* RTL support */
        [dir="rtl"] {
            text-align: right;
        }
        
        [dir="rtl"] .table th,
        [dir="rtl"] .table td {
            text-align: right;
        }
        
        [dir="rtl"] .bullet-list {
            padding-right: 20pt;
            padding-left: 0;
        }
        
        [dir="rtl"] .abstract-section {
            text-align: right;
        }
        
        /* Print optimizations */
        @media print {
            .cover-page {
                height: 100vh;
            }
            
            .content-page {
                min-height: 100vh;
            }
            
            .page-break {
                page-break-before: always;
            }
            
            /* Hide browser print headers and footers */
            @page {
                margin: 0.6in;
                /* Remove browser print headers and footers */
                @top-left { content: ""; }
                @top-center { content: ""; }
                @top-right { content: ""; }
                @bottom-left { content: ""; }
                @bottom-center { content: ""; }
                @bottom-right { content: ""; }
            }
            
            /* Hide navigation and UI elements */
            nav, .navbar, .command-bar, .tabs, .tablist, .tabpanel,
            button, .button, .btn, input, textarea, select,
            .form-controls, .wizard-controls, .step-navigation,
            .export-buttons, .action-buttons {
                display: none !important;
            }
            
            /* Hide any remaining UI elements */
            .ui-element, .control-element, .interactive-element {
                display: none !important;
            }
            
            /* Ensure only document content is visible */
            body {
                margin: 0;
                padding: 0;
                background: white !important;
                color: black !important;
            }
            
            /* Remove any shadows or effects */
            * {
                box-shadow: none !important;
                text-shadow: none !important;
            }
        }
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="cover-page">
        <div class="header-bar"></div>
        <h1 class="cover-title">Project Approval Request</h1>
        <h2 class="cover-subtitle">${data.projectName || 'IT Network & Data Center Design Modernization'}</h2>
        
        <!-- Train Cover Image -->
        <div class="train-cover-image"></div>
        
        <div class="abstract-section">
            <h3 class="abstract-title">Abstract</h3>
            <p class="abstract-text">
                ${data.abstract || data.background || 'This document outlines the approval request for conducting a comprehensive assessment of network and data centers to modernize and optimize the infrastructure for future needs.'}
            </p>
        </div>
    </div>
    
    <!-- Project Details -->
    <div class="content-page">
        <h2 class="section-title">${getSectionTitleForHtml('projectDetails', locale)}</h2>
        
        <table class="table">
            <tr>
                <th style="width: 30%;">Project Name</th>
                <td>${data.projectName}</td>
            </tr>
            <tr>
                <th>Program Name</th>
                <td>${data.programName}</td>
            </tr>
            <tr>
                <th>Project Duration</th>
                <td>${data.projectDuration}</td>
            </tr>
            <tr>
                <th>Expected Start</th>
                <td>${formatDate(data.expectedStart)}</td>
            </tr>
            <tr>
                <th>Priority</th>
                <td>${data.priority}</td>
            </tr>
        </table>
        
        <h3 class="subsection-title">Background</h3>
        <p class="paragraph">${data.background}</p>
        
        <h3 class="subsection-title">Problem Statement</h3>
        <p class="paragraph">${data.problemStatement}</p>
        
        <h3 class="subsection-title">Objectives</h3>
        <ul class="bullet-list">
            ${data.objectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>
        
        <h3 class="subsection-title">In Scope</h3>
        <ul class="bullet-list">
            ${data.inScope.map(item => `<li>${item}</li>`).join('')}
        </ul>
        
        <h3 class="subsection-title">Out of Scope</h3>
        <ul class="bullet-list">
            ${data.outOfScope.map(item => `<li>${item}</li>`).join('')}
        </ul>
    </div>
    
    <!-- Benefits & Impact Analysis -->
    <div class="content-page page-break">
        <h2 class="section-title">${getSectionTitleForHtml('benefitsImpact', locale)}</h2>
        
        <h3 class="subsection-title">Operational Benefits</h3>
        <ul class="bullet-list">
            ${data.operationalBenefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
        
        <h3 class="subsection-title">Financial Impact</h3>
        <ul class="bullet-list">
            ${data.financialImpact.map(impact => `<li>${impact}</li>`).join('')}
        </ul>
        
        <h3 class="subsection-title">Digital Alignment</h3>
        <ul class="bullet-list">
            ${data.digitalAlignment.map(alignment => `<li>${alignment}</li>`).join('')}
        </ul>
    </div>
    
    <!-- Risk Analysis -->
    <div class="content-page page-break">
        <h2 class="section-title">${getSectionTitleForHtml('riskAnalysis', locale)}</h2>
        
        <table class="table">
            <thead>
                <tr>
                    <th style="width: 15%;">Risk Name</th>
                    <th style="width: 25%;">Risk Description</th>
                    <th style="width: 20%;">Risk Analysis</th>
                    <th style="width: 10%;">Likelihood</th>
                    <th style="width: 10%;">Impact</th>
                    <th style="width: 20%;">Response Plan</th>
                </tr>
            </thead>
            <tbody>
                ${data.risks.map(risk => `
                    <tr>
                        <td>${risk.name}</td>
                        <td>${risk.description}</td>
                        <td>${risk.analysis}</td>
                        <td>${risk.likelihood}</td>
                        <td>${risk.impact}</td>
                        <td>${risk.responsePlan}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    
    <!-- Contracting Approach -->
    <div class="content-page page-break">
        <h2 class="section-title">${getSectionTitleForHtml('contractingApproach', locale)}</h2>
        
        <h3 class="subsection-title">Governance Alignment</h3>
        <ul class="bullet-list">
            ${data.governanceAlignment.map(item => `<li>${item}</li>`).join('')}
        </ul>
        
        <h3 class="subsection-title">Market Research</h3>
        <ul class="bullet-list">
            ${data.marketResearch.map(item => `<li>${item}</li>`).join('')}
        </ul>
        
        <h3 class="subsection-title">Final Selection</h3>
        <p class="paragraph">${data.finalSelection}</p>
        
        ${data.contractingNotes ? `
            <h3 class="subsection-title">Contracting Notes</h3>
            <p class="paragraph">${data.contractingNotes}</p>
        ` : ''}
    </div>
    
    <!-- Budget & Timeline -->
    <div class="content-page page-break">
        <h2 class="section-title">${getSectionTitleForHtml('estimatedBudget', locale)}</h2>
        
        <table class="table">
            <tr>
                <th style="width: 50%;">Estimated Budget</th>
                <td>${data.estimatedBudget}</td>
            </tr>
            ${data.isMultiYear ? `
                <tr>
                    <th>Multi-Year Project</th>
                    <td>Yes</td>
                </tr>
                ${data.budgetYears.map(year => `
                    <tr>
                        <th>Budget ${year.year}</th>
                        <td>${year.amount}${year.description ? ` - ${year.description}` : ''}</td>
                    </tr>
                `).join('')}
                <tr>
                    <th>Total Budget</th>
                    <td><strong>${data.totalBudget}</strong></td>
                </tr>
            ` : ''}
            ${data.approvedBudgetEntries.length > 0 ? `
                ${data.approvedBudgetEntries.map(entry => `
                    <tr>
                        <th>Approved ${entry.year} (${entry.type})</th>
                        <td>${entry.amount} - ${entry.description}</td>
                    </tr>
                `).join('')}
            ` : ''}
            ${data.approvedBudgetAtBoard ? `
                <tr>
                    <th>Approved Budget at Board</th>
                    <td>${data.approvedBudgetAtBoard}</td>
                </tr>
            ` : ''}
        </table>
        
        <h2 class="section-title">${getSectionTitleForHtml('timeline', locale)}</h2>
        
        <table class="table">
            <thead>
                <tr>
                    <th style="width: 25%;">Start Date</th>
                    <th style="width: 25%;">End Date</th>
                    <th style="width: 50%;">Label</th>
                </tr>
            </thead>
            <tbody>
                ${data.timeline.map(item => `
                    <tr>
                        <td>${formatDate(item.startDate)}</td>
                        <td>${formatDate(item.endDate)}</td>
                        <td>${item.label}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    
    <!-- Approval & Attachments -->
    <div class="content-page page-break">
        ${data.approvalDecision ? `
            <h2 class="section-title">${getSectionTitleForHtml('approvalDecision', locale)}</h2>
            <p class="paragraph">${data.approvalDecision}</p>
        ` : ''}
        
        ${data.approvalSignoff ? `
            <h2 class="section-title">${getSectionTitleForHtml('approvalSignoff', locale)}</h2>
            <table class="table">
                <tr>
                    <th style="width: 30%;">Approver Name</th>
                    <td>${data.approvalSignoff.approverName}</td>
                </tr>
                <tr>
                    <th>Role</th>
                    <td>${data.approvalSignoff.role}</td>
                </tr>
                ${data.approvalSignoff.signDate ? `
                    <tr>
                        <th>Sign Date</th>
                        <td>${formatDate(data.approvalSignoff.signDate)}</td>
                    </tr>
                ` : ''}
            </table>
        ` : ''}
        
        ${data.revisions.length > 0 ? `
            <h2 class="section-title">${getSectionTitleForHtml('revisionHistory', locale)}</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 12%;">Version</th>
                        <th style="width: 44%;">Change</th>
                        <th style="width: 22%;">By</th>
                        <th style="width: 22%;">Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.revisions.map(revision => `
                        <tr>
                            <td>${revision.version}</td>
                            <td>${revision.change}</td>
                            <td>${revision.by}</td>
                            <td>${formatDate(revision.changeDate)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : ''}
        
        ${data.attachments.length > 0 ? `
            <h2 class="section-title">${getSectionTitleForHtml('attachments', locale)}</h2>
            <ul class="bullet-list">
                ${data.attachments.map((attachment, index) => `
                    <li><strong>Attachment ${index + 1}:</strong> ${attachment.title}${attachment.note ? ` - ${attachment.note}` : ''}</li>
                `).join('')}
            </ul>
        ` : ''}
    </div>
</body>
</html>
  `
  
  return html
}

export const downloadHtml = (data: ParData, locale: 'en' | 'ar' = 'en') => {
  const html = exportHtml(data, locale)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `Project-Approval-Request-${new Date().toISOString().split('T')[0]}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const printHtml = (data: ParData, locale: 'en' | 'ar' = 'en') => {
  const html = exportHtml(data, locale)
  const printWindow = window.open('', '_blank')
  
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print()
      printWindow.close()
    }
  }
}
