'use client'

import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/lib/state'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload, UploadedFile } from '@/components/ui/file-upload'
import { Plus, Trash2 } from 'lucide-react'
import { RevisionItem, AttachmentRef } from '@/types/par'

interface StepApprovalAttachProps {
  preview?: boolean
}

export function StepApprovalAttach({ preview = false }: StepApprovalAttachProps) {
  const { t } = useTranslation('form')
  const { parData, updateParData } = useAppStore()

  const handleInputChange = (field: string, value: string) => {
    updateParData({ [field]: value })
  }

  const handleSignoffChange = (field: string, value: string) => {
    const currentSignoff = parData.approvalSignoff || { approverName: '', role: '', signDate: '' }
    updateParData({ 
      approvalSignoff: { ...currentSignoff, [field]: value }
    })
  }

  const handleRevisionUpdate = (index: number, field: keyof RevisionItem, value: string) => {
    const newRevisions = [...parData.revisions]
    newRevisions[index] = { ...newRevisions[index], [field]: value }
    updateParData({ revisions: newRevisions })
  }

  const handleRevisionAdd = () => {
    const newRevision: RevisionItem = {
      version: '',
      change: '',
      by: '',
      changeDate: new Date().toISOString().split('T')[0],
    }
    updateParData({ revisions: [...parData.revisions, newRevision] })
  }

  const handleRevisionRemove = (index: number) => {
    const newRevisions = parData.revisions.filter((_, i) => i !== index)
    updateParData({ revisions: newRevisions })
  }

  const handleAttachmentUpdate = (index: number, field: keyof AttachmentRef, value: string) => {
    const newAttachments = [...parData.attachments]
    newAttachments[index] = { ...newAttachments[index], [field]: value }
    updateParData({ attachments: newAttachments })
  }

  const handleAttachmentFilesUpdate = (index: number, files: UploadedFile[]) => {
    const newAttachments = [...parData.attachments]
    newAttachments[index] = { ...newAttachments[index], files }
    updateParData({ attachments: newAttachments })
  }

  const handleAttachmentAdd = () => {
    const newAttachment: AttachmentRef = {
      title: '',
      note: '',
      files: [],
    }
    updateParData({ attachments: [...parData.attachments, newAttachment] })
  }

  const handleAttachmentRemove = (index: number) => {
    const newAttachments = parData.attachments.filter((_, i) => i !== index)
    updateParData({ attachments: newAttachments })
  }

  if (preview) {
    return (
      <div className="space-y-4 text-sm">
        {parData.approvalDecision && (
          <div>
            <strong>{t('approvalDecision')}:</strong> {parData.approvalDecision}
          </div>
        )}
        {parData.approvalSignoff && (
          <div>
            <strong>{t('approvalSignoff')}:</strong> {parData.approvalSignoff.approverName} ({parData.approvalSignoff.role})
          </div>
        )}
        <div>
          <strong>{t('revisions')}:</strong> {parData.revisions.length} items
        </div>
        <div>
          <strong>{t('attachments')}:</strong> {parData.attachments.length} items
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Approval Decision */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('approvalDecision')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('approvalDecision')}</label>
            <Textarea
              value={parData.approvalDecision || ''}
              onChange={(e) => handleInputChange('approvalDecision', e.target.value)}
              placeholder={t('approvalDecisionPlaceholder')}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Approval Signoff */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('approvalSignoff')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('approverName')}</label>
              <Input
                value={parData.approvalSignoff?.approverName || ''}
                onChange={(e) => handleSignoffChange('approverName', e.target.value)}
                placeholder={t('approverNamePlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('approverRole')}</label>
              <Input
                value={parData.approvalSignoff?.role || ''}
                onChange={(e) => handleSignoffChange('role', e.target.value)}
                placeholder={t('approverRolePlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('signDate')}</label>
              <Input
                type="date"
                value={parData.approvalSignoff?.signDate || ''}
                onChange={(e) => handleSignoffChange('signDate', e.target.value)}
                placeholder={t('signDatePlaceholder')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revision History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('revisions')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {parData.revisions.map((revision, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Revision {index + 1}</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRevisionRemove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('version')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={revision.version}
                    onChange={(e) => handleRevisionUpdate(index, 'version', e.target.value)}
                    placeholder={t('versionPlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('changeDate')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={revision.changeDate}
                    onChange={(e) => handleRevisionUpdate(index, 'changeDate', e.target.value)}
                    placeholder={t('changeDatePlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('changedBy')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={revision.by}
                    onChange={(e) => handleRevisionUpdate(index, 'by', e.target.value)}
                    placeholder={t('changedByPlaceholder')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('change')} <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={revision.change}
                  onChange={(e) => handleRevisionUpdate(index, 'change', e.target.value)}
                  placeholder={t('changePlaceholder')}
                  rows={3}
                />
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={handleRevisionAdd}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('addRevision')}
          </Button>
        </CardContent>
      </Card>

      {/* Attachments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('attachments')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {parData.attachments.map((attachment, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Attachment {index + 1}</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAttachmentRemove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('attachmentTitle')} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={attachment.title}
                    onChange={(e) => handleAttachmentUpdate(index, 'title', e.target.value)}
                    placeholder={t('attachmentTitlePlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('attachmentNote')}</label>
                  <Input
                    value={attachment.note || ''}
                    onChange={(e) => handleAttachmentUpdate(index, 'note', e.target.value)}
                    placeholder={t('attachmentNotePlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Files</label>
                  <FileUpload
                    files={attachment.files || []}
                    onFilesChange={(files) => handleAttachmentFilesUpdate(index, files)}
                    maxFiles={5}
                    maxSize={10 * 1024 * 1024} // 10MB
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={handleAttachmentAdd}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('addAttachment')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
