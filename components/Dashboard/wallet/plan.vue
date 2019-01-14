<template>
  <div class="plan">
    <div class="plan-info">
      <p class="plan-name">پلن فعلی</p>
      <p class="plan-type">پلن ۲</p>
    </div>
    <div class="plan-icon">
      <img src="~static/icons/plans/services-icon/blimp.png" alt="plan-2">
    </div>
  </div>
</template>

<script>
export default {
  name: 'wallet-plan'
}
</script>

<style lang="stylus" scoped>
.plan
  display flex
  &-info
    display flex
    flex-direction column
  &-name
    color #4f4f4f
    font-size 16px
  &-type
    color #4f4f4f
    font-size 16px
  &-icon
    display flex
    flex-direction column
    justify-content center
    align-content center
    margin-right 20px
</style>
