<template>
  <div class="chart">
    <div class="chart-item">
      <img :src="require('~/static/icons/plans/'+id+'.png')" alt>
      <p class="chart-type font-roboto">{{id}}</p>
      <p class="chart-size font-roboto">{{size}}</p>
    </div>
    <div class="chart-circle">
      <r-chart :id="id" :stop="stop" :startColor="startColor" :endColor="endColor"/>
    </div>
  </div>
</template>

<script>

import RChart from './chart'
export default {
  name: 'wallet-chart',
  props: {
    stop: {
      type: Number,
      default: 0.1
    },
    size: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'progress'
    },
    startColor: {
      type: String,
      default: '#4fa8fd'
    },
    endColor: {
      type: String,
      default: '#00e3dc'
    }
  },
  components: {
    RChart
  }
}
</script>

<style lang="stylus" scoped>
.chart
  display flex
  &-item
    display flex
    flex-direction column
    justify-content center
    align-self center
    align-content center
    text-align center
    img
      display flex
      align-self center
  &-type, &-size
    font-weight bold
    font-size 16px
    line-height 0
</style>


