<template>
  <div class="header-dashboard">
    <hamburger-menu v-if="isMenuAvailable" @onClicked="toggleSidebar()" :isVisible="open"/>

    <div class="header-dashboard-logo">
      <router-link to="/">
        <img src="../../../assets/svg/ic-fandogh-mini.svg" alt="logo">
      </router-link>
    </div>
    <f-avatar :items="list"/>
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
  z-index 2000
  display flex
  justify-content space-between
  align-items center
  border-bottom 1px solid $grayMedium
  width 100%
  height 48px
  background-color $totalWhite
  font-size 14px
  &-logo
    padding-right 16px
    img
      width 24px
      filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
</style>
