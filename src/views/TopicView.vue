<script setup>
import { getAuthorizedAgent } from '@/lib/api'
import ViewTopic from '../components/ViewTopic.vue'
import { ref, watch } from 'vue'
import { flatten, sortPostsIntoDatedArray, getTopPostId } from '@/utils/thread'

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
    let rawPosts = await agent.getPostThread({
      uri: props.uri,
      depth: 200,
      parentHeight: 200,
    })

    const topPostId = getTopPostId(rawPosts.data.thread)

    if (topPostId !== props.uri) {
      rawPosts = await agent.getPostThread({
        uri: topPostId,
        depth: 200,
        parentHeight: 200,
      })
    }

    const flattened = flatten(rawPosts)
    loading.value = false
    posts.value = sortPostsIntoDatedArray(flattened)
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
