
<template>
  <div class="collapse collapse-item" :class="{ 'is-active': active }">
    <div
      class="collapse-header touchable"
      role="tab"
      :aria-expanded="active ? 'true' : 'false'"
      @click.prevent="toggle"
    >
      <slot name="collapse-header"></slot>
    </div>
    <transition name="fade">
      <div class="collapse-content" v-if="active">
        <div class="collapse-content-box">
          <slot name="collapse-body"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Collapse",
  data() {
    return {
      active: false
    };
  },
  props: {
    selected: {
      type: Boolean,
      required: true,
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
      this.active = !this.active;
      if (this.active) {
        this.$emit("collapse-open", this.index);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>

.collapse
  margin-bottom 2px
.collapse .collapse-header
  position relative
  padding 20px 20px 20px 40px
  border-radius 3px
  background #f7f7f7
.collapse .collapse-header > div
  display flex
  justify-content space-between
  align-items center
.collapse .collapse-header h3
  font-weight bold
  font-size 0.938em
.collapse .collapse-header::before
  position absolute
  top calc(50% - 0.4em)
  left 20px
  color #c5c9d0
  content url('./icons/arrow-down.svg')
  font-size 0.4em
  transition all 0.2s
  transform rotate(-90deg)
  -moz-transition all 0.2s
  -o-transition all 0.2s
  -webkit-transition all 0.2s
  -moz-transform rotate(-90deg)
  -o-transform rotate(-90deg)
  -ms-transform rotate(-90deg)
  -webkit-transform rotate(-90deg)
.collapse.is-active .collapse-header::before
  transform rotate(0deg)
  -moz-transform rotate(0deg)
  -o-transform rotate(0deg)
  -ms-transform rotate(0deg)
  -webkit-transform rotate(0deg)
.collapse .collapse-content-box
  padding 30px 40px
  border-right 2px solid #f7f7f7
  border-bottom 2px solid #f7f7f7
  border-left 2px solid #f7f7f7
  border-bottom-right-radius 3px
  border-bottom-left-radius 3px
  transition all 0.2s
  -moz-transition all 0.2s
  -o-transition all 0.2s
  -webkit-transition all 0.2s
</style>
