<template>
  <div class="chart">
    <div class="chart-label">
      <img :src="require('~/static/img/icons/'+icon+'')" :alt="icon">
      <label>{{title}}</label>
    </div>
    <div class="chart-items">
      <div class="chart-info">
        <f-badg badg-color="#086375" badg-label="آزاد" :badg-value="data[0] + ' ' + unit"/>
        <f-badg badg-color="#3ccc38" badg-label="مصرف شده" :badg-value="data[1] + ' ' + unit"/>
      </div>
      <div class="chart-canvas">
        <usage-chart :colors="colors" :data="data" :labels="labels"></usage-chart>
      </div>
    </div>
  </div>
</template>

<script>
import FButton from "~/components/elements/button";
import UsageChart from "~/components/Dashboard/chart/UsageChart";
import ActionButton from "~/components/Dashboard/table/action-button";
import FEmpty from "~/components/Dashboard/empty";
import FLoading from "~/components/Loading";
import FBadg from "./badg-item";

export default {
  layout: "dashboard",

  props: {
    unit: {
      type: String,
      default: "مگابایت"
    },
    title: {
      type: String,
      default: "آمار سرویس‌ها"
    },

    icon: {
      type: String,
      default: "ic_services.svg"
    },
    colors: {
      type: Array,
      default: () => {
        return ["blue", "red"];
      }
    },
    labels: {
      type: Array,
      default: () => {
        return ["آزاد", "مصرف شده"];
      }
    },
    data: {
      type: Array,
      default: () => {
        return [40, 30];
      }
    }
  },
  components: {
    FBadg,
    FLoading,
    FButton,
    ActionButton,
    FEmpty,
    UsageChart
  }
};
</script>

<style lang="stylus" scoped>
.chart
  display flex
  flex-direction column
  &-label
    display flex
    align-items center
    margin-bottom 25px
    img
      margin-left 10px
    span
      color #333333
      font-size 12px
  &-items
    display flex
  &-canvas
    margin-right 10%
    margin-left 30px
  &-info
    display flex
    flex-wrap wrap
    align-items center
    max-width 300px
</style>
