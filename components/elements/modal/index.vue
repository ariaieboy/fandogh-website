<template>
  <div>
    <div class="modal" :class="{'no-modal': noModal}">
      <div v-if="!noModal" class="close-modal">
        <a href="#" @click="$emit('onOverlay')" class="close">
          <img alt="close icon" :src="require('../../../assets/svg/ic_close-2.svg')">
        </a>
      </div>
      <!-- Modal content -->
      <div class="modal-content">
        <slot/>
        <transition name="bounce">
          <div v-show="message" class="message">
            <p v-html="message"></p>
          </div>
        </transition>
      </div>
    </div>
    <div @click="$emit('onOverlay')" v-if="!disableOverlay" class="overlay"></div>
  </div>
</template>

<script>
export default {
  props: ['message', 'disableOverlay', 'noModal']
}
</script>

<style scoped lang="stylus" >
.modal
  position fixed /* Stay in place */
  top 0
  left 50%
  z-index 99999
  overflow hidden
  border-radius 10px
  transform translateX(-50%)
  -webkit-transform translateX(-50%)
p
  color #000
.modal-content
  position relative
  margin 25% auto
  padding 20px
  width 410px
  border-radius 10px
  background-color #220286
.modal
  h2
    color #fff
    text-align center
    font-weight 900
    font-size 18px
html, body
  min-height 100%
body
  position relative
.overlay
  position fixed
  top -50px
  left 0
  z-index 9999
  width 100%
  height 120vh
  background-color rgba(0, 0, 0, 0.8) /* dim the background */
.message
  height 50px
  border-top 2px dotted #fff
  text-align center
  p
    color #e96363
.close-modal
  position absolute
  top 125px
  right 20px
  z-index 99
  @media (max-width: 576px)
    top 100px
  img
    width 20px
.no-modal
  position initial
  z-index 1
  transform translateX(0)
@media only screen and (max-width: 576px)
  .modal-content
    overflow auto
    max-height 400px
    width 300px
</style>

