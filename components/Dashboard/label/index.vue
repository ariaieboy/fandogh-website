<template>
  <div @click="e => $emit('onClick', e)" class="label">
    <div class="label-title">
      {{title}}
    </div>
    <div class="label-input">
      {{value}}
    </div>
  </div>
</template>

<script>
  export default {
    props:['title', 'value']
  }
</script>

<style scoped lang="stylus">
  .label
    width 100%
    display flex
    align-items center
    div
      font-family yekan
      font-size 12px

    .label-input
      margin-right 16px
      font-family Roboto, sans-serif
      padding 8px
      flex-grow 1
      border-radius 10px
      background-color #ffffff
      border solid 1px #e7e8ea
      color #296bdd
      text-align center

</style>