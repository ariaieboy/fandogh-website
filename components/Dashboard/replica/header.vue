<template>
  <div class="replica-header">
    <label class="font-roboto">{{name}}</label>
    <i>,</i>
    <label :class="stateColor">{{state | state}}</label>
    <i>,</i>
    <label>
      <span>کانتینر آماده :</span>
      {{count}}
    </label>
  </div>
</template>

<script>
export default {
  name: "replica-header",
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
      // type: Number,
      default: ""
    },
    count: {
      type: Number,
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
  }
};
</script>
<style lang="stylus" scoped>
.replica-header
  display flex
  label
    margin-left 15px
    color rgb(79, 79, 79)
    text-align right
    font-size 14px
  i
    margin-left 15px
</style>
