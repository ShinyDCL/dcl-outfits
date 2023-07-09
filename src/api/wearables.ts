import { wearablesApiUrl } from '../resources'
import { NFTData } from '../utils'

export interface WearablesResponse {
  data?: Wearable[]
}

export interface Wearable {
  name: string
  thumbnail: string
  url: string
}

export const getAllWearableDetails = async (data: NFTData[]): Promise<Wearable[] | undefined> => {
  try {
    const results = await Promise.all(data.map((item) => getWearableDetails(item)))
    return results.filter((res) => res) as Wearable[]
  } catch {
    console.log('Failed to fetch all wearable details')
  }
}

export const getWearableDetails = async ({ contractAddress, itemId }: NFTData): Promise<Wearable | undefined> => {
  try {
    let response = await fetch(`${wearablesApiUrl}?contractAddress=${contractAddress}&itemId=${itemId}`)
    const json: WearablesResponse = await response.json()
    return json?.data?.[0]
  } catch {
    console.log('Failed to fetch wearable details')
  }
}
