<template>
  <div class="wrapper">
    <f-header noFixed="true" />
    <div class="container-fluid">
      <div class="row">
        <div class="wrapper-col" :class="{'col-lg-2':!showHalf , 'col-lg-0':showHalf}">
          <admin-sidebar />
        </div>
        <div class="wrapper-col" :class="{'col-xs-12 col-lg-10 pr-120':!showHalf,'col-xs-12':showHalf}">
          <div class="dash-container">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
    <notification />
    <alert />
  </div>
</template>

<script>
import FHeader from "~/components/Header";
import FFooter from "~/components/Footer";
import AdminSidebar from "~/components/Dashboard/sidebar";
import "normalize.css";
import Notification from "~/components/Dashboard/notification";
import Alert from "~/components/Dashboard/alert";
export default {
  components: {
    FHeader,
    FFooter,
    AdminSidebar,
    Notification,
    Alert
  },
  computed: {
    message() {
      return this.$store.state.message;
    },
    showHalf() {
      return this.$store.state.sidebar === 3;
    }
  },
  watch: {
    $route() {
      if (this.message) {
        this.$store.dispatch("setMessage", this.message);
        this.$store.dispatch("showModal", "message");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/css/main.styl'

$spaceTop = 45
// .wrapper-col
//     transition all 0.5s
.dash-container
  box-sizing border-box
  margin-top $spaceTop + 68px
  min-height calc(100vh - 68px)
.wrapper
  width 100%
  background #f0f4f8
// .admin-container
// display flex
// flex-flow row wrap
// justify-content flex-start
@media only screen and (max-width: 1230px)
  .dash-container
    margin 0
    margin-top $spaceTop + 60px
    width 100%
</style>
