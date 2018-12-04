<template>
  <div class="replica-containers-items">
    <div class="replica-containers-item">
      <strong>نام :</strong>
      <span class="font-roboto">{{name}}</span>
    </div>
    <div class="replica-containers-item">
      <strong>ایمیج :</strong>
      <span class="font-roboto">{{image}}</span>
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
      default: "PHPMyadmin"
    },
    image: {
      type: String,
      default: "PHPMyadmin/PHPMyadmin"
    },
    state: {
      type: String,
      default: "ساخته شده"
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
    span, strong
        color #4f4f4f
        text-align right
        font-style normal
        font-stretch normal
        font-size 14px
        line-height 3
</style>
