<script setup>
import { getAuthorizedAgent } from '@/lib/api'
import ViewProfile from '../components/ViewProfile.vue'
import { ref, watch } from 'vue'
import { useUserProfilesStore } from '@/stores/userProfiles'

const props = defineProps({
  uri: {
    type: String,
    required: true,
  },
})

const loading = ref(false)
const posts = ref(null)
const error = ref(null)

const userProfilesStore = useUserProfilesStore()

// watch the params of the route to fetch the data again
watch(() => props.uri, fetchData, { immediate: true })

async function fetchData() {
  loading.value = true
  try {
    const agent = await getAuthorizedAgent()
    await agent.getPreferences()
    // const labelDefs = await agent.getLabelDefinitions(prefs)

    let actorFeed = await agent.app.bsky.feed.getAuthorFeed({
      actor: props.uri,
    })

    console.log(actorFeed)

    const flattened = actorFeed.data.feed
    const profilesToFetch = {}

    Object.keys(flattened).forEach(async (key) => {
      const post = flattened[key].post
      if (!userProfilesStore.profiles[post.author.did] && !profilesToFetch[post.author.did]) {
        profilesToFetch[post.author.did] = true
      }
    })
    if (Object.keys(profilesToFetch).length > 0) {
      await userProfilesStore.fetchProfiles(Object.keys(profilesToFetch))
    }
    posts.value = flattened.map((post) => post.post)
    loading.value = false
  } catch (err) {
    error.value = err.toString()
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <ViewProfile
    v-if="!loading && !error"
    :posts="posts"
    :profile="userProfilesStore.profiles[props.uri]"
  />
</template>
