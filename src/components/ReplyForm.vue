<script>
import { useReplyToStore } from '@/stores/replyTo'
import { getAuthorizedAgent } from '@/lib/api'
import { mapStores } from 'pinia'
// eslint-disable-next-line no-unused-vars

// const replyStore = useReplyToStore()
// const replyTo = computed(() => replyStore.replyTo)

export default {
  props: {
    header: {
      type: String,
      default: 'Quick reply',
    },
  },
  data() {
    return {
      post: '',
      error: '',
    }
  },
  computed: {
    ...mapStores(useReplyToStore),
  },
  mounted() {},
  methods: {
    async handlePosting() {
      try {
        const agent = await getAuthorizedAgent()
        const post = await agent.post({
          text: this.post,
          reply: this.replyToStore.replyTo
            ? {
                parent: {
                  cid: this.replyToStore.replyTo.cid,
                  uri: this.replyToStore.replyTo.uri,
                },
                root: {
                  cid: this.replyToStore.replyTo.cid,
                  uri: this.replyToStore.replyTo.uri,
                },
              }
            : null,
        })
        window.location.href = `/forum/viewtopic.php?t=${post.uri}`
      } catch (error) {
        this.error = error.message
      }
    },
  },
}
</script>

<template>
  <form @submit.prevent="handlePosting" target="_top">
    <table cellpadding="5" cellspacing="1" width="100%" class="forumline" id="reply">
      <tbody>
        <tr>
          <th class="thHead" height="25">
            <b>{{ header }}</b>
          </th>
        </tr>
        <tr>
          <td class="row1">
            <div v-if="replyToStore.replyTo">
              Reply to skeet by {{ replyToStore.replyTo.author.displayName }}: <br />{{
                replyToStore.replyTo.record.text
              }}
            </div>

            <table cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td class="row1" valign="top">
                    <textarea
                      name="message"
                      rows="10"
                      cols="84"
                      tabindex="3"
                      class="post"
                      id="post"
                      v-model="post"
                      required
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr v-if="error">
          <td colspan="2" align="center">
            <p class="error">{{ error }}</p>
          </td>
        </tr>
        <tr>
          <td class="catBottom" align="center" height="28" colspan="2">
            <input type="submit" name="post" class="mainoption" value="Send" />
          </td>
        </tr>
      </tbody>
    </table>
  </form>
  <br />
</template>
