<template>
  <div class="component-loading">
    <div :class="{'parent-loading':true,body:isFull,element:!isFull}">
      <div class="wrapper-loading">
        <div class="trinity-rings-spinner">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  props: {
    isFull: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="stylus" scoped>
.component-loading
  position relative
  z-index 99999999999
.parent-loading.body
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(0, 0, 0, 0.38)
.parent-loading.element
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  z-index 8
  background-color rgba(0, 0, 0, 0.38)
.wrapper-loading
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  margin auto
  width 60px
  height 60px
.trinity-rings-spinner, .trinity-rings-spinner *
  box-sizing border-box
.trinity-rings-spinner
  position relative
  display flex
  flex-direction row
  justify-content center
  align-items center
  overflow hidden
  box-sizing border-box
  padding 3px
  width 66px
  height 66px
.trinity-rings-spinner .circle
  position absolute
  display block
  border 3px solid #26c6ec
  border-radius 50%
  opacity 1
.trinity-rings-spinner .circle:nth-child(1)
  width 60px
  height 60px
  border-width 3px
  animation trinity-rings-spinner-circle1-animation 1.5s infinite linear
.trinity-rings-spinner .circle:nth-child(2)
  width calc(60px * 0.65)
  height calc(60px * 0.65)
  border-width 2px
  animation trinity-rings-spinner-circle2-animation 1.5s infinite linear
.trinity-rings-spinner .circle:nth-child(3)
  width calc(60px * 0.1)
  height calc(60px * 0.1)
  border-width 1px
  animation trinity-rings-spinner-circle3-animation 1.5s infinite linear
@keyframes trinity-rings-spinner-circle1-animation
  0%
    transform rotateZ(20deg) rotateY(0deg)
  100%
    transform rotateZ(100deg) rotateY(360deg)
@keyframes trinity-rings-spinner-circle2-animation
  0%
    transform rotateZ(100deg) rotateX(0deg)
  100%
    transform rotateZ(0deg) rotateX(360deg)
@keyframes trinity-rings-spinner-circle3-animation
  0%
    transform rotateZ(100deg) rotateX(-360deg)
  100%
    transform rotateZ(-360deg) rotateX(360deg)
</style>
