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
  margin 15px
  margin-right 8px
  padding 8px
  border-radius 5px
  background #eaf0f7
  color #4f4f4f
  font-size 12px
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
  &:hover
    label
      width 100px
  img
    width 16px
    height 16px
    vertical-align middle
@media (max-width: 992px)
  .action-button
    label
      width 0
</style>