// PAR Document Theme Configuration
export const parTheme = {
  name: "par_theme_v1.2.5",
  description: "Theme & layout config to make the exported .docx match the PAR template",
  version: "1.2.5",
  
  page: {
    size: "A4 Landscape",
    orientation: "landscape",
    marginsTwips: {
      top: 1440,
      right: 1080,
      bottom: 1440,
      left: 1080
    },
    sectionBreakBetweenMajorSections: true
  },
  
  typography: {
    baseEN: {
      font: "Calibri",
      sizePt: 11,
      color: "#000000"
    },
    baseAR: {
      font: "Tahoma",
      sizePt: 11,
      color: "#000000",
      rtl: true
    },
    headings: {
      H1: {
        fontEN: "Calibri Light",
        fontAR: "Tahoma",
        sizePt: 20,
        bold: true,
        color: "#1F497D", // Office theme dark blue
        spacingBeforePt: 12,
        spacingAfterPt: 6
      },
      H2: {
        fontEN: "Calibri",
        fontAR: "Tahoma",
        sizePt: 14,
        bold: true,
        color: "#1F497D", // Office theme dark blue
        spacingBeforePt: 10,
        spacingAfterPt: 4
      },
      H3: {
        fontEN: "Calibri",
        fontAR: "Tahoma",
        sizePt: 12,
        bold: true,
        color: "#4F81BD", // Office theme lighter blue
        spacingBeforePt: 8,
        spacingAfterPt: 4
      }
    },
    paragraph: {
      lineSpacing: 1.15,
      spacingBeforePt: 0,
      spacingAfterPt: 6,
      justification: "both"
    },
    lists: {
      bullet: {
        indentTwips: 720,
        spacingAfterPt: 2
      },
      numbered: {
        indentTwips: 720,
        spacingAfterPt: 2
      }
    }
  },
  
  colors: {
    primary: "#1F497D", // Dark blue from Office theme
    secondary: "#4F81BD", // Lighter blue from Office theme
    text: "#000000",
    mutedText: "#444444",
    tableHeaderBg: "#D9E1F2",
    tableHeaderText: "#1F497D", // Match primary color
    tableAltRowBg: "#F3F6FA",
    tableBorder: "#BFBFBF"
  },
  
  tables: {
    tableDefaults: {
      border: {
        color: "#BFBFBF",
        sizePx: 1
      },
      cellPaddingPt: 6,
      header: {
        bg: "#D9E1F2",
        textColor: "#1F497D", // Office theme dark blue
        bold: true,
        align: "center"
      }
    },
    risks: {
      columns: [
        { key: "name", titleEN: "Risk Name", titleAR: "اسم المخاطر", widthPct: 15 },
        { key: "description", titleEN: "Risk Description", titleAR: "وصف المخاطر", widthPct: 25 },
        { key: "analysis", titleEN: "Risk Analysis", titleAR: "تحليل المخاطر", widthPct: 20 },
        { key: "likelihood", titleEN: "Likelihood", titleAR: "الاحتمالية", widthPct: 10 },
        { key: "impact", titleEN: "Impact", titleAR: "التأثير", widthPct: 10 },
        { key: "responsePlan", titleEN: "Response Plan", titleAR: "خطة المعالجة", widthPct: 20 }
      ]
    },
    timeline: {
      columns: [
        { key: "startDate", titleEN: "Start Date", titleAR: "تاريخ البدء", widthPct: 25 },
        { key: "endDate", titleEN: "End Date", titleAR: "تاريخ الانتهاء", widthPct: 25 },
        { key: "label", titleEN: "Label", titleAR: "المرحلة/الوصف", widthPct: 50 }
      ]
    },
    revisions: {
      columns: [
        { key: "version", titleEN: "Version", titleAR: "الإصدار", widthPct: 12 },
        { key: "change", titleEN: "Change", titleAR: "التغيير", widthPct: 44 },
        { key: "by", titleEN: "By", titleAR: "بواسطة", widthPct: 22 },
        { key: "date", titleEN: "Date of Change", titleAR: "تاريخ التغيير", widthPct: 22 }
      ]
    }
  },
  
  sectionOrder: [
    "titlePage",
    "projectDetails",
    "benefitsImpact",
    "riskAnalysis",
    "contractingApproach",
    "estimatedBudget",
    "timeline",
    "approvalDecision",
    "approvalSignoff",
    "revisionHistory",
    "attachments"
  ],
  
  sections: {
    titlePage: {
      show: true,
      layout: {
        titleCase: "upper",
        centerVertically: true,
        accentBar: {
          show: true,
          heightPt: 6,
          color: "#1F497D" // Office theme dark blue
        }
      },
      labels: {
        projectApproval: {
          en: "Project Approval Request",
          ar: "طلب اعتماد مشروع"
        },
        title: {
          en: "IT Network & Data Center Design Modernization",
          ar: "تحديث تصميم الشبكات ومراكز البيانات"
        }
      }
    },
    projectDetails: {
      titleEN: "Project Details",
      titleAR: "تفاصيل المشروع"
    },
    benefitsImpact: {
      titleEN: "Benefits & Impact Analysis",
      titleAR: "الفوائد والأثر"
    },
    riskAnalysis: {
      titleEN: "Risk Analysis",
      titleAR: "تحليل المخاطر"
    },
    contractingApproach: {
      titleEN: "Contracting Approach",
      titleAR: "نهج التعاقد"
    },
    estimatedBudget: {
      titleEN: "Estimated Budget",
      titleAR: "الميزانية التقديرية"
    },
    timeline: {
      titleEN: "High-level Timeline",
      titleAR: "الجدول الزمني العام"
    },
    approvalDecision: {
      titleEN: "Approval Decision",
      titleAR: "قرار الاعتماد"
    },
    approvalSignoff: {
      titleEN: "Approval Signoff",
      titleAR: "التوقيع على الاعتماد"
    },
    revisionHistory: {
      titleEN: "Revision History",
      titleAR: "سجل المراجعات"
    },
    attachments: {
      titleEN: "Attachments",
      titleAR: "المرفقات"
    }
  }
}

