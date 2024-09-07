<script setup>
import PostEmbed from './PostEmbed.vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <table
    width="90%"
    cellspacing="1"
    cellpadding="3"
    class="quoted"
    v-if="post.post && depth < 6"
    align="center"
  >
    <tbody>
      <tr>
        <td>
          <span class="genmed"
            ><b>{{ post.post.author.displayName }} wrote:</b></span
          >
        </td>
      </tr>
      <tr>
        <td class="quote">
          <QuotedPost :post="post.parent" v-if="post.parent" :depth="depth + 1" />
          {{ post.post.record.text }}
          <PostEmbed v-if="post.post.embed" :embed="post.post.embed" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
