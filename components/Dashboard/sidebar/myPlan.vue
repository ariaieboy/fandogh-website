<template>
    <div class="my-plan">
        <div class="my-plan-icon p-15">
            <img src="~/assets/svg/my-plan.svg" />
        </div>
        <div class="my-plan-text">
            <h3>پلن من</h3>
        </div>
                </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="stylus" scoped>
.my-plan
  width: 290px;
  height: 72px;
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(1, 225, 220, 0.5);
  background-image: linear-gradient(to top, #00e3dc, #4fa8fd);
  margin 0 auto
  margin-top 30px
  display flex
  align-items center
  > * 
    margin: 10px;
.my-plan-icon   
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 18px;
    background-color: rgba(0,0,0,0.19);
    width: 48px;
    height: 48px;
    img
        width: 24px;
        height: 24px;
.my-plan-text
    font-size: 18px;
    color #ffffff
</style>