<template>
  <div class="replica-header">
    <label class="font-roboto">{{name}}</label>
    <i style="font-style: normal; color: #7f828b">|</i>
    <label v-if="state === 'Running'" :class="stateColor">{{state | state}}</label>
    <div
      v-if="state !== 'Running'"
      data-balloon-visible
      :data-balloon="state"
      data-balloon-pos="up"
    >
      <img src="./images/Ellipsis-2s-167px.svg" alt="ellipse">
    </div>
    <i style="font-style: normal; color: #7f828b">|</i>
    <label>
      <span>کانتینر آماده:</span>
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
      if (!this.state) return ''
      return this.state === "Running"
        ? "pending-text"
        : this.state === "Pendding"
          ? "success-text"
          : "error-text";
    }
  }
};
</script>
<style lang="stylus" scoped>
.replica-header
  display flex
  align-items center
  label
    margin-left 15px
    color rgb(79, 79, 79)
    text-align right
    font-size 14px
  i
    margin-left 15px
</style>
