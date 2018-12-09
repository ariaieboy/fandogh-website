<template>
    <div class="sidebar" :class="{'show-sidebar-navbar': sidebar}">
        <div class="row sidebar-heading no-margin">
            <div class="col-xs-6">
                <a href="#" @click.prevent="toggleMenu" class="close">
                    <img alt="close icon" :src="require('../../assets/svg/ic_close.svg')" />
                </a>
            </div>
            <div class="col-xs-6">
                <div class="logo">
                    <logo  />
                </div>
            </div>
        </div>
        <div class="navs">
            <ul>
                <li>
                    <a href="/">
                        صفحه اصلی
                    </a>
                </li>
                <li>
                    <a @click="toggleMenu" href="#prices"> سرویس ها</a>
                </li>
                <li>
                    <a rel="noopener" target="_blank" href="https://docs.fandogh.cloud">
                        مستندات
                    </a>
                </li>
                <li>
                    <a rel="noopener" target="_blank" href="http://blog.fandogh.cloud/">
                        وبلاگ
                    </a>
                </li>
                <li>
                    <router-link :to="{path:'/about-us'}">
                        درباره ما
                    </router-link>
                </li>
            </ul>
        </div>
        <div v-if="!loggedIn" class="auth">
            <f-button path="/user/login" styles="transparent border" > ورود </f-button>
            <f-button path="/user/register" styles="transparent border" > ثبت نام </f-button>
        </div>
        <div v-else class="auth">
            <f-button @onClick="goToDashboard" styles="transparent border" > داشبورد </f-button>
            <f-button @onClick="logout" styles="transparent border" >  خروج </f-button>
        </div>
    </div>
</template>

<script>
  import logo from './logo'
  import FButton from '~/components/elements/button'
    export default {
      data(){
        return {
          show: false
        }
      },
      components:{
        logo,
        FButton
      },
      methods:{
        toggleMenu(){
          this.$store.dispatch("TOGGLE_NAV", { data: null, id: "sidebar" });
        },
        showModal(modal){
          this.toggleMenu()
          this.$store.dispatch('showModal', modal)
        },
        logout(){
          this.$store.dispatch('logout')
          this.$router.push('/user/login')
          this.toggleMenu()
        },
        goToDashboard(){
          this.$router.push('/dashboard/images/')
          this.toggleMenu()
        }
      },
      computed:{
        sidebar(){
          return this.$store.state.sidebar === 'navbar'
        },
        loggedIn(){
          return this.$store.state.user.token
        }
      }
    }
</script>

<style lang="stylus" scoped >
    .sidebar
        transform: translate3d(100%, 0, 0);
        opacity  0
        overflow-y: scroll;
        height 100vh
        width 300px
        background-color #220286
        position fixed
        top 0
        right 0
        z-index 9999
        transition all .5s ease
    .show-sidebar-navbar
        transform: translate3d(0, 0, 0);
        opacity  1
    .sidebar-heading
        padding 30px
        border-bottom 2px solid rgba(255, 255, 255, 0.2)
        .close
            img
                width 24px
        .logo
            img
                width 96px
    .navs
        text-align center
        border-bottom 2px solid rgba(255, 255, 255, 0.2)
        ul
            padding 0
            margin 30px 0
        li
            margin 15px 0
            a
                padding 10px
                display block

    .auth
        padding 30px
        text-align center
        button
            margin 10px


</style>
