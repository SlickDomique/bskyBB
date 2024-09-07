<script setup>
import moment from 'moment'
import QuotedPost from './QuotedPost.vue'
import { RouterLink } from 'vue-router'
import PostEmbed from './PostEmbed.vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template v-if="post">
  <tr>
    <th class="thLeft" width="150" height="26" nowrap="nowrap">Author</th>
    <th class="thRight" nowrap="nowrap">Message</th>
  </tr>
  <tr></tr>
  <tr>
    <td v-if="post.author" valign="top" class="row1" nowrap="nowrap" width="150">
      <span class="name"
        ><b>
          <a class="name" style="font-size: 12">{{ post.author.displayName }}</a>
        </b>
        <br />
      </span>
      <span class="postdetails">
        <img :src="post.author.avatar" class="avatar" alt="" /><br /><br />
      </span>
    </td>
    <td class="row1" width="100%" valign="top">
      <table width="100%" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td valign="top">
              <img src="@/assets/subSilver/images/icon_minipost.gif" width="12" height="9" alt="" />
              <span class="postdetails"
                >Sent: {{ moment(post.record?.createdAt).format('LLL') }}&nbsp; &nbsp;</span
              >
            </td>
            <td valign="top" align="right" nowrap="nowrap"></td>
          </tr>
          <tr>
            <td colspan="2">
              <span class="gensmall"><hr /></span>
            </td>
          </tr>
          <tr>
            <RouterLink :to="`/forum/viewtopic.php?t=${post.uri}`">
              <td height="100%" valign="top" colspan="2" v-if="post.record">
                <span class="postbody">
                  <QuotedPost :post="post.parent" v-if="post.parent" :depth="0" />
                  {{ post.record.text }}
                  <PostEmbed v-if="post.embed" :embed="post.embed" />
                </span>
              </td>
            </RouterLink>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
  <tr>
    <td class="row2" align="left" valign="middle">
      <a href="#top"
        ><img
          src="@/assets/subSilver/images/topic_move.gif"
          width="19"
          height="18"
          alt=""
          border="0"
      /></a>
    </td>
    <td class="row2" width="100%" valign="top" nowrap="nowrap">
      <table cellspacing="0" cellpadding="0" border="0" width="100%">
        <tbody>
          <tr>
            <td valign="top" nowrap="nowrap">
              <a
                ><img
                  src="@/assets/subSilver/images/lang_english/icon_profile.gif"
                  width="59"
                  height="18"
                  alt=""
                  title="Visit profile"
                  border="0" /></a
              >&nbsp;
              <a
                ><img
                  src="@/assets/subSilver/images/lang_english/icon_pm.gif"
                  width="59"
                  height="18"
                  alt=""
                  title="Send private message"
                  border="0"
              /></a>
            </td>
            <td valign="top" align="left" width="177">
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse">
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    <td nowrap="nowrap"></td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td width="100%" align="right">
              <span class="nav">
                &nbsp; &nbsp;&nbsp;<img
                  src="@/assets/subSilver/images/user_agent/icon_windows_7.gif"
                  alt="" />&nbsp;<img
                  src="@/assets/subSilver/images/user_agent/icon_chrome.gif"
                  alt=""
              /></span>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>

  <!-- <td class="row1" colspan="2">
      <p>{{ props.post }}</p>
    </td> -->
</template>

<style scoped></style>
