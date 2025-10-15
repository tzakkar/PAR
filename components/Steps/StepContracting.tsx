'use client'

import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/lib/state'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SortableList } from '@/components/ui/sortable-list'

interface StepContractingProps {
  preview?: boolean
}

export function StepContracting({ preview = false }: StepContractingProps) {
  const { t } = useTranslation('form')
  const { parData, updateParData } = useAppStore()

  const handleInputChange = (field: string, value: string) => {
    updateParData({ [field]: value })
  }

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
          <strong>{t('governanceAlignment')}:</strong>
          <ul className="list-disc pl-4 mt-1">
            {parData.governanceAlignment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>{t('marketResearch')}:</strong>
          <ul className="list-disc pl-4 mt-1">
            {parData.marketResearch.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>{t('finalSelection')}:</strong> {parData.finalSelection}
        </div>
        {parData.contractingNotes && (
          <div>
            <strong>{t('contractingNotes')}:</strong> {parData.contractingNotes}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Governance Alignment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('governanceAlignment')}</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableList
            items={parData.governanceAlignment}
            onItemsChange={(items) => handleArrayChange('governanceAlignment', items)}
            placeholder={t('governanceAlignmentPlaceholder')}
            addButtonText={t('addGovernanceAlignment')}
            onAdd={() => handleArrayAdd('governanceAlignment')}
          />
        </CardContent>
      </Card>

      {/* Market Research */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('marketResearch')}</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableList
            items={parData.marketResearch}
            onItemsChange={(items) => handleArrayChange('marketResearch', items)}
            placeholder={t('marketResearchPlaceholder')}
            addButtonText={t('addMarketResearch')}
            onAdd={() => handleArrayAdd('marketResearch')}
          />
        </CardContent>
      </Card>

      {/* Final Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {t('finalSelection')} <span className="text-red-500">*</span>
        </label>
        <Textarea
          value={parData.finalSelection}
          onChange={(e) => handleInputChange('finalSelection', e.target.value)}
          placeholder={t('finalSelectionPlaceholder')}
          rows={4}
        />
      </div>

      {/* Contracting Notes */}
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('contractingNotes')}</label>
        <Textarea
          value={parData.contractingNotes || ''}
          onChange={(e) => handleInputChange('contractingNotes', e.target.value)}
          placeholder={t('contractingNotesPlaceholder')}
          rows={3}
        />
      </div>
    </div>
  )
}
