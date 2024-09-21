<script>
import { useReplyToStore } from '@/stores/replyTo'
import { getAuthorizedAgent } from '@/lib/api'
import { mapStores } from 'pinia'
import { parseEmotes, emojiGifCodes } from '@/utils/text'
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
      emojiGifCodes: emojiGifCodes,
    }
  },
  computed: {
    ...mapStores(useReplyToStore),
  },
  mounted() {},
  methods: {
    parseEmotes(text) {
      return parseEmotes(text)
    },
    insertAtCursor(before = '', after = '') {
      const textarea = this.$refs.post_textarea
      const cursorPosition = textarea.selectionStart
      this.post =
        this.post.substring(0, cursorPosition) +
        before +
        after +
        this.post.substring(cursorPosition)
      textarea.focus()
      this.$nextTick(() =>
        textarea.setSelectionRange(cursorPosition + before.length, cursorPosition + before.length),
      )
      // textarea.setCaretPosition(cursorPosition + before.length)
      // this.$nextTick(() => textarea.setSelectionRange(cursorPosition + before.length))
    },
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
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
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
                      ref="post_textarea"
                      v-model="post"
                      required
                    ></textarea
                    ><br />
                    <div class="replyForm-emojis">
                      <img
                        v-for="emojiCode in Object.keys(emojiGifCodes)"
                        :key="emojiCode"
                        :src="emojiGifCodes[emojiCode]"
                        @click="insertAtCursor(String.fromCodePoint(parseInt(emojiCode, 16)))"
                      />
                    </div>
                  </td>
                  <td width="100%" valign="top" class="row1">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            &nbsp;<input
                              type="button"
                              class="button"
                              value="B"
                              style="width: 38px; text-indent: -2px"
                              @click="insertAtCursor('[b]', '[/b]')"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            &nbsp;<input
                              type="button"
                              class="button"
                              value="I"
                              style="width: 38px; text-indent: -2px"
                              @click="insertAtCursor('[i]', '[/i]')"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            &nbsp;<input
                              type="button"
                              class="button"
                              value="U"
                              style="width: 38px; text-indent: -2px"
                              @click="insertAtCursor('[u]', '[/u]')"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            &nbsp;<input
                              type="button"
                              class="button"
                              value="Code"
                              style="width: 38px; text-indent: -2px"
                              @click="insertAtCursor('[code]', '[/code]')"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
