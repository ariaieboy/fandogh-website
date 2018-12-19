<template>
  <div class="row">
    <div class="col-md-6 col-sm-12 col-xs-12" v-for="(item,index) in items" :key="index">
      <f-panel
        :icon="item.icon"
        :title="item.title"
        :price="item.price"
        :space="item.space"
        :ram="item.ram"
        :cpu="item.cpu"
        :isShow="index === isShow"
        @toggle="toggle(index)"
        :tooltipShow="index === tooltipShow"
        @clickInfo="clickInfo(index)"
        :list="item.list"
        :description="item.description"
        @onClick="pushUrl(index)"
      />
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
  },
  data() {
    return {
      tooltipShow: -1,
      isShow: -1
    };
  },
  methods: {
    clickInfo(index) {
   
      if (index === this.tooltipShow) {
        this.tooltipShow = -1;
        return;
      }
      this.tooltipShow = index;
    },
    toggle(index) {
      if (index === this.isShow) {
        this.isShow = -1;
        return;
      }
      this.isShow = index;
    },
    pushUrl(index){
      this.$ga.event({
          eventCategory: "plan",
          eventAction: "click plan",
          eventLabel: "plan index",
          eventValue: index 
      });
      this.$router.push(`/dashboard/plans/${index + 1}`);
    }
  }
};
</script>