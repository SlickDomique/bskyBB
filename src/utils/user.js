import { getAuthorizedAgent } from '@/lib/api'

export const getUserInfo = async (dids) => {
  const agent = await getAuthorizedAgent()

  const userData = await agent.getProfiles({
    actors: dids,
  })

  return userData
}
