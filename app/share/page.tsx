'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DocumentPreview } from '@/components/DocumentPreview'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getShareDataFromUrl } from '@/lib/share'
import { exportDocx } from '@/lib/exportDocx'
import { exportJson } from '@/lib/exportJson'
import { ParData } from '@/types/par'
import { FileText, FileJson, Printer, AlertTriangle } from 'lucide-react'

export default function SharePage() {
  const { t } = useTranslation('common')
  const [parData, setParData] = useState<ParData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const data = getShareDataFromUrl()
      if (data) {
        setParData(data)
      } else {
        setError('No valid data found in the share link')
      }
    } catch (err) {
      setError('Failed to load shared data')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleExportDocx = async () => {
    if (!parData) return
    try {
      await exportDocx(parData)
    } catch (error) {
      console.error('Failed to export DOCX:', error)
    }
  }

  const handleExportJson = () => {
    if (!parData) return
    try {
      exportJson(parData)
    } catch (error) {
      console.error('Failed to export JSON:', error)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    )
  }

  if (error || !parData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>{t('error')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                {error || 'Invalid share link'}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('shared')} PAR</h1>
          <p className="text-muted-foreground">
            This is a read-only view of a shared Project Approval Request
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Button onClick={handleExportDocx} className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>{t('exportDocx')}</span>
          </Button>
          
          <Button onClick={handleExportJson} variant="outline" className="flex items-center space-x-2">
            <FileJson className="h-4 w-4" />
            <span>{t('exportJson')}</span>
          </Button>
          
          <Button onClick={handlePrint} variant="outline" className="flex items-center space-x-2">
            <Printer className="h-4 w-4" />
            <span>{t('print')}</span>
          </Button>
        </div>

        {/* Document Preview */}
        <DocumentPreview data={parData} />
      </div>
    </div>
  )
}
