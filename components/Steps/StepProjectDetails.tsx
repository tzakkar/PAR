'use client'

import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/lib/state'
import { formatDate } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SortableList } from '@/components/ui/sortable-list'
import { cn } from '@/lib/utils'

interface StepProjectDetailsProps {
  preview?: boolean
}

export function StepProjectDetails({ preview = false }: StepProjectDetailsProps) {
  const { t } = useTranslation('form')
  const { parData, updateParData } = useAppStore()

  const handleInputChange = (field: string, value: any) => {
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
        <div><strong>{t('projectName')}:</strong> {parData.projectName}</div>
        <div><strong>{t('programName')}:</strong> {parData.programName}</div>
        <div><strong>{t('projectDuration')}:</strong> {parData.projectDuration}</div>
        <div><strong>{t('expectedStart')}:</strong> {formatDate(parData.expectedStart)}</div>
        <div><strong>{t('priority')}:</strong> {parData.priority}</div>
        <div><strong>{t('background')}:</strong> {parData.background}</div>
        <div><strong>{t('abstract')}:</strong> {parData.abstract}</div>
        <div><strong>{t('problemStatement')}:</strong> {parData.problemStatement}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Basic Project Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t('projectName')} <span className="text-red-500">*</span>
          </label>
          <Input
            value={parData.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
            placeholder={t('projectNamePlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t('programName')} <span className="text-red-500">*</span>
          </label>
          <Input
            value={parData.programName}
            onChange={(e) => handleInputChange('programName', e.target.value)}
            placeholder={t('programNamePlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t('projectDuration')} <span className="text-red-500">*</span>
          </label>
          <Input
            value={parData.projectDuration}
            onChange={(e) => handleInputChange('projectDuration', e.target.value)}
            placeholder={t('projectDurationPlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t('expectedStart')} <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={parData.expectedStart}
            onChange={(e) => handleInputChange('expectedStart', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t('priority')} <span className="text-red-500">*</span>
          </label>
          <Select
            value={parData.priority}
            onValueChange={(value) => handleInputChange('priority', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('priority')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Strategic">{t('priorityStrategic')}</SelectItem>
              <SelectItem value="High">{t('priorityHigh')}</SelectItem>
              <SelectItem value="Medium">{t('priorityMedium')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Background */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {t('background')} <span className="text-red-500">*</span>
        </label>
        <Textarea
          value={parData.background}
          onChange={(e) => handleInputChange('background', e.target.value)}
          placeholder={t('backgroundPlaceholder')}
          rows={4}
        />
      </div>

      {/* Abstract */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {t('abstract')} <span className="text-red-500">*</span>
        </label>
        <Textarea
          value={parData.abstract || ''}
          onChange={(e) => handleInputChange('abstract', e.target.value)}
          placeholder="Provide a brief summary of the project for the cover page"
          rows={3}
        />
      </div>

      {/* Problem Statement */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {t('problemStatement')} <span className="text-red-500">*</span>
        </label>
        <Textarea
          value={parData.problemStatement}
          onChange={(e) => handleInputChange('problemStatement', e.target.value)}
          placeholder={t('problemStatementPlaceholder')}
          rows={4}
        />
      </div>

      {/* Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('objectives')}</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableList
            items={parData.objectives}
            onItemsChange={(items) => handleArrayChange('objectives', items)}
            placeholder={t('objectivesPlaceholder')}
            addButtonText={t('addObjective')}
            onAdd={() => handleArrayAdd('objectives')}
          />
        </CardContent>
      </Card>

      {/* In Scope */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('inScope')}</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableList
            items={parData.inScope}
            onItemsChange={(items) => handleArrayChange('inScope', items)}
            placeholder={t('inScopePlaceholder')}
            addButtonText={t('addInScope')}
            onAdd={() => handleArrayAdd('inScope')}
          />
        </CardContent>
      </Card>

      {/* Out of Scope */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('outOfScope')}</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableList
            items={parData.outOfScope}
            onItemsChange={(items) => handleArrayChange('outOfScope', items)}
            placeholder={t('outOfScopePlaceholder')}
            addButtonText={t('addOutOfScope')}
            onAdd={() => handleArrayAdd('outOfScope')}
          />
        </CardContent>
      </Card>
    </div>
  )
}
