<template>
  <div class="calculator">
    <div class="mt-45">
      <r-calculator-input/>
      <r-calculator-input/>
      <r-calculator-input/>
    </div>
  </div>
</template>

<script>
import RCalculatorInput from './calculator-input'
export default {
  name: 'calculator',
  components: {
    RCalculatorInput
  }
}
</script>
<style lang="stylus" scoped>
.calculator
  display block
</style>
