<template>
  <div class="chart-badg">
    <i :style="{'background-color':badgColor}"></i>
    <span>{{badgLabel}} : {{badgValue}}</span>
  </div>
</template>

<script>
export default {
  name: 'badgItem',
  props: {
    badgColor: {
      type: String,
      default: ''
    },
    badgLabel: {
      type: String,
      default: ''
    },
    badgValue: {
      type: String,
      default: ''
    },
  }
}
</script>

<style lang="stylus" scoped>
.chart-badg
  display flex
  flex-wrap wrap
  justify-content flex-start
  align-items center
  margin-left 10px
  padding 5px
  width 128px
  border-radius 16px
  background-color #f0f0f0
  span
    color #333333
    font-size 12px
  i
    margin-left 15px
    width 10px
    height 10px
    border-radius 100%
</style>
