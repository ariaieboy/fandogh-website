<template>
  <div class="header-dashboard">
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
export default {
  name: 'header-dashboard',
  components: {
    FAvatar
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
  height 68px
  background-color $grayLight
  font-size 14px
  &-logo
    padding-right 30px
</style>
