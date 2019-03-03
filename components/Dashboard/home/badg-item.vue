<template>
  <div class="chart-badg">
    <i :style="{'background-color':badgColor}"></i>
    <span>{{badgLabel}} : {{badgValue}}</span>
  </div>
</template>

<script>
export default {
  name: 'badgItem',
  props: {
    badgColor: {
      type: String,
      default: ''
    },
    badgLabel: {
      type: String,
      default: ''
    },
    badgValue: {
      type: String,
      default: ''
    },
  }
}
</script>

<style scoped>
</style>