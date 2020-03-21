<template>
    <div class="features-container container-fluid">

        <h1 class="feature-sec-title">{{title}}</h1>
        <p class="feature-sec-description">{{description}}</p>

        <div class="row" style="margin-top: 64px;">

            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 feature-sec-menu">
                <div @click="menuItemSelected(index)" v-for="(item, index) in features" :style="" :class="[item.selected ? 'feature-selected' : 'feature-unselected']">{{item.title}}</div>
            </div>

            <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div class="row container-fluid" style="width: 100%">

                    <div v-for="item in cards" class="col-lg-6 col-md-6 col-sm-12 col-xs-12 feature-sec-card">
                        <img :src="require('../../../assets/svg/services/' + item.image + '.svg')" :alt="item.image"
                             :style="{filter: item.image.indexOf('managed') === -1 ? 'invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)' : 'unset'}"
                             class="col-2"/>
                        <div  class="col-10 card-container">
                            <p class="card-title">{{item.title}}</p>
                            <div class="card-divider"></div>
                            <p class="card-subtitle">{{item.sub_title}}</p>
                            <p class="card-description">{{item.description}}</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "platform-features",
        data() {
            return {
                title: 'ویژگی‌های سکوی ابری فندق',
                description: 'سکوی ابری فندق پیشگام در ساده‌سازی مدیریت زیرساخت، سعی بر این دارد تا با استفاده از بهترین\n' +
                    '            روش‌ها و معماری‌ها تجربه ای جدید را در قالب ویژگی‌های جذاب و ارزان به کاربران ارائه کند.',
                cards: [],
                features:[

                    {
                        title: 'سرویس‌های مدیریت شده',
                        selected: true,
                        cards:[
                            {
                                title: 'MySQL',
                                sub_title: 'Database',
                                description: 'پایگاه داده رابطه‌ای محبوب و پر استفاده MySQL شرکت Oracle به همراه رابط ادمین PhpMyAdmin به صورت مدیریت شده بر روی سکوی ابری فندق در اختیار شماست تا با چند کلیک ظرف مدت کمتر از ۱ دقیقه سرویس آن را ساخته و به سرویس‌های فضانام خود اضافه کنید.',
                                image: 'managed/managed_service_mysql',
                                href: ''
                            },
                            {
                                title: 'PostgreSQL',
                                sub_title: 'Database',
                                description: 'PostgreSQL یکی از محبوب‌ترین سیستم‌های مدیریت پایگاه‌داده است. میلیون ها توسعه و شرکت‌های زیادی به PostgreSQL به عنوان یک منبع قابل اعتماد برای تراکنش‌ها اعتماد کرده‌اند. حال این سرویس پر استفاده و محبوب به صورت مدیریت شده به همراه رابط ادمین Adminer بر روی سکوی ابری فندق قابل استفاده است.',
                                image: 'managed/managed_service_postgresql',
                                href: ''
                            },
                            {
                                title: 'MongoDB',
                                sub_title: 'NoSQL Database',
                                description: 'یکی از این پایگاه‌داده‌های محبوب MongoDB است که در میان توسعه دهندگان از محبوبیت بسیار بالایی برخوردار بوده و نشان داده است که در ساختارها و مقیاس‌های بزرگ و پیچیده به راحتی می‌تواند پاسخگوی نیاز‌های یک پروژه باشد.',
                                image: 'managed/managed_service_mongodb',
                                href: ''
                            },
                            {
                                title: 'MSSQL Server',
                                sub_title: 'Database',
                                description: 'Microsoft SQL Server یک سیستم مدیریت پایگاه داده رابطه ای (RDBMS) است که از طیف گسترده ای از برنامه های پردازش تراکنش، هوش تجاری و تجزیه و تحلیل پشتیبانی می کند. Microsoft SQL Server به همراه اوراکل دیتابیس و IBM DB2 یکی از سه فناوری پیشرو در بازار است.',
                                image: 'managed/managed_service_mssql',
                                href: ''
                            },
                            {
                                title: 'Redis',
                                sub_title: 'In Memory Cache Database',
                                description: 'Redis به عنوان یک پایگاه داده key-value با سرعت فوق‌العاده در بین توسعه‌دهندگان از شهرت و محبوبیت بالایی برخوردار است. حال این سرویس In Memory Cache Database به صورت مدیریت شده بر روی سکو قابل دسترسی‌ است تا سرعت توسعه محصولات شما دو چندان شود.',
                                image: 'managed/managed_service_redis',
                                href: ''
                            },
                            {
                                title: 'Proxy',
                                sub_title: 'IP Range Limiter',
                                description: 'اگر نیاز دارید به هر دلیلی IP خروجی محدودی را بر روی سرویس‌های خود اعمال کنید با استفاده از سرویس مدیریت شده Proxy این کار امکان‌پذیر است.کافی است با چند کلیک‌ آن را اجرا کنید.',
                                image: 'managed/managed_service_proxy',
                                href: ''
                            }
                        ]
                    },
                    {
                        title: 'اجرای مستقیم کدها',
                        selected: false,
                        cards:[
                            {
                                title: 'Java',
                                sub_title: 'Programming Language',
                                description: 'اگر شما هم از طرفداران پروپاقرص جاوا هستید، می‌توانید سرویس‌های جاوایی خود را با فریم‌ورک‌ قدرتمند Spring Boot و گستره‌ای از Build Tools‌ها و JDK‌های پشتیبانی شده بر روی سکوی ابری فندق مستقر کنید.',
                                image: 'language/java_lang',
                                href: ''
                            },
                            {
                                title: 'Python',
                                sub_title: 'Programming Language',
                                description: 'زبانی محبوب با ساختاری قدرتمند برای توسعه‌دهندگانی که سرعت در توسعه برای آن‌ها اهمیت دارد؛ حال می‌توانند سرویس‌های پایتونی خود را با پشتیبانی حرفه‌ای از فریم‌ورک جذاب Django Project بسازند.',
                                image: 'language/python_lang',
                                href: ''
                            },
                            {
                                title: 'Java Script',
                                sub_title: 'Programming Language',
                                description: 'به وسعت دنیای وب؛ زبانی محبوب برای برنامه‌نویسان front با گستره‌ای از فریم‌ورک‌های جذابی همچون Vue.js، Angular.js و React.js و Node.js همه و همه برای سرویس‌های ابری شما فراهم شده‌اند.',
                                image: 'language/nodejs_lang',
                                href: ''
                            },
                            {
                                title: 'C#',
                                sub_title: 'Programming Language',
                                description: 'زبانی به قدمت دو دهه ولی بهبود یافته و همپا با ساختارهای جدید تا شما بتوانید سرویس‌های net core. را به راحتی در دنیای ابرها مستقر کنید و از سرعت و قدرت و مزایای سکوهای ابری در پروژه‌های خود بهره‌مند شوید.',
                                image: 'language/c_sharp_lang',
                                href: ''
                            },
                            {
                                title: 'PHP',
                                sub_title: 'Programming Language',
                                description: 'پلتفرمی جذاب به همراه پشتیبانی قوی برای آن دسته از توسعه‌دهندگانی که در دنیای Laravel به سر می‌برند می‌توانند از فریم‌ورک‌های بهینه شده برای ساختار ابری خود استفاده کنند.',
                                image: 'language/php_lang',
                                href: ''
                            },
                        ]
                    },
                    {
                        title: 'ایمیج دلخواه',
                        selected: false,
                        cards:[
                            {
                                title: 'Fandogh Registry',
                                sub_title: 'Image Registry',
                                description: 'شما می‌توانید بدون محدودیت از پروژه‌های خود ایمیج تهیه کنید و در رجیستری سکوی ابری فندق آپلود کنید و هر موقع نیاز بود از هر نسخه از هر ایمیجی که پیش ما دارید هر تعداد سرویس که نیاز دارید بسازید.',
                                image: 'registry/ic-fandogh-mini-fill',
                                href: ''
                            },
                            {
                                title: 'Docker Hub',
                                sub_title: 'Image Registry',
                                description: 'شما می‌توانید ایمیج‌های محبوب خود را از روی داکرهاب انتخاب کنید و سرویس مورد نیاز خود را از روی آن بدون هیچ محدودیتی بسازید.',
                                image: 'registry/ic_docker',
                                href: ''
                            },
                            {
                                title: 'Gitlab',
                                sub_title: 'Image Registry',
                                description: 'اگر از آن دسته توسعه دهندگانی هستید که از رجیستری Gitlab استفاده می‌کنید، محدودیتی برای سکوی ابری فندق وجود ندارد. همین حالا آدرس ایمیج را وارد کنید و سرویس خود را بسازید.',
                                image: 'registry/ic-gitlab',
                                href: ''
                            },
                            {
                                title: 'Github',
                                sub_title: 'Image Registry',
                                description: 'شاید به تازگی از رجیستری Github استفاده می‌کنید؛ خبر خوب این است که این رجیستری هم تحت پوشش سکوی ابری فندق قرار دارد.',
                                image: 'registry/ic-github',
                                href: 'registry'
                            },
                            {
                                title: 'Private Registry',
                                sub_title: 'Image Registry',
                                description: 'و در نهایت هر رجیستری که وجود داشته باشد محدودیتی برای آنکه ما به شما سرویس بدهیم بوجود نمی‌آورد، کافی است Secret مورد نیاز را بسازید و سرویس خود را از روی ایمیج مورد نظر بسازید.',
                                image: 'registry/ic-registry',
                                href: ''
                            },
                        ]
                    },
                    {
                        title: 'Storage',
                        selected: false,
                        cards:[
                            {
                                title: 'Shared Storage',
                                sub_title: 'Storage',
                                description: 'اگر نیاز دارید در هر زمان سرویس‌های فضانام شما به اطلاعاتی به صورتی اشتراکی دسترسی داشته باشند Shared Storage برای همین منظور در اختیار شماست.',
                                image: 'storage/shared-storage',
                                href: ''
                            },
                            {
                                title: 'Dedicated Storage',
                                sub_title: 'Storage',
                                description: 'با استفاده از dedicated storage‌ها داده‌های سرویس‌های خود را با سرعت و کیفیت بالاتری بر روی هاردهای SSD نوشته و فراخوانی کنید.',
                                image: 'storage/dedicated-storage',
                                href: ''
                            },
                        ]
                    },
                    // {
                    //     title: 'Backup',
                    //     selected: false,
                    //     cards:[]
                    // },

                ]

            }
        },
        methods:{
            menuItemSelected(index){
                this.features.forEach(feature => {
                    feature.selected = false
                });

                this.features[index].selected = true
                this.cards = this.features[index].cards
            }
        },
        mounted() {

            this.menuItemSelected(0)
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"

    .features-container
        width 100%
        min-height 700px
        max-width 1750px
        margin-top 32px
        position relative
        box-sizing padding-box
        padding 32px
        @media only screen and (min-width  1500px)
            padding 32px 0

    .feature-sec-title
        font-family iran-yekan
        font-size 2.5em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.71
        letter-spacing normal
        text-align center
        color $silverDark
        @media only screen and (max-width: 992px)
            font-size 1.8em


    .feature-sec-description
        font-size 1.4em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.72
        letter-spacing normal
        text-align center
        max-width 850px
        margin-right auto
        margin-left auto
        margin-top 32px
        color $fontGray
        font-family iran-yekan
        @media only screen and (max-width: 992px)
            font-size 1.1em

    .feature-sec-menu
        display flex
        flex-direction column
        padding-right 32px
        position sticky
        top 100px
        height max-content

        div.feature-selected
            cursor pointer
            height 40px
            line-height 40px
            font-size 1.2em
            font-family iran-yekan
            color $colorPrimary
            display flex
            width unset
            border-right 2px solid $colorPrimary
            text-align center
            padding-right 12px
            font-weight bold

        div.feature-unselected
            cursor pointer
            height 40px
            line-height 40px
            font-size 1.2em
            font-family iran-yekan
            color $disableFontColor
            width unset
            display flex
            border-right 2px solid $disableFontColor
            text-align center
            padding-right 12px
            font-weight normal

        @media only screen and (max-width: 1010px)
            flex-direction row
            top 16px
            display flex
            overflow-x: auto
            overflow-y hidden
            border-radius 25px
            height max-content
            padding-right 0
            scrollbar-width: none
            scrollbar-height: none
            background-color $colorBlueArea
            white-space nowrap
            margin-bottom 16px
            box-shadow 0 0 6px 0 rgba(0, 69, 255, 0.4)
            div.feature-selected
                border none
                color #fefefe
                width max-content
                font-size .9em
                text-align right
                padding-left 12px

            div.feature-unselected
                border none
                color #e3e6ef
                font-size .9em
                width max-content
                padding-left 12px
                text-align right


    .feature-sec-card
        box-sizing padding-box
        padding 16px
        display flex
        min-height 300px
        img
            margin-top 0
            top 0
            height max-content
            width available
            @media only screen and (max-width: 1230px)
                width 54px
                margin-bottom auto
                height max-content

        div.card-container
            width 100%
            display flex
            flex-direction column
            padding-right 16px
            p.card-title
                font-family 'Helvetica Neue'
                font-size 1.5em
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.25
                letter-spacing normal
                text-align right
                color $colorPrimary
                direction ltr
                margin-bottom 6px
                @media only screen and (max-width: 1230px)
                    font-size 1.2em

            div.card-divider
                height 0
                border solid 1px #d4d4d4
                margin-left 30%
                margin-bottom 5px
                @media only screen and (max-width: 1230px)
                    margin-left 15%

            p.card-subtitle
                font-family 'Helvetica Neue'
                font-size 1.2em
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.25
                letter-spacing normal
                text-align right
                color $fontGray
                margin-bottom 6px
                @media only screen and (max-width: 1230px)
                    font-size 1em


            p.card-description
                font-family iran-yekan
                font-size 1.1em
                margin-top 12px
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.75
                letter-spacing normal
                text-align right
                color $fontBlack
                margin-bottom 8px

            @media only screen and (max-width: 1230px)
                margin-top 12px


</style>
<style lang="css">
    ::-webkit-scrollbar{
        width: 0 !important;
        height: 0 !important;
    }
</style>

