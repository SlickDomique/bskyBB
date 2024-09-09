<script setup>
import MainFeed from '@/components/MainFeed.vue'
import ForumStats from '@/components/ForumStats.vue'

import { getAuthorizedAgent } from '@/lib/api'
import { ref, watch } from 'vue'
import { flattenFeed } from '@/utils/thread'
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

    let rawPosts = await agent.getTimeline({
      limit: 60,
    })
    const flatPosts = flattenFeed(rawPosts.data.feed)
    posts.value = flatPosts

    const profilesToFetch = {}

    Object.keys(flatPosts).forEach(async (key) => {
      const post = flatPosts[key]
      if (!userProfilesStore.profiles[post.author.did] && !profilesToFetch[post.author.did]) {
        profilesToFetch[post.author.did] = true
      }
    })
    if (Object.keys(profilesToFetch).length > 0) {
      await userProfilesStore.fetchProfiles(Object.keys(profilesToFetch))
    }

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
  <MainFeed :posts="posts" v-if="!loading" />
  <ForumStats />
</template>
