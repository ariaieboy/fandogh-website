<template>
  <div class="tooltip">
    <div class="tooltip-title">ویژگی‌ها :</div>
    <div class="tooltip-list">
      <span v-for="item in list">{{item}}</span>
    </div>
    <div class="tooltip-title">توضیحات :</div>
    <div class="tooltip-description">
      <p>{{description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "tooltip",
  props: {
    tooltipShow: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="stylus" scoped>
.tooltip
  position absolute
  top 0
  z-index 6
  padding 10px
  min-width 300px
  border-radius 9px
  background-color rgb(58, 60, 64)
  font-family yekan-light
  transform translateY(15%)
  :before
    position absolute
    top -10px
    right 45px
    z-index 99
    border-right 10px solid transparent
    border-bottom 10px solid #3a3c40
    border-left 10px solid transparent
    content ''
  &-title
    margin 10px 0
    color #fff
    font-weight bold
    font-size 16px
  &-list
    display flex
    flex-direction column
    span
      color #fff
      font-size 14px
      line-height 1.79
  &-description
    p
      color #fff
      text-align justify
      font-size 14px
      line-height 1.79
</style>
