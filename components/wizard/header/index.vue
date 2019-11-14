<template>
  <div class="header-dashboard">
    <hamburger-menu v-if="isMenuAvailable" @onClicked="toggleSidebar()" :isVisible="open"/>

    <div class="header-dashboard-logo">
      <router-link to="/">
        <img src="../../../assets/svg/ic-fandogh-mini.svg" alt="logo">
      </router-link>
    </div>
    <div @click="$router.replace('/dashboard/services')" style="cursor: pointer; width: 100%; height: 100%; max-width: 150px; display: flex; background: #fd3259; padding: 0 16px;">
          <p style="font-size: 1.2em; color: #fefefe; margin-top: auto; margin-bottom: auto;flex: 1; padding-left: 12px; font-weight: bold; text-align: center">انصراف</p>
          <img src="./icons/turn-off.svg" width="24" height="24" style="filter: invert(100%); margin-top: auto; margin-bottom: auto">
    </div>
  </div>
</template>

<script>
import FAvatar from './avatar'
import hamburgerMenu from '~/components/Dashboard/sidebar/hamburger-menu'

export default {
  name: 'header-dashboard',
  components: {
    FAvatar,
    hamburgerMenu
  },
  data() {
    return {
      list: [
        { icon: 'ic-profile', text: 'حساب کاربری', link: '/dashboard/account' },
        { icon: 'ic-home', text: 'داشبورد', link: '/dashboard/general' },
      ]
    }
  },
  computed: {
    open() {
      return this.$store.state.sideMunu
    },
    isMobile() {
      return this.$store.state.windowWidth <= 992;
    },
    isMenuAvailable() {
      if (this.$route.path.indexOf('account') !== -1) {
        return false;
      } else return this.$route.path.indexOf('bill') === -1;
    }
  },
  watch: {
    isMobile(val) {
      if (val) {
        this.$store.dispatch("TOGGLE_NAV", { data: null, id: "isNativeMenus" });
        this.$store.commit("SET_DATA", { data: false, id: "sideMunu" });
      }
    }
  },
  methods: {
    toggleSidebar() {
      if (this.isMobile) {
        this.$store.dispatch("TOGGLE_NAV", { data: null, id: "isNativeMenus" });
      }
      this.$store.commit("SET_DATA", { data: !this.open, id: "sideMunu" });
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/css/variables.styl'

.header-dashboard
  position fixed
  z-index 1000
  display flex
  justify-content space-between
  align-items center
  border-bottom 1px solid $grayMedium
  width 100%
  height 48px
  background-color $totalWhite
  font-size 14px
  &-logo
    padding-right 24px
    margin-left auto
    img
      width 24px
      filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(158%)
</style>
