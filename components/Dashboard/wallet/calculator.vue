<template>
  <div class="calculator">
    <div class="mt-45">
      <r-calculator-input/>
      <r-calculator-input/>
      <r-calculator-input/>
    </div>
    <div class="mt-45">
      <span>مجموع هزینه‌ها</span>
      <r-box>
        <div class="calculator-list">
          <div class="calculator-item">
            <span>هرساعت</span>
            <span class="calculator-sum">۱٬۵۰۰ تومان</span>
          </div>
          <div class="calculator-item">
            <span>هرساعت</span>
            <span class="calculator-sum">۱٬۵۰۰ تومان</span>
          </div>
          <div class="calculator-item">
            <span>هرساعت</span>
            <span class="calculator-sum">۱٬۵۰۰ تومان</span>
          </div>
        </div>
      </r-box>
    </div>
  </div>
</template>

<script>
import RCalculatorInput from './calculator-input'
import RBox from "~/components/Dashboard/wallet/box"

export default {
  name: 'calculator',
  components: {
    RCalculatorInput,
    RBox
  }
}
</script>
<style lang="stylus" scoped>
.calculator
  display block
  &-list
    display flex
    justify-content space-between
    text-align center
  &-item
    display flex
    flex-direction column
    span
      color #4f4f4f
      font-size 16px
  &-sum
    font-weight bold
</style>
