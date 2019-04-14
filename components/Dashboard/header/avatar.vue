<template>
    <div class="header-avatar">
        <div class="header-avatar-box" @click="toggleAvatar('avatar')">
            <img class="header-avatar-img" :src="avatar" alt>
            <div class="header-avatar-name">
                <span>{{username}}</span>
            </div>
            <img
                    class="header-avatar-arrow"
                    src="./icons/arrow-point-to-right.svg"
                    alt
                    :class="{open:isNativeMenus === 'avatar'}"
            >
        </div>
        <div class="header-avatar-list" :class="{open:isNativeMenus === 'avatar'}">
            <div class="header-avatar-namespace">
                <span class="font-roboto header-avatar-username">{{username}}</span>
                <span class="font-roboto">{{namespace}}</span>
            </div>
            <div class="header-avatar-list-item">
                <router-link :to="item.link" class="header-avatar-item" v-for="(item,i) in items" :key="i">
                    <img :src="require('./icons/'+item.icon+'.svg')">
                    <span>{{item.text}}</span>
                </router-link>
                <div @click="exit" class="header-avatar-item">
                    <img src="./icons/ic-exit.svg" alt>
                    <span>خروج</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getValue} from "~/utils/cookie";
    import Gravatar from "~/utils/gravatar";

    export default {
        name: "header-avatar",
        props: {
            items: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                avatar: "./icons/ic-profile.svg"
            }
        },

        computed: {
            username() {
                return getValue("username");
            },
            namespace() {
                return getValue("namespace");
            },
            isNativeMenus() {
                return this.$store.state.isNativeMenus
            },
            isMobile() {
                return this.$store.state.windowWidth <= 992;
            }
        },
        mounted() {
            this.getAvatar();
        },
        methods: {
            exit() {
                this.$alertify(
                    {
                        img: "/icons/exit.svg",
                        title: `خروج از داشبورد`,
                        description: "آیا برای خروج از داشبورد مطمئن هستید هستید ؟",
                        label: 'خروج'
                    },
                    status => {
                        if (!status) return
                        this.$ga.event({
                            eventCategory: "account",
                            eventAction: "user logout dashboard",
                            eventLabel: "username",
                            eventValue: getValue("username")
                        });
                        this.$store.dispatch("logout");
                        this.$router.push("/user/login");
                    }
                );

            },
            getAvatar() {
                let email = getValue("email");
                this.avatar = Gravatar(email, 150);
            },
            toggleAvatar(type) {
                if (this.isMobile) {
                    this.$store.commit("SET_DATA", {data: false, id: "sideMunu"});
                }
                this.$store.dispatch("TOGGLE_NAV", {data: type, id: "isNativeMenus"});
            }
        },
    }
</script>

<style lang="stylus" scoped>
    @import '../../../assets/css/variables.styl'
    * {
        -ms-user-select none
        user-select none
        -moz-user-select none
        -webkit-user-select none
    }

    $widthListAvatar = 230
    .header-avatar
        position relative
        display flex
        margin-right auto
        padding 0 15px
        min-width $widthListAvatar px
        height 100%
        border-right 2px solid $grayLight
        cursor pointer
        @media only screen and (max-width: $sizeMd)
            min-width inherit
            border none

        &-box
            display flex
            justify-content space-evenly
            align-items center
            width 100%

        &-name
            display flex
            flex-direction column
            @media only screen and (max-width: $sizeMd)
                display none

            span
                display inline-block
                color $silverDark
                text-align center
                font-weight bold
                font-size 1em

        &-img
            width 30px
            border-radius 100%

        &-arrow
            width 12px
            cursor pointer
            transform rotate(90deg)
            @media only screen and (max-width: $sizeMd)
                display none

            &.open
                transform rotate(-90deg)

        &-list
            position absolute
            top 105%
            // right 0
            left - $widthListAvatar px
            // display none
            margin 0
            background-color $totalWhite
            box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
            transition $transitionMain
            // transform translateZ($widthListAvatar px)
            @media only screen and (max-width: $sizeMd)
                right auto
                min-width $widthListAvatar px
                border-top 1px solid $hoary

            &.open
                right 0
                left 0
                @media only screen and (max-width: $sizeMd)
                    right auto

        &-namespace
            position relative
            margin-bottom 30px
            padding 15px 0
            text-align center

            &:before
                position absolute
                right 30px
                bottom 0
                left 30px
                display block
                height 2px
                background-color rgba(0, 0, 0, 0.25)
                content ''

            span
                color $blueHard
                font-weight bold
                font-size 1em

        &-list-item
            display flex
            flex-direction column
            padding 0 15px

        &-username
            display none
            color $silverDark !important
            @media only screen and (max-width: $sizeMd)
                display block
                margin-bottom 15px

        &-item
            display flex
            justify-content start
            margin-bottom 30px

            img
                margin-left 15px

            span
                display inline-block
                color $silverDark
                text-align center
                font-size 1em

            &.nuxt-link-active, &:hover
                span
                    color $blueMedium
                img
                    filter invert(41%) sepia(29%) saturate(4513%) hue-rotate(185deg) brightness(100%) contrast(108%)
</style>
