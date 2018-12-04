<template>
  <div class="replica-header">
    <label class="font-roboto">{{name}}</label> <i>,</i>
    <label :class="color">{{state}}</label> <i>,</i>
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
      default: "Pod 1"
    },
    color :{
      type: String,
      default: "pending-text"   // error-text , success-text
    },
    state: {
      type: String,
      default: "در حال انجام"
    },
    count: {
      type: String,
      default: "2"
    }
  }
};
</script>
<style lang="stylus" scoped>
.replica-header
  display flex
  label 
    margin-left 15px
    font-size: 14px;
    text-align: right;
    color: rgb(79, 79, 79);
  i 
    margin-left 15px
</style>
