<template>
  <div class="header-avatar">
    <div class="header-avatar-box" @click="toggleAvatar('avatar')">
      <img class="header-avatar-img" src="./icons/Group 1032.svg" alt>
      <div class="header-avatar-name">
        <span>رامین اسماعیلی</span>
        <span class="font-roboto">Ramiiiinessiiii</span>
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
        <span>Salameno.ir</span>
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
    }
  },
  methods: {
    toggleAvatar(type) {
      // if (this.isNativeMenus === type) {
      //   this.$store.commit('SET_DATA', { id: 'isNativeMenus', data: null })
      //   return
      // }
      this.$store.dispatch("TOGGLE_NAV", { data: type, id: "isNativeMenus" });
      // this.$store.commit('SET_DATA', { id: 'isNativeMenus', data: type })
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/css/variables.styl'

.header-avatar
  position relative
  display flex
  padding 0 15px
  min-width 230px
  height 100%
  border-right 1px solid $hoary
  border-bottom 1px solid $hoary
  cursor pointer
  &-box
    display flex
    justify-content space-evenly
    align-items center
    width 100%
  &-name
    display flex
    flex-direction column
    span
      display inline-block
      color $silverDark
      text-align center
      font-weight bold
      font-size 1em
      &:first-child
        margin-bottom 5px
  &-arrow
    cursor pointer
    transform scale(-1, -1)
    &.open
      transform scale(1, 1)
  &-list
    position absolute
    top 102%
    right 0
    left 0
    display none
    margin 0
    background-color $grayLight
    &.open
      display block
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
</style>
