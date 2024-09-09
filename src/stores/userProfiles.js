import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/utils/user'

export const useUserProfilesStore = defineStore('userProfiles', () => {
  const profiles = ref({})
  function saveUserProfile(userProfile) {
    profiles.value[userProfile.did] = userProfile
  }

  async function fetchProfiles(dids) {
    for (let i = 0; i < dids.length; i += 24) {
      const profiles = await getUserInfo(dids.slice(i, i + 24))

      profiles.data.profiles.forEach((profile) => {
        saveUserProfile(profile)
      })
    }
  }

  return { profiles, saveUserProfile, fetchProfiles }
})
