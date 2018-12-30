<template>
  <div class="row center-md" v-if="!loading">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <div class="plan">
        <div class="row">
          <div class="col-md-4">
            <img src="/icons/fandogh-logo.png">
          </div>
        </div>
        <div class="row center-md center-xs">
          <div class="col-md-6 col-xs-12 col-sm-12">
            <h2 class="plan-heading">صورت حساب شما</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-xs-12 col-sm-12">
            <div class="plan-details">
              <p>نام مشتری : {{username}}</p>
              <p>نام فضا : {{namespace}}</p>
              <p>طرح انتخابی : {{plan.title}}</p>
              <p>هزینه پلن : {{plan.price}}</p>
              <p>مالیات بر ارزش افزوده : {{tax}}</p>
            </div>
          </div>
          <div class="col-md-6 col-xs-12 col-sm-12">
            <div class="plan-box">
              <div class="plan-inner">
                <div class="plan-heading">
                  <img :src="'/icons/plans/services-icon/' + plan.icon ">
                  <h3>{{plan.title}}</h3>
                </div>
                <div class="plan-divider"></div>
                <div class="plan-config">
                  <div class="plan-information">
                    <span class="plan-image">
                      <img src="/icons/plans/cpu.png">
                    </span>
                    <span class="plan-name font-roboto">CPU</span>
                    <span class="plan-info">{{plan.cpu}}</span>
                  </div>
                  <div class="plan-information">
                    <span class="plan-image">
                      <img src="/icons/plans/ram.png">
                    </span>
                    <span class="plan-name font-roboto">RAM</span>
                    <span class="plan-info">{{plan.ram}}</span>
                  </div>
                  <div class="plan-information">
                    <span class="plan-image">
                      <img src="/icons/plans/storage.png">
                    </span>
                    <span class="plan-name font-roboto">STORAGE</span>
                    <span class="plan-info">{{plan.space}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-xs-12 col-sm-12">
            <div class="plan-price">
              <h3 class="plan-h3">{{addTaxToPrice}}</h3>
            </div>
          </div>
        </div>
        <div class="row center-md">
          <div class="col-md-10 col-xs-12 col-sm-12">
            <div class="plan-payment">
              <h3
                class="plan-h3"
              >برای خرید این پلن لطفا مبلغ قابل پرداخت را به شماره حساب ۶۲۱۹-۸۶۱۰-۲۱۰۴-۲۳۱۳ واریز فرمایید و شماره پیگیری را برای support@fandogh.cloud ارسال کنید.</h3>
            </div>
          </div>
        </div>
        <div class="row end-md">
          <div class="col-md-12 col-xs-12 col-sm-12">
            <div class="back-btn">
              <f-button @onClick="$router.push('/dashboard/plans')" styles="red small login">بازگشت</f-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FButton from "~/components/elements/button";
import { getValue } from "~/utils/cookie";

export default {
  components: {
    FButton
  },
  layout: "dashboard",
  data() {
    return {};
  },
  destroyed() { },
  mounted() {
    this.$store.commit("SET_DATA", { data: false, id: "loading" });
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    username() {
      return getValue("username");
    },
    namespace() {
      return getValue("namespace");
    },
    index() {
      return this.$route.params.id - 1;
    },
    plan() {
      return this.$store.state.plan.plans[this.index];
    },
    addTaxToPrice: function () {
      const price = parseInt(this.plan.price);
      if (price === 0) return "رایگان";
      const tax = Math.ceil(9 * price) / 100;
      const taxedPrice = tax + price;
      return `مبلغ قابل پرداختت ${taxedPrice.toLocaleString("fa-EG")} تومان`;
    },
    tax: function () {
      const price = parseInt(this.plan.price);
      if (price === 0) return "رایگان";
      const finalPrice = Math.ceil(9 * price) / 100;
      return `${finalPrice.toLocaleString("fa-EG")} تومان`;
    }
  }
};
</script>

<style lang="stylus" scoped>
.plan
  padding 45px
  background #ffffff
.plan-heading
  font-size 18px
  @media (max-width: 490px)
    font-size 16px
.plan-details
  display flex
  flex-direction column
  p
    margin-bottom 25px
    font-weight bold
    font-size 16px
    line-height 1.75
    @media (max-width: 490px)
      font-size 14px
.plan-box
  display inline-block
  max-width 100%
.plan-inner
  padding 60px 50px
  border-radius 10px
  background-color #ffffff
  box-shadow 0 0 6px 0 rgba(0, 0, 0, 0.16)
  @media (max-width: 490px)
    padding 50px
.plan-heading
  display flex
  flex-direction column
  justify-content center
  align-items center
  h3
    font-size 18px
    @media (max-width: 490px)
      font-size 14px
.plan-divider
  height 2px
  background-color #e7e8ea
.plan-config
  display flex
  flex-direction row
  justify-content space-around
  align-items center
  margin-top 25px
.plan-information
  display flex
  flex-direction column
  justify-content space-around
  align-items center
  font-size 16px
  @media (max-width: 490px)
    font-size 12px
.plan-information>span+span
  margin-top 10px
.plan-information+.plan-information
  margin-right 10px
.plan-image img
  width 30px
  @media (max-width: 490px)
    width 24px
.plan-price
  margin-top 60px
  border solid 1px #b5b5b5
  border-radius 10px
  background-color #f0f4f8
  text-align center
.plan-h3
  font-size 20px
  line-height 1.75
  @media (max-width: 490px)
    font-size 16px
.plan-payment
  padding 32px
  @media (max-width: 490px)
    font-size 14px
.back-btn
  display flex
.plan-name
  font-family 'Roboto'
.plan-info
  font-weight bold
  font-family 'Roboto'
</style>