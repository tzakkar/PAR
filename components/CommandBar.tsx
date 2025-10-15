'use client'

import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/lib/state'
import { Button } from '@/components/ui/button'
import { 
  Save, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  Share2, 
  FileText, 
  FileJson,
  Plus,
  AlertTriangle,
  Printer,
  Globe
} from 'lucide-react'
import { exportDocx } from '@/lib/exportDocx'
import { exportJson } from '@/lib/exportJson'
import { importJson } from '@/lib/importJson'
import { copyShareUrl } from '@/lib/share'
import { downloadHtml, printHtml } from '@/lib/exportHtml'
import { cn } from '@/lib/utils'

export function CommandBar() {
  const { t } = useTranslation('common')
  const { 
    parData, 
    saveDraft, 
    clearDraft, 
    resetParData, 
    hasUnsavedChanges,
    setHasUnsavedChanges 
  } = useAppStore()
  
  const [isLoading, setIsLoading] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSaveDraft = () => {
    saveDraft()
  }

  const handleClear = () => {
    if (showClearConfirm) {
      resetParData()
      clearDraft()
      setShowClearConfirm(false)
    } else {
      setShowClearConfirm(true)
      setTimeout(() => setShowClearConfirm(false), 3000)
    }
  }

  const handleExportDocx = async () => {
    setIsLoading(true)
    try {
      await exportDocx(parData)
    } catch (error) {
      console.error('Failed to export DOCX:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportHtml = () => {
    try {
      downloadHtml(parData)
    } catch (error) {
      console.error('Failed to export HTML:', error)
    }
  }

  const handlePrintHtml = () => {
    try {
      printHtml(parData)
    } catch (error) {
      console.error('Failed to print HTML:', error)
    }
  }

  const handleExportJson = () => {
    try {
      exportJson(parData)
    } catch (error) {
      console.error('Failed to export JSON:', error)
    }
  }

  const handleImportJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    try {
      const importedData = await importJson(file)
      // Update the store with imported data
      useAppStore.getState().updateParData(importedData)
      setHasUnsavedChanges(true)
    } catch (error) {
      console.error('Failed to import JSON:', error)
      alert(t('corruptedFile'))
    } finally {
      setIsLoading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleShare = async () => {
    try {
      const success = await copyShareUrl(parData)
      if (success) {
        // Show success message (you could use a toast here)
        console.log(t('linkCopied'))
      }
    } catch (error) {
      console.error('Failed to copy share URL:', error)
    }
  }

  const handleNewPar = () => {
    if (hasUnsavedChanges) {
      if (confirm(t('unsavedChanges'))) {
        resetParData()
        clearDraft()
      }
    } else {
      resetParData()
      clearDraft()
    }
  }

  return (
    <div className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Left side - Primary actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewPar}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{t('newPar')}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={!hasUnsavedChanges}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">{t('saveDraft')}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className={cn(
              "flex items-center space-x-2",
              showClearConfirm && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            )}
          >
            {showClearConfirm ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {showClearConfirm ? t('confirm') : t('clear')}
            </span>
          </Button>
        </div>

        {/* Right side - Export/Import actions */}
        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportJson}
            className="hidden"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">{t('importJson')}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJson}
            className="flex items-center space-x-2"
          >
            <FileJson className="h-4 w-4" />
            <span className="hidden sm:inline">{t('exportJson')}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportDocx}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">{t('exportDocx')}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportHtml}
            className="flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Export HTML</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrintHtml}
            className="flex items-center space-x-2"
          >
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex items-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">{t('share')}</span>
          </Button>
        </div>
      </div>

      {/* Unsaved changes indicator */}
      {hasUnsavedChanges && (
        <div className="border-t bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2">
          <div className="container flex items-center justify-center">
            <div className="flex items-center space-x-2 text-sm text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="h-4 w-4" />
              <span>{t('unsavedChanges')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
