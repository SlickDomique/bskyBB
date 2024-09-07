<script setup>
import { RouterView } from 'vue-router'
import { logOut } from './lib/api'

const handleLogout = async () => {
  await logOut()
}
</script>

<template>
  <div class="maincontent bodyline">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
      <tbody>
        <tr>
          <td>
            <a href="/forum/index.php"
              ><img src="@/assets/logo.gif" border="0" alt="" vspace="1"
            /></a>
          </td>
          <td align="center" width="100%" valign="middle">
            <span class="maintitle">bskyBB by Domi.zip<br /></span>
            <span class="gen">Old take on new tech</span>
            <table cellspacing="0" cellpadding="2" border="0">
              <tbody>
                <tr>
                  <td align="center" valign="top" nowrap="nowrap">
                    <span class="mainmenu"> </span>
                  </td>
                </tr>
                <tr>
                  <td height="25" align="center" valign="top" nowrap="nowrap">
                    <span class="mainmenu">
                      <a href="/forum/login.php" class="mainmenu"
                        ><img
                          src="@/assets/subSilver/images/icon_mini_login.gif"
                          width="12"
                          height="13"
                          border="0"
                          alt="Log in"
                          hspace="3"
                        />Login</a
                      >
                      &nbsp;
                      <a href="/forum/login.php" class="mainmenu" @click="handleLogout"
                        ><img
                          src="@/assets/subSilver/images/icon_mini_profile.gif"
                          width="12"
                          height="13"
                          border="0"
                          alt=">Log out"
                          hspace="3"
                        />Log out</a
                      >
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="left" colspan="2"></td>
        </tr>
      </tbody>
    </table>

    <RouterView />

    <div align="center">
      <span class="copyright">
        Powered by pure autism of <a href="https://domi.zip" target="_blank">domi.zip</a> © 2024
        bskyBB</span
      >
    </div>
  </div>
</template>

<style scoped></style>
