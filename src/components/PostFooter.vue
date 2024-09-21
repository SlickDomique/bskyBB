<script setup>
import { useUserProfilesStore } from '@/stores/userProfiles'
import { parseBBCode } from '@/utils/text'
import { getUserbar } from '@/utils/userbar'
import { onMounted, ref } from 'vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  showDivider: {
    type: Boolean,
    default: true,
  },
})

const labels = ref([])

const userProfilesStore = useUserProfilesStore()
const currentUser = userProfilesStore.profiles[props.post.author.did]
onMounted(() => {
  props.post.author.labels.forEach(async (label) => {
    if (!label.ver) return
    const userbar = await getUserbar(label)
    if (!userbar) return
    labels.value.push(userbar)
  })
})
</script>

<template>
  <tr v-if="post.author.labels.length > 0 || currentUser?.description">
    <td colspan="2" valign="bottom" align="left">
      <span class="postbody">
        <slot v-if="showDivider">_________________</slot>
        <div class="newlineFix" v-html="parseBBCode(currentUser?.description)"></div>
        <img :src="label" v-for="label in labels" :key="label" alt="" class="userbar" />
      </span>
    </td>
  </tr>
</template>

<style scoped></style>
