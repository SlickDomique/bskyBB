<script setup>
import SinglePost from './SinglePost.vue'
import ReplyForm from './ReplyForm.vue'
import { useReplyToStore } from '@/stores/replyTo'
import { onMounted } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  posts: {
    type: Object,
    required: true,
  },
})
const replyStore = useReplyToStore()
onMounted(() => {
  replyStore.setReplyTo(props.posts[0])
})
</script>

<template>
  <table class="forumline">
    <SinglePost v-for="post in props.posts" :key="post.cid" :post="post" />
  </table>
  <ReplyForm />
</template>

<style scoped></style>
