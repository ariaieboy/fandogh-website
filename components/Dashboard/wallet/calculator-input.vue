<template>
  <div class="calculator-value">
    <div class="calculator-value-label">
      <label>قیمت</label>
      <label class="font-roboto">
        <span>(Core)</span>
        CPU
      </label>
    </div>
    <div class="calculator-value-input">
      <label>
        <span>۵۰۰ تومان \ ساعت</span>
      </label>
      <input type="text" placeholder="Min : 0.5">
    </div>
  </div>
</template>

<script>
export default {
  name: 'wallet-calculator-value'
}
</script>
<style lang="stylus" scoped>
.calculator-value
  display flex
  flex-direction column
  margin-bottom 45px
  width 100%
  &-label
    display flex
    justify-content space-between
    label
      font-size 14px
      span
        display inline-block
  &-input
    display flex
    justify-content space-between
    overflow hidden
    min-height 46px
    border 1px solid #b5b5b5
    border-radius 10px
    label
      display flex
      flex 1 1
      justify-content center
      align-items center
      align-items stretch
      background-color #f0f4f8
      vertical-align middle
      span
        display flex
        align-items center
    input
      display flex
      flex 1 1
      padding 0 16px
      border none
      background-color #ffffff
      color #47494e
      text-align left
      font-size 14px
      font-family yekan-light
      &::-webkit-input-placeholder
        color #b5b5b5
        text-align left
        font-size 12px
      &:-moz-placeholder
        color #b5b5b5
        text-align left
        font-size 12px
      &:focus
        outline none
</style>
