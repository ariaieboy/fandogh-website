<template>
  <div class="plan">
    <div class="plan-info">
      <p class="plan-name">{{name}}</p>
      <p class="plan-type">{{type}}</p>
    </div>
    <div class="plan-icon">
      <img :src="require('~/static/icons/plans/services-icon/'+icon+'.png')" alt>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wallet-plan',
  props: {
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
  }
}
</script>

<style lang="stylus" scoped>
.plan
  display flex
  justify-content space-evenly
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
