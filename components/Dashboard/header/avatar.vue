<template>
  <div class="header-avatar">
    <div class="header-avatar-box" @click="toggleAvatar('avatar')">
      <img class="header-avatar-img" src="./icons/Group 1032.svg" alt>
      <div class="header-avatar-name">
        <span>رامین اسماعیلی</span>
        <!-- <span class="font-roboto">Ramiiiinessiiii</span> -->
      </div>
      <img
        class="header-avatar-arrow"
        src="./icons/arrow-point-to-right.svg"
        alt
        :class="{open:isNativeMenus === 'avatar'}"
      >
    </div>
    <div class="header-avatar-list" :class="{open:isNativeMenus === 'avatar'}">
      <div class="header-avatar-namespace">
        <span class="font-roboto header-avatar-username">Ramiiiinessiiii</span>
        <span class="font-roboto">Salameno.ir</span>
      </div>
      <div class="header-avatar-list-item">
        <router-link :to="item.link" class="header-avatar-item" v-for="(item,i) in items" :key="i">
          <img :src="require('./icons/'+item.icon+'.svg')">
          <span>{{item.text}}</span>
        </router-link>
        <router-link to="#" class="header-avatar-item">
          <img src="./icons/Group 2188.svg" alt>
          <span>خروج</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "header-avatar",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isNativeMenus() {
      return this.$store.state.isNativeMenus
    },
    isMobile() {
      return this.$store.state.windowWidth <= 992;
    }
  },
  methods: {
    toggleAvatar(type) {
      if (this.isMobile) {
        this.$store.commit("SET_DATA", { data: false, id: "sideMunu" });
      }
      this.$store.dispatch("TOGGLE_NAV", { data: type, id: "isNativeMenus" });
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/css/variables.styl'

$widthListAvatar = 230
.header-avatar
  position relative
  display flex
  margin-right auto
  padding 0 15px
  min-width $widthListAvatar px
  height 100%
  border-right 1px solid $hoary
  border-bottom 1px solid $hoary
  cursor pointer
  @media only screen and (max-width: $sizeMd)
    min-width inherit
    border none
  &-box
    display flex
    justify-content space-evenly
    align-items center
    width 100%
  &-name
    display flex
    flex-direction column
    @media only screen and (max-width: $sizeMd)
      display none
    span
      display inline-block
      color $silverDark
      text-align center
      font-weight bold
      font-size 1em
  &-img
    width 30px
  &-arrow
    width 12px
    cursor pointer
    transform scale(-1, -1)
    @media only screen and (max-width: $sizeMd)
      display none
    &.open
      transform scale(1, 1)
  &-list
    position absolute
    top 102%
    // right 0
    left - $widthListAvatar px
    // display none
    margin 0
    background-color $grayLight
    transition $transitionMain
    // transform translateZ($widthListAvatar px)
    @media only screen and (max-width: $sizeMd)
      right auto
      min-width $widthListAvatar px
      border-top 1px solid $hoary
    &.open
      right 0
      left 0
      @media only screen and (max-width: $sizeMd)
        right auto
  &-namespace
    position relative
    margin-bottom 30px
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
      color $silverDark
      font-weight bold
      font-size 1em
  &-list-item
    display flex
    flex-direction column
    padding 0 15px
  &-username
    display none
    color $greenDark !important
    @media only screen and (max-width: $sizeMd)
      display block
      margin-bottom 15px
  &-item
    display flex
    justify-content start
    margin-bottom 30px
    img
      margin-left 15px
    span
      display inline-block
      color $silverDark
      text-align center
      font-size 1em
    &.nuxt-link-active, &:hover
      span
        color $greenDark
</style>
