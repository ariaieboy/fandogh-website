<template>
  <div class="wrapper">
    <f-loading :isFull="true" v-if="loading"/>
    <no-ssr>
      <f-header noFixed="true"/>
      <div class="container-fluid">
        <div class="row">
          <div class="wrapper-col" :class="{'col-lg-2':showHalf , 'col-lg-0':!showHalf}">
            <admin-sidebar/>
          </div>
          <div
            class="wrapper-col"
            :class="{'col-xs-12 col-lg-10 pr-120 pl-100 is-small':showHalf,'col-xs-12':!showHalf}"
          >
            <div class="dash-container">
              <nuxt/>
            </div>
          </div>
        </div>
      </div>
      <notification/>
      <alert/>
    </no-ssr>
  </div>
</template>

<script>
import FHeader from "~/components/Header";
import FFooter from "~/components/Footer";
import AdminSidebar from "~/components/Dashboard/sidebar";
import "normalize.css";
import Notification from "~/components/Dashboard/notification";
import Alert from "~/components/Dashboard/alert";
import { readCookieReq, readCookie } from "../utils/cookies.js";
import FLoading from "~/components/Loading";

export default {
  components: {
    FHeader,
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
    showHalf() {
      return this.$store.state.sidebar === "halfSidebar";
    }
  },

  watch: {
    $route() {
      if (this.message) {
        this.$store.dispatch("setMessage", this.message);
        this.$store.dispatch("showModal", "message");
      }
      this.$store.commit("SET_DATA", { data: true, id: "loading" });

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
    const raychatScript = document.createElement("script");
    raychatScript.innerText =
      '!function(){function t(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,localStorage.getItem("rayToken")?t.src="https://app.raychat.io/scripts/js/"+o+"?rid="+localStorage.getItem("rayToken")+"&href="+window.location.href:t.src="https://app.raychat.io/scripts/js/"+o;var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}var e=document,a=window,o="b34779ab-3e49-4256-8f71-ec8ae7e76d64";"complete"==e.readyState?t():a.attachEvent?a.attachEvent("onload",t):a.addEventListener("load",t,!1)}();';
    document.head.appendChild(raychatScript);
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/css/main.styl'

$spaceTop = 45
// .wrapper-col
// transition all 0.5s
.dash-container
  box-sizing border-box
  margin-top $spaceTop + 68px
  min-height calc(100vh - 68px)
.wrapper
  width 100%
  background #f0f4f8
@media only screen and (max-width: 1230px)
  .dash-container
    margin 0
    margin-top $spaceTop + 60px
    padding 0 30px
    width 100%
</style>
