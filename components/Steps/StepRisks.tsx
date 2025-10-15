'use client'

import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/lib/state'
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
import { Plus, Trash2 } from 'lucide-react'
import { RiskItem } from '@/types/par'

interface StepRisksProps {
  preview?: boolean
}

export function StepRisks({ preview = false }: StepRisksProps) {
  const { t } = useTranslation('form')
  const { parData, updateParData } = useAppStore()

  const handleRiskUpdate = (index: number, field: keyof RiskItem, value: string) => {
    const newRisks = [...parData.risks]
    newRisks[index] = { ...newRisks[index], [field]: value }
    updateParData({ risks: newRisks })
  }

  const handleRiskAdd = () => {
    const newRisk: RiskItem = {
      name: '',
      description: '',
      analysis: '',
      likelihood: 'Medium',
      impact: 'Medium',
      responsePlan: '',
    }
    updateParData({ risks: [...parData.risks, newRisk] })
  }

  const handleRiskRemove = (index: number) => {
    const newRisks = parData.risks.filter((_, i) => i !== index)
    updateParData({ risks: newRisks })
  }

  if (preview) {
    return (
      <div className="space-y-4 text-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left text-xs">{t('riskName')}</th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs">{t('likelihood')}</th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs">{t('impact')}</th>
              </tr>
            </thead>
            <tbody>
              {parData.risks.map((risk, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1 text-xs">{risk.name}</td>
                  <td className="border border-gray-300 px-2 py-1 text-xs">{risk.likelihood}</td>
                  <td className="border border-gray-300 px-2 py-1 text-xs">{risk.impact}</td>
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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('risks')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {parData.risks.map((risk, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Risk {index + 1}</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRiskRemove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('riskName')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={risk.name}
                    onChange={(e) => handleRiskUpdate(index, 'name', e.target.value)}
                    placeholder={t('riskNamePlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('likelihood')} <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={risk.likelihood}
                    onValueChange={(value) => handleRiskUpdate(index, 'likelihood', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">{t('likelihoodLow')}</SelectItem>
                      <SelectItem value="Medium">{t('likelihoodMedium')}</SelectItem>
                      <SelectItem value="High">{t('likelihoodHigh')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('impact')} <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={risk.impact}
                    onValueChange={(value) => handleRiskUpdate(index, 'impact', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">{t('impactLow')}</SelectItem>
                      <SelectItem value="Medium">{t('impactMedium')}</SelectItem>
                      <SelectItem value="High">{t('impactHigh')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('riskDescription')} <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={risk.description}
                  onChange={(e) => handleRiskUpdate(index, 'description', e.target.value)}
                  placeholder={t('riskDescriptionPlaceholder')}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('riskAnalysis')} <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={risk.analysis}
                  onChange={(e) => handleRiskUpdate(index, 'analysis', e.target.value)}
                  placeholder={t('riskAnalysisPlaceholder')}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('responsePlan')} <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={risk.responsePlan}
                  onChange={(e) => handleRiskUpdate(index, 'responsePlan', e.target.value)}
                  placeholder={t('responsePlanPlaceholder')}
                  rows={3}
                />
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={handleRiskAdd}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('addRisk')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

