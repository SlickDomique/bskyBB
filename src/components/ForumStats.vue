<script setup>
import { getStats } from '@/lib/api'
import { ref, onMounted } from 'vue'

const loading = ref(false)
const stats = ref(null)

async function fetchData() {
  loading.value = true
  try {
    const rawStats = await getStats()
    stats.value = {
      users: rawStats.total_users,
      posts: rawStats.total_posts,
    }
    loading.value = false
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <table
    width="100%"
    cellpadding="3"
    cellspacing="1"
    border="0"
    class="forumline"
    v-if="!loading && stats"
  >
    <tbody>
      <tr>
        <td class="catHead" colspan="2" height="28">
          <span class="cattitle">Who views the Forum</span>
        </td>
      </tr>
      <tr>
        <td class="row1" align="center" valign="middle" rowspan="6">
          <img src="@/assets/subSilver/images/whosonline.gif" width="46" height="25" alt="" />
        </td>
        <td class="row1" align="left" width="100%" style="">
          <span class="gensmall"
            >Our users wrote <b>{{ stats.posts }}</b> posts<br />We have
            <b>{{ stats.users }}</b> registered users<br
          /></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
