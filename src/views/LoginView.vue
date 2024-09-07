<template>
  <div>
    <form @submit.prevent="handleLogin" target="_top">
      <table width="100%" cellspacing="2" cellpadding="2" border="0" align="center">
        <tbody>
          <tr>
            <td align="left" class="nav">
              <a href="/forum/index.php" class="nav">bskyBB by Domi.zip homepage</a>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        width="100%"
        cellpadding="4"
        cellspacing="1"
        border="0"
        class="forumline"
        align="center"
      >
        <tbody>
          <tr>
            <th height="25" class="thHead" nowrap="nowrap">
              Provide username and password to log in
            </th>
          </tr>
          <tr>
            <td class="row1">
              <table border="0" cellpadding="3" cellspacing="1" width="100%">
                <tbody>
                  <tr>
                    <td colspan="2" align="center">&nbsp;</td>
                  </tr>
                  <tr>
                    <td width="45%" align="right"><span class="gen">Username:</span></td>
                    <td><input type="text" id="username" v-model="username" required /></td>
                  </tr>
                  <tr>
                    <td align="right"><span class="gen">Password:</span></td>
                    <td><input type="password" id="password" v-model="password" required /></td>
                  </tr>
                  <tr align="center">
                    <td colspan="2">
                      <input type="submit" name="login" value="Login" class="mainoption" />
                    </td>
                  </tr>
                  <tr v-if="error">
                    <td colspan="2" align="center">
                      <p class="error">{{ error }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import { agent } from '@/lib/api'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  mounted() {
    try {
      if (agent.assertAuthenticated()) {
        this.$router.push({ name: 'index' })
      }
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async handleLogin() {
      try {
        await agent.login({
          identifier: this.username,
          password: this.password,
        })
        this.$router.push({ name: 'index' })
      } catch (error) {
        this.error = error.message
      }
    },
  },
}
</script>

<style scoped>
/* Add your component styles here */
</style>
