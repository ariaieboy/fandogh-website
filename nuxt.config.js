const path = require("path");
const nodeExternals = require('webpack-node-externals')

module.exports = {
    /*
     ** Headers of the page
     */

    loading: {
        color: "#0045ff",
        height: "5px"
    },
    env: {
        API: process.env.API || "https://api.fandogh.cloud/fa",
        MONITORING_API: process.env.MONITORING_API || "https://mon.fandogh.cloud"
    },
    router: {
        middleware: ["authentication"]
    },
    css: [
        "flexboxgrid/css/flexboxgrid.css",
        "@/assets/css/balloon.css",
        "@/assets/css/main.styl",
        'vue-plyr/dist/vue-plyr.css'
    ],
    head: {
        title: "سرویس های ابری | سکوی ابری فندق",
        meta: [
            {charset: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1"},
            {name: 'keywords', content: 'docker, kubernetes, k8s, داکر, سرویس ابری,سکو ابری,سکوی ابری,رایانش ابری, سرور ابری, هاست,هاستینگ'},
            {
                hid: "description",
                name: "description",
                content: "سکوی ابری فندق، ارائه دهنده خدمات رایانش ابری و داکر و جایگزینی مطمئن برای هاستینگ. در کوتاه‌ترین زمان سرویس ابری خود را ایجاد کنید."
            }
        ],
        link: [{rel: "iScon", type: "image/x-icon", href: "/favicon.ico"}]
    },

    modules: ["@nuxtjs/pwa", "@nuxtjs/google-analytics", 'vue-scrollto/nuxt',],
    "google-analytics": {
        id: "UA-120059029-1"
    },

    manifest: {
        name: "فندق",
        description: "سرویس های ابری فندق"
    },
    /*
     ** Global CSS
     */
    //css: ['~/assets/css/main.css'],
    /*
     ** Add axios globally
     */
    build: {
        extractCSS: true,
        vendor: ["axios", "vue-slider-component"],
        extend(config, ctx) {
            if (ctx.isServer) {
                config.externals = [
                    nodeExternals({
                        whitelist: [/^mdbvue/]
                    })
                ]
            }
        }
    },

    plugins: [
        "~/plugins/progress-hover",
        {src: "~/plugins/google-map", ssr: false},
        {src: "~/plugins/vue-select", ssr: false},
        {src: "~/plugins/vuetify.js", ssr: false},
        {src: "~/plugins/vue-bar", ssr: false},
        {src: "~/plugins/tooltip", ssr: false},
        {src: "~/plugins/input", ssr: false},
        {src: "~/plugins/vue-plyr", ssr: false, mode: 'spa'},
        {src: "~/plugins/vue-scroll-to", ssr: false},
        {src: '~/plugins/localStorage.js', ssr: false, mode: 'spa'},
        "~/plugins/mixins",
        "~/plugins/validation",
        {src: "~/plugins/vue-slider-component", ssr: false},
        {src: "~/plugins/bootstrap", ssr: false}
    ]
};
