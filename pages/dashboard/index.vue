<template>
  <div class="dashboard-home" v-if="!loading">
    <f-loading id="my-chart" :isFull="true" v-if="isLoading"/>
    <div class="dashboard-home-panel-chart">
      <div class="row">
        <div class="col-lg-4 col-sm-12 col-xs-12">
          <f-charts :data="serviceUsage" unit="مگابایت" :colors="['#086375','#3ccc38']"/>
        </div>
        <div class="col-lg-4 col-sm-12 col-xs-12">
          <f-charts
            class="pr-lg-25"
            title="Volume"
            :data="volumeUsage"
            unit="گیگابایت"
            :colors="['#086375','#3ccc38']"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <f-images/>
      </div>
      <div class="col-lg-6 col-xs-12">
        <f-services/>
      </div>
      <div class="col-lg-6 col-xs-12">
        <f-domains/>
      </div>
      <div class="col-lg-6 col-xs-12">
        <f-secrets/>
      </div>
    </div>
  </div>
</template>

<script>
import FLoading from "~/components/Loading";
import FImages from "~/components/Dashboard/home/images.vue";
import FServices from "~/components/Dashboard/home/services.vue";
import FDomains from "~/components/Dashboard/home/domains.vue";
import FSecrets from "~/components/Dashboard/home/secrets.vue";
import FCharts from "~/components/Dashboard/home/usage.vue";

export default {
  name: "dashboard-home",
  layout: "dashboard",
  components: {
    FLoading,
    FImages,
    FServices,
    FDomains,
    FSecrets,
    FCharts
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    badgsService() {
      return this.$store.state.dashboard.badgsService;
    },
    serviceUsage() {
      const used = this.$store.state.activePlan.current_used_resources
        .memory_usage;
      const free = this.$store.state.activePlan.quota.memory_limit - used;
      const usage = [free, used];
      return usage;
    },
    volumeUsage() {
      const used = this.$store.state.activePlan.current_used_resources
        .volume_usage;
      const free = this.$store.state.activePlan.quota.volume_limit - used;
      const usage = [free, used];
      return usage;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  destroyed() {
    this.$store.commit("SET_DATA", { data: null, id: "images" });
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch("getNameSpace", "ns");
        await this.$store.dispatch("getImages");
        await this.$store.dispatch("getServices");
        await this.$store.dispatch("getDomains");
        await this.$store.dispatch("getSecret");

        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      } catch (e) {
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
        if (e.status === 401) {
          this.$router.push("/user/login");
        } else {
          this.$notify({
            title: e.data.message,
            time: 4000,
            type: "error"
          });
        }
      }
    }
  }
};
</script>

<style lang="stylus">
convas
  width 150px
  height 150px
.dashboard-home
  &-sum
    padding 15px 15px 0 15px
    span
      color #333
      font-size 14px
  &-title
    display flex
    align-items center
    span
      margin-right 10px
      font-size 14px
    a
      flex-flow 1
      margin-right auto
      padding 15px 0
      width 120px
      border-radius 5px
      background-color #982649
      box-shadow 0 2px 6px 0 rgba(152, 38, 73, 0.42)
      color #fff
      text-align center
      font-size 12px
  &-panel-chart
    margin-bottom 45px
    padding 15px
    border-radius 10px
    background-color #ffffff
    box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
  &-wrapper
    margin-bottom 45px
    padding 15px
    // min-height 388px
    border-radius 10px
    background-color #ffffff
    box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
  &-header
    padding 0 15px 15px 15px
    font-family 'Roboto', yekan, sans-serif
  &-table
    overflow auto
    margin 0 auto
    width 100%
    height 250px
    font-family 'Roboto', yekan, sans-serif
    table
      width 100%
      border none
      border-spacing 0
      border-collapse collapse
    thead
      th
        padding 0 5px
        height 45px
        background-color #f0f0f0
        color #aaaaaa
        font-weight inherit
        font-size 14px
    tbody
      tr
        td
          padding 0 5px
          // width 21%
          height 45px
          border-bottom 1px solid rgba(0, 0, 0, 0.25)
          color #333
          text-align center
          font-size 14px
          @media only screen and (max-width: 1230px)
            padding 0 30px
          @media only screen and (max-width: 991.99px)
            width auto
        &:last-child
          td
            border-bottom none
      .badg-state
        display flex
        justify-content center
        align-items center
        padding 5px
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
      .ellipsis > div
        display inline-block
        overflow hidden
        width 120px
        text-align center
        text-overflow ellipsis
        white-space nowrap
        @media (max-width: 991.99px)
          width auto
          text-align right
@media (max-width: 991.99px)
  .dashboard-home-table .b-table.b-table-stacked-lg > tbody > tr > [data-label]::before
    padding 5px 15px
    background-color #f0f0f0
  .dashboard-home-table .b-table.dashboard-home-table .b-table-stacked-lg > tbody > tr > [data-label]::before
    color #aaaaaa
  .dashboard-home-table .b-table.dashboard-home-table .b-table-stacked-lg > tbody > tr td:last-child
    border-bottom 1px dotted #160074
  .dashboard-home-table .b-table.dashboard-home-table .b-table-stacked-lg > tbody > tr > [data-label]
    text-align right
    font-size 12px
@media (max-width: 991.99px)
  .dashboard-home-table .b-table.dashboard-home-table .b-table-stacked-lg > tbody > tr > [data-label]::before
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    font-size 11px
  .dashboard-home-table tbody tr td
    text-align right
  .dashboard-home-table .b-table thead th, .dashboard-home-table .b-table tbody td
    padding 5px 0
    height auto
</style>
