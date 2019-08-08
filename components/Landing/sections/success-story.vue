<template>


    <div class="success-story-container">

        <p class="success-title">{{title}}</p>

        <div class="row story-parent-container">

            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 story-container">

                <img :src="require('../../../assets/svg/customers/' + story.logo + '.png')" width="200px"
                     :alt="story.logo">
                <p class="story-teller">{{story.teller}}</p>
                <p class="story-description">{{story.description}}</p>
                <a :href="story.company_href" target="_blank">مشاهده وب‌سایت</a>
            </div>

            <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12" style="padding: 0">

                <vue-plyr class="success_player suc-player"
                          :key="story.link"
                          :options="{controls: ['play-large', 'progress','fullscreen']}">
                    <video style="width: 100%">
                        <source style="width: 100%" :src="require('../../../assets/media/' + story.link + '.mp4')" type="video/mp4"/>
                    </video>
                </vue-plyr>

            </div>

            <div class="story-rail">
                <img @click="onStorySelected(index)" :style="{opacity: item.selected? '1' : '.6'}" v-for="(item, index) in stories" class="story-card" :src="require('../../../assets/svg/customers/' + item.logo + '.png')" :alt="item.logo"/>

            </div>

        </div>

        <div style="width: 100%; display: flex; padding: 16px;">
            <button class="all-customers">مشاهده مشتریان</button>

        </div>

    </div>

</template>

