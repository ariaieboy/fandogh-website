<template>
    <div class="row center-md">
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
                    <div class="col-md-6  col-xs-12 col-sm-12">
                        <div class="plan-details">
                            <p>نام مشتری : بهروز میرزایی</p>
                            <p>نام فضا : Ide Negaran Bina</p>
                            <p>طرح انتخابی : {{plan.title}}</p>
                            <p>هزینه پلن : {{plan.price}} تومان</p>
                            <p>مالیات بر ارزش افزوده : {{tax}} تومان</p>
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-12 col-sm-12">
                        <div class="plan-box">
                            <div class="plan-inner">
                                <div class="plan-heading">
                                    <img :src="'/icons/plans/services-icon/' + plan.icon ">
                                    <h3>{{plan.title}}</h3>
                                </div>
                                <div class="plan-divider"></div>
                                <div class="plan-config">
                                    <div class="plan-information" v-for="config in configs">
                                        <span class="plan-image">
                                            <img :src="'/icons/plans/' + config.icon ">
                                        </span>
                                        <span class="plan-name">
                                            {{config.title}}
                                        </span>
                                        <span class="plan-info">
                                            {{config.value}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12  col-xs-12 col-sm-12">
                        <div class="plan-price">
                            <h3 class="plan-h3">مبلغ قابل پرداخت : {{addTaxToPrice}} تومان </h3>

                        </div>
                    </div>
                </div>
                <div class="row center-md">
                    <div class="col-md-10  col-xs-12 col-sm-12">
                        <div class="plan-payment">
                            <h3 class="plan-h3">
                                برای خرید این پلن لطفا مبلغ قابل پرداخت را به شماره حساب ۶۲۱۹-۸۶۱۰-۲۱۰۴-۲۳۱۳ واریز فرمایید و شماره پیگیری را برای support@fandogh.cloud ارسال کنید.
                            </h3>
                        </div>

                    </div>

                </div>
                <div class="row end-md">
                    <div class="col-md-12  col-xs-12 col-sm-12">
                        <div class="back-btn">
                            <f-button @onClick="$router.push('/dashboard/plans')" styles="red small login"> بازگشت </f-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FButton from "~/components/elements/button";

export default {
  components: {
    FButton
  },
  layout: "dashboard",
  data() {
    return {
      plan: {},
      configs: []
    };
  },
  mounted() {
    this.plan = this.$store.state.plan.plan;
    this.configs = this.$store.state.plan.configs;
  },
  computed: {
    addTaxToPrice: function() {
      const price = this.$store.state.plan.plan.price;
      const priceRaw = parseFloat(price.replace(/,/g, ""));
      const tax = Math.ceil(9 * priceRaw) / 100;
      const taxedPrice = tax + priceRaw;
      return taxedPrice.toLocaleString("fa-EG");
    },
    tax: function() {
      const price = this.$store.state.plan.plan.price;
      const priceInt = parseFloat(price.replace(/,/g, ""));
      const finalPrice = Math.ceil(9 * priceInt) / 100;
      return finalPrice.toLocaleString("fa-EG");
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