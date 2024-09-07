import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useReplyToStore = defineStore('replyTo', () => {
  const replyTo = ref(null)
  function resetReplyTo() {
    replyTo.value = null
  }
  function setReplyTo(parent) {
    replyTo.value = parent
  }

  return { replyTo, resetReplyTo, setReplyTo }
})
