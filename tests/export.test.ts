import { describe, it, expect, vi } from 'vitest'
import { exportJson } from '@/lib/exportJson'
import { encodeShareData, decodeShareData } from '@/lib/share'
import { defaultParData } from '@/lib/schema'

// Mock file-saver
vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}))

describe('Export Functions', () => {
  describe('exportJson', () => {
    it('should call saveAs with correct data', () => {
      const { saveAs } = require('file-saver')
      
      exportJson(defaultParData)
      
      expect(saveAs).toHaveBeenCalledWith(
        expect.any(Blob),
        expect.stringMatching(/Project-Approval-Request-\d{4}-\d{2}-\d{2}\.json/)
      )
    })

    it('should create blob with correct content type', () => {
      const { saveAs } = require('file-saver')
      
      exportJson(defaultParData)
      
      const blob = saveAs.mock.calls[0][0]
      expect(blob.type).toBe('application/json')
    })
  })

  describe('Share Functions', () => {
    it('should encode and decode data correctly', () => {
      const encoded = encodeShareData(defaultParData)
      const decoded = decodeShareData(encoded)
      
      expect(decoded).toEqual(defaultParData)
    })

    it('should handle invalid encoded data gracefully', () => {
      const invalidEncoded = 'invalid-base64-data'
      const result = decodeShareData(invalidEncoded)
      
      expect(result).toBeNull()
    })

    it('should handle empty encoded data gracefully', () => {
      const result = decodeShareData('')
      
      expect(result).toBeNull()
    })
  })
})

