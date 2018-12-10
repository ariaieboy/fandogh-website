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
      <f-panels :items="allPlan"/>
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
  computed: {
    namespace() {
      return getValue("namespace");
    },
    allPlan() {
      return this.$store.state.plan.plans;
    },
    activePlan() {
      return this.$store.state.plan.activePlan;
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
  mounted() {
    this.$store.dispatch("plan/getNameSpace", this.namespace);
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
