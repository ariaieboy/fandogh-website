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
        <notification/>
    </div>
</template>

<script>
    import FHeader from '~/components/Header'
    import Alert from "~/components/Dashboard/alert";
    import 'normalize.css'
    import Notification from "~/components/Dashboard/notification";
    import NewFooter from "../components/Landing/footer/new-footer";
    import 'vuetify/dist/vuetify.min.css';

    export default {
        components: {
            NewFooter,
            FHeader,
            Alert,
            Notification
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
            let elm = document.querySelector('#raychatFrame');
            if (!elm) {
                const raychatScript = document.createElement('script');
                raychatScript.innerText = '!function(){function t(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,localStorage.getItem("rayToken")?t.src="https://app.raychat.io/scripts/js/"+o+"?rid="+localStorage.getItem("rayToken")+"&href="+window.location.href:t.src="https://app.raychat.io/scripts/js/"+o;var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}var e=document,a=window,o="b34779ab-3e49-4256-8f71-ec8ae7e76d64";"complete"==e.readyState?t():a.attachEvent?a.attachEvent("onload",t):a.addEventListener("load",t,!1)}();'
                document.head.appendChild(raychatScript)
            }
            this.handleStructuredHeader();

        },
        methods:{
            handleStructuredHeader(){
                const stHeader = document.createElement('script');
                stHeader.type = 'application/ld+json';
                stHeader.innerText = '{"@context": "http://schema.org","@graph": [{"@type": "WebSite", "url": "https:\/\/fandogh.cloud","name": "Fandogh PaaS | سکوی ابری فندق", "alternateName": "سکوی ابری فندق یک PaaS یا Platform as a Service است که به کاربران در هر سطحی این امکان را می دهد تا محصولات نرم‌افزاری خود را بر روی سرورهای ابری مستقر کنند"}, {"@type": "Organization", "url": "https:\/\/fandogh.cloud", "sameAs": ["https://github.com/fandoghpaas", "https://twitter.com/fandoghpaas","https://linkedin.com/company/fandogh-paas", "https://facebook.com/fandoghpaas/", "https://t.me/fandoghpaas", "https://virgool.io/@fandogh.cloud"], "@id": "#fandoghpaas", "name": "Fandogh PaaS | سکوی ابری فندق", "telephone": "+98-21-2842-2383", "logo": {"@type": "ImageObject", "url": "https://fandogh.cloud/public/header.png", "width": "1225px", "height": "375px"}}]}'
                document.head.appendChild(stHeader)
            }
        },
        watch: {
            $route() {

                if(this.$route.path === '/'){
                    if (this.$route.query.ns){
                        var queries = {};
                        for (const [key, value] of Object.entries(this.$route.query)) {
                            if (key !== 'ns')
                                queries[key] = value
                        }
                        this.$router.replace({
                            path: this.$route.path,
                            query: queries
                        }, () => {
                            window.location.reload()
                        }, null);
                    }
                }

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
            direction  ltr !important


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
        width max-content !important
        min-width 100px !important
        text-align right !important
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
</style>
