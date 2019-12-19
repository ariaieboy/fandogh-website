<template>

    <div class="row"
         style="width: 100%; display: flex; margin-top: 32px; margin-left: 0; margin-right: 0">
        <div class="caution">
            <p>
                نکته: در هر تیتر لایه‌هایی که به رنگ آبی نمایش داده شده اند را خود سرویس مدیریت می‌کند، به این معنی که
                دیگر
                نیاز نیست شما نگران نگهداری و مدیریت آن لایه‌ها را داشته باشید و بخش‌های سفید رنگ بخش‌هایی هستند که شما
                وظیفه مدیریت و نگهداری آن را دارید.
            </p>
        </div>

        <div style="width: 100%; display: flex; overflow-x: scroll; margin-left: 0; margin-right: 0">
            <div class="infra-parent-style">
                <table class="infra-table-style">
                    <tr>
                        <td v-for="header in headers"
                            :width="header.width"
                            :style="{textAlign: 'center' }">
                            {{header.title}}
                        </td>
                    </tr>
                    <tr v-for="data in competitors_data">
                        <td width='25%'
                            :style="{textAlign: 'center', backgroundColor: data.saas ? '#346BFF' : '#fefefe', color: data.saas ? '#fefefe' : '#3c3c3c', fontWeight: 'normal' }">
                            {{data.title}}
                        </td>
                        <td width='25%'
                            :style="{textAlign: 'center', backgroundColor: data.paas ? '#346BFF' : '#fefefe', color: data.paas ? '#fefefe' : '#3c3c3c', fontWeight: 'normal' }">
                            {{data.title}}
                        </td>
                        <td width='25%'
                            :style="{textAlign: 'center', backgroundColor: data.iaas ? '#346BFF' : '#fefefe', color: data.iaas ? '#fefefe' : '#3c3c3c', fontWeight: 'normal' }">
                            {{data.title}}
                        </td>
                        <td width='25%'
                            :style="{textAlign: 'center', backgroundColor: data.onpremise ? '#346BFF' : '#fefefe', color: data.onpremise ? '#fefefe' : '#3c3c3c', fontWeight: 'normal' }">
                            {{data.title}}
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <p class="infra-desc">
            همانطور که در جدول بالا مشاهده می‌کنید، استفاده از PaaS‌ها یا همان سکوهای ابری به شما این امکان را می‌دهند تا بعد از مهاجرت به زیرساخت‌های ابری بدون نیاز به جذب نیروی متخصص در حوزه زیرساخت و دانش مدیریت زیرساخت به همان روال گذشته تمام تمرکز و منابع خود را صرف توسعه محصول خود نمایید زیرا که سکوی ابری وظیفه مدیریت زیرساخت سرویس‌های شما را به طور کامل به عهده دارد.
        </p>

    </div>

</template>

<script>

    export default {
        name: "infra-services-schema",
        data() {
            return {
                headers: [
                    {title: 'SaaS', width: '25%'},
                    {title: 'PaaS', width: '25%'},
                    {title: 'IaaS', width: '25%'},
                    {title: 'On Premise', width: '25%'}
                ],
                competitors_data: [
                    {
                        title: 'Applications',
                        saas: true,
                        paas: false,
                        iaas: false,
                        onpremise: false
                    },
                    {
                        title: 'Data',
                        saas: true,
                        paas: false,
                        iaas: false,
                        onpremise: false
                    },
                    {
                        title: 'Runtime',
                        saas: true,
                        paas: true,
                        iaas: false,
                        onpremise: false
                    },
                    {
                        title: 'Operating System',
                        saas: true,
                        paas: true,
                        iaas: true,
                        onpremise: false
                    },
                    {
                        title: 'Virtualization',
                        saas: true,
                        paas: true,
                        iaas: true,
                        onpremise: false
                    },
                    {
                        title: 'Servers',
                        saas: true,
                        paas: true,
                        iaas: true,
                        onpremise: false
                    },
                    {
                        title: 'Storage',
                        saas: true,
                        paas: true,
                        iaas: true,
                        onpremise: false
                    },
                    {
                        title: 'Networking',
                        saas: true,
                        paas: true,
                        iaas: true,
                        onpremise: false
                    },
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>

    *
        user-select text

    @import '../../../assets/css/variables.styl'

    .infra-parent-style
        margin-top 0
        width 100%
        margin-left 5%
        margin-right 5%
        max-width 1750px
        @media only screen and (max-width 992px)
            margin-left auto
            margin-right auto

    .infra-table-style
        width 100%
        border none
        border-spacing 16px

        tr
            height 40px
            border-collapse separate
            color #fefefe
            font-family "Helvetica Neue"
            font-size 1.2em
            font-weight bold
            @media only screen and (max-width 992px)
                font-size 1em

            td
                background #fefefe
                color #000
                border-radius 5px
                padding 16px
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)
                @media only screen and (max-width 992px)
                    font-size 1em

    .caution
        background rgba(0, 69, 255, .2)
        border-right 8px solid rgba(0, 69, 255, .4)
        border-left 8px solid rgba(0, 69, 255, .4)
        width 100%
        margin-left 6%
        margin-right 6%
        padding 16px
        margin-bottom 16px
        @media only screen and (max-width 992px)
            margin-right auto
            margin-left auto

        p
            color $fontGray
            font-size 1.1em
            font-family iran-yekan
            font-weight normal
            text-align right

    p.infra-desc
        margin-left 92px
        margin-right 92px
        font-family iran-yekan
        font-size 1.6em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.71
        letter-spacing normal
        text-align center
        padding-top 32px
        color $fontGray
        @media only screen and (max-width: 992px)
            font-size 1.3em
            margin-left 0
            margin-right 0

</style>
