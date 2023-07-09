import { decentralandApi } from '../config'

export interface UserProfileResponse {
  avatars?: UserProfile[]
}

export interface UserProfile {
  userId: string
  name: string
}

export const getUserProfile = async (address: string): Promise<UserProfile | undefined> => {
  try {
    const res = await fetch(`${decentralandApi}/lambdas/profiles`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ ids: [address] })
    })

    const json: UserProfileResponse[] = await res.json()
    return json?.[0]?.avatars?.[0]
  } catch {
    console.log('Failed to get user profile')
  }
}
