<template>
  <div class="wrapper">
    <f-loading :isFull="true" v-if="loading"/>
    <no-ssr>
      <f-d-header/>
      <div :class="['wrapper-content',{'is-small':openSidebar}]">
        <div :class="['wrapper-sidebar', {'open':openSidebar}]">
          <admin-sidebar/>
        </div>
        <div :class="['wrapper-main',{'open':openSidebar}]">
          <div class="dash-container">
            <nuxt/>
          </div>
        </div>
      </div>
      <notification/>
      <alert/>
    </no-ssr>
  </div>
</template>

<script>
import FDHeader from "~/components/Dashboard/header";
import FFooter from "~/components/Footer";
import AdminSidebar from "~/components/Dashboard/sidebar";
import "normalize.css";
import Notification from "~/components/Dashboard/notification";
import Alert from "~/components/Dashboard/alert";
import { readCookieReq, readCookie } from "../utils/cookies.js";
import { alertReport } from "../utils/AlertError";
import FLoading from "~/components/Loading";

export default {
  components: {
    FDHeader,
    FLoading,
    FFooter,
    AdminSidebar,
    Notification,
    Alert
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    message() {
      return this.$store.state.message;
    },
    openSidebar() {
      return this.$store.state.sideMunu
    },
    isMobile() {
      return this.$store.state.windowWidth <= 1230;
    }
  },

  watch: {
    $route() {
      if (this.message) {
        this.$store.dispatch("setMessage", this.message);
        this.$store.dispatch("showModal", "message");
      }
      this.$store.commit("SET_DATA", { data: true, id: "loading" });
      this.$store.commit('SET_DATA', { id: 'isNativeMenus', data: null })
    }
  },
  beforeMount() {
    let token;
    let valid = false;
    if (process.browser) {
      token = readCookie("USER_TOKEN");
      valid = token ? true : false;
      if (!valid) {
        this.$router.push("/user/login");
      }
    }
  },
  mounted() {
    if (!this.isMobile) {
      this.$store.dispatch("TOGGLE_NAV", { data: 'halfSidebar', id: "sidebar" });
    }
    let elm = document.querySelector('#raychatFrame')
    if (!elm) {
      const raychatScript = document.createElement('script')
      raychatScript.innerText = '!function(){function t(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,localStorage.getItem("rayToken")?t.src="https://app.raychat.io/scripts/js/"+o+"?rid="+localStorage.getItem("rayToken")+"&href="+window.location.href:t.src="https://app.raychat.io/scripts/js/"+o;var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}var e=document,a=window,o="b34779ab-3e49-4256-8f71-ec8ae7e76d64";"complete"==e.readyState?t():a.attachEvent?a.attachEvent("onload",t):a.addEventListener("load",t,!1)}();'
      document.head.appendChild(raychatScript)
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/css/main.styl'

$spaceTop = 45
.parent-sidebar
  position relative
// transition all 0.5s
.dash-container
  box-sizing border-box
  margin-top $spaceTop + 68px
  min-height calc(100vh - 120px)
  @media only screen and (max-width: 1230px)
    margin 0
    margin-top $spaceTop + 60px
    padding 0 30px
    width 100%
  @media only screen and (max-width: 992px)
    padding 0 15px
.wrapper
  width 100%
  background #f0f4f8
  &-content
    display flex
    width 100%
    font-size 16px
    transition $transitionMain
    @media only screen and (max-width: 1250px)
      font-size 14px
    @media only screen and (max-width: 1230px)
      font-size 10px
    @media only screen and (max-width: 992px)
      font-size 12px
  &-sidebar
    position relative
    min-width $widthSidebarClose
    transition $transitionMain
    &.open
      min-width $widthSidebarOpen
  &-main
    flex-grow 1
    box-sizing border-box
    margin-right 0.8em
    margin-left 0.8em
    min-width calc(100vh - 5.25em)
    transition $transitionMain
    &.open
      min-width calc(100vh - 23em)
    @media only screen and (max-width: 992px)
      min-width calc(100vh - 23em)
      &.open
        min-width calc(100vh - 240px)
</style>
