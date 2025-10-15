import { saveAs } from 'file-saver'
import { ParData } from '@/types/par'

export const exportJson = (data: ParData) => {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  
  const fileName = `Project-Approval-Request-${new Date().toISOString().split('T')[0]}.json`
  saveAs(blob, fileName)
}


