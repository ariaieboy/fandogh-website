<template>
    <div class="features-container">

        <p class="feature-sec-title">{{title}}</p>
        <p class="feature-sec-description">{{description}}</p>

        <div class="row" style="margin-top: 64px;">

            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 feature-sec-menu">
                <div @click="menuItemSelected(index)" v-for="(item, index) in features" :style="" :class="[item.selected ? 'feature-selected' : 'feature-unselected']">{{item.title}}</div>
            </div>

            <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div class="row container-fluid" style="width: 100%">

                    <div v-for="item in cards" class="col-lg-6 col-md-6 col-sm-12 col-xs-12 feature-sec-card">
                        <img :src="require('../../../assets/svg/services/managed/' + item.image + '.svg')" :alt="item.image"
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
                                title: 'Mysql',
                                sub_title: 'Database',
                                description: '  سکوی ابری فندق پیشگام در ساده‌سازی مدیریت زیرساخت، سعی بر این دارد تا با استفاده\n' +
                                    '                                از بهترین روش‌ها و معماری‌ها تجربه ای جدید را در قالب ویژگی‌های جذاب و ارزان به\n' +
                                    '                                کاربران ارائه کند.',
                                image: 'managed_service_mysql',
                                href: ''
                            },
                            {
                                title: 'Postgresql',
                                sub_title: 'Database',
                                description: '  سکوی ابری فندق پیشگام در ساده‌سازی مدیریت زیرساخت، سعی بر این دارد تا با استفاده\n' +
                                    '                                از بهترین روش‌ها و معماری‌ها تجربه ای جدید را در قالب ویژگی‌های جذاب و ارزان به\n' +
                                    '                                کاربران ارائه کند.',
                                image: 'managed_service_postgresql',
                                href: ''
                            },
                            {
                                title: 'Redis',
                                sub_title: 'In Memory Cache Database',
                                description: '  سکوی ابری فندق پیشگام در ساده‌سازی مدیریت زیرساخت، سعی بر این دارد تا با استفاده\n' +
                                    '                                از بهترین روش‌ها و معماری‌ها تجربه ای جدید را در قالب ویژگی‌های جذاب و ارزان به\n' +
                                    '                                کاربران ارائه کند.',
                                image: 'managed_service_redis',
                                href: ''
                            },
                            {
                                title: 'Proxy',
                                sub_title: 'Ip Range Limiter',
                                description: '  سکوی ابری فندق پیشگام در ساده‌سازی مدیریت زیرساخت، سعی بر این دارد تا با استفاده\n' +
                                    '                                از بهترین روش‌ها و معماری‌ها تجربه ای جدید را در قالب ویژگی‌های جذاب و ارزان به\n' +
                                    '                                کاربران ارائه کند.',
                                image: 'managed_service_proxy',
                                href: ''
                            }
                        ]
                    },
                    {
                        title: 'اجرای مستقیم کدها',
                        selected: false,
                        cards:[]
                    },
                    {
                        title: 'داکر',
                        selected: false,
                        cards:[]
                    },
                    {
                        title: 'Storage',
                        selected: false,
                        cards:[]
                    },
                    {
                        title: 'Backup',
                        selected: false,
                        cards:[]
                    },

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

    .features-container
        width 100%
        min-height 700px
        margin-top 32px
        position relative
        box-sizing padding-box
        padding 32px

    .feature-sec-title
        font-family iran-yekan
        font-size 2.5em
        font-weight bold
        font-style normal
        font-stretch normal
        line-height 1.71
        letter-spacing normal
        text-align center
        color #0045ff
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
        color #3c3c3c
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
            color #0045ff
            display flex
            width unset
            border-right 2px solid #0045ff
            text-align center
            padding-right 12px
            font-weight bold

        div.feature-unselected
            cursor pointer
            height 40px
            line-height 40px
            font-size 1.2em
            font-family iran-yekan
            color #8c8c8c
            width unset
            display flex
            border-right 2px solid #A7A7A7
            text-align center
            padding-right 12px
            font-weight normal

        @media only screen and (max-width: 1230px)
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
            background-color #0045ff
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
        height 300px
        img
            margin-top 0
            top 0
            height max-content
            @media only screen and (max-width: 1230px)
                width 54px
                margin-bottom auto
                height max-content

        div.card-container
            width 100%
            display flex
            flex-direction column
            padding-right 12px
            p.card-title
                font-family 'Helvetica Neue'
                font-size 1.5em
                font-weight bold
                font-style normal
                font-stretch normal
                line-height 1.25
                letter-spacing normal
                text-align right
                color #0045ff
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
                font-weight bold
                font-style normal
                font-stretch normal
                line-height 1.25
                letter-spacing normal
                text-align right
                color #7c7c7c
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
                color #3c3c3c
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

