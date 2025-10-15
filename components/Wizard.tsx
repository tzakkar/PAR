'use client'

import { useTranslation } from 'react-i18next'
import { useAppStore, getStepIndex, getTotalSteps } from '@/lib/state'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Import step components
import { StepProjectDetails } from './Steps/StepProjectDetails'
import { StepBenefitsImpact } from './Steps/StepBenefitsImpact'
import { StepRisks } from './Steps/StepRisks'
import { StepContracting } from './Steps/StepContracting'
import { StepBudgetTimeline } from './Steps/StepBudgetTimeline'
import { StepApprovalAttach } from './Steps/StepApprovalAttach'

const stepComponents = {
  'project-details': StepProjectDetails,
  'benefits-impact': StepBenefitsImpact,
  'risks': StepRisks,
  'contracting': StepContracting,
  'budget-timeline': StepBudgetTimeline,
  'approval-attachments': StepApprovalAttach,
}

export function Wizard() {
  const { t } = useTranslation(['common', 'form'])
  const { 
    currentStep, 
    setCurrentStep, 
    isPreviewMode, 
    togglePreviewMode 
  } = useAppStore()

  const currentStepIndex = getStepIndex(currentStep)
  const totalSteps = getTotalSteps()
  const progress = ((currentStepIndex + 1) / totalSteps) * 100

  const stepTitles = {
    'project-details': t('form:projectDetails'),
    'benefits-impact': t('form:benefitsImpact'),
    'risks': t('form:riskAnalysis'),
    'contracting': t('form:contractingApproach'),
    'budget-timeline': t('form:budgetTimeline'),
    'approval-attachments': t('form:approvalAttachments'),
  }

  const handleNext = () => {
    const steps = Object.keys(stepComponents) as Array<keyof typeof stepComponents>
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const steps = Object.keys(stepComponents) as Array<keyof typeof stepComponents>
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const CurrentStepComponent = stepComponents[currentStep]

  return (
    <div className="container mx-auto py-6">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{t('createPar')}</h1>
            <p className="text-muted-foreground">
              {t('step')} {currentStepIndex + 1} {t('of')} {totalSteps}: {stepTitles[currentStep]}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={togglePreviewMode}
            className="flex items-center space-x-2"
          >
            <span>{isPreviewMode ? t('edit') : t('preview')}</span>
          </Button>
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Navigation */}
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-2">
          {Object.keys(stepComponents).map((step, index) => (
            <div key={step} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step as any)}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  index === currentStepIndex
                    ? "bg-primary text-primary-foreground"
                    : index < currentStepIndex
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </button>
              {index < Object.keys(stepComponents).length - 1 && (
                <div className="w-8 h-0.5 bg-muted mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{stepTitles[currentStep]}</CardTitle>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent />
          </CardContent>
        </Card>

        {/* Preview (on larger screens) */}
        {isPreviewMode && (
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>{t('preview')}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {/* Mini preview of current step */}
                  <div className="p-4 text-sm">
                    <CurrentStepComponent preview />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>{t('previous')}</span>
        </Button>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={togglePreviewMode}
          >
            {isPreviewMode ? t('edit') : t('preview')}
          </Button>
        </div>

        <Button
          onClick={handleNext}
          disabled={currentStepIndex === totalSteps - 1}
          className="flex items-center space-x-2"
        >
          <span>{t('next')}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

