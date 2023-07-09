export interface NFTData {
  contractAddress: string
  itemId: string
}

export const parseURNs = (urns: string[]): NFTData[] => {
  const data: NFTData[] = []
  urns.forEach((urn) => {
    const regex = new RegExp(/^0x[a-fA-F0-9]{40}$/)
    const urnParts = urn.split(':')
    const contractAddress = urnParts[urnParts.length - 2]
    const itemId = urnParts[urnParts.length - 1]

    if (contractAddress && itemId && regex.test(contractAddress)) {
      data.push({ contractAddress, itemId })
    }
  })
  return data
}
