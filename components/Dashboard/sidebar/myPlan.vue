<template>
  <router-link to="/dashboard/plans" class="my-plan">
    <div class="my-plan-icon p-15">
      <img src="~/assets/svg/my-plan.svg" />
    </div>
    <div class="my-plan-text">
      <h3>پلن من</h3>
    </div>
  </router-link>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.my-plan
  display flex
  align-items center
  margin 0 auto
  margin-top 30px
  width 290px
  height 72px
  border-radius 5px
  background-image linear-gradient(to top, #00e3dc, #4fa8fd)
  box-shadow 0 3px 6px 0 rgba(1, 225, 220, 0.5)
  @media only screen and (max-width: 1200px)
    width 200px
  > *
    margin 10px
.my-plan-icon
  display flex
  justify-content center
  align-items center
  width 48px
  height 48px
  border-radius 18px
  background-color rgba(0, 0, 0, 0.19)
  img
    width 24px
    height 24px
.my-plan-text
  color #ffffff
  font-size 18px
  @media only screen and (max-width: 1200px)
    font-size 12px


</style>