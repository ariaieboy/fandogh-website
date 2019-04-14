<template>
  <div class="notification-box">
    <notification v-for="(option, index) in notifications" :key="index" :option="option"></notification>
  </div>
</template>

<script>
import Notification from "./notification";
import Vue from "vue";
export default {
  components: {
    Notification
  },
  created() {
    Vue.prototype.$notify = this.notify;
  },
  data() {
    return {
      notifications: []
    };
  },
  methods: {
    notify(options) {
      this.notifications.push(options);
    }
  }
};
</script>

<style lang="stylus" scoped >
.notification-box
  position fixed
  bottom 100px
  left 20px
</style>
