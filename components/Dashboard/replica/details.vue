<template>
  <div class="replica-details">
    <div class="replica-details-item">
      <strong>نام :</strong>
      <span class="font-roboto">{{name}}</span>
    </div>
    <div class="replica-details-item">
      <strong>تاریخ ساخت :</strong>
      <span>{{FDate(date)}}</span>
    </div>
    <div class="replica-details-item">
      <strong>وضعیت :</strong>
      <span :class="stateColor">{{state | state}}</span>
    </div>
    <div class="replica-details-item">
      <strong>کانتینر آماده :</strong>
      <span class="success-text">{{count}}</span>
    </div>
  </div>
</template>

<script>
import FDate from "~/utils/date";

export default {
  name: "replica-details",
  props: {
    name: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "pending-text" // error-text , success-text
    },
    state: {
      type: String,
      default: "در حال انجام"
    },
    count: {
      type: Number,
      default: ""
    },
    date: {
      type: String,
      default: ""
    }
  },
  filters: {
    state(value) {
      if (!value) return "";
      return value === "Running"
        ? "در حال اجرا"
        : value === "Pendding"
        ? "درحال ساخت"
        : "نا مشخص";
    }
  },
  computed: {
    stateColor() {
      return this.state === "Running"
        ? "pending-text"
        : value === "Pendding"
        ? "success-text"
        : "error-text";
    }
  },
  methods: {
    FDate(value) {
      return FDate({ date: value });
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
