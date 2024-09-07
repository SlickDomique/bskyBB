import router from '@/router'
import { AtpAgent } from '@atproto/api'

export const agent = new AtpAgent({
  service: 'https://bsky.social/',
  // eslint-disable-next-line no-unused-vars
  persistSession: (evt, sess) => {
    if (evt === 'create' || evt === 'update') {
      localStorage.setItem('session', JSON.stringify(sess))
    }
  },
})

export const getAuthorizedAgent = async () => {
  try {
    if (agent.assertAuthenticated()) return agent
  } catch (e) {
    const session = JSON.parse(localStorage.getItem('session'))
    if (session) {
      await agent.resumeSession(session)
      return agent
    }
    router.push({ name: 'login' })
  }
  return agent
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
