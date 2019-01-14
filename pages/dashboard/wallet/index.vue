<template>
  <div class="wallet">
    <h2>کیف پول شما</h2>
    <div class="row">
      <div class="col-xs-12" :class="{'col-md-10':showHalf,'col-md-7':!showHalf}">
        <r-box-parent>
          <r-box>
            <div class="wallet-items">
              <div class="wallet-item">
                <r-plan/>
              </div>
              <div class="wallet-item">
                <r-plan-cahrt id="cpu" :stop="0.6" startColor="#4fa8fd" endColor="#00e3dc"/>
              </div>
              <div class="wallet-item">
                <r-plan-cahrt id="ram" :stop="0.5" startColor="#fea6ac" endColor="#f8608e"/>
              </div>
              <div class="wallet-item">
                <r-plan-cahrt id="storage" :stop="0.1" startColor="#4010af" endColor="#220286"/>
              </div>
            </div>
          </r-box>
        </r-box-parent>
      </div>
    </div>
  </div>
</template>

<script>
import RBoxParent from "~/components/Dashboard/wallet/box-parent"
import RBox from "~/components/Dashboard/wallet/box"
import RPlan from "~/components/Dashboard/wallet/plan"
import RPlanCahrt from "~/components/Dashboard/wallet/plan-chart"
export default {
  name: 'wallet',
  layout: "dashboard",
  components: {
    RBoxParent,
    RBox,
    RPlan,
    RPlanCahrt
  },
  computed: {
    showHalf() {
      return this.$store.state.sidebar === "halfSidebar";
    }
  },
  mounted() {
    this.$store.commit("SET_DATA", { data: false, id: "loading" });
  },
}
</script>

<style lang="stylus" scoped>
.wallet
  height 1200px
  &-items
    display flex
  &-item
    padding 0 35px
    border-left 1px solid #e7e8ea
    &:first-child
      padding-right 0
    &:last-child
      padding-left 0
      border-left none
</style>
