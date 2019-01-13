<template>
  <div>
    <div v-if="display" class="alert">
      <div class="close-modal">
        <a href="#" @click="onDelete(false)" class="close">
          <img alt="close icon" :src="require('../../../assets/svg/ic_close.svg')">
        </a>
      </div>
      <!-- Modal content -->
      <div class="modal-content">
        <div class="alert-image">
          <img :src="image">
          <h2>{{options.title}}</h2>
        </div>
        <div class="alert-content">
          <h6>{{options.description}}</h6>
          <div class="margin-20">
            <f-button styles="alert" @onClick="onDelete(true)">{{label}}</f-button>
          </div>
          <div class="margin-20">
            <f-button styles="blue" @onClick="onDelete(false)">منصرف شدم</f-button>
          </div>
        </div>
      </div>
    </div>
    <div @click="onDelete(false)" v-if="display" class="overlay"></div>
  </div>
</template>

<script>
import FButton from "~/components/elements/button";
import Vue from "vue";
export default {
  props: ["message", "disableOverlay", "noModal"],
  // 
  props: {
    message: {
      type: String,
      default: ''
    },
    disableOverlay: '',
    noModal: ''
  },
  data() {
    return {
      display: false,
      options: null,

    };
  },
  computed: {
    image() {
      return this.options.img ? this.options.img : require('./images/img_delete.svg')
    },
    label() {
      return this.options.label || 'حذف شود'
    }
  },
  created() {
    Vue.prototype.$alertify = this.alert;
  },
  methods: {
    toggle() {
      this.display = !this.display;
    },
    onDelete(bool) {
      this.toggle();
      this.$emit("delete", bool);
    },
    alert(options, callback) {
      this.display = true;
      this.options = options;
      this.$on("delete", bool => {
        callback(bool);
        this.$off("delete");
      });
    }
  },
  components: {
    FButton
  }
};
</script>

<style scoped lang="stylus" >
.alert
  position fixed /* Stay in place */
  top 0
  right 0
  bottom 0
  left 0
  z-index 999999
  overflow hidden
  margin auto
  width 435px
  border-radius 10px
  .alert-image
    display flex
    flex-direction column
    justify-content center
    align-items center
    margin-top -80px
    width 400px
    height 400px
    border-radius 200px
    background-color rgba(224, 224, 224, 0.2)
  .alert-content
    text-align center
    h6
      color #000
      text-align center
      font-weight normal
      font-size 16px
  .modal-content
    position relative
    overflow hidden
    margin 25% auto
    padding 20px
    width 410px
    border-radius 10px
    background-color #fff
    h2
      color #000
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
  z-index 99999
  width 100%
  height 120vh
  filter grayscale(10%)
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
  img
    width 20px
.no-modal
  z-index 1
  margin-top 105px
@media only screen and (max-width: 576px)
  .alert
    margin-top 0
    .close-modal
      top 40px
    .modal-content
      margin 5% auto
    .alert-image
      margin -60px auto
      border-radius 150px
      background-color #fff
</style>

