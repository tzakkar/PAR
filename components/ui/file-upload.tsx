'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './button'
import { Input } from './input'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Upload, File, Image, X, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string // Data URL for preview
  file?: File // Optional File object
}

interface FileUploadProps {
  files: UploadedFile[]
  onFilesChange: (files: UploadedFile[]) => void
  accept?: string
  maxFiles?: number
  maxSize?: number // in bytes
  className?: string
}

export function FileUpload({
  files,
  onFilesChange,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif',
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        file,
      }))

      onFilesChange([...files, ...newFiles].slice(0, maxFiles))
    },
    [files, onFilesChange, maxFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    maxSize,
    maxFiles: maxFiles - files.length,
  })

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id)
    onFilesChange(updatedFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image className="h-4 w-4" />
    }
    return <File className="h-4 w-4" />
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50',
          files.length >= maxFiles && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-1">
          {isDragActive
            ? 'Drop files here...'
            : 'Drag & drop files here, or click to select'}
        </p>
        <p className="text-xs text-muted-foreground">
          Supports: PDF, DOC, DOCX, JPG, PNG, GIF (max {formatFileSize(maxSize)} each)
        </p>
        {files.length >= maxFiles && (
          <p className="text-xs text-destructive mt-1">
            Maximum {maxFiles} files allowed
          </p>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Uploaded Files ({files.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {file.type.startsWith('image/') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <Image className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = file.url
                      link.download = file.name
                      link.click()
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
