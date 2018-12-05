<template>
  <div class="replica-details">
    <div class="replica-details-item">
      <strong>نام :</strong>
      <span class="font-roboto">{{name}}</span>
    </div>
    <div class="replica-details-item">
      <strong>تاریخ ساخت :</strong>
      <span>{{date}}</span>
    </div>
    <div class="replica-details-item">
      <strong>وضعیت :</strong>
      <span :class="color">{{state}}</span>
    </div>
    <div class="replica-details-item">
      <strong>کانتینر آماده :</strong>
      <span class="success-text">{{count}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "replica-details",
  props: {
    name: {
      type: String,
      default: "db-ijsdjdaijd-2r5242"
    },
    color: {
      type: String,
      default: "pending-text"   // error-text , success-text
    },
    state: {
      type: String,
      default: "در حال انجام"
    },
    count: {
      type: String,
      default: "۲۲"
    },
    date: {
      type: String,
      default: "۲۲ / اردیبهشت / ۱۳۹۷"
    }
  }
};
</script>

<style lang="stylus" scoped>
.replica-details
  display flex
  flex-direction column
  padding 0 15px
  border-bottom 1px solid #b5b5b5
  &-item
    strong 
      margin-left 5px
    span, strong
      color #4f4f4f
      text-align right
      font-style normal
      font-stretch normal
      font-size 14px
      font-family yekan
      line-height 2
</style>
