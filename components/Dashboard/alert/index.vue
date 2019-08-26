<template>
  <modal
    :visible="display"
    @hide="onDelete(false)"
    default-width="25%"
    bg-overlay="rgba(0,0,0,.8)"
    bg-panel="#fff"
    :resize-width="{1400:'50%',992:'75%',768:'90%'}"
  >
    <div class="alert">
      <!-- <div class="close-modal">
        <a href="#" @click="onDelete(false)" class="close">
          <img alt="close icon" :src="require('../../../assets/svg/ic_close.svg')">
        </a>
      </div>-->
      <!-- Modal content -->
      <div class="alert-content" v-if="options">
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
            <f-button styles="black-light" @onClick="onDelete(false)">منصرف شدم</f-button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div @click="onDelete(false)" v-if="display" class="overlay"></div> -->
  </modal>
</template>

<script>
import modal from "./modal";
import FButton from "~/components/elements/button";
import Vue from "vue";
export default {
  props: ["message", "disableOverlay", "noModal"],
  //
  props: {
    message: {
      type: String,
      default: ""
    },
    disableOverlay: "",
    noModal: ""
  },
  data() {
    return {
      display: false,
      options: null
    };
  },
  computed: {
    image() {
      return this.options.img
        ? this.options.img
        : require("./images/img_delete.svg");
    },
    label() {
      return this.options.label || "حذف شود";
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
    FButton,
    modal
  }
};
</script>

<style scoped lang="stylus" >
.alert
  display flex
  justify-content center
  &-image
    display flex
    flex-direction column
    justify-content center
    align-items center
    margin -80px auto 0 auto
    width 400px
    height 400px
    border-radius 200px
    background-color hsla(0, 0%, 87.8%, 0.2)
    @media (max-width: 593px)
      margin -30px auto 0 auto
      width 100%
      height 200px
      border-radius 0
      img
        width 200px
    h2
      color #000
      text-align center
      font-weight 900
      font-size 1.2em
      @media (max-width: 593px)
        font-size 14px
  &-content
    width 100%
    text-align center
    h6
      color #000
      margin-top 12px
      text-align center
      font-weight normal
      font-size 1.1em
      @media (max-width: 593px)
        font-size 12px
</style>

