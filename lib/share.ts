import { ParData } from '@/types/par'

export const encodeShareData = (data: ParData): string => {
  const jsonString = JSON.stringify(data)
  return btoa(encodeURIComponent(jsonString))
}

export const decodeShareData = (encodedData: string): ParData | null => {
  try {
    const jsonString = decodeURIComponent(atob(encodedData))
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Failed to decode share data:', error)
    return null
  }
}

export const createShareUrl = (data: ParData, baseUrl: string = window.location.origin): string => {
  const encodedData = encodeShareData(data)
  return `${baseUrl}/share#data=${encodedData}`
}

export const getShareDataFromUrl = (): ParData | null => {
  if (typeof window === 'undefined') return null
  
  const hash = window.location.hash
  const match = hash.match(/data=([^&]+)/)
  
  if (match) {
    return decodeShareData(match[1])
  }
  
  return null
}

export const copyShareUrl = async (data: ParData): Promise<boolean> => {
  try {
    const shareUrl = createShareUrl(data)
    await navigator.clipboard.writeText(shareUrl)
    return true
  } catch (error) {
    console.error('Failed to copy share URL:', error)
    return false
  }
}


