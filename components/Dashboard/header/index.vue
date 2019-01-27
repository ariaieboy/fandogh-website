<template>
  <div class="header-dashboard">
    <hamburger-menu @onClicked="toggleSidebar()" :isVisible="open"/>

    <div class="header-dashboard-logo">
      <router-link to="/">
        <img src="./icons/fandogh logo.svg" alt="logo">
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
        { icon: 'Group 2188', text: 'حساب کاربری', link: '/dashboard/account' },
        { icon: 'Group 2190', text: 'پلن من', link: '/dashboard/plans' },
        { icon: 'Group 2188', text: 'کیف پول', link: '/dashboard/wallet' },
        { icon: 'ic_settings', text: 'تنظیمات', link: '/dashboard/account/edit' },
      ]
    }
  },
  computed: {
    open() {
      return this.$store.state.sideMunu
    },
    isMobile() {
      return this.$store.state.windowWidth <= 992;
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
  width 100%
  height 48px
  background-color $grayLight
  font-size 14px
  &-logo
    padding-right 30px
    img
      width 24px
</style>
