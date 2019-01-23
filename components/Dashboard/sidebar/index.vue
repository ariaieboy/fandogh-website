<template>
  <div :class="{'show-half':!showHalf}" class="admin-sidebar">
    <closeHalf/>
    <profile/>
    <namespace/>
    <my-plan/>
    <sidebar-menu/>
  </div>
</template>

<script>
import Profile from "./profile";
import Namespace from "./namespace";
import SidebarMenu from "./menu";
import MyPlan from "./myPlan";
import closeHalf from "./close-half";
export default {
  components: {
    Profile,
    closeHalf,
    Namespace,
    SidebarMenu,
    MyPlan
  },
  computed: {
    sidebar() {
      return this.$store.state.sidebar === "navbar";
    },
    showHalf() {
      return this.$store.state.sidebar === "halfSidebar";
    },
    isMobile() {
      return this.$store.state.windowWidth <= 1230;
    }
  },
  watch: {
    isMobile(val) {
      if (val) {
        this.$store.dispatch("TOGGLE_NAV", { data: null, id: "sidebar" });
      }
    }
  },
  mounted() {
    var vm = this;
    window.addEventListener("resize", function (e) {
      vm.setSize(e);
    });
    if (process.browser) {
      this.setDefaultSize();
    }
  },
  methods: {
    setSize(e) {
      this.$store.dispatch("SET_SIZE", {
        width: window.innerWidth,
        height: window.innerHeight
      });
    },
    setDefaultSize(e) {
      this.$store.dispatch("SET_SIZE", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      if (this.isMobile) {
        this.$store.dispatch("TOGGLE_NAV", { data: null, id: "sidebar" });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.admin-sidebar
  position fixed
  top 68px
  right 0
  z-index 9999
  width 350px
  height 100vh
  background-image linear-gradient(to bottom, rgb(47, 30, 161), rgb(11, 0, 58))
  box-shadow -2px 0 6px 0 rgba(21, 0, 113, 0.36)
  transition all ease 0.5s
  @media only screen and (max-width: 768px)
    width 100%
  &.show-half
    right -350px
    @media only screen and (max-width: 768px)
      right -100%
@media only screen and (max-width: 1230px)
  .admin-sidebar
    top 60px
    // &.show-half
    // right -300px
</style>
