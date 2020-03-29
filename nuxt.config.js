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
    hooks: {
        'generate:page': (page) => {
            page.html = modifyHtml(page.html)
        },
        'render:route': (url, page, { req, res }) => {
            page.html = modifyHtml(page.html)
        }
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
            {'http-equiv':'Content-Type', content:'text/html', charset: 'utf-8'},
            {'http-equiv':'X-UA-Compatible', content:'IE=edge'},

            {name: "viewport", content: "width=device-width, initial-scale=1"},

            {hid: 'og:type', property: 'og:type', content: 'website'},
            {hid: 'og:title', property: 'og:title', content: 'سرویس های ابری | سکوی ابری فندق'},
            {hid: 'og:description', property: 'og:description', content: 'سکوی ابری فندق، ارائه دهنده خدمات رایانش ابری و داکر و جایگزینی مطمئن برای هاستینگ. در کوتاه‌ترین زمان سرویس ابری خود را ایجاد کنید.'},
            {hid: 'og:url', property: 'og:url', content: 'https://www.fandogh.cloud'},
            {hid: 'og:site_name', property: 'og:site_name', content: 'Fandogh'},
            {hid: 'og:locale', property: 'og:locale', content: 'fa'},
            {hid: 'og:image', property: 'og:image', content: '/fandogh-icon.png'},

            {hid: 'twitter:card', name: 'twitter:card', content: 'summary'},
            {hid: 'twitter:site', name: 'twitter:site', content: '@fandoghpaas'},
            {hid: 'twitter:url', name: 'twitter:url', content: 'https://www.fandogh.cloud'},
            {hid: 'twitter:title', name: 'twitter:title', content: 'سرویس های ابری | سکوی ابری فندق'},
            {hid: 'twitter:description', name: 'twitter:description', content: 'سکوی ابری فندق، ارائه دهنده خدمات رایانش ابری و داکر و جایگزینی مطمئن برای هاستینگ. در کوتاه‌ترین زمان سرویس ابری خود را ایجاد کنید.'},
            {hid: 'twitter:image', name: 'twitter:image', content: '/icon.png'},

            {name: 'apple-mobile-web-app-capable', content: 'yes'},
            {name: 'mobile-web-app-capable', content: 'yes'},


            {name: 'msapplication-TileImage', content: '/icon.png'},
            {name: 'msapplication-TileColor', content: '#0045ff'},


            {name: 'keywords', content: 'ثبت نام سرور مجازی, خدمات ابری ایران, ابر ایران, رایانش ابری, سرور مجازی, سرور ابری, مرکزداده مجازی, سرور داخلی, هاستینگ ابری, هاست, رایانش ابری, محاسبات ابری, کلود کامپیوتینگ, کلود ایرانی, ابر Fandogh, زیرساخت به عنوان سرویس, پلت فرم به عنوان سرویس, نرم افزار به عنوان سرویس, خدمات ابری ایران, ابری, سرور مجازی, رایانش ابری, کلودکامپیوتینگ,docker, kubernetes, k8s, داکر, سرویس ابری,سکو ابری,سکوی ابری,رایانش ابری, سرور ابری, هاست,هاستینگ'},
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

const modifyHtml = (html) => {
    html = html.replace(/ data-n-head="true"/g, '');
    return html.replace(/ data-hid="[a-z]*:[a-z]*"/g, '')
};
