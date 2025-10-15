import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ParData, WizardStep } from '@/types/par'
import { defaultParData } from './schema'

interface AppState {
  // Current wizard step
  currentStep: WizardStep
  setCurrentStep: (step: WizardStep) => void
  
  // PAR data
  parData: ParData
  updateParData: (data: Partial<ParData>) => void
  resetParData: () => void
  initializeParData: () => void
  
  // UI state
  isDarkMode: boolean
  toggleDarkMode: () => void
  
  // Language
  language: 'en' | 'ar'
  setLanguage: (lang: 'en' | 'ar') => void
  
  // Preview mode
  isPreviewMode: boolean
  togglePreviewMode: () => void
  
  // Draft management
  saveDraft: () => void
  loadDraft: () => void
  clearDraft: () => void
  hasUnsavedChanges: boolean
  setHasUnsavedChanges: (hasChanges: boolean) => void
}

const wizardSteps: WizardStep[] = [
  'project-details',
  'benefits-impact',
  'risks',
  'contracting',
  'budget-timeline',
  'approval-attachments',
]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Current wizard step
      currentStep: 'project-details',
      setCurrentStep: (step) => set({ currentStep: step }),
      
      // PAR data
      parData: defaultParData,
      updateParData: (data) => {
        set((state) => ({
          parData: { ...state.parData, ...data },
          hasUnsavedChanges: true,
        }))
      },
      // Initialize parData with default values if missing
      initializeParData: () => {
        set((state) => ({
          parData: { ...defaultParData, ...state.parData },
        }))
      },
      resetParData: () => set({ parData: defaultParData, hasUnsavedChanges: false }),
      
      // UI state
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      // Language
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      
      // Preview mode
      isPreviewMode: false,
      togglePreviewMode: () => set((state) => ({ isPreviewMode: !state.isPreviewMode })),
      
      // Draft management
      saveDraft: () => {
        const { parData } = get()
        localStorage.setItem('par-draft', JSON.stringify(parData))
        set({ hasUnsavedChanges: false })
      },
      loadDraft: () => {
        const draft = localStorage.getItem('par-draft')
        if (draft) {
          try {
            const parsedDraft = JSON.parse(draft)
            set({ parData: parsedDraft, hasUnsavedChanges: false })
          } catch (error) {
            console.error('Failed to load draft:', error)
          }
        }
      },
      clearDraft: () => {
        localStorage.removeItem('par-draft')
        set({ hasUnsavedChanges: false })
      },
      hasUnsavedChanges: false,
      setHasUnsavedChanges: (hasChanges) => set({ hasUnsavedChanges: hasChanges }),
    }),
    {
      name: 'par-builder-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        language: state.language,
        parData: state.parData,
      }),
    }
  )
)

// Helper functions for navigation
export const getNextStep = (currentStep: WizardStep): WizardStep | null => {
  const currentIndex = wizardSteps.indexOf(currentStep)
  return currentIndex < wizardSteps.length - 1 ? wizardSteps[currentIndex + 1] : null
}

export const getPreviousStep = (currentStep: WizardStep): WizardStep | null => {
  const currentIndex = wizardSteps.indexOf(currentStep)
  return currentIndex > 0 ? wizardSteps[currentIndex - 1] : null
}

export const getStepIndex = (step: WizardStep): number => {
  return wizardSteps.indexOf(step)
}

export const getTotalSteps = (): number => {
  return wizardSteps.length
}

