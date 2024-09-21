<script setup>
import { onMounted } from 'vue'
import SinglePost from './SinglePost.vue'
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
    <SinglePost v-for="post in props.posts" :key="post.cid" :post="post" :linkToThread="true" />
  </table>
</template>

<style scoped></style>
