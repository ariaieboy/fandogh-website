<template>
  <div class="empty">
    <img src="./images/ic_es_services.svg" alt="services">
    <label>{{title}}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "empty",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="stylus" scoped>
.empty
  display flex
  flex-direction column
  justify-content center
  align-items center
  min-height 633px
  border-radius 10px
  img
    width 193.6px
    height 163.9px
  label
    margin 90px 0 30px 0
    color rgb(160, 160, 160)
    font-size 18px
</style>
