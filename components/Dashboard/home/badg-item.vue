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
  min-width 168px
  width max-content
  border-radius 16px
  background-color #f0f0f0
  span
    color #333333
    font-size 12px
    margin-left 5px
  i
    margin-left 8px
    width 10px
    height 10px
    border-radius 100%
</style>
