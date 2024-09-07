<script setup>
defineProps({
  embed: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="post-embed" v-if="embed.$type === 'app.bsky.embed.images#view'">
    <img
      class="embed-image"
      v-for="image in embed.images"
      :src="image.thumb"
      v-bind:key="image.thumb"
    />
  </div>
</template>