<script>
    export default {
        name: "success-story",
        data() {
            return {
                title: 'داستان‌هایی از موفقیت فندق',
                story: {
                    title: '',
                    description: 'میتونیم به جرات بگیم فندق یک محصول داخلی، با کیفیت بین‌المللی هستش که واقعا خیلی از مشکلات\n' +
                        '                    ما رو حل کرده و باعث شده ما زمان بیشتری رو صرف توسعه محصولمون بکنیم، بدون اینکه ذره‌ای\n' +
                        '                    نگرانی بابت زیرساخت داشته باشیم….',
                    logo: 'botick',
                    link: 'sample',
                    company_href:'https://botick.com',
                    teller: 'سامان احمدی - بنیان‌گذار',
                    selected: true
                },
                stories:[
                    {
                        title: '',
                        description: 'میتونیم به جرات بگیم فندق یک محصول داخلی، با کیفیت بین‌المللی هستش که واقعا خیلی از مشکلات\n' +
                            '                    ما رو حل کرده و باعث شده ما زمان بیشتری رو صرف توسعه محصولمون بکنیم، بدون اینکه ذره‌ای\n' +
                            '                    نگرانی بابت زیرساخت داشته باشیم….',
                        logo: 'botick',
                        link: 'sample',
                        company_href:'https://botick.com',
                        teller: 'سامان  - بنیان‌گذار',
                        selected: true
                    },
                    {
                        title: '',
                        description: 'میتونیم به جرات بگیم فندق یک محصول داخلی، با کیفیت بین‌المللی هستش که واقعا خیلی از مشکلات\n' +
                            '                    ما رو حل کرده و باعث شده ما زمان بیشتری رو صرف توسعه محصولمون بکنیم، بدون اینکه ذره‌ای\n' +
                            '                    نگرانی بابت زیرساخت داشته باشیم….',
                        logo: 'botick',
                        link: 'more',
                        company_href:'https://botick.com',
                        teller: ' احمدی - بنیان‌گذار',
                        selected: false
                    },
                    {
                        title: '',
                        description: 'میتونیم به جرات بگیم فندق یک محصول داخلی، با کیفیت بین‌المللی هستش که واقعا خیلی از مشکلات\n' +
                            '                    ما رو حل کرده و باعث شده ما زمان بیشتری رو صرف توسعه محصولمون بکنیم، بدون اینکه ذره‌ای\n' +
                            '                    نگرانی بابت زیرساخت داشته باشیم….',
                        logo: 'botick',
                        link: 'sample',
                        company_href:'https://botick.com',
                        teller: 'سامان احمدی - بنیان‌گذار',
                        selected: false
                    },
                    {
                        title: '',
                        description: 'میتونیم به جرات بگیم فندق یک محصول داخلی، با کیفیت بین‌المللی هستش که واقعا خیلی از مشکلات\n' +
                            '                    ما رو حل کرده و باعث شده ما زمان بیشتری رو صرف توسعه محصولمون بکنیم، بدون اینکه ذره‌ای\n' +
                            '                    نگرانی بابت زیرساخت داشته باشیم….',
                        logo: 'botick',
                        link: 'more',
                        company_href:'https://botick.com',
                        teller: 'سامان احمدی - بنیان‌گذار',
                        selected: false
                    },
                    {
                        title: '',
                        description: 'میتونیم به جرات بگیم فندق یک محصول داخلی، با کیفیت بین‌المللی هستش که واقعا خیلی از مشکلات\n' +
                            '                    ما رو حل کرده و باعث شده ما زمان بیشتری رو صرف توسعه محصولمون بکنیم، بدون اینکه ذره‌ای\n' +
                            '                    نگرانی بابت زیرساخت داشته باشیم….',
                        logo: 'botick',
                        link: 'sample',
                        company_href:'https://botick.com',
                        teller: 'سامان احمدی - بنیان‌گذار',
                        selected: false
                    },
                    {
                        title: '',
                        description: 'میتونیم به جرات بگیم فندق یک محصول داخلی، با کیفیت بین‌المللی هستش که واقعا خیلی از مشکلات\n' +
                            '                    ما رو حل کرده و باعث شده ما زمان بیشتری رو صرف توسعه محصولمون بکنیم، بدون اینکه ذره‌ای\n' +
                            '                    نگرانی بابت زیرساخت داشته باشیم….',
                        logo: 'botick',
                        link: 'more',
                        company_href:'https://botick.com',
                        teller: 'سامان احمدی - بنیان‌گذار',
                        selected: false
                    },


                ]

            }
        },
        methods:{
            onStorySelected(index){
                this.stories.forEach(story => {
                    story.selected = false
                });

                this.stories[index].selected = true;
                this.story = this.stories[index]
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .success-story-container
        z-index 2
        width 100%
        padding-bottom 16px
        background #0045ff
        margin-top 32px
        display flex
        flex-direction column
        position relative

        p.success-title
            font-family iran-yekan;
            font-size 2.4em
            font-weight bold
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align center
            color #fefefe
            margin-left auto
            margin-right auto
            margin-top 64px
            @media only screen and (max-width: 992px)
                font-size 1.8em
                margin-top 32px

    .story-container
        display flex
        flex-direction column
        margin-top 32px
        order 0
        @media only screen and (max-width: 992px)
            order 1
            margin-top 16px

        img
            margin-left auto
            margin-right 0
            @media only screen and (max-width: 992px)
                margin-right 0

        p.story-teller
            font-family iran-yekan
            margin-top 16px
            font-size 1.2em
            font-weight bold
            font-style normal
            font-stretch normal
            line-height 1.75
            letter-spacing normal
            text-align right
            color #fefefe

        p.story-description
            font-family iran-yekan
            margin-top 16px
            font-size 1.2em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.75
            letter-spacing normal
            text-align right
            color #fefefe
            @media only screen and (max-width: 992px)
                font-size 1.1em

        a
            font-family iran-yekan
            font-size 1.1em
            text-align center
            padding 8px
            cursor pointer
            color #0045ff
            border-radius 5px
            background rgba(209, 209, 209, 0.75)
            transition all .2s ease-in-out
            @media only screen and (max-width: 992px)
                font-size 1em

        a:hover
            background-color #fefefe
            font-weight bold
            transition all .2s ease-in-out


    .suc-player
        margin-top: 32px
        border-radius: 25px
        background: #080295
        width: 100%
        margin-bottom: 1px
        @media only screen and (max-width: 992px)
            padding 0

    .story-parent-container
        padding 0 64px
        box-sizing padding-box
        margin-right 0
        margin-left 0
        @media only screen and (max-width: 992px)
            padding 0

    .story-rail
        width 100%
        display flex
        overflow-y hidden
        overflow-x scroll
        white-space nowrap
        padding 32px 16px
        justify-content center
        @media only screen and (max-width: 992px)
            justify-content unset
            padding 16px

    .story-card
        opacity 1
        margin-right 16px
        margin-left 16px
        width 150px
        cursor pointer
        @media only screen and (max-width: 992px)
            width 100px

    .story-card:hover
        opacity 1 !important



    .all-customers
        border-radius 25px
        width 250px
        height 45px
        margin-right auto
        margin-left auto
        color #fefefe
        text-align center
        line-height 45px
        font-weight bold
        border 1px solid #fefefe
        font-size 1.2em
        font-family iran-yekan
        transition all .2s ease-in-out
        outline none
        @media only screen and (max-width: 992px)
            order 3

    .all-customers:hover
        background-color #fefefe
        color #0045ff
        transition all .2s ease-in-out


</style>
<style lang="css">
    ::-webkit-scrollbar{
        width: 0 !important;
        height: 0 !important;
    }
</style>
