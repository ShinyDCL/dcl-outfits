import { decentralandApi } from '../config'

export interface OutfitsResponse {
  metadata?: {
    outfits?: Outfit[]
  }
}

export interface Outfit {
  outfit?: {
    bodyShape: string
    wearables: string[]
    eyes: { color: { r: number; g: number; b: number; a: number } }
    hair: { color: { r: number; g: number; b: number; a: number } }
    skin: { color: { r: number; g: number; b: number; a: number } }
  }
}

export const getUserOutfits = async (address: string): Promise<Outfit[] | undefined> => {
  try {
    const response = await fetch(`${decentralandApi}/lambdas/outfits/${address}`)
    const json: OutfitsResponse = await response.json()
    return json?.metadata?.outfits
  } catch {
    console.log('Failed to fetch user outfits')
  }
}
