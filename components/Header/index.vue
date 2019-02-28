<template>
  <header>
    <nav class="header-container" :class="{'no-fixed': noFixed, 'header-dashboard': dashboard}">
      <div class="right-menu">
        <div class="menu">
          <a href="#" @click.prevent="toggleMenu('navbar')">
            <img alt="hamburger button" :src="require('../../assets/svg/ic_hamburger.svg')">
          </a>
        </div>
        <div class="logo">
          <router-link title="fandogh logo" :to="{path:'/'}">
            <logo/>
          </router-link>
        </div>
        <div class="navbar">
          <ul>
            <li>
              <router-link :to="{path:'/'}">
                <progress-hover :hover="true">صفحه اصلی</progress-hover>
              </router-link>
            </li>
            <li>
              <a href="#prices">
                <progress-hover :hover="true">سرویس ها</progress-hover>
              </a>
            </li>
            <li>
              <a rel="noopener" target="_blank" href="https://docs.fandogh.cloud">
                <progress-hover :hover="true">مستندات</progress-hover>
              </a>
            </li>
            <li>
              <a rel="noopener" target="_blank" href="https://blog.fandogh.cloud">
                <progress-hover :hover="true">بلاگ</progress-hover>
              </a>
            </li>
            <li>
              <router-link :to="{path:'/about-us'}">
                <progress-hover :hover="true">درباره ما</progress-hover>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="user" v-if="!loggedIn">
        <f-button path="/user/login" styles="transparent md">ورود</f-button>
        <f-button path="/user/register" styles="transparent border margin-10 md">ثبت نام</f-button>
      </div>
      <div class="user" v-else>
        <f-button @onClick="exit" styles="transparent md exit">خروج</f-button>
        <!--<f-button @onClick="$router.push('/dashboard/images')" styles="transparent border" > داشبورد </f-button>-->
        <f-button path="/dashboard" styles="transparent border md margin-10">داشبورد</f-button>
      </div>

      <!-- <div v-if="loggedIn" class="profile">
        <a href="#" @click.prevent="toggleMenu(null)">
          <img :src="avatar" alt="profile">
        </a>
      </div>-->
    </nav>
    <sidebar ref="menu"/>
    <login ref="login"/>
    <register ref="register"/>
    <message ref="message"/>
  </header>
</template>

<script>
import logo from "./logo";
import FButton from "~/components/elements/button";
import Login from "~/components/Auth/Login";
import Sidebar from "./sidebar";
import Register from "../Auth/Register";
import Message from "../Auth/Message";
import { getValue } from "~/utils/cookie";
import Gravatar from "~/utils/gravatar";

export default {
  components: {
    Register,
    logo,
    FButton,
    Login,
    Sidebar,
    Message
  },
  props: ["noFixed"],
  data() {
    return {
      // loggedIn: getToken()
    };
  },
  mounted() {

    if (!this.noFixed) {
      let headerContainer = document.querySelector(".header-container");
      document.addEventListener("scroll", () => {
        if (window.pageYOffset > 10) {
          headerContainer.classList.add("header-container-fixed");
        } else {
          headerContainer.classList.remove("header-container-fixed");
        }
      });
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.token;
    },
    avatar() {
      let email = getValue("email");
      return Gravatar(email, 150);
    },
    dashboard() {
      return this.$route.fullPath.includes("dashboard");
    }
  },
  methods: {
    toggleMenu(type) {
      this.$store.dispatch("TOGGLE_NAV", { data: type, id: "sidebar" });
    },
    showModal(modal) {
      this.$store.dispatch("showModal", modal);
    },
    exit() {
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
          this.$store.dispatch("logout");
          this.$router.push("/user/login");
        }
      );

    }
  }
};
</script>

<style lang="stylus">
.header-container
  position fixed
  top 0
  right 0
  z-index 1000
  display flex
  flex-flow wrap row
  justify-content space-between
  align-items center
  box-sizing border-box
  padding 13.5px 30px
  width 100%
  background-color transparent
.header-container
  transition all 0.3s
  -webkit-transition all 0.3s
  -moz-transition all 0.3s
.header-container-fixed
  position fixed
  padding 15px 90px
  background-color #3f10ae
  .logo
    img
      width 96px
.no-fixed
  background linear-gradient(to right, #160074, #0f0050)
header
  display block
  .right-menu
    display flex
    align-items center
    ul
      margin 0
      li
        display inline-block
        a
          padding 20px
          color white
          text-decoration none
  .menu
    display none
    margin-left 16px
  .header-container
    .profile
      display none
  .logo
    img
      width 126px
  .user
    button
      margin-right 10px
@media only screen and (max-width: 1230px)
  .header-container
    position initial
    padding 30px
    height 60px
  .header-container-fixed
    z-index 10
    padding 0 30px
    background-color transparent
  .header-dashboard, &.dashboard
    position fixed
  .navbar
    display none
  header
    .header-container
      .profile
        display block
        img
          width 32px
          border-radius 32px
    .menu
      display block
      float left
      img
        width 24px
    .logo
      img
        width 96px
@media only screen and (max-width: 768px)
  header
    .user .btn-exit
      display none
</style>

