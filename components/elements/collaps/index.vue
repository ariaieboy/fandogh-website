
<template>
  <div class="collapse collapse-item" :class="{ 'is-active': active }">
    <div
      class="collapse-header touchable"
      role="tab"
      :aria-expanded="active ? 'true' : 'false'"
      @click.prevent="toggle"
    >
      <span class="collapse-icon">
        <icon-plus :open="active"/>
      </span>

      <slot name="collapse-header"></slot>
    </div>
    <transition name="fade">
      <div class="collapse-content" v-if="active">
        <div class="collapse-content-box">
          <slot name="collapse-body"></slot>
        </div>
      </div>
    </transition>
    <div v-show="active">
      <slot name="collapse-footer"></slot>
    </div>
  </div>
</template>

<script>
import iconPlus from "./icons/plus";
export default {
  name: "Collapse",
  components: {
    iconPlus
  },
  data() {
    return {
      active: false
    };
  },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  created() {
    this._isCollapseItem = true;
    this.active = this.selected;
  },
  ready() {
    if (this.active) {
      this.$emit("collapse-open", this.index);
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return
      this.active = !this.active;
      if (this.active) {
        this.$emit("collapse-open", this.index);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>

$borderColor = #b5b5b5
$borderWidth = 0.6px
$round = 10px
.collapse
  margin-bottom 2px
.collapse .collapse-header
  position relative
  padding 15px 20px 15px 40px
  border $borderWidth solid $borderColor
  border-radius 3px
  border-top-left-radius $round
  border-top-right-radius $round
  border-bottom-right-radius $round
  border-bottom-left-radius $round
  background #fff
  cursor pointer
.collapse .collapse-header > div
  display flex
  justify-content space-between
  align-items center
.collapse .collapse-header h3
  font-weight bold
  font-size 0.938em
.collapse .collapse-icon
  position absolute
  // top calc(50% - 0.4em)
  left 20px
.collapse.is-active .collapse-header::before
  transform rotate(0deg)
  -moz-transform rotate(0 $borderColor = #75879cde g)
  -o-transform rotate(0deg $borderColor = #75879c)
  -ms-transform rotate(0 $borderColor = #75879cde g)
  -webkit-transform rotate(0deg)
.collapse.is-active .collapse-header
  border-bottom-right-radius 0
  border-bottom-left-radius 0
.collapse .collapse-content-box
  padding 15px 0
  border-right $borderWidth solid $borderColor
  border-bottom $borderWidth solid $borderColor
  border-left $borderWidth solid $borderColor
  border-bottom-right-radius $round
  border-bottom-left-radius $round
  background-color #fff
  transition all 0.2s
  -moz-transition all 0.2s
  -o-transition all 0.2s
  -webkit-transition all 0.2s
</style>
