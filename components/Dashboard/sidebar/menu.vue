<template>
    <div class="sidebar-menu">
        <ul>
            <li>
                <router-link event="disabled" @click.native="closeMenu('/dashboard/images')" :to="{path:'/dashboard/images'}"><img src="./icons/images.svg" /> ایمیج ها  </router-link>
            </li>
            <li>
                <router-link event="disabled" @click.native="closeMenu('/dashboard/services')" :to="{path:'/dashboard/services'}" ><img src="./icons/services.svg" /> سرویس ها  </router-link>
            </li>
            <li>
                <a href="#"><img src="./icons/managed_services.svg" /> سرویس های مدیریت شده  </a>
            </li>
            <li>
                <router-link event="disabled" @click.native="closeMenu('/dashboard/domains')" :to="{path:'/dashboard/domains'}" ><img src="./icons/domain.svg" /> دامنه  </router-link>
            </li>
            <li>
                <router-link event="disabled" @click.native="closeMenu('/dashboard/plans')" :to="{path:'/dashboard/plans'}" ><img src="./icons/domain.svg" /> پلن‌های فندق   </router-link>
            </li>
            <li>
                <a href="#"><img src="./icons/settings.svg" /> تنظیمات  </a>
            </li>
            <li>
                <a href="#"><img src="./icons/exit.svg" /> خروج  </a>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
      methods:{
        closeMenu(path){
          this.$store.dispatch('toggleSidebar', 0)
          this.$router.push(path)
        }
      }
    }
</script>

<style lang="stylus" scoped>
    .sidebar-menu
        margin 45px 0
        ul
            padding 0
            margin 0
            li
                img
                    width 20px
                    vertical-align middle
                    margin-left 32px
                list-style none
                a
                    width 100%
                    padding 23px
                    display inline-block
                    box-sizing border-box
                    &.nuxt-link-active
                        background-color rgba(0,0,0, .5)
                        border-right #26c6ec 2px solid

</style>