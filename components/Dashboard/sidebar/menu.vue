<template>
  <div class="sidebar-menu">
    <ul :style="{height:height+'px'}">
      <li>
        <router-link
          event="disabled"
          @click.native="closeMenu('/dashboard/images')"
          :to="{path:'/dashboard/images'}"
        ><img src="./icons/images.svg" /> ایمیج ها </router-link>
      </li>
      <li>
        <router-link
          event="disabled"
          @click.native="closeMenu('/dashboard/services')"
          :to="{path:'/dashboard/services'}"
        ><img src="./icons/services.svg" /> سرویس ها </router-link>
      </li>
      <!-- <li>
        <a href="#"><img src="./icons/managed_services.svg" /> سرویس های مدیریت شده </a>
      </li> -->
      <li>
        <router-link
          event="disabled"
          @click.native="closeMenu('/dashboard/domains')"
          :to="{path:'/dashboard/domains'}"
        ><img src="./icons/domain.svg" /> دامنه </router-link>
      </li>
      
      <li>
        <router-link
          event="disabled"
          @click.native="closeMenu('/dashboard/secret')"
          :to="{path:'/dashboard/secret'}"
        ><img src="./icons/strongbox.svg" /> سکرت‌ها </router-link>
      </li>
      
      <li>
        <router-link
          event="disabled"
          @click.native="closeMenu('/dashboard/plans')"
          :to="{path:'/dashboard/plans'}"
        ><img src="./icons/domain.svg" /> پلن‌های فندق </router-link>
      </li>
      <li>
        <a href="#"><img src="./icons/settings.svg" /> تنظیمات </a>
      </li>
      <li @click="logout">
        <a href="#"><img src="./icons/exit.svg" /> خروج </a>
      </li>

    </ul>
  </div>
</template>

<script>
import { getValue } from "~/utils/cookie";

export default {
  data() {
    return {
      height: 450
    };
  },
  mounted() {
    this.setHeight();
    var vm = this
    window.addEventListener("resize", function(e) {
      vm.setHeight(e);
    });
  },
  methods: {
    setHeight() {
      this.height = window.innerHeight - 490 + 42;
    },
    closeMenu(path) {
      // this.$store.dispatch("TOGGLE_NAV", {data:null,id:'sidebar'});
      this.$router.push(path);
    },
    logout(){
       this.$ga.event({
            eventCategory: "account",
            eventAction: "user logout dashboard",
            eventLabel: "username",
            eventValue: getValue("username")
        });
      this.$store.dispatch('logout')
      this.$router.push('/user/login')
    }
  }
};
</script>

<style lang="stylus" scoped>
.sidebar-menu
  margin 45px 0
  ul
    display inline-block
    overflow auto
    margin 0
    padding 0
    width 100%
    height 450px
    &::-webkit-scrollbar 
      width: 5px;
    /* Track */
    &::-webkit-scrollbar-track 
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    
    /* Handle */
    &::-webkit-scrollbar-thumb 
        background: #b5b5b5; 
        border-radius: 10px;
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover
        background: #bfbfbf; 
    li
      img
        margin-left 32px
        width 20px
        vertical-align middle
      list-style none
      a
        display inline-block
        box-sizing border-box
        padding 23px
        width 100%
        &.nuxt-link-active
          border-right #26c6ec 2px solid
          background-color rgba(0, 0, 0, 0.5)
</style>