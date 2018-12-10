<template>
  <textarea @onInput="$emit('input', e => e.target.value)"></textarea>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus">
textarea
  box-sizing border-box
  padding 14px
  min-height 120px
  width 100%
  border solid 1px #e7e8ea
  border-radius 10px
  background-color #ffffff
  font-size 12px
  resize none
  &::placeholder
    font-size 12px
.textarea-disable
  border 1px solid #b5b5b5
  background transparent
  color #b5b5b5
  text-align center
  font-size 14px
  font-family yekan
  pointer-events none
  direction rtl
  &::placeholder
    line-height 1.5
</style>