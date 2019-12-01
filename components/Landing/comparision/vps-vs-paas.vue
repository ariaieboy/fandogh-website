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
                        style="font-family: iran-yekan; text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                        {{item.vps}}
                    </td>
                    <td v-else
                        :width="headers[1].width"
                        style="font-family: iran-yekan; text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                        <img v-if="item.vps" src="../../../assets/svg/available.svg">
                        <img v-else src="../../../assets/svg/not-available.svg">
                    </td>
                    <td :width="headers[2].width"
                        v-if="!item.is_boolean"
                        style="text-align: center; font-family: iran-yekan; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                        {{item.paas}}
                    </td>
                    <td v-else
                        :width="headers[2].width"
                        style="font-family: iran-yekan; text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                        <img v-if="item.paas" src="../../../assets/svg/available.svg">
                        <img v-else src="../../../assets/svg/not-available.svg">
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vps-vs-paas",
        data() {
            return {
                headers: [
                    {title: 'ويژگی‌ها', width: '40%'},
                    {title: 'VPS', width: '25%'},
                    {title: 'PaaS', width: '25%'}
                ],
                competitors_data: [
                    {
                        title: 'Service Discovery',
                        is_boolean: false,
                        paas: 'پیش ساخته',
                        vps: 'ندارد'
                    },
                    {
                        title: 'Load Balancing',
                        is_boolean: false,
                        paas: 'پیش ساخته',
                        vps: 'ندارد',
                    },
                    {
                        title: 'Networking',
                        is_boolean: false,
                        paas: 'پیش ساخته',
                        vps: 'بر عهده کاربر',
                    },
                    {
                        title: 'Free SSL',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'Free Custom Domain',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'Zero Downtime Deployment',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'Image Registry',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'نیاز به نیروی متخصص',
                        is_boolean: false,
                        paas: 'ندارد',
                        vps: 'دارد',
                    },
                    {
                        title: 'Shared Storage',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'Persisted Volume',
                        is_boolean: true,
                        paas: true,
                        vps: true,
                    },
                    {
                        title: 'CI/CD Friendly',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'Managed Service',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'Horizontal Scaling',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'Auto Horizontal Scaling',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'Single Point of Failure',
                        is_boolean: true,
                        paas: false,
                        vps: true,
                    },
                    {
                        title: 'بهینه از نظر مالی',
                        is_boolean: false,
                        paas: '100%',
                        vps: 'شاید',
                    },
                    {
                        title: 'Namespace',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'Team Support',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'Rollback',
                        is_boolean: false,
                        paas: 'دارد',
                        vps: 'بر عهده کاربر',
                    },
                    {
                        title: 'Monitoring',
                        is_boolean: false,
                        paas: 'دارد',
                        vps: 'بر عهده کاربر',
                    },
                    {
                        title: 'Easy Deployment',
                        is_boolean: true,
                        paas: true,
                        vps: false,
                    },
                    {
                        title: 'هزینه منابع سیستم عامل',
                        is_boolean: false,
                        paas: 'بر عهده سکو',
                        vps: 'بر عهده کاربر',
                    }
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
            font-size 1.1em
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
