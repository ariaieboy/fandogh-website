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

<style lang="stylus" scoped>
@import '../../../assets/css/variables.styl'

.action-button
  display inline-flex
  justify-content center
  align-self center
  align-items center
  margin 0 5px
  padding 0 10px
  height 32px
  border-radius 5px
  background #eaf0f7
  color #4f4f4f
  cursor pointer
  @media only screen and (max-width: 992px)
    display flex
    align-content center
    margin-bottom 5px
  @media only screen and (max-width: 1200px) and (min-width: 992px)
    img
      margin-left 0 !important
    label
      display none
  &.disabled
    pointer-events none
  label
    font-weight 100
    font-size 14px
  img
    margin-left 10px
    width 15px
    height 15px
.action-button-x
  img
    margin-left 0
  label
    display none
@media only screen and (min-width: $sizeMd)
  .is-small
    .action-button
      img
        margin-left 0
      label
        display none
</style>
