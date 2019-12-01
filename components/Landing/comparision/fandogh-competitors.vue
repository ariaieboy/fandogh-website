<template>

    <div class="row" style="width: 100%; display: flex; margin-left: 0; margin-right: 0; margin-top: 32px;">

        <div class="parent-style">
            <table class="table-style">
                <tr>
                    <td v-for="header in headers"
                        :width="header.width"
                        :style="{textAlign: 'center' }">
                        {{header.title}}
                    </td>
                </tr>
            </table>
        </div>

        <div style="margin-left: 5%; margin-right: 5%; margin-top: 12px;">
            <table style="width: 100%; border: none; border-collapse: collapse; table-layout: fixed">
                <tr class="cursor-row" v-for="item in competitors_data" style="height: 48px; border-collapse: collapse; font-family: iran-yekan;font-size: 1.2em; color: #333333;">
                    <td :width="headers[0].width"
                        style="font-family: iran-yekan; text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                        {{item.title}}
                    </td>
                    <td :width="headers[1].width"
                        v-if="!item.is_boolean"
                        style="font-family: 'Helvetica Neue'; text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                        {{item.fandogh}}
                    </td>
                    <td v-else
                        :width="headers[1].width"
                        style="font-family: 'Helvetica Neue'; text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                        <img v-if="item.fandogh" src="../../../assets/svg/available.svg">
                        <img v-else src="../../../assets/svg/not-available.svg">
                    </td>
                    <td :width="headers[2].width"
                        v-if="!item.is_boolean"
                        style="text-align: center; font-family: 'Helvetica Neue'; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                        {{item.sloppy}}
                    </td>
                    <td v-else
                        :width="headers[2].width"
                        style="font-family: 'Helvetica Neue'; text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                        <img v-if="item.sloppy" src="../../../assets/svg/available.svg">
                        <img v-else src="../../../assets/svg/not-available.svg">
                    </td>
                    <td :width="headers[3].width"
                        v-if="!item.is_boolean"
                        style="text-align: center; font-family: 'Helvetica Neue'; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                        {{item.heroku}}
                    </td>
                    <td v-else
                        :width="headers[3].width"
                        style="font-family: 'Helvetica Neue'; text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                        <img v-if="item.heroku" src="../../../assets/svg/available.svg">
                        <img v-else src="../../../assets/svg/not-available.svg">
                    </td>
                </tr>
            </table>
        </div>
    </div>

</template>

<script>
    import TableHeader from "../../Dashboard/home/children/table-header";
    import TableTitle from "../../Dashboard/home/children/table-title";

    export default {
        name: "fandogh-competitors",
        components: {
            TableHeader,
            TableTitle
        },
        data() {
            return {
                headers: [
                    {title: 'ويژگی‌ها', width: '40%'},
                    {title: 'Fandogh.Cloud', width: '20%'},
                    {title: 'Sloppy.io', width: '20%'},
                    {title: 'Heroku.com', width: '20%'}
                ],
                competitors_data: [
                    {
                        title: 'شروع قیمت',
                        is_boolean: false,
                        fandogh: '2.5$',
                        sloppy: '21$',
                        heroku: '7$'
                    },
                    {
                        title: 'حساب کاربری رایگان',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: false,
                        heroku: true
                    },
                    {
                        title: 'اجبار تعیین روش پرداخت',
                        is_boolean: true,
                        fandogh: false,
                        sloppy: true,
                        heroku: true
                    },
                    {
                        title: 'CLI',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: true
                    },
                    {
                        title: 'Fully Interactive Web UI',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: false
                    },
                    {
                        title: 'CI/CD',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: true
                    },
                    {
                        title: 'مدیریت تیم',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: true
                    },
                    {
                        title: 'Multi Region',
                        is_boolean: true,
                        fandogh: false,
                        sloppy: true,
                        heroku: true
                    },
                    {
                        title: 'Private Image Registry',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: false
                    },
                    {
                        title: 'Public Image Registry Support',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: true
                    },
                    {
                        title: 'Built In Load Balancer',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: true
                    },
                    {
                        title: 'Custom Manifest',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: false,
                        heroku: true
                    },
                    {
                        title: 'k8s support',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: false,
                        heroku: false
                    },
                    {
                        title: 'دامنه رایگان',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: false
                    },
                    {
                        title: 'گواهی‌نامه SSL رایگان',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: false
                    },
                    {
                        title: 'Shared Volume',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: true
                    },
                    {
                        title: 'Persisted Volume',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: true
                    },
                    {
                        title: 'Rollback',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: true
                    },
                    {
                        title: 'Managed Services',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: false,
                        heroku: true
                    },
                    {
                        title: 'مانیتورینگ',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: true
                    },
                    // {
                    //     title: 'Limit',
                    //     is_boolean: true,
                    //     fandogh: true,
                    //     sloppy: true,
                    //     heroku: true
                    // },
                    // {
                    //     title: 'Pay As You Go',
                    //     is_boolean: true,
                    //     fandogh: true,
                    //     sloppy: true,
                    //     heroku: true
                    // },
                    {
                        title: 'Dedicated Cluster',
                        is_boolean: true,
                        fandogh: true,
                        sloppy: true,
                        heroku: true
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

    .parent-style
        background-color $colorPrimary
        border-radius 5px
        margin-top 0
        width 100%
        margin-left 5%
        margin-right 5%
        position sticky
        top 74px
        max-width 1750px
        box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)

    .table-style
        width 100%
        border none
        border-collapse collapse

        tr
            height 40px
            border-collapse collapse
            color #fefefe
            font-family iran-yekan
            font-size 1em
            font-weight bold

    img
        width 24px
        height 24px

    .cursor-row
        background unset
        cursor unset
        transition all .2s ease-in-out

    .cursor-row:hover
        background-color rgba(0, 69, 255, 0.2)




</style>
