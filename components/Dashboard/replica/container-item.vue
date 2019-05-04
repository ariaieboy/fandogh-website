<template>
  <div class="replica-containers-items">
    <div class="replica-containers-item">
      <strong>نام :</strong>
      <span>{{name}}</span>
    </div>
    <div class="replica-containers-item">
      <strong>ایمیج :</strong>
      <span>{{image}}</span>
    </div>
    <div class="replica-containers-item">
      <strong>وضعیت :</strong>
      <span>{{state | state}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "replica-containers-items",
  props: {
    name: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    state: {
      // type: String,
      default: ""
    },
    color: {
      type: String,
      default: "success-text" // error-text , pending-text
    }
  },
  filters: {
    state(value) {
      if (!value) return "";
      return value ? "آماده شده" : "آماده نشده";
    }
  },
  computed: {
    stateColor() {
      if (!this.state) return ''
      return this.state ? "success-text" : "error-text";
    },
  },
};
</script>

<style lang="stylus" scoped>
.replica-containers-items
  display flex
  flex-direction column
  font-family yekan
  overflow-x hidden
  .replica-containers-item
    strong
      margin-left 5px
    .elips
      display inline-block
      overflow hidden
      vertical-align middle
      text-overflow ellipsis
      white-space nowrap
      font-size 14px
      direction ltr
    span, strong
      color #4f4f4f
      text-align right
      font-style normal
      font-stretch normal
      font-size 14px
      line-height 3
</style>
