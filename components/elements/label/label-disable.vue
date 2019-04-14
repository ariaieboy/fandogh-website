<template>
  <div class="label-disable">
    <label>{{label}}</label>
    <span v-html="value"></span>
  </div>
</template>

<script>
export default {
  name: 'label-disable',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.label-disable
  position absolute
  top 50%
  right 15px
  bottom 0
  left 15px
  margin auto
  transform translateY(-40%)
  label
    color rgb(79, 79, 79)
    font-weight bold
    font-size 14px
  span
    color rgb(79, 79, 79)
    font-weight inherit
    font-size 14px
</style>
