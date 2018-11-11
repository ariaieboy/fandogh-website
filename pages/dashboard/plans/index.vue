<template>
  <div class="service-plan">
    <nuxt-child />
    <div class="row">
      <h1 class="service-plan-heading">جز‌ئیات حساب شما</h1>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <active-plan-box>
          <ActivePlan :plan="activePlan.plan" :configs="activePlan.configs" />
        </active-plan-box>
      </div>
    </div>
    <div class="row">
      <h1 class="service-plan-heading">انتخاب پلن</h1>
    </div>
    <panel-box>
      <div class="row">
        <div class="col-md-6 col-sm-12 col-xs-12" v-for="service,index in services">
          <Panel :plan="service.plan" :configs="service.configs" :isShow="index === isShow" @toggle="toggle(index)" :tooltipShow="index === tooltipShow" @clickInfo="clickInfo(index)" />
        </div>
      </div>
    </panel-box>
  </div>
</template>

<script>
import PanelBox from "~/components/Dashboard/plans/panel-box";
import Panel from "~/components/Dashboard/plans/panel-box/panel";
import ActivePlan from "~/components/Dashboard/plans/active-plan/panel";
import ActivePlanBox from "~/components/Dashboard/plans/active-plan";

export default {
  layout: "dashboard",
  name: "plans",
  data() {
    return {
      tooltipShow: -1,
      isShow: -1,
      activePlan: {
        plan: {
          icon: "blimp.png",
          title: "پلن فعلی",
          price: "پلن 2 "
        },
        configs: [{ title: "RAM", value: "2GB", icon: "ram.png" }]
      },
      services: [
        {
          plan: { icon: "bicycle.png", title: "مفتی", price: "رایگان" },
          configs: [
            { title: "CPU", value: "Unknown", icon: "cpu.png" },
            { title: "RAM", value: "400MB", icon: "ram.png" },
            { title: "STORAGE", value: "2GB", icon: "storage.png" }
          ]
        },
        {
          plan: { icon: "sail-boat.png", title: "پلن 1", price: "99,000" },
          configs: [
            { title: "CPU", value: "0.5Core", icon: "cpu.png" },
            { title: "RAM", value: "1GB", icon: "ram.png" },
            { title: "STORAGE", value: "5GB", icon: "storage.png" }
          ]
        },
        {
          plan: {
            icon: "blimp.png",
            title: "پلن 2",
            price: "190,000",
            isActive: true
          },
          configs: [
            { title: "CPU", value: "1Core", icon: "cpu.png" },
            { title: "RAM", value: "2GB", icon: "ram.png" },
            { title: "STORAGE", value: "10GB", icon: "storage.png" }
          ]
        },
        {
          plan: { icon: "helicopter.png", title: "پلن 3", price: "390,000" },
          configs: [
            { title: "CPU", value: "2Core", icon: "cpu.png" },
            { title: "RAM", value: "4GB", icon: "ram.png" },
            { title: "STORAGE", value: "20GB", icon: "storage.png" }
          ]
        },
        {
          plan: { icon: "rocket.png", title: "پلن 4", price: "1,500,000" },
          configs: [
            { title: "CPU", value: "8Core", icon: "cpu.png" },
            { title: "RAM", value: "16GB", icon: "ram.png" },
            { title: "STORAGE", value: "40GB", icon: "storage.png" }
          ]
        },
        {
          plan: { icon: "truck.png", title: "پلن 5", price: "تماس بگیرید" },
          configs: [
            { title: "CPU", value: "-", icon: "cpu.png" },
            { title: "RAM", value: "-", icon: "ram.png" },
            { title: "STORAGE", value: "-", icon: "storage.png" }
          ]
        }
      ]
    };
  },
  components: {
    PanelBox,
    Panel,
    ActivePlan,
    ActivePlanBox
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
