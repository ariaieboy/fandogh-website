<template>
  <div class="replica-containers">
    <h4>کانتینرها</h4>
    <div class="row">
      <div class="col-md-6 col-xs-12" v-for="item in items">
      <!-- color="item.color" -->
      <container-item  :name="item.name" :image="item.image" :state="item.ready"  />
    </div>
    </div>
  </div>
</template>

<script>
import containerItem from "./container-item";
export default {
  name: "replica-containers",
  components: {
    containerItem
  },
  props: {
    items: {
      type: Array
    }
  }
};
</script>

<style lang="stylus" scoped>
.replica-containers
  padding 0 15px
  border-bottom 1px solid #b5b5b5
  font-family yekan
</style>
