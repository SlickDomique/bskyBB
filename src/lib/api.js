import router from '@/router'
import { AtpAgent } from '@atproto/api'

export let agent

export const defautService = 'https://bsky.social/'

export const setService = (service) => {
  localStorage.setItem('service', service)
}

export const getService = () => {
  return localStorage.getItem('service') || defautService
}

export const fetchService = async (identifier) => {
  try {
    const bskyProfile = await fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${identifier}`,
    )
    const bskyDid = (await bskyProfile.json()).did
    const resolvedPlc = await fetch(`https://plc.directory/${bskyDid}`)
    const plcData = await resolvedPlc.json()
    return plcData.service[0].serviceEndpoint
  } catch (error) {
    console.error(error)
    return false
  }
}

export const recreateAgentForService = (service) => {
  setService(service)
  agent = new AtpAgent({
    service: getService(),
    // eslint-disable-next-line no-unused-vars
    persistSession: (evt, sess) => {
      if (evt === 'create' || evt === 'update') {
        localStorage.setItem('session', JSON.stringify(sess))
      }
    },
  })
}

export const getAuthorizedAgent = async () => {
  const session = JSON.parse(localStorage.getItem('session'))
  if (session) {
    const resumed = await agent.sessionManager.resumeSession(session)
    if (resumed.success) return agent
  }
  router.push({ name: 'login' })
}

export const logOut = async () => {
  await agent.logout()
  localStorage.removeItem('session')
  router.push({ name: 'login' })
}

export const getStats = async () => {
  const response = await fetch('https://bsky-search.jazco.io/stats')
  const data = await response.json()
  return data
}

recreateAgentForService(getService())
