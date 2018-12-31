<template>
  <a @click.prevent="$emit('onClick')" class="action-button" href="#">
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
  padding 8px
  width 130px
  border-radius 5px
  background #eaf0f7
  color #4f4f4f
  font-size 12px
  @media (max-width: 1200px)
    margin 5px
    padding 5px
    max-height 120px
  &.disabled
    pointer-events none
    label
      color rgb(212, 212, 212)
  label
    display inline-block
    overflow hidden
    width 100px
    vertical-align middle
    cursor pointer
    transition all ease 0.5s
  // &:hover
  // label
  // width 100px
  img
    width 16px
    height 16px
    vertical-align middle
    @media (max-width: 1200px)
      width 15px
      height 15px
.action-button-x
  width auto
  label
    position absolute
    width 0
@media (max-width: 1700px)
  .action-button-s, .action-button-m
    label
      position absolute
      width 0
</style>