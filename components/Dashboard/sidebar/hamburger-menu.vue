<template>
  <div class="tcon" :class="{'open':isVisible}" @click="toggleMenu($event)">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleMenu(event) {
      this.$emit("onClicked", this.isVisible);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../assets/css/variables.styl'

.tcon
  display none
  padding-right 15px
  width 24px
  cursor pointer
  @media only screen and (max-width: $sizeMd)
    display inline-block
  span
    display block
    margin-bottom 7px
    width 100%
    height 1.9px
    background-color #333333
    transition all 0.2s ease-in
    &:last-child
      margin-bottom 0
  &.open
    span
      &:nth-child(2)
        transform scale(0)
      &:nth-child(1)
        transform translateY(11px) rotate(45deg)
      &:nth-child(3)
        transform translateY(-8px) rotate(-45deg)
</style>
