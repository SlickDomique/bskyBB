<script setup>
import moment from 'moment'
import QuotedPost from './QuotedPost.vue'
import PostEmbed from './PostEmbed.vue'
import { useReplyToStore } from '@/stores/replyTo'
import PostFooter from './PostFooter.vue'

import { parseBBCode } from '@/utils/text'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  hasReplyButton: {
    type: Boolean,
    default: true,
  },
  linkToThread: {
    type: Boolean,
    default: false,
  },
  linkToProfile: {
    type: Boolean,
    default: true,
  },
})

const replyStore = useReplyToStore()
</script>

<template>
  <tr>
    <th class="thLeft" width="150" height="26" nowrap="nowrap">Author</th>
    <th class="thRight" nowrap="nowrap">Message</th>
  </tr>
  <tr></tr>
  <tr>
    <td valign="top" class="row1" nowrap="nowrap" width="150">
      <component
        :to="`/forum/profile.php?u=${post.author.did}`"
        :is="linkToProfile ? 'RouterLink' : 'slot'"
      >
        <span class="name"
          ><b>
            <a class="name" style="font-size: 12">{{ post.author.displayName }}</a>
          </b>
          <br />
        </span>
        <span class="postdetails">
          <img :src="post.author.avatar" class="avatar" alt="" /><br /><br />
        </span>
      </component>
    </td>
    <td class="row1" width="100%" valign="top">
      <table width="100%" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td valign="top">
              <img src="@/assets/subSilver/images/icon_minipost.gif" width="12" height="9" alt="" />
              <span class="postdetails"
                >Sent: {{ moment(post.record.createdAt).format('LLL') }}&nbsp; &nbsp;</span
              >
            </td>
            <td valign="top" align="right" nowrap="nowrap" v-if="hasReplyButton">
              <a
                href="#reply"
                @click="
                  () => {
                    replyStore.setReplyTo(post)
                  }
                "
                ><img
                  src="@/assets/subSilver/images/icon_q.gif"
                  width="23"
                  height="18"
                  title="Reply"
                  border="0"
                  alt=""
              /></a>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <span class="gensmall"><hr /></span>
            </td>
          </tr>
          <component
            :to="`/forum/viewtopic.php?t=${post.uri}`"
            :is="linkToThread ? 'RouterLink' : 'slot'"
          >
            <tr>
              <td height="100%" valign="top" colspan="2">
                <span class="postbody newlineFix">
                  <QuotedPost :post="post.parent" v-if="post.parent" :depth="0" />
                  <div v-html="parseBBCode(post.record.text)"></div>
                  <PostEmbed v-if="post.embed" :embed="post.embed" />
                </span>
              </td>
            </tr>
            <PostFooter :post="post" />
          </component>
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
                  border="0" /></a
              >&nbsp;
              <a
                ><img
                  src="@/assets/subSilver/images/lang_english/icon_pm.gif"
                  width="59"
                  height="18"
                  alt=""
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
