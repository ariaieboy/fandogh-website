<template>
  <div class="service-plan">
    <nuxt-child/>
    <div class="row">
      <h1 class="service-plan-heading">جز‌ئیات حساب شما</h1>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <f-active-plan-box v-if="activePlan">
          <f-active-plan
            :type="'نوع پلن'"
            :isActive="'activePlan.isActive'"
            :percent="percent"
            :title="'activePlan.title'"
            :memory_limit="activePlan.quota.memory_limit"
          />
        </f-active-plan-box>
      </div>
    </div>
    <div class="row">
      <h1 class="service-plan-heading">انتخاب پلن</h1>
    </div>
    <panel-box>
      <!-- :plan="service.plan"
      :configs="service.configs"-->
      <!-- :isShow="index === isShow"
            @toggle="toggle(index)"
            :tooltipShow="index === tooltipShow"
      @clickInfo="clickInfo(index)"-->
      <f-panels :items="services"/>
    </panel-box>
  </div>
</template>

<script>
import PanelBox from "~/components/Dashboard/plans/panel-box/section-box.vue";
import FPanels from "~/components/Dashboard/plans/panel-box";
import FActivePlan from "~/components/Dashboard/plans/active-plan/panel";
import FActivePlanBox from "~/components/Dashboard/plans/active-plan";
import { getValue } from "~/utils/cookie";

export default {
  layout: "dashboard",
  name: "plans",
  components: {
    PanelBox,
    FPanels,
    FActivePlan,
    FActivePlanBox
  },
  data() {
    return {
      tooltipShow: -1,
      isShow: -1,
      services: [
        {
          icon: "bicycle.png",  // to see  more icons open dir : ROOT/static/icons/plans/services-icon
          title: "مفتی",
          price: "رایگان",
          cpu: "Unknown",
          ram: "400MB",
          space: "2GB"
        }
      ]
    };
  },
  computed: {
    namespace() {
      return getValue("namespace");
    },
    activePlan() {
      return this.$store.state.activePlan;
    },
    percent() {
      let percent = Math.round(
        (this.activePlan.current_used_resources.memory_usage /
          this.activePlan.quota.memory_limit) *
          100
      );
      return percent.toString();
    }
  },

  methods: {
    clickInfo(index) {
      if (index === this.tooltipShow) {
        this.tooltipShow = -1;
        return;
      }
      this.tooltipShow = index;
    },
    toggle(index) {
      if (index === this.isShow) {
        this.isShow = -1;
        return;
      }
      this.isShow = index;
    }
  },
  mounted() {
    this.$store.dispatch("getNameSpace", this.namespace);
  }
};
</script>


<style lang="stylus" scoped>
.service-plan-heading
  padding 45px 31px
  color #000000
  font-weight bold
  font-size 18px
@font-face
  font-style normal
  font-family roboto-bold
  src url('~/assets/fonts/Roboto-Bold.ttf')
@font-face
  font-style normal
  font-family roboto
  src url('~/assets/fonts/Roboto-Regular.ttf')
</style>
