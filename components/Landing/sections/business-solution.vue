<template>
    <div style="width: 100%; padding-bottom: 64px; max-width: 1750px; padding-right: 0; padding-left: 0"
         class="container-fluid">

        <div class="business-image-header">
            <div class="semi-line-right"></div>
            <img src="../../../assets/svg/services/enterprise/company.svg" alt="company"/>
            <div class="semi-line-left"></div>
        </div>

        <div class="business-solution-intro">
            <p class="business-title">{{title}}</p>
            <p class="business-desc">{{description}}</p>
        </div>

        <div class="row solution-container">
            <div v-for="item in solutions" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 solution-card">
                <span>
                    <img :src="require('../../../assets/svg/services/enterprise/' + item.image + '.svg')"
                         :alt="item.title"/>
                </span>
                <div style="width: 100%; display: flex; flex-direction: column; padding-right: 12px; flex: 1">
                    <p class="solution-card-title">
                        {{item.title}}</p>
                    <p class="solution-card-description">
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
        data() {
            return {

                title: 'راه حل‌های شرکتی',
                description: 'تجربیات و تیم فندق را به صورت اختصاصی برای شرکت خود داشته باشید',
                solutions: [
                    {
                        title: 'امنیت بالا',
                        description: 'امنیت بالا سکو با توجه به زیرساخت مورد انتخاب شما تامین می‌شود و شما می‌توانید تمام تجربیات سکوی ابری فندق را به صورت انحصاری برای کسب‌و‌کار خود داشته باشید.',
                        image: 'security'
                    },
                    {
                        title: 'رجیستری اختصاصی',
                        description: 'ما برای شما رجیستری خصوصی ایجاد می‌کنیم که فقط و فقط شما به آن دسترسی دارید و تمام پروژه‌های شما همیشه توسط آن در دسترس خواهند بود تا دیگر دغدغه استفاده از رجیستری‌های خارجی و خطرات احتمالی آن را نداشته باشید.',
                        image: 'registry'
                    },
                    {
                        title: 'زیرساخت اختصاصی',
                        description: 'فرقی نمی‌کند زیرساخت از شما باشد یا از ما، سکوی ابری فندق به نحوی طراحی و پیاده‌سازی شده است تا بتوان در هر زمان ظرف مدت زمان کوتاهی بر روی هر زیرساختی که نیازمندی‌های این سکو را برطرف می‌کند مستقر کرد.',
                        image: 'infra'
                    },
                    {
                        title: 'Firewall',
                        description: 'اگر حساسیت امنیتی بالایی دارید و راهکارهای امنیتی مضاف بر آنچه سکوی ابری فندق ارائه می‌دهد نیاز دارید، ما برای شما از firewall‌هایی که خودتان آن‌ها را تایید می‌کنید استفاده می‌کنیم.',
                        image: 'firewall'
                    },
                    {
                        title: 'ارائه مشاوره فنی',
                        description: 'اگر در طول پروسه توسعه محصولات خود نیازی به کمک در معماری میکروسرویس‌های خود داشته باشید نگران نباشید.\n' +
                            'تیم سکوی ابری فندق به صورت تمام وقت پاسخگوی مشکلات شما خواهند بود و با بهترین راهکارها شما را در طول مسیر توسعه همراهی خواهند کرد.\n',
                        image: 'consulting'
                    },
                    {
                        title: 'ارائه SLA',
                        description: 'هر کسب‌وکاری نگرانی‌های و حساسیت‌های مخصوص به خود دارد، شما می‌توانید با توجه به نیازمندی‌ها و حساسیت‌هایتان SLA دریافت کنید تا از کیفیت و امنیت خدمات اطمینان خاطر داشته باشید.',
                        image: 'sla'
                    }
                ]

            }
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"

    .business-image-header
        display flex
        width 100%

        div.semi-line-right
            height 1px
            border-radius 25px
            background-image: linear-gradient(to right, $colorPrimary 15%, rgba(193, 193, 193, 0.2));
            width 100%
            margin auto 32px
            @media only screen and (max-width: 992px)
                margin auto 16px

        div.semi-line-left
            height 1px
            border-radius 25px
            background-image: linear-gradient(to left, $colorPrimary 15%, rgba(193, 193, 193, 0.2));
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
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align center
            color $fontBlack
            @media only screen and (max-width: 992px)
                font-size 1.8em

        p.business-desc
            font-family iran-yekan
            font-size 1.5em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align center
            color $fontGray
            padding-left 20%
            padding-right 20%
            @media only screen and (max-width: 992px)
                font-size 1.1em
                padding-left 10%
                padding-right 10%

    .solution-container
        width 100%
        padding 0 64px
        box-sizing padding-box

    .solution-card
        box-sizing padding-box
        padding 16px
        display flex
        height 300px

        span
            width 60px
            height 60px
            border-radius 5px
            background-color rgba(0, 69, 255, 0.2)
            display flex
            img
                width 36px
                height 36px
                margin auto

        div
            p.solution-card-title
                font-family iran-yekan
                font-size 1.4em
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.25
                letter-spacing normal
                text-align right
                color $fontBlack
                margin-bottom 6px
                @media only screen and (max-width: 992px)
                    font-size 1.2em

            p.solution-card-description
                font-family iran-yekan
                font-size 1.1em
                margin-top 8px
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.75
                letter-spacing normal
                text-align right
                color $fontGray
                @media only screen and (max-width: 992px)
                    font-size 1em

    .business-solution-button
        outline none
        margin-left auto
        margin-right auto
        width 250px
        height 45px
        border-radius 5px
        box-shadow 0 3px 6px 0 rgb(23, 87, 255, 0.2);
        background-color $colorBlueArea
        font-family iran-yekan
        font-size 1.2em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.75
        letter-spacing normal
        text-align center
        color #fefefe


</style>
