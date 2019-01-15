<template>
  <div class="charge">
    <div class="charge-input">
      <label>شارژ کیف پول (تومان)</label>
      <input type="text" placeholder="مبلغ مورد نظر را به تومان وارد کنید">
      <i class="charge-calculator">
        <span
          data-balloon-visible
          data-balloon="محاسبه‌گر پلن ساعتی  راهنمای محاسبه‌ی دقیق هزینه‌ها بر اساس میزان استفاده منابع"
          data-balloon-pos="down"
          data-balloon-length="medium"
        >
          <img src="~/assets/svg/calculator.svg" alt="icon">
        </span>
      </i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wallet-charge'
}
</script>

<style lang="stylus" scoped>
.charge
  display flex
  padding 0 25px
  &-input
    position relative
    display flex
    flex-direction column
    width 100%
    label
      margin-bottom 1px
      font-size 14px
    &::-webkit-input-placeholder
      color #47494e
      text-align right
      font-size 12px
    &:-moz-placeholder
      color #47494e
      text-align right
      font-size 12px
    input
      padding 15px
      width 100%
      border solid 1px #e7e8ea
      border-radius 10px
      background-color #ffffff
      color #000
      color #47494e
      font-size 14px
  &-calculator
    position absolute
    bottom 7px
    left -13px
    display flex
    justify-content center
    width 32px
    height 32px
    border-radius 100%
    background-image linear-gradient(272deg, #00e3dc, #4fa8fd)
    box-shadow 0 3px 26px 0 rgba(33, 203, 235, 0.4)
    -webkit-backdrop-filter blur(30px)
    backdrop-filter blur(30px)
    [data-balloon]:after
      border-radius 10px
      background-color #3a3c40
      color #fbfbfb
      text-align center
      line-height 1.5
    span
      display flex
      justify-content center
    img
      align-self center
</style>
