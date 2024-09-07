<script setup>
import { onMounted } from 'vue'
import FeedPosts from './FeedPosts.vue'
import ReplyForm from './ReplyForm.vue'

import { useReplyToStore } from '@/stores/replyTo'

const replyStore = useReplyToStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  posts: {
    type: Object,
    required: true,
  },
})

onMounted(() => {
  replyStore.replyTo = null
})
</script>

<template>
  <ReplyForm header="Create thread" />
  <table class="forumline">
    <FeedPosts v-for="post in props.posts" :key="post.cid" :post="post" />
  </table>
</template>

<style scoped></style>
