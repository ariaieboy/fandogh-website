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
  border-radius 5px
  background #eaf0f7
  color #4f4f4f
  font-size 12px
  @media (max-width: 1200px)
    max-height 120px
    padding 5px
    margin 5px
  &.disabled
    pointer-events none
    label
      color rgb(212, 212, 212)
  label
    cursor pointer
    display inline-block
    overflow hidden
    width 100px
    vertical-align middle
    transition all ease 0.5s
  // &:hover
  //   label
  //     width 100px
  img
    width 16px
    height 16px
    vertical-align middle
    @media (max-width: 1200px)
      width 15px
      height 15px
@media (max-width: 992px)
  .action-button-m
    label
      width 0
      position absolute
@media (max-width: 1200px)
  .action-button-s
    label
      width 0
      position absolute
</style>