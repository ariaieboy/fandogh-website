<template>
    <div class="main container">
        <div class="middle-xs no-margin inner-main">
            <div class="right" >
                <right />
            </div>
            <div   class="illustrate left">
               <left />
            </div>
        </div>
    </div>
</template>

<script>
    import Right from './right.vue'
    import Left from './left.vue'
    import FButton from '../elements/button'


    export default {
      components:{
        Right,
        Left,
        FButton
      }
    }
</script>

<style lang="stylus" scoped>
  .main
    box-sizing: content-box
    padding-top: 200px
    position relative
    clear both
    .inner-main
        position relative
  .illustrate
    text-align: left
  .left
    position absolute
    left 0
    top 140px
    width calc(60% - 30px)

  .right
    width 50%

  @media only screen and (max-width: 1230px)
      .main
          margin-top 90px
          padding-top 0
  @media only screen and (max-width: 991px)
      .right
        width 100%
      .left
        position initial
        width 100%
        margin-top 60px
        text-align: center
</style>
