'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/state'
import { CommandBar } from '@/components/CommandBar'
import { Wizard } from '@/components/Wizard'
import { DocumentPreview } from '@/components/DocumentPreview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'

export default function BuilderPage() {
  const { t } = useTranslation('common')
  const { parData, isPreviewMode, loadDraft } = useAppStore()

  // Load draft on component mount
  useEffect(() => {
    loadDraft()
  }, [loadDraft])

  return (
    <div className="min-h-screen bg-background">
      <CommandBar />
      
      <div className="container mx-auto py-6">
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="form">{t('createPar')}</TabsTrigger>
            <TabsTrigger value="preview">{t('preview')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="mt-0">
            <Wizard />
          </TabsContent>
          
          <TabsContent value="preview" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{t('preview')}</h1>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    {t('print')}
                  </button>
                </div>
              </div>
              
              <DocumentPreview data={parData} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

