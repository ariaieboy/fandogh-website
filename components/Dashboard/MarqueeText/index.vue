<template>
  <div>
    <span v-if="text.length <= count">{{text}}</span>
    <marquee v-else scrolldelay="100">{{text}}</marquee>
  </div>
</template>

<script>
export default {
  name: 'marquee-text',
  props: {
    count: {
      type: Number,
      default: 10
    },
    text: {
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped>
</style>