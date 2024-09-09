<script setup>
import { getAuthorizedAgent } from '@/lib/api'
import ViewTopic from '../components/ViewTopic.vue'
import { ref, watch } from 'vue'
import { flatten, sortPostsIntoDatedArray, getTopPostId } from '@/utils/thread'
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

    let rawPosts = await agent.app.bsky.feed.getPostThread({
      uri: props.uri,
      depth: 200,
    })
    const topPostId = getTopPostId(rawPosts.data.thread)

    if (topPostId !== props.uri) {
      rawPosts = await agent.app.bsky.feed.getPostThread({
        uri: topPostId,
        depth: 200,
      })
    }

    const flattened = flatten(rawPosts)
    const profilesToFetch = {}

    Object.keys(flattened).forEach(async (key) => {
      const post = flattened[key]
      if (!userProfilesStore.profiles[post.author.did] && !profilesToFetch[post.author.did]) {
        profilesToFetch[post.author.did] = true
      }
    })
    if (Object.keys(profilesToFetch).length > 0) {
      await userProfilesStore.fetchProfiles(Object.keys(profilesToFetch))
    }
    posts.value = sortPostsIntoDatedArray(flattened)
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
  <ViewTopic v-if="!loading && !error" :posts="posts" />
</template>
