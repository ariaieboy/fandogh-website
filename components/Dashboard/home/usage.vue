<template>
  <div class="chart">
    <div class="chart-info">
      <div class="chart-label">
        <img :src="require('~/static/img/icons/'+icon+'')" alt>
        <label>{{title}}</label>
      </div>
      <div class="chart-badg">
        <i :style="{'background-color':badgColor}"></i>
        <span>{{ badgLabel}}</span>
      </div>
    </div>
    <usage-chart :colors="colors" :data="data" :labels="labels"></usage-chart>
  </div>
</template>

<script>
import FButton from "~/components/elements/button";
import UsageChart from "~/components/Dashboard/chart/UsageChart";
import ActionButton from "~/components/Dashboard/table/action-button";
import FEmpty from "~/components/Dashboard/empty";
import FLoading from "~/components/Loading";

export default {
  layout: "dashboard",
  props: {
    title: {
      type: String,
      default: 'آمار سرویس‌ها'
    },
    badgColor: {
      type: String,
      default: '#3ccc38'
    },
    badgLabel: {
      type: String,
      default: 'درحال اجرا'
    },
    icon: {
      type: String,
      default: 'ic_services.svg'
    },
    colors: {
      type: Array,
      default: () => {
        return [
          'blue', 'red'
        ]
      }
    },
    labels: {
      type: Array,
      default: () => {
        return [
          'آزاد', 'مصرف شده'
        ]
      }
    },
    data: {
      type: Array,
      default: () => {
        return [
          40, 30
        ]
      }
    }
  },
  components: {
    FLoading,
    FButton,
    ActionButton,
    FEmpty,
    UsageChart,
  }
};
</script>

<style lang="stylus" scoped>
.chart
  display flex
  &-label
    display flex
    align-items center
    margin-bottom 25px
    img
      margin-left 10px
  &-badg
    display flex
    justify-content center
    align-items center
    padding 5px
    max-width 128px
    border-radius 16px
    background-color #f0f0f0
    i
      margin-left 5px
      width 10px
      height 10px
      border-radius 100%
      &.success-circle
        background-color #3ccc38
      &.pending-circle
        background-color #24d5d8
      &.error-circle
        background-color #fd3259
    span
      color #333333
      font-size 12px
</style>
