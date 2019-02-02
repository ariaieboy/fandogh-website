<template>
  <div class="sidebar" :class="{'show-sidebar-navbar': sidebar}">
    <div class="row sidebar-heading no-margin">
      <div class="col-xs-6">
        <a href="#" @click.prevent="toggleMenu" class="close">
          <img alt="close icon" :src="require('../../assets/svg/ic_close.svg')">
        </a>
      </div>
      <div class="col-xs-6">
        <div class="logo">
          <logo/>
        </div>
      </div>
    </div>
    <div class="navs">
      <ul>
        <li>
          <a href="/">صفحه اصلی</a>
        </li>
        <li>
          <a @click="toggleMenu" href="#prices">سرویس ها</a>
        </li>
        <li>
          <a rel="noopener" target="_blank" href="https://docs.fandogh.cloud">مستندات</a>
        </li>
        <li>
          <a rel="noopener" target="_blank" href="http://blog.fandogh.cloud/">وبلاگ</a>
        </li>
        <li>
          <router-link :to="{path:'/about-us'}">درباره ما</router-link>
        </li>
      </ul>
    </div>
    <div v-if="!loggedIn" class="auth">
      <f-button path="/user/login" styles="transparent border">ورود</f-button>
      <f-button path="/user/register" styles="transparent border">ثبت نام</f-button>
    </div>
    <div v-else class="auth">
      <f-button @onClick="goToDashboard" styles="transparent border">داشبورد</f-button>
      <f-button @onClick="logout" styles="transparent border">خروج</f-button>
    </div>
  </div>
</template>

<script>
import logo from "./logo";
import FButton from "~/components/elements/button";
import { getValue } from "~/utils/cookie";

export default {
  data() {
    return {
      show: false
    };
  },
  components: {
    logo,
    FButton
  },
  watch: {
    $route() {
      if (this.isMobile) {
        this.$store.dispatch("TOGGLE_NAV", { data: null, id: "sidebar" });
      }
    }
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch("TOGGLE_NAV", { data: null, id: "sidebar" });
    },
    showModal(modal) {
      this.toggleMenu();
      this.$store.dispatch("showModal", modal);
    },
    logout() {
      this.$alertify(
        {
          img: "/icons/exit.svg",
          title: `خروج از داشبورد`,
          description: "آیا برای خروج از داشبورد مطمئن هستید هستید ؟",
          label: 'خروج'
        },
        status => {
          if (!status) return
          this.$ga.event({
            eventCategory: "account",
            eventAction: "user logout dashboard",
            eventLabel: "username",
            eventValue: getValue("username")
          });
          this.toggleMenu();
          this.$store.dispatch("logout");
          this.$router.push("/user/login");
        }
      );
    },
    goToDashboard() {
      this.$router.push("/dashboard/images/");
      this.toggleMenu();
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.windowWidth <= 1230;
    },
    sidebar() {
      return this.$store.state.sidebar === "navbar";
    },
    loggedIn() {
      return this.$store.state.user.token;
    }
  }
};
</script>

<style lang="stylus" scoped >
.sidebar
  position fixed
  top 0
  right 0
  z-index 9999
  overflow-y scroll
  width 300px
  height 100vh
  background-color #220286
  opacity 0
  transition all 0.5s ease
  transform translate3d(100%, 0, 0)
.show-sidebar-navbar
  opacity 1
  transform translate3d(0, 0, 0)
.sidebar-heading
  padding 30px
  border-bottom 2px solid rgba(255, 255, 255, 0.2)
  .close
    img
      width 24px
  .logo
    img
      width 96px
.navs
  border-bottom 2px solid rgba(255, 255, 255, 0.2)
  text-align center
  ul
    margin 30px 0
    padding 0
  li
    margin 15px 0
    a
      display block
      padding 10px
.auth
  padding 30px
  text-align center
  button
    margin 10px
</style>
