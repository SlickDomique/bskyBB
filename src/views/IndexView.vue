<script setup>
import MainFeed from '@/components/MainFeed.vue'
import ForumStats from '@/components/ForumStats.vue'

import { getAuthorizedAgent } from '@/lib/api'
import { ref, watch } from 'vue'
import { flattenFeed } from '@/utils/thread'

const props = defineProps({
  uri: {
    type: String,
    required: true,
  },
})

const loading = ref(false)
const posts = ref(null)
const error = ref(null)

// watch the params of the route to fetch the data again
watch(() => props.uri, fetchData, { immediate: true })

async function fetchData() {
  loading.value = true
  try {
    const agent = await getAuthorizedAgent()
    let rawPosts = await agent.getTimeline({
      limit: 60,
    })
    const flatPosts = flattenFeed(rawPosts.data.feed)
    posts.value = flatPosts
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
