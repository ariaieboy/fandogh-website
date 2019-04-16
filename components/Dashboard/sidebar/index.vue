<template>
    <div :class="['sidebar-dashboard ', {open}]">
        <div :class="['sidebar-dashboard-list ' , {open}]">
            <router-link
                    :title="item.text"
                    :to="item.link"
                    :class="['sidebar-dashboard-item' , {'is-border':item.isBorder,open}]"
                    v-for="(item,index) in items"
                    :key="index">
                <img :src="require('./icons/'+item.icon+'.svg')">
                <span>{{item.text}}</span>
            </router-link>
        </div>
        <div style="background-color: transparent" :class="['sidebar-dashboard-collaps ' , {open}]" @click="toggleSidebar()">
            <img src="./icons/arrow.svg" alt="arrow">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sidebar-dashboard',

        data() {
            return {
                items: [
                    {icon: 'ic-home', isBorder: true, text: 'داشبورد', link: '/dashboard/general'},
                    {icon: 'ic-image', text: 'ایمیج‌ها', link: '/dashboard/images'},
                    {icon: 'ic-service', text: 'سرویس‌ها', link: '/dashboard/services'},
                    {icon: 'ic-domain', text: 'دامنه‌ها', link: '/dashboard/domains'},
                    {icon: 'ic-secret', isBorder: true, text: 'سکرت‌ها', link: '/dashboard/secret'},
                    // {icon: 'ic-monitoring', isBorder: true, text: 'مانیتورینگ', link: '/dashboard/monitoring'},
                    {icon: 'ic-plans', text: 'پلن‌های فندق', link: '/dashboard/plans'},
                ]
            }
        },
        computed: {
            open() {
                return this.$store.state.sideMunu
            }
        },
        methods: {
            toggleSidebar() {
                this.$store.commit("SET_DATA", {data: !this.open, id: "sideMunu"});
            }
        }

    }
</script>

<style lang="stylus" scoped>
    @import '../../../assets/css/variables.styl'

    .sidebar-dashboard
        position fixed
        top 0
        right 0
        bottom 0
        z-index 88
        display flex
        flex-direction column
        justify-content space-between
        padding-top 148px
        padding-bottom 47px
        min-width $widthSidebarClose
        background-color transparent
        transition $transitionMain

        &.open
            min-width $widthSidebarOpen
            @media only screen and (max-width: $sizeMd)
                right 0
                padding-left 32px
                background-color #fefefe
                box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        @media only screen and (max-width: $sizeMd)
            right -17em
            padding-bottom 0

        @media only screen and (max-height: 500px)
            padding-top 48px

        &-list
            overflow auto

            &::-webkit-scrollbar
                width 7px

            &::-webkit-scrollbar-track
                box-shadow inset 0 0 6px rgba(0, 0, 0, 0.3)

            &::-webkit-scrollbar-thumb
                outline 1px solid slategrey
                background-color darkgrey

        &-item
            position relative
            display flex
            justify-content center
            align-items center
            padding 10px 0
            text-align right
            margin-top 16px
            margin-bottom 16px

            &.nuxt-link-active, &:hover
                border-top-left-radius 25px
                border-bottom-left-radius 25px
                background-color $blueLight
                img
                    filter invert(41%) sepia(59%) saturate(4513%) hue-rotate(185deg) brightness(100%) contrast(108%)
                span
                    color $blueMedium

                &:after
                    transform none

            &.is-border
                &:before
                    position absolute
                    right 1.25em
                    bottom -0.45em
                    left 1.25em
                    display block
                    height 2px
                    background-color rgba(0, 0, 0, 0.25)
                    content ''

            &.open
                justify-content flex-start
                padding-right 1.875em

                span
                    position static
                    visibility visible
                    opacity 9
                    transform none

                img
                    margin-left 1.2em

                &.is-border
                    &:before
                        // right 30px
                        left 1.875em

            img
                margin-left 0

            span
                position absolute
                display inline-block
                visibility hidden
                color $silverDark
                font-size 1em
                opacity 0.1
                margin-right 12px
                transition $transitionMain
                transform translateX($widthSidebarOpen)

        &-collaps
            position fixed
            right 0
            bottom 0
            min-width $widthSidebarClose
            border-top 1px solid $grayMedium
            background-color $grayLight
            cursor pointer
            transition $transitionMain
            @media only screen and (max-width: $sizeMd)
                display none

            &.open
                min-width $widthSidebarOpen

                img
                    filter opacity(60%)
                    transform scale(1, 1)

            img
                float left
                padding-top 15px
                padding-bottom 15px
                width 12px
                filter opacity(60%)
                transform scale(-1, -1)

</style>

