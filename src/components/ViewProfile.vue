<script setup>
import SinglePost from './SinglePost.vue'
import ReplyForm from './ReplyForm.vue'
import moment from 'moment'
import PostFooter from './PostFooter.vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
  posts: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <table class="forumline" width="100%" cellspacing="1" cellpadding="3" border="0" align="center">
    <tbody>
      <tr>
        <th class="thHead" colspan="2" height="25" nowrap="nowrap">
          Viewing profile :: {{ profile.displayName }}
        </th>
      </tr>
      <tr>
        <td class="catLeft" width="40%" height="28" align="center">
          <b><span class="gen">Avatar</span></b>
        </td>
        <td class="catRight" width="60%">
          <span class="gensmall"><b></b></span>
        </td>
      </tr>
      <tr>
        <td class="row1" height="6" valign="top" align="center">
          <img :src="profile.avatar" class="avatar" alt="" />
          <br /><span class="postdetails"></span>
        </td>
        <td class="row1" rowspan="2" valign="top">
          <table width="100%" border="0" cellspacing="1" cellpadding="3">
            <tbody>
              <tr>
                <td valign="middle" align="right" nowrap="nowrap">
                  <span class="gen">Joined:&nbsp;</span>
                </td>
                <td width="100%">
                  <b
                    ><span class="gen">{{ moment(profile.createdAt).format('LLL') }}</span></b
                  >
                </td>
              </tr>
              <tr v-if="posts.length > 0">
                <td valign="middle" align="right" nowrap="nowrap">
                  <span class="gen">Last active:&nbsp;</span>
                </td>
                <td width="100%">
                  <b
                    ><span class="gen">{{ moment(posts[0].createdAt).format('LLL') }}</span></b
                  >
                </td>
              </tr>
              <tr>
                <td valign="middle" align="right" nowrap="nowrap">
                  <span class="gen">Followers:&nbsp;</span>
                </td>
                <td width="100%">
                  <b
                    ><span class="gen">{{ profile.followersCount }}</span></b
                  >
                </td>
              </tr>
              <tr>
                <td valign="middle" align="right" nowrap="nowrap">
                  <span class="gen">Follows:&nbsp;</span>
                </td>
                <td width="100%">
                  <b
                    ><span class="gen">{{ profile.followsCount }}</span></b
                  >
                </td>
              </tr>
              <tr>
                <td valign="middle" align="right" nowrap="nowrap">
                  <span class="gen">Post count:&nbsp;</span>
                </td>
                <td width="100%">
                  <b
                    ><span class="gen">{{ profile.postsCount }}</span></b
                  >
                </td>
              </tr>

              <tr v-if="posts.length > 0">
                <td valign="middle" nowrap="nowrap"><span class="gen">Description:&nbsp;</span></td>
                <td width="100%" valign="top">
                  <PostFooter :post="posts[0]" :showDivider="false" />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td class="row1" valign="top">
          <table width="100%" border="0" cellspacing="1" cellpadding="3">
            <tbody>
              <tr>
                <td colspan="2" class="catLeft" align="center" height="28">
                  <b
                    ><span class="gen">Contact {{ profile.displayName }} </span></b
                  >
                </td>
              </tr>
              <tr>
                <td valign="middle" nowrap="nowrap" align="right">
                  <span class="gen">Private Message:</span>
                </td>
                <td class="row1" valign="middle">
                  <b
                    ><span class="gen"
                      ><a href="privmsg.php?mode=post&amp;u=31368"
                        ><img
                          src="@/assets/subSilver/images/lang_english/icon_pm.gif"
                          width="59"
                          height="18"
                          alt="Send private message"
                          title="Send private message"
                          border="0" /></a></span
                  ></b>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <br />
  <table class="forumline">
    <SinglePost v-for="post in props.posts" :key="post.cid" :post="post" :link-to-thread="true" />
  </table>
  <ReplyForm />
</template>

<style scoped></style>
