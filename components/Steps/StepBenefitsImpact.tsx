'use client'

import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/lib/state'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SortableList } from '@/components/ui/sortable-list'

interface StepBenefitsImpactProps {
  preview?: boolean
}

export function StepBenefitsImpact({ preview = false }: StepBenefitsImpactProps) {
  const { t } = useTranslation('form')
  const { parData, updateParData } = useAppStore()

  const handleArrayAdd = (field: string) => {
    const currentArray = parData[field as keyof typeof parData] as string[]
    updateParData({ [field]: [...currentArray, ''] })
  }

  const handleArrayChange = (field: string, items: string[]) => {
    updateParData({ [field]: items })
  }

  if (preview) {
    return (
      <div className="space-y-4 text-sm">
        <div>
          <strong>{t('operationalBenefits')}:</strong>
          <ul className="list-disc pl-4 mt-1">
            {parData.operationalBenefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>{t('financialImpact')}:</strong>
          <ul className="list-disc pl-4 mt-1">
            {parData.financialImpact.map((impact, index) => (
              <li key={index}>{impact}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>{t('digitalAlignment')}:</strong>
          <ul className="list-disc pl-4 mt-1">
            {parData.digitalAlignment.map((alignment, index) => (
              <li key={index}>{alignment}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Operational Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('operationalBenefits')}</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableList
            items={parData.operationalBenefits}
            onItemsChange={(items) => handleArrayChange('operationalBenefits', items)}
            placeholder={t('operationalBenefitsPlaceholder')}
            addButtonText={t('addOperationalBenefit')}
            onAdd={() => handleArrayAdd('operationalBenefits')}
          />
        </CardContent>
      </Card>

      {/* Financial Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('financialImpact')}</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableList
            items={parData.financialImpact}
            onItemsChange={(items) => handleArrayChange('financialImpact', items)}
            placeholder={t('financialImpactPlaceholder')}
            addButtonText={t('addFinancialImpact')}
            onAdd={() => handleArrayAdd('financialImpact')}
          />
        </CardContent>
      </Card>

      {/* Digital Alignment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('digitalAlignment')}</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableList
            items={parData.digitalAlignment}
            onItemsChange={(items) => handleArrayChange('digitalAlignment', items)}
            placeholder={t('digitalAlignmentPlaceholder')}
            addButtonText={t('addDigitalAlignment')}
            onAdd={() => handleArrayAdd('digitalAlignment')}
          />
        </CardContent>
      </Card>
    </div>
  )
}
