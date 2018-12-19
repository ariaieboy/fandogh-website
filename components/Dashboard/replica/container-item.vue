<template>
  <div class="replica-containers-items">
    <div class="replica-containers-item">
      <strong>نام :</strong>
      <span class="font-roboto ">{{name}}</span>
    </div>
    <div class="replica-containers-item">
      <strong>ایمیج :</strong>
      <span class="font-roboto elips">{{image}}</span>
    </div>
    <div class="replica-containers-item">
      <strong>وضعیت :</strong>
      <span :class="color">{{state}}</span>
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
  }
};
</script>

<style lang="stylus" scoped>
.replica-containers-items
  display flex
  flex-direction column
  font-family yekan
  .replica-containers-item
    strong
        margin-left 5px
    .elips
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        vertical-align: middle;
        display: inline-block;
        white-space: nowrap;
        width: 200px;
        direction ltr
    span, strong
        color #4f4f4f
        text-align right
        font-style normal
        font-stretch normal
        font-size 14px
        line-height 3
</style>
