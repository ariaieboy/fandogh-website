<template>
  <div>
    <div  class="modal" :class="{'no-modal': noModal}" >
        <div v-if="!noModal" class="close-modal">
            <a href="#" @click="$emit('onOverlay')" class="close">
                <img alt="close icon" :src="require('../../../assets/svg/ic_close.svg')" />
            </a>
        </div>
        <!-- Modal content -->
        <div class="modal-content">
          <slot />
            <transition name="bounce">
                <div v-show="message" class="message">
                    <p v-html="message">  </p>
                </div>
            </transition>
        </div>
    </div>
    <div @click="$emit('onOverlay')" v-if="!disableOverlay"  class="overlay"></div>
  </div>
</template>

<script>
    export default {
      props: ['message', 'disableOverlay', 'noModal']
    }
</script>

<style scoped lang="stylus" >
.modal {
  position: fixed; /* Stay in place */
  top: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%)
  border-radius: 10px;
  z-index 99999
  overflow hidden
}

p {
  color: #000;
}

.modal-content {
    background-color: #220286;
    margin: 25% auto
    padding: 20px
    width: 410px
    border-radius: 10px
    position relative
}

.modal 
  h2
    font-size 18px
    font-weight 900
    color #fff
    text-align center

html, body{
  min-height: 100%;
}
body{
  position: relative;
}
.overlay{
  position: fixed;
  top: -50px;
  left: 0;
  width: 100%;
  height: 120vh;
  z-index: 9999;
  background-color: rgba(0,0,0,0.8); /*dim the background*/
}

.message
    height 50px
    border-top 2px dotted #fff
    text-align center
    p
      color #e96363
.close-modal
    position absolute
    right 20px
    top 125px
    z-index 99
    img
        width 20px

.no-modal
  transform: translateX(0)
  z-index 1
  position initial

@media only screen and (max-width: 576px)
    .modal-content
        width: 300px
        overflow auto
        max-height  400px


</style>

