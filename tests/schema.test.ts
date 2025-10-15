import { describe, it, expect } from 'vitest'
import { ParDataSchema, defaultParData } from '@/lib/schema'

describe('ParDataSchema', () => {
  it('should validate default data', () => {
    const result = ParDataSchema.safeParse(defaultParData)
    expect(result.success).toBe(true)
  })

  it('should require project name', () => {
    const invalidData = { ...defaultParData, projectName: '' }
    const result = ParDataSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('required')
    }
  })

  it('should require at least one objective', () => {
    const invalidData = { ...defaultParData, objectives: [] }
    const result = ParDataSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('At least one objective is required')
    }
  })

  it('should require at least one risk', () => {
    const invalidData = { ...defaultParData, risks: [] }
    const result = ParDataSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('At least one risk is required')
    }
  })

  it('should validate risk likelihood values', () => {
    const invalidData = {
      ...defaultParData,
      risks: [{ ...defaultParData.risks[0], likelihood: 'Invalid' as any }]
    }
    const result = ParDataSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should validate risk impact values', () => {
    const invalidData = {
      ...defaultParData,
      risks: [{ ...defaultParData.risks[0], impact: 'Invalid' as any }]
    }
    const result = ParDataSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should validate priority values', () => {
    const invalidData = { ...defaultParData, priority: 'Invalid' as any }
    const result = ParDataSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should allow optional fields to be undefined', () => {
    const dataWithOptionalFields = {
      ...defaultParData,
      contractingNotes: undefined,
      approvedBudgetAtBoard: undefined,
      approvalDecision: undefined,
      approvalSignoff: undefined,
    }
    const result = ParDataSchema.safeParse(dataWithOptionalFields)
    expect(result.success).toBe(true)
  })
})

