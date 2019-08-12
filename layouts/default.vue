<template>
    <div class="wrapper-default">
        <div v-if="isMenuAvailable">
            <f-header/>
        </div>
        <nuxt/>
        <div v-if="isMenuAvailable">
            <new-footer/>
        </div>
        <alert/>
    </div>
</template>

<script>
    import FHeader from '~/components/Header'
    import FFooter from '~/components/Footer'
    import Alert from "~/components/Dashboard/alert";
    import 'normalize.css'
    import NewFooter from "../components/Landing/footer/new-footer";
    import 'vuetify/dist/vuetify.min.css';

    export default {
        components: {
            NewFooter,
            FHeader,
            FFooter,
            Alert
        },
        computed: {
            message() {
                return this.$store.state.message
            },
            isMenuAvailable() {
                if (this.$route.path.indexOf('user') !== -1) {
                    return false;
                } else {
                    return true
                }
            }
        },
        mounted() {
            let elm = document.querySelector('#raychatFrame')
            if (!elm) {
                const raychatScript = document.createElement('script')
                raychatScript.innerText = '!function(){function t(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,localStorage.getItem("rayToken")?t.src="https://app.raychat.io/scripts/js/"+o+"?rid="+localStorage.getItem("rayToken")+"&href="+window.location.href:t.src="https://app.raychat.io/scripts/js/"+o;var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}var e=document,a=window,o="b34779ab-3e49-4256-8f71-ec8ae7e76d64";"complete"==e.readyState?t():a.attachEvent?a.attachEvent("onload",t):a.addEventListener("load",t,!1)}();'
                document.head.appendChild(raychatScript)
            }

        },
        watch: {
            $route() {
                if (this.message) {
                    this.$store.dispatch('setMessage', this.message)
                    this.$store.dispatch('showModal', 'message')
                }
            }
        },
    }
</script>

<style lang="stylus" scoped>
    @import '../assets/css/main.styl'

    .wrapper-default
        display block
        box-sizing border-box
        height 100%
        width 100%
        background #fefefe
</style>

