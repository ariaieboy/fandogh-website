<template>
    <div class="tutorial-container">

        <p class="tut-title">{{title}}</p>

        <div class="tut-player-container container-fluid">

            <div class="tut-language-bar">
                <div v-for="(item, index) in tutorials" class="tut-item" @click="onTutorialClicked(index)" :style="{opacity: item.selected? '1' : '0.5'}">
                    <img :src="require('../../../assets/svg/services/language/' + item.image + '.svg')" :alt="item.title"/>
                    <p>{{item.title}}</p>
                    <img src="../../../assets/svg/polygon.svg" alt="polygon" class="selection" :style="{display: item.selected? 'unset' : 'none'}"/>
                </div>

            </div>

            <vue-plyr class="tut_player" :key="video"
                      :options="{controls: ['play-large', 'play', 'progress', 'mute', 'volume' ,'current-time','fullscreen', 'download']}">
                <video style="width: 100%">
                    <source style="width: 100%" :src="require('../../../assets/media/' + video + '.mp4')" type="video/mp4"/>
                </video>
            </vue-plyr>
        </div>

    </div>
</template>

<script>
    export default {
        name: "language-tutorials",
        data(){
            return{
                title: 'نگاهی به زبان‌های پشتیبانی شده بر روی سکوی ابری فندق',
                video: 'sample',
                tutorials:[
                    {
                        title: 'Laravel',
                        image:'laravel_lang',
                        video: 'sample',
                        selected: true
                    },
                    {
                        title: 'Asp.Net Core',
                        image:'net_core_lang',
                        video: 'more',
                        selected: false
                    },
                    {
                        title: 'Django',
                        image:'python_lang',
                        video: 'sample',
                        selected: false
                    },
                    {
                        title: 'Spring Boot',
                        image:'java_lang',
                        video: 'more',
                        selected: false
                    },
                    {
                        title: 'Node.js',
                        image:'nodejs_lang',
                        video: 'sample',
                        selected: false
                    }
                ]
            }
        },
        methods:{

            onTutorialClicked(index){
                this.tutorials.forEach(tutorial => {
                    tutorial.selected = false
                })

                this.tutorials[index].selected = true
                this.video = this.tutorials[index].video
            }
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"

    .tutorial-container
        width 100%
        min-height 300px
        background #0045ff
        margin-top 32px
        display flex
        flex-direction column
        position relative
        p.tut-title
            font-family iran-yekan
            font-size 2em
            font-weight bold
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align center
            color #fefefe
            margin-left auto
            margin-right auto
            margin-top 32px
            @media only screen and (max-width: 992px)
                font-size 1.3em
                padding-left 16px
                padding-right 16px

    .tut-player-container
        border-radius 5px
        box-shadow 0 0 44px 0 rgba(0, 0, 0, 0.51)
        background-color #080295
        width 70%
        margin 64px auto
        max-width 1750px
        padding-right 0
        padding-left 0
        display flex
        flex-direction column
        @media only screen and (max-width: 992px)
            width 100%
            margin 32px 0
            border-radius 0

    .tut-language-bar
        width 100%;
        overflow scroll
        display flex
        padding-left 16px
        padding-right 16px
        justify-content center
        @media only screen and (max-width: 992px)
            justify-content unset

        div.tut-item
            display flex
            width auto
            flex-direction column
            cursor pointer
            padding 16px 16px 1px 16px
            img
                width 54px
                height 54px
                margin-left auto
                margin-right auto
                @media only screen and (max-width: 992px)
                    width 34px
                    height 34px

            p
                color #fefefe
                font-size 1.3em
                font-family iran-yekan
                width max-content
                margin-bottom 0
                @media only screen and (max-width: 992px)
                    font-size 1em

            img.selection
                display none
                width 16px
                height max-content
                @media only screen and (max-width: 992px)
                    width 12px
                    height max-content

        div.tut-item:hover
            opacity 1 !important

</style>
