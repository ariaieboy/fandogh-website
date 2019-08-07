<template>
    <div style="width: 100%; padding-bottom: 64px">

        <div class="business-image-header">
            <div class="semi-line"></div>
            <img src="../../../assets/svg/services/enterprise/company.svg" alt="company"/>
            <div class="semi-line"></div>
        </div>

        <div class="business-solution-intro">
            <p class="business-title">{{title}}</p>
            <p class="business-desc">{{description}}</p>
        </div>

        <div class="row solution-container" >
            <div v-for="item in solutions" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 solution-card">

                <img :src="require('../../../assets/svg/services/enterprise/' + item.image + '.svg')" :alt="item.title"
                     class="col-2"/>
                <div class="col-10"
                     style="width: 100%; display: flex; flex-direction: column; padding-right: 12px">
                    <p class="solution-card-title">
                        {{item.title}}</p>
                    <p class="solution-card-description" style="  font-family: iran-yekan;font-size: 1.1em;margin-top: 12px; font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c;">
                      {{item.description}}
                    </p>

                </div>

            </div>

        </div>

        <div style="width: 100%; display: flex">
            <button class="business-solution-button">درخواست سرویس</button>
        </div>

    </div>

</template>

<script>
    export default {
        name: "business-solution",
        data(){
            return{

                title: 'راه حل‌های شرکتی',
                description: 'تجربیات و تیم فندق را به صورت اختصاصی برای شرکت خود داشته باشید',
                solutions:[
                    {
                        title:'امنیت بالا',
                        description: ' سکوی ابری فندق پیشگام در ساده‌سازی مدیریت زیرساخت، سعی بر این دارد تا با استفاده از\n' +
                            '                        بهترین روش‌ها و معماری‌ها تجربه ای جدید را در قالب ویژگی‌های جذاب و ارزان به کاربران\n' +
                            '                        ارائه کند.',
                        image: 'security'
                    },
                    {
                        title:'رجیستری اختصاصی',
                        description: ' سکوی ابری فندق پیشگام در ساده‌سازی مدیریت زیرساخت، سعی بر این دارد تا با استفاده از\n' +
                            '                        بهترین روش‌ها و معماری‌ها تجربه ای جدید را در قالب ویژگی‌های جذاب و ارزان به کاربران\n' +
                            '                        ارائه کند.',
                        image: 'registry'
                    },
                    {
                        title:'ایمیج نامحدود',
                        description: ' سکوی ابری فندق پیشگام در ساده‌سازی مدیریت زیرساخت، سعی بر این دارد تا با استفاده از\n' +
                            '                        بهترین روش‌ها و معماری‌ها تجربه ای جدید را در قالب ویژگی‌های جذاب و ارزان به کاربران\n' +
                            '                        ارائه کند.',
                        image: 'image'
                    }
                ]

            }
        }
    }
</script>

<style lang="stylus" scoped>

    .business-image-header
        display flex
        width 100%
        div.semi-line
            height 0
            border solid 1px #0045ff
            border-radius 25px
            width 100%
            margin auto 32px
            @media only screen and (max-width: 992px)
                margin auto 16px
        img
            width 120px
            @media only screen and (max-width: 992px)
                width 90px

    .business-solution-intro
        width 100%
        padding 32px
        box-sizing padding-box
        p.business-title
            font-family iran-yekan
            font-size 2.5em
            font-weight bold
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align center
            color #0045ff
        p.business-desc
            font-family iran-yekan
            font-size 1.5em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align center
            color #3c3c3c
            padding-left 20%
            padding-right 20%

    .solution-container
        width 100%
        padding 0 64px
        box-sizing padding-box

    .solution-card
        box-sizing padding-box
        padding 16px
        display flex
        height 300px
        img
            margin-top 0
            top 0
            height max-content
        div
            p.solution-card-title
                margin-top 5%
                font-family iran-yekan
                font-size 1.5em
                font-weight bold
                font-style normal
                font-stretch normal
                line-height 1.25
                letter-spacing normal
                text-align right
                color #0045ff
                margin-bottom 6px

            p.solution-card-description
                margin-top 5%
                font-family iran-yekan
                font-size 1.5em
                font-weight bold
                font-style normal
                font-stretch normal
                line-height 1.25
                letter-spacing normal
                text-align right
                color #0045ff
                margin-bottom 6px

    .business-solution-button
        outline none
        margin-left auto
        margin-right auto
        width 250px
        height 45px
        border-radius 5px
        box-shadow 0 0 6px 0 rgb(0, 69, 255, 0.4);
        border solid 1px #0045ff
        background-color #0045ff
        font-family iran-yekan
        font-size 1.2em
        font-weight bold
        font-style normal
        font-stretch normal
        line-height 1.75
        letter-spacing normal
        text-align center
        color #fefefe


</style>