<style lang="stylus">

    .v-label {
        margin-right: 0 !important;
        align-self: start !important;
        right: auto !important;
        left: auto !important;
        background: #fefefe !important;
        width: fit-content !important;
        padding: 0 8px !important;
        float: right !important;
    }

    .v-text-field__slot
        align-items: end !important;
        height: 38px !important;


    .v-text-field
        input
            flex: 0 1 auto !important;
            line-height: 38px !important;
            height: 38px !important;
            max-height 38px !important
            padding: 5px 20px !important;
            text-align left !important
            cursor revert !important
            max-width: 100%;
            min-width: 0;
            width: 100%


    .v-label {
        vertical-align: middle !important;
    }

    /*.v-input--is-focused{*/
    /*left: auto !important;*/
    /*}*/

    .application--is-rtl .v-text-field .v-label {
        -webkit-transform-origin: none !important;
        transform-origin: none !important
    }

    .v-label {
        font-size: 16px;
        line-height: 1 !important;
        min-height: 8px;
        transition: .3s cubic-bezier(.25, .8, .5, 1)
    }

    .application--is-rtl .v-text-field .v-label {
        -webkit-transform-origin: top right;
        transform-origin: top right;
    }

    .application--is-rtl .v-text-field .v-counter {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .application--is-rtl .v-text-field--enclosed .v-input__append-outer {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }


    .v-text-field > .v-input__control > .v-input__slot:after, .v-text-field > .v-input__control > .v-input__slot:before
        bottom: -1px;
        content: "";
        position: absolute;
        transition: .3s cubic-bezier(.25, .8, .5, 1) !important;
        width: 100%


    .v-text-field .v-label {
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        top: 7px;
        -webkit-transform-origin: top right !important;
        transform-origin: top right !important;
        white-space: nowrap;
        margin-right 0 !important;
        pointer-events: none
    }

    .v-messages {
        flex: 1 1 auto;
        font-size: .7em !important;
        min-height: 12px;
        vertical-align middle !important;
        min-width: 1px;
        line-height 1 !important
        text-align right || center !important;
        position: relative
        margin-top -2px !important
    }

    .v-counter
        font-family iran-sans !important
        direction ltr !important
        margin-top 2px !important

    .v-select .vs__dropdown-toggle
        margin-bottom 8px !important
        min-height 46px !important
        border none !important
        border-bottom 1px solid #a4a4a4 !important
        border-radius 0 !important
        background-color #fff !important

    .v-input--has-state.error--text .v-label {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text .v-messages {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text .v-input__slot {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text input {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .vs__selected {
        display: flex;
        align-items: center;
        background-color: rgba(41, 121, 255, .5) !important;
        border: 1px solid #0093ff !important;
        border-radius: 25px !important;
        color: #ffffff !important;
        font-family iran-yekan !important
        line-height: 1.4;
        margin: 4px 2px 0;
        padding: 0 0 0 16px !important
    }

    .vs__deselect {
        display: inline-flex;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none !important;
        margin-left: 12px !important;
        margin-right 2px !important
        margin-top 2px !important
        margin-bottom 2px !important
        padding: 9px !important;
        border: 1px solid #0093ff !important;
        border-radius 50px !important
        cursor: pointer;
        background: #fefefe !important;
        fill: rgba(60, 60, 60, .5) !important;
        text-shadow: 0 1px 0 #fff
    }


    .tooltip {
        display: block !important;
        z-index: 10000;
        max-width: 300px;
        font-family: iran-yekan;
        line-height: 1.7;
        font-size: 0.9em;
    }

    .tooltip .tooltip-inner {
        background: black;
        color: white;
        border-radius: 16px;
        padding: 5px 10px 4px;
    }

    .tooltip .tooltip-arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 5px;
        border-color: black;
        z-index: 1;
    }

    .tooltip[x-placement^="top"] {
        margin-bottom: 5px;
    }

    .tooltip[x-placement^="top"] .tooltip-arrow {
        border-width: 5px 5px 0 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }

    .tooltip[x-placement^="bottom"] {
        margin-top: 5px;
    }

    .tooltip[x-placement^="bottom"] .tooltip-arrow {
        border-width: 0 5px 5px 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }

    .tooltip[x-placement^="right"] {
        margin-left: 5px;
    }

    .tooltip[x-placement^="right"] .tooltip-arrow {
        border-width: 5px 5px 5px 0;
        border-left-color: transparent !important;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        left: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
    }

    .tooltip[x-placement^="left"] {
        margin-right: 5px;
    }

    .tooltip[x-placement^="left"] .tooltip-arrow {
        border-width: 5px 0 5px 5px;
        border-top-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        right: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
    }

    .tooltip.popover .popover-inner {
        background: #f9f9f9;
        color: black;
        padding: 24px;
        display: flex;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(0, 0, 0, .7);
    }

    .tooltip.popover .popover-arrow {
        border-color: #f9f9f9;
    }

    .tooltip[aria-hidden='true'] {
        visibility: hidden;
        opacity: 0;
        transition: opacity .15s, visibility .15s;
    }

    .tooltip[aria-hidden='false'] {
        visibility: visible;
        opacity: 1;
        transition: opacity .15s;
    }

    div.v-text-field__suffix {
        margin-left 16px
    }

    .cancel-button
        font-size .9em
        color $grayMedium
        padding 8px 16px
        border-radius 3px
        font-family iran-yekan
        cursor pointer
        user-select none

    @-webkit-keyframes shake {
        59% {
            margin-left: 0 !important
        }
        60%, 80% {
            margin-left: 0 !important
        }
        70%, 90% {
            margin-left: 0 !important
        }
    }

    @keyframes shake {
        59% {
            margin-left: 0 !important
        }
        60%, 80% {
            margin-left: !important
        }
        70%, 90% {
            margin-left: !important
        }
    }

</style>
