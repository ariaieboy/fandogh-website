<template>
  <div class="modal-vue">
    <div
      class="modal-vue-wrapper"
      :class="[animationParent,{'modal-vue-wrapper-show' : open}]"
      v-show="isOpen"
    >
      <div
        :class="['modal-vue-overlay']"
        @click="$emit('hide')"
        :style="{backgroundColor:bgOverlay}"
      ></div>
      <div
        :class="['modal-vue-panel',animationPanel,{'modal-vue-show':open}]"
        :style="{width:width,backgroundColor:bgPanel}"
      >
        <div class="modal-vue---close-icon" @click="$emit('hide')" v-if="showCloseButton">
          <slot name="close-icon">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              width="20"
              height="20"
              xml:space="preserve"
            >
              <path
                class="st0"
                fill="#010110"
                d="M8.7,7.6c-0.4-0.4-1-0.4-1.4,0C6.9,8,6.9,8.6,7.3,9l11,11l-11,11c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0 l11-11l11,11c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4l-11-11L32,9c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-11,11L8.7,7.6z"
              ></path>
            </svg>
          </slot>
        </div>
        <div class="modal-vue--content">
          <div class="modal-vue--content-panel">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-vue-perfect",
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    resizeWidth: {
      type: Object
    },
    animationPanel: {
      type: String,
      required: false,
      default: "modal-fade"
    },
    bgOverlay: {
      type: String,
      required: false,
      default: "#fff"
    },
    bgPanel: {
      type: String,
      required: false,
      default: "rgba(255, 255, 255, 0.57)"
    },
    animationParent: {
      type: String,
      required: false,
      default: "modal-fade"
    },
    defaultWidth: {
      type: String,
      required: false,
      default: "80%"
    },
    closeScroll: {
      type: Boolean,
      required: false,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      width: this.defaultWidth || "80%",
      open: false,
      isOpen: false,
      isShowCloseButton: true,
      backups: {
        body: {
          height: null,
          overflow: null,
          paddingRight: null
        }
      }
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.isOpen = true;
        setTimeout(() => (this.open = true), 30);
        if (this.closeScroll) {
          this._lockBody();
        }
      } else {
        if (this.closeScroll) {
          this._unlockBody();
        }
        this.open = false;
        setTimeout(() => (this.isOpen = false), 300);
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
    window.removeEventListener("resize", this.getWindowHeight);
  },
  destroyed() {
    if (this.open) {
      if (this.closeScroll) {
        this._unlockBody();
      }
      this.open = false;
      setTimeout(() => (this.isOpen = false), 300);
    }
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener("resize", this.getWindowWidth);
      window.addEventListener("resize", this.getWindowHeight);
      this.getWindowWidth();
      this.getWindowHeight();
    });
  },
  methods: {
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    },
    getWindowWidth(event) {
      if (this.resizeWidth && Object.keys(this.resizeWidth).length > 0) {
        this.windowWidth = document.documentElement.clientWidth;
        var filter = Object.keys(this.resizeWidth).find(
          f => f >= this.windowWidth
        );
        if (filter) {
          this.width = this.resizeWidth[filter];
        } else {
          this.width = this.defaultWidth;
        }
      }
    },
    _lockBody() {
      this.backups.body.height = document.body.style.height;
      this.backups.body.overflow = document.body.style.overflow;
      document.body.style.paddingRight = "15px";
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
    },
    _unlockBody() {
      document.body.style.height = this.backups.body.height;
      document.body.style.overflow = this.backups.body.overflow;
      document.body.style.paddingRight = this.backups.body.paddingRight;
    }
  }
};
</script>

<style lang="stylus" scoped>
.modal-vue
  &-wrapper
    position absolute
    position fixed
    top 0
    left 0
    z-index 9999999999
    width 100vw
    height 100vh
    font-size 14px
    transition all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02)
    transform translate3D(0, 0, 0)
    -webkit-font-smoothing antialiased
    -webkit-transform translate3D(0, 0, 0)
    -ms-transform translate3D(0, 0, 0)
    -o-transform translate3D(0, 0, 0)
    &.modal-fade
      visibility hidden
      opacity 0.1
    &.modal-scale
      transform scale(-1, 1)
      -webkit-transform scale(-1, 1)
      -ms-transform scale(-1, 1)
      -o-transform scale(-1, 1)
  &-wrapper-show
    &.modal-fade, &.modal-scale
      visibility visible
      opacity 1
      transform translate3D(0, 0, 0)
      -webkit-transform translate3D(0, 0, 0)
      -ms-transform translate3D(0, 0, 0)
      -o-transform translate3D(0, 0, 0)
    visibility visible
    opacity 1
    transform translate3D(0, 0, 0)
    -webkit-transform translate3D(0, 0, 0)
    -ms-transform translate3D(0, 0, 0)
    -o-transform translate3D(0, 0, 0)
  &-overlay
    position fixed
    top 0
    left 0
    z-index 9001
    z-index 999
    width 100vw
    height 100vh
    font-size 14px
  &---close-icon
    position absolute
    top 15px
    right 15px
    cursor pointer
  &-panel
    position absolute
    top 50%
    right 0
    left 0
    z-index 999
    overflow-y auto
    box-sizing border-box
    margin 0 auto
    max-height 100vh
    border-radius 2px
    border-radius 10px
    background #fff
    box-shadow 0px 8px 46px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.03)
    opacity 0
    transition-delay 0.05s
    transition-timing-function cubic-bezier(0.52, 0.02, 0.19, 1.02)
    transition-duration 0.3s
    transition-property transform, opacity, width
    -moz-box-sizing border-box
    &.modal-fade
      transform scale(1) translate(0, -50%)
    &.modal-rotate
      transform rotate(45deg) translate(0, -50%)
    &.modal-slide-right
      transform translate(100px, -50%)
    &.modal-slide-left
      transform translate(-100px, -50%)
    &.modal-slide-top
      transform translate(0, -100%)
    &.modal-slide-bottom
      transform translate(0, 100%)
    &::-webkit-scrollbar-track
      background-color #f5f5f5
      -webkit-box-shadow inset 0 0 6px rgba(0, 0, 0, 0.3)
    &::-webkit-scrollbar
      width 6px
      height 5px
      background-color #f5f5f5
    &::-webkit-scrollbar-thumb
      background-color #41b9d2
  &--content
    display flex
    align-items center
    padding-top 24px
    padding-right 15px
    padding-bottom 24px
    padding-left 15px
    line-height 1.5
  &--content-panel
    display block
    flex-grow 1
    padding-top 5px
    padding-bottom 10px
    text-align justify
    font-size 16px
  .modal-vue-show
    opacity 1 !important
    transform translate(0, -50%) !important
</style>
