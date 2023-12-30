import { decentralandNftApi } from '../config'

export interface WearablesResponse {
  data?: Wearable[]
}

export interface Wearable {
  name: string
  thumbnail: string
  url: string
}

const contractRegex = new RegExp(/^0x[a-fA-F0-9]{40}$/)

export const getAllWearableDetails = async (urns: string[]): Promise<Wearable[] | undefined> => {
  try {
    const results = await Promise.all(
      urns.map((urn) => {
        const urnParts = urn.split(':')
        const contractAddress = urnParts[urnParts.length - 3]
        const itemId = urnParts[urnParts.length - 2]

        if (contractAddress && itemId && contractRegex.test(contractAddress)) {
          return getWearableDetails(contractAddress, itemId)
        }
      })
    )
    // Filter out undefined results
    return results.filter((res) => res) as Wearable[]
  } catch {
    console.log('Failed to fetch all wearable details')
  }
}

export const getWearableDetails = async (contractAddress: string, itemId: string): Promise<Wearable | undefined> => {
  try {
    let response = await fetch(`${decentralandNftApi}/items?contractAddress=${contractAddress}&itemId=${itemId}`)
    const json: WearablesResponse = await response.json()
    return json?.data?.[0]
  } catch {
    console.log('Failed to fetch wearable details')
  }
}
