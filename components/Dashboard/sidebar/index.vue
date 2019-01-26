<template>
  <div :class="['sidebar-dashboard ', {open}]">
    <div :class="['sidebar-dashboard-list ' , {open}]">
      <router-link
        :title="item.text"
        :to="item.link"
        :class="['sidebar-dashboard-item ' , {'is-border':item.isBorder,open}]"
        v-for="(item,index) in items"
        :key="index"
      >
        <img :src="require('./icons/'+item.icon+'.svg')">
        <span>{{item.text}}</span>
      </router-link>
    </div>
    <div :class="['sidebar-dashboard-collaps ' , {open}]" @click="toggleSidebar()">
      <img src="./icons/arrow.svg" alt="arrow">
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar-dashboard',
  data() {
    return {
      items: [
        // { icon: 'home', isBorder: true, text: 'داشبورد', link: '/dashboard/images' },
        { icon: 'ic_images', text: 'ایمیج‌ها', link: '/dashboard/images' },
        { icon: 'ic_services', text: 'سرویس‌ها', link: '/dashboard/services' },
        { icon: 'ic_domain', text: 'دامنه‌ها', link: '/dashboard/domains' },
        { icon: 'strongbox', isBorder: true, text: 'سکرت‌ها', link: '/dashboard/secret' },
        { icon: 'Group 1784', text: 'پلن‌های فندق', link: '/dashboard/plans' },
      ]
    }
  },
  computed: {
    open() {
      return this.$store.state.sideMunu
    },
    isMobile() {
      return this.$store.state.windowWidth <= 1230;
    }
  },
  methods: {
    toggleSidebar() {
      this.$store.commit("SET_DATA", { data: !this.open, id: "sideMunu" });
    }
  }

}
</script>

<style lang="stylus" scoped>
@import '../../../assets/css/variables.styl'

.sidebar-dashboard
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  display flex
  flex-direction column
  justify-content space-between
  padding-top 68px
  padding-bottom 47px
  min-width $widthSidebarClose
  background-color $grayLight
  transition $transitionMain
  &.open
    min-width $widthSidebarOpen
  &-list
    overflow auto
    border-top 1px solid $hoary
    &::-webkit-scrollbar
      width 7px
    &::-webkit-scrollbar-track
      box-shadow inset 0 0 6px rgba(0, 0, 0, 0.3)
    &::-webkit-scrollbar-thumb
      outline 1px solid slategrey
      background-color darkgrey
  &-item
    position relative
    display flex
    justify-content center
    align-items center
    padding 25px 0
    &:after
      position absolute
      top 0
      right 0
      bottom 0
      width 0.32em
      border-radius 7px
      background-color $greenDark
      content ''
      transition all 0.3s ease-in
      transform scale(0)
    &.nuxt-link-active, &:hover
      &:after
        transform none
    &.is-border
      &:before
        position absolute
        right 1.875em
        bottom 0
        left 1.25em
        display block
        height 2px
        background-color rgba(0, 0, 0, 0.25)
        content ''
    &.open
      justify-content end
      padding-right 1.875em
      span
        position static
        visibility visible
        opacity 9
        transform none
      img
        margin-left 1.875em
      &.is-border
        &:before
          // right 30px
          left 1.875em
    img
      margin-left 0
    span
      position absolute
      display inline-block
      visibility hidden
      color $silverDark
      font-size 16px
      opacity 0.1
      transition $transitionMain
      transform translateX($widthSidebarOpen)
  &-collaps
    position fixed
    right 0
    bottom 0
    min-width $widthSidebarClose
    border-top 1px solid $hoary
    background-color $grayLight
    cursor pointer
    transition $transitionMain
    &.open
      min-width $widthSidebarOpen
      img
        transform scale(1, 1)
    img
      float left
      padding 15px
      transform scale(-1, -1)
</style>

