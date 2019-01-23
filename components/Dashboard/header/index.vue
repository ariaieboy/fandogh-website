<template>
  <div class="header-dashboard">
    <div class="header-dashboard-logo">
      <router-link to="/">
        <img src="./icons/fandogh logo.svg" alt>
      </router-link>
    </div>
    <div class="header-dashboard-avatar">
      <div class="header-dashboard-avatar-box">
        <img class="header-dashboard-avatar-img" src="./icons/Group 1032.svg" alt>
        <div class="header-dashboard-avatar-name">
          <span>رامین اسماعیلی</span>
          <span class="font-roboto">Ramiiiinessiiii</span>
        </div>
        <img class="header-dashboard-avatar-arrow" src="./icons/arrow-point-to-right.svg" alt>
      </div>
      <div class="header-dashboard-avatar-list">
        <div class="header-dashboard-namespace">
          <span>Salameno.ir</span>
        </div>
        <div class="header-dashboard-list">
          <div class="header-dashboard-item" v-for="(item,i) in list" :key="i">
            <img :src="require('./icons/'+item.icon+'.svg')">
            <span>{{item.text}}</span>
          </div>
          <div class="header-dashboard-item">
            <img src="./icons/Group 2188.svg" alt>
            <span>خروج</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-dashboard',
  data() {
    return {
      list: [
        { icon: 'Group 2188', text: 'حساب کاربری' },
        { icon: 'Group 2190', text: 'پلن من' },
        { icon: 'Group 2188', text: 'کیف پول' },
        { icon: 'ic_settings', text: 'تنظیمات' },
      ]
    }
  },
}
</script>

<style lang="stylus" scoped>
colorHeader = #f0f0f0
.header-dashboard
  position fixed
  z-index 1000
  display flex
  justify-content space-between
  align-items center
  width 100%
  height 68px
  background-color colorHeader
  font-size 14px
  &-logo
    padding-right 30px
  &-avatar
    position relative
    display flex
    padding 0 15px
    min-width 230px
    height 100%
    border-right 1px solid #fdfdfd
  &-avatar-box
    display flex
    justify-content space-evenly
    align-items center
    width 100%
  &-avatar-name
    display flex
    flex-direction column
    span
      display inline-block
      color #333333
      text-align center
      font-weight bold
      font-size 1em
      &:first-child
        margin-bottom 5px
  &-avatar-arrow
    transform scale(-1, -1)
  &-avatar-list
    position absolute
    top 95%
    right 0
    left 0
    margin 0
    background-color colorHeader
  &-namespace
    position relative
    margin-bottom 15px
    padding 15px 0
    text-align center
    &:before
      position absolute
      right 30px
      bottom 0
      left 30px
      display block
      height 2px
      background-color rgba(0, 0, 0, 0.25)
      content ''
    span
      color #333333
      font-weight bold
      font-size 1em
  &-list
    display flex
    flex-direction column
    padding 0 15px
  &-item
    display flex
    justify-content start
    margin-bottom 15px
    img
      margin-left 15px
    span
      display inline-block
      color #333333
      text-align center
      font-size 1em
</style>
