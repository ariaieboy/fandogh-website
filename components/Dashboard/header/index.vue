<template>
    <div class="header-dashboard">
        <hamburger-menu v-if="isMenuAvailable" @onClicked="toggleSidebar()" :isVisible="open"/>

        <div class="header-dashboard-logo">
            <router-link to="/">
                <img src="../../../assets/svg/ic-fandogh-mini.svg" alt="logo">
            </router-link>
        </div>

        <div v-if="!isMobile" class="page-navigation-container">

            <router-link v-for="(item,i) in navigation_menu"
                         :to="{path: item.link, query: {ns: $route.query.ns}}"
                         :key="i"
                         :class="[{'selected':$route.path.startsWith(item.link)}]"
                         class="navigation-item-container">

                <p>{{item.title}}</p>

            </router-link>

        </div>

        <f-avatar @change-namespace="changeNamespace" :items="list"/>
    </div>
</template>

<script>
    import FAvatar from './avatar'
    import hamburgerMenu from '~/components/Dashboard/sidebar/hamburger-menu'

    export default {
        name: 'header-dashboard',
        components: {
            FAvatar,
            hamburgerMenu
        },
        data() {
            return {
                navigation_menu: [
                    {
                        title: 'داشبورد',
                        link: '/dashboard/general'
                    },
                    {
                        title: 'حساب کاربری',
                        link: '/dashboard/account'
                    },
                    {
                        title: 'پشتیبانی',
                        icon: 'ic-support',
                        link: '/dashboard/support'
                    }
                ],
                list: [
                    {icon: 'ic-profile', text: 'حساب کاربری', link: '/dashboard/account'},
                    {icon: 'ic-home', text: 'داشبورد', link: '/dashboard/general'},
                    { icon: 'ic-support', text: 'پشتیبانی', link: '/dashboard/support' }
                ]
            }
        },
        computed: {
            open() {
                return this.$store.state.sideMunu
            },
            isMobile() {
                return this.$store.state.windowWidth <= 992;
            },
            isMenuAvailable() {
                if (this.$route.path.indexOf('account') !== -1) {
                    return false;
                } else return this.$route.path.indexOf('bill') === -1;
            }
        },
        watch: {
            isMobile(val) {
                if (val) {
                    this.$store.dispatch("TOGGLE_NAV", {data: null, id: "isNativeMenus"});
                    this.$store.commit("SET_DATA", {data: false, id: "sideMunu"});
                }
            }
        },
        methods: {
            changeNamespace() {

                this.$emit('toggle-namespace-modal');

            },
            toggleSidebar() {
                if (this.isMobile) {
                    this.$store.dispatch("TOGGLE_NAV", {data: null, id: "isNativeMenus"});
                }
                this.$store.commit("SET_DATA", {data: !this.open, id: "sideMunu"});
            }
        }
    }
</script>

<style lang="stylus" scoped>

    @import '../../../assets/css/variables.styl'

    .page-navigation-container
        width 100%
        height 100%
        display flex
        flex-direction row-reverse
        padding-left 32px
        padding-right 32px
        @media only screen and (max-width 992px)
            padding-left 16px
            padding-right 16px

        .navigation-item-container
            display flex
            flex-direction row
            padding-left 16px
            cursor pointer

            p
                margin-right 12px
                color #8c8c8c
                font-size 1em
                margin-top auto
                cursor pointer
                margin-bottom auto
                transition all .3s ease-in-out
                @media only screen and (max-width 1230px)
                    font-size .9em

            &.selected
                p
                    color rgba(0, 69, 255, 1)


        .navigation-item-container:hover

            p
                color rgba(0, 69, 255, 1)
                filter drop-shadow(0 3px 6px rgba(0, 0, 0, .4))



    .header-dashboard
        position fixed
        z-index 2000
        display flex
        justify-content space-between
        align-items center
        border-bottom 1px solid $grayMedium
        width 100%
        height 48px
        background-color $totalWhite
        font-size 14px

        &-logo
            padding-right 16px

            img
                width 24px
                filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
</style>
