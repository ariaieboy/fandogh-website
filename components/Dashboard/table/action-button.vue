<template>
  <a
    @click.prevent="$emit('onClick')"
    class="action-button"
    href="#"
    :data-balloon="label"
    data-balloon-pos="up"
  >
    <img :src="`/icons/${icon}`" alt>
    <label>{{label}}</label>
    <slot/>
  </a>
</template>
<script>
export default {
  name: "action-button",
  props: {
    icon: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    }
  }
};
</script>
<style  lang="stylus">
.action-button
  display inline-block
  margin 10px
  padding 8px 25px
  max-width 101px
  border-radius 5px
  background #eaf0f7
  color #4f4f4f
  @media (max-width: 1200px)
    margin 5px
    padding 5px
    max-height 120px
  @media (max-width: 768px)
    display block
    text-align center
    font-size 11px
  &.disabled
    pointer-events none
    label
      color rgb(212, 212, 212)
  label
    display inline-block
    overflow hidden
    vertical-align middle
    cursor pointer
    transition all ease 0.5s
  // &:hover
  // label
  // width 100px
  img
    margin-left 5px
    width 16px
    height 16px
    vertical-align middle
    @media (max-width: 1200px)
      width 15px
      height 15px
.is-small
  .action-button-mini
    margin 5px
    padding 8px 5px
    img
      margin-left 0
    label
      width 0
.action-button-x
  width auto
  label
    position absolute
    width 0
</style>