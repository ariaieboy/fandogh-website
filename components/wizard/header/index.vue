<template>
    <div class="header-dashboard">
        <hamburger-menu v-if="isMenuAvailable" @onClicked="toggleSidebar()" :isVisible="open"/>

        <div class="header-dashboard-logo">
            <router-link to="/">
                <img src="../../../assets/svg/ic-fandogh-mini.svg" alt="logo">
            </router-link>
        </div>
        <div class="container-fluid wizard-mode-parent">
            <div :class="[wizard_mode.gui ? 'active-mode' : 'inactive-mode']" @click="toggleWizardMode('GUI')">
                GUI
            </div>
            <div :class="[wizard_mode.cli ? 'active-mode' : 'inactive-mode']" @click="toggleWizardMode('CLI')">
                CLI
            </div>
        </div>
        <div @click="$router.replace('/dashboard/services')"
             style="cursor: pointer; width: 100%; height: 100%; max-width: 24px; display: flex; background: #fd3259; padding: 0 16px;"
             v-tooltip="'انصراف از ساخت'">
            <img src="./icons/turn-off.svg" width="24" height="24"
                 style="filter: invert(100%); margin-top: auto; margin-bottom: auto">
        </div>
    </div>
</template>

<script>

    import FAvatar from './avatar'
    import hamburgerMenu from '~/components/Dashboard/sidebar/hamburger-menu'

    export default {
        name: 'header-dashboard',
        props: {
            wizard_mode: {
                type: Object,
                required: true
            }
        },
        model: {
            prop: 'wizard_mode',
        },
        components: {
            FAvatar,
            hamburgerMenu
        },
        data() {
            return {
                list: [
                    {icon: 'ic-profile', text: 'حساب کاربری', link: '/dashboard/account'},
                    {icon: 'ic-home', text: 'داشبورد', link: '/dashboard/general'},
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
            toggleSidebar() {
                if (this.isMobile) {
                    this.$store.dispatch("TOGGLE_NAV", {data: null, id: "isNativeMenus"});
                }
                this.$store.commit("SET_DATA", {data: !this.open, id: "sideMunu"});
            },
            toggleWizardMode(mode) {
                if (mode === 'GUI') {
                    this.wizard_mode.gui = true;
                    this.wizard_mode.cli = false;
                } else {
                    this.wizard_mode.gui = false;
                    this.wizard_mode.cli = true;
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../../../assets/css/variables.styl'

    .header-dashboard
        position fixed
        z-index 1000
        display flex
        justify-content space-between
        align-items center
        border-bottom 1px solid $grayMedium
        width 100%
        height 48px
        background-color $totalWhite
        font-size 14px

        &-logo
            padding-right 24px

            img
                width 24px
                filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(158%)

    .wizard-mode-parent
        border-radius: 5px
        border: #0045ff solid 1px
        width: max-content
        height: 32px
        display: flex
        flex-direction: row
        padding-left: 0
        padding-right: 0

        div.active-mode
            background: #0045ff
            color: $totalWhite
            font-size: 1em
            font-family: iran-yekan
            text-align: center
            line-height: 32px
            min-width: 80px
            cursor pointer
            transition all .3s ease-in-out

        div.inactive-mode
            background: none
            color: $fontBlack
            font-size: 1em
            font-family: iran-yekan
            text-align: center
            line-height: 32px
            min-width: 80px
            cursor pointer
            transition all .3s ease-in-out
</style>