// Helper functions for theme application
export const getThemeColors = (locale: 'en' | 'ar') => {
  return {
    primary: parTheme.colors.primary,
    secondary: parTheme.colors.secondary,
    text: parTheme.colors.text,
    mutedText: parTheme.colors.mutedText,
    tableHeaderBg: parTheme.colors.tableHeaderBg,
    tableHeaderText: parTheme.colors.tableHeaderText,
    tableAltRowBg: parTheme.colors.tableAltRowBg,
    tableBorder: parTheme.colors.tableBorder,
  }
}

export const getTypography = (locale: 'en' | 'ar') => {
  const isRTL = locale === 'ar'
  return {
    base: isRTL ? parTheme.typography.baseAR : parTheme.typography.baseEN,
    headings: parTheme.typography.headings,
    paragraph: parTheme.typography.paragraph,
    lists: parTheme.typography.lists,
  }
}

export const getSectionTitle = (sectionKey: string, locale: 'en' | 'ar') => {
  const section = parTheme.sections[sectionKey as keyof typeof parTheme.sections]
  if (!section) return sectionKey
  
  // Handle different section structures
  if ('titleAR' in section && 'titleEN' in section) {
    return locale === 'ar' ? section.titleAR : section.titleEN
  }
  
  // Fallback to section key if no localized titles
  return sectionKey
}

export const getTableConfig = (tableType: 'risks' | 'timeline' | 'revisions', locale: 'en' | 'ar') => {
  const config = parTheme.tables[tableType]
  if (!config) return null
  
  return {
    ...config,
    columns: config.columns.map(col => ({
      ...col,
      title: locale === 'ar' ? col.titleAR : col.titleEN
    }))
  }
}

// Additional helper functions for HTML export
export const getThemeColorsForHtml = (locale: 'en' | 'ar' = 'en') => {
  return parTheme.colors
}

export const getTypographyForHtml = (locale: 'en' | 'ar' = 'en') => {
  return parTheme.typography
}

export const getSectionTitleForHtml = (section: string, locale: 'en' | 'ar' = 'en') => {
  const titles: Record<string, Record<string, string>> = {
    projectDetails: {
      en: 'Project Details',
      ar: 'تفاصيل المشروع'
    },
    benefitsImpact: {
      en: 'Benefits & Impact Analysis',
      ar: 'تحليل الفوائد والتأثير'
    },
    riskAnalysis: {
      en: 'Risk Analysis',
      ar: 'تحليل المخاطر'
    },
    contractingApproach: {
      en: 'Contracting Approach',
      ar: 'نهج التعاقد'
    },
    estimatedBudget: {
      en: 'Estimated Budget',
      ar: 'الميزانية المقدرة'
    },
    timeline: {
      en: 'High-level Timeline',
      ar: 'الجدول الزمني عالي المستوى'
    },
    approvalDecision: {
      en: 'Approval Decision',
      ar: 'قرار الموافقة'
    },
    approvalSignoff: {
      en: 'Approval Signoff',
      ar: 'توقيع الموافقة'
    },
    revisionHistory: {
      en: 'Revision History',
      ar: 'تاريخ المراجعات'
    },
    attachments: {
      en: 'Attachments',
      ar: 'المرفقات'
    }
  }
  
  return titles[section]?.[locale] || section
}
