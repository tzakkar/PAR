'use client'

import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/lib/state'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Trash2 } from 'lucide-react'
import { TimelineItem, BudgetYear, ApprovedBudgetEntry } from '@/types/par'
import { v4 as uuidv4 } from 'uuid'

interface StepBudgetTimelineProps {
  preview?: boolean
}

export function StepBudgetTimeline({ preview = false }: StepBudgetTimelineProps) {
  const { t } = useTranslation('form')
  const { parData, updateParData } = useAppStore()

  const handleInputChange = (field: string, value: string) => {
    updateParData({ [field]: value })
  }

  const handleTimelineUpdate = (index: number, field: keyof TimelineItem, value: string) => {
    const newTimeline = [...parData.timeline]
    newTimeline[index] = { ...newTimeline[index], [field]: value }
    updateParData({ timeline: newTimeline })
  }

  const handleTimelineAdd = () => {
    const newTimelineItem: TimelineItem = {
      startDate: '',
      endDate: '',
      label: '',
    }
    updateParData({ timeline: [...parData.timeline, newTimelineItem] })
  }

  const handleTimelineRemove = (index: number) => {
    const newTimeline = parData.timeline.filter((_, i) => i !== index)
    updateParData({ timeline: newTimeline })
  }

  // Budget management functions
  const handleBudgetYearUpdate = (index: number, field: keyof BudgetYear, value: string) => {
    const currentBudgetYears = parData.budgetYears || []
    const newBudgetYears = [...currentBudgetYears]
    newBudgetYears[index] = { ...newBudgetYears[index], [field]: value }
    updateParData({ budgetYears: newBudgetYears })
  }

  const handleBudgetYearAdd = () => {
    const currentYear = new Date().getFullYear()
    const currentBudgetYears = parData.budgetYears || []
    const newYear = (currentYear + currentBudgetYears.length).toString()
    const newBudgetYear: BudgetYear = {
      year: newYear,
      amount: '',
      description: ''
    }
    updateParData({ budgetYears: [...currentBudgetYears, newBudgetYear] })
  }

  const handleBudgetYearRemove = (index: number) => {
    const currentBudgetYears = parData.budgetYears || []
    const newBudgetYears = currentBudgetYears.filter((_, i) => i !== index)
    updateParData({ budgetYears: newBudgetYears })
  }

  const handleApprovedBudgetUpdate = (index: number, field: keyof ApprovedBudgetEntry, value: string) => {
    const currentApprovedEntries = parData.approvedBudgetEntries || []
    const newApprovedEntries = [...currentApprovedEntries]
    newApprovedEntries[index] = { ...newApprovedEntries[index], [field]: value }
    updateParData({ approvedBudgetEntries: newApprovedEntries })
  }

  const handleApprovedBudgetAdd = () => {
    const currentApprovedEntries = parData.approvedBudgetEntries || []
    const newEntry: ApprovedBudgetEntry = {
      id: uuidv4(),
      year: new Date().getFullYear().toString(),
      amount: '',
      type: 'CAPEX',
      description: ''
    }
    updateParData({ approvedBudgetEntries: [...currentApprovedEntries, newEntry] })
  }

  const handleApprovedBudgetRemove = (index: number) => {
    const currentApprovedEntries = parData.approvedBudgetEntries || []
    const newApprovedEntries = currentApprovedEntries.filter((_, i) => i !== index)
    updateParData({ approvedBudgetEntries: newApprovedEntries })
  }

  if (preview) {
    return (
      <div className="space-y-4 text-sm">
        <div>
          <strong>{t('estimatedBudget')}:</strong> {parData.estimatedBudget}
        </div>
        
        {parData.approvedBudgetAtBoard && (
          <div>
            <strong>{t('approvedBudgetAtBoard')}:</strong> {parData.approvedBudgetAtBoard}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left text-xs">{t('startDate')}</th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs">{t('endDate')}</th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs">{t('label')}</th>
              </tr>
            </thead>
            <tbody>
              {parData.timeline.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1 text-xs">{item.startDate}</td>
                  <td className="border border-gray-300 px-2 py-1 text-xs">{item.endDate}</td>
                  <td className="border border-gray-300 px-2 py-1 text-xs">{item.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Budget Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('estimatedBudget')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('estimatedBudget')} <span className="text-red-500">*</span>
            </label>
            <Input
              value={parData.estimatedBudget}
              onChange={(e) => handleInputChange('estimatedBudget', e.target.value)}
              placeholder={t('estimatedBudgetPlaceholder')}
            />
          </div>

          {/* TODO: Add enhanced budget features */}

          {/* Legacy Approved Budget Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('approvedBudgetAtBoard')}</label>
            <Input
              value={parData.approvedBudgetAtBoard || ''}
              onChange={(e) => handleInputChange('approvedBudgetAtBoard', e.target.value)}
              placeholder={t('approvedBudgetAtBoardPlaceholder')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Timeline Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('timeline')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {parData.timeline.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Timeline Item {index + 1}</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTimelineRemove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('startDate')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={item.startDate}
                    onChange={(e) => handleTimelineUpdate(index, 'startDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('endDate')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={item.endDate}
                    onChange={(e) => handleTimelineUpdate(index, 'endDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('label')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={item.label}
                    onChange={(e) => handleTimelineUpdate(index, 'label', e.target.value)}
                    placeholder={t('labelPlaceholder')}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={handleTimelineAdd}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('addTimelineItem')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
