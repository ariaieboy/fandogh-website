<template>
  <div class="row">
    <div class="col-md-6 col-sm-12 col-xs-12" v-for="(item,index) in items" :key="index">
      <f-panel  :icon="item.icon" :title="item.title" :price="item.price" :space="item.space" :ram="item.ram" :cpu="item.cpu" />
    </div>
  </div>
</template>

<script>
import FPanel from "./panel";
export default {
  name: "panel-list",
  components: {
    FPanel
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
</style>