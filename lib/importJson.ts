import { ParDataSchema, ParData } from './schema'

export const importJson = (file: File): Promise<ParData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      try {
        const jsonString = event.target?.result as string
        const data = JSON.parse(jsonString)
        
        // Validate the data against our schema
        const validatedData = ParDataSchema.parse(data)
        resolve(validatedData)
      } catch (error) {
        reject(new Error('Invalid JSON file or data structure'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsText(file)
  })
}

export const validateJsonData = (data: any): { isValid: boolean; errors: string[] } => {
  try {
    ParDataSchema.parse(data)
    return { isValid: true, errors: [] }
  } catch (error: any) {
    const errors = error.errors?.map((err: any) => 
      `${err.path.join('.')}: ${err.message}`
    ) || ['Invalid data structure']
    
    return { isValid: false, errors }
  }
}


