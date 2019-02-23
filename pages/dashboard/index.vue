<template>
  <div class="dashboard-home" v-if="!loading">
    <f-loading :isFull="true" v-if="isLoading"/>
    <div class="row">
      <div class="col-md-6">
        <f-imaages/>
      </div>
      <div class="col-md-6">
        <f-services/>
      </div>
      <div class="col-md-6">
        <f-domains/>
      </div>
      <div class="col-md-6">
        <f-secrets/>
      </div>
    </div>
  </div>
</template>

<script>
import FLoading from "~/components/Loading";
import FImaages from "~/components/Dashboard/home/images.vue";
import FServices from "~/components/Dashboard/home/services.vue";
import FDomains from "~/components/Dashboard/home/domains.vue";
import FSecrets from "~/components/Dashboard/home/secrets.vue";

export default {
  name: "dashboard-home",
  layout: "dashboard",
  components: {
    FLoading,
    FImaages,
    FServices,
    FDomains,
    FSecrets
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
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
    height 450px
    font-family 'Roboto', yekan, sans-serif
    table
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
          width 21%
          height 45px
          border-bottom 1px solid rgba(0, 0, 0, 0.25)
          color #333
          text-align center
          font-size 14px
        &:last-child
          td
            border-bottom none
      .ellipsis > div
        display inline-block
        overflow hidden
        width 120px
        text-align center
        text-overflow ellipsis
        white-space nowrap
</style>
