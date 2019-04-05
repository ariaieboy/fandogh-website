<template>
    <div style="padding-bottom: 32px">

        <div class="box-row row">
            <div class="col-lg-10 col-md-9 col-sm-8 col-xs-8 row" style="box-sizing: content-box">
                <p class="title">موجودی حساب کیف پول:</p>
                <p class="value">۱۲۳٬۰۰۰ تومان</p>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-4 row" style="box-sizing: content-box">
                <button class="edit-button">
                    افزایش موجودی
                </button>
            </div>
        </div>

        <p class="section-title">تاریخچه شارژ کیف‌پول شما:</p>

        <TitleRow v-bind:celSpec="rowTitle"></TitleRow>

        <ProfileWalletRow v-for="(item, index) of rowValue"
                          :key="index"
                          v-bind:rowNo="index"
                          v-bind:celSpec="item" />

        <div class="row" style="margin-top: 32px;">
            <div class="container-fluid">
                <div style="margin: 4px; display: flex; box-sizing: content-box; width: 300px; height: 35px; border-radius: 25px; background-color: #fefefe;">

                    <div class="right-cursor" @click="swipeLeft">
                        <img src="~/assets/svg/arrow.svg" alt="arrow"/>
                    </div>

                    <div style="width: 80%; height: 35px; overflow: hidden; white-space: nowrap; display: inline-flex; ">

                        <p style="font-family: 'IRANYekanMobile(FaNum)';line-height: 30px; font-size:16px;color: #7c7c7c; max-width:100%; height: 27px;text-align: center;text-overflow: ellipsis;
                         overflow: hidden; white-space: nowrap; margin: auto; direction: ltr; padding-left: 10px; padding-right: 10px;">1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16</p>

                    </div>

                    <div class="left-cursor" @click="swipeRight">
                        <img src="~/assets/svg/arrow.svg" alt="arrow"/>
                    </div>

                </div>

            </div>

        </div>


    </div>
</template>

<script>
    import ProfileWalletRow from "~/components/Dashboard/profile/wallet-value-row";
    import TitleRow from "~/components/Dashboard/profile/title-row";
    export default {
        name: "profile-wallet",
        components:{
            ProfileWalletRow,
            TitleRow,

        },data() {
            return{
                rowTitle:[
                    {title: 'ردیف', width: '8%'},
                    {title: 'تاریخ', width: '15%'},
                    {title: 'مقدار تراکنش (تومان)', width: '16%'},
                    {title: 'نام کاربر', width: '16%'},
                    {title: 'مانده موجودی (تومان)', width: '20%'},
                    {title: 'توضیحات', width: '25%'},
                ],
                rowValue:[
                    {date: '۱۳۹۷/۰۱/۱۲', transactionAmount:'+ ۱۰۰٬۰۰۰', username: 'سورنا', remaining: '۱۰۰٬۰۰۰', description: 'ندارد'},
                    {date: '۱۳۹۷/۰۱/۱۳', transactionAmount:'- ۱۰۰٬۰۰۰', username: 'سورنا', remaining: '۰', description: 'ندارد'},
                    {date: '۱۳۹۷/۰۱/۱۴', transactionAmount:'+ ۱۰۰٬۰۰۰', username: 'سورنا', remaining: '۱۰۰٬۰۰۰', description: 'ندارد'},
                    {date: '۱۳۹۷/۰۱/۱۵', transactionAmount:'+ ۱۰۰٬۰۰۰', username: 'سورنا', remaining: '۲۰۰٬۰۰۰', description: 'ندارد'},
                    {date: '۱۳۹۷/۰۱/۱۶', transactionAmount:'- ۱۰۰٬۰۰۰', username: 'سورنا', remaining: '۱۰۰٬۰۰۰', description: 'ندارد'},
                    {date: '۱۳۹۷/۰۱/۱۷', transactionAmount:'+ ۱۰۰٬۰۰۰', username: 'سورنا', remaining: '۲۰۰٬۰۰۰', description: 'ندارد'},
                    {date: '۱۳۹۷/۰۱/۱۸', transactionAmount:'+ ۱۰۰٬۰۰۰', username: 'سورنا', remaining: '۳۰۰٬۰۰۰', description: 'ندارد'},
                    {date: '۱۳۹۷/۰۱/۱۹', transactionAmount:'+ ۱۰۰٬۰۰۰', username: 'سورنا', remaining: '۴۰۰٬۰۰۰', description: 'ندارد'},
                    {date: '۱۳۹۷/۰۱/۲۰', transactionAmount:'+ ۱۰۰٬۰۰۰', username: 'سورنا', remaining: '۵۰۰٬۰۰۰', description: 'ندارد'},
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .box-row
        min-height 45px
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        padding-left 16px
        padding-right 16px
        background-color #ffffff

        p.title
            font-family: yekan-bold;
            font-size: .9em;
            font-style: normal;
            margin-bottom auto
            margin-top auto
            float right
            display inline-block
            font-stretch: normal;
            color: #000000;

        p.value
            font-family: IRANYekan;
            font-size: .8em;
            font-style: normal;
            font-stretch: normal;
            padding-right 16px
            display inline-block
            margin-bottom auto
            margin-top auto
            float right
            padding-left 16px
            text-align right
            color: #000000;

    .edit-button
        border-radius 21px
        width 150px
        height 30px
        background-color #7ed321
        color #ffffff
        font-family IRANYekan
        display block
        font-size 0.7em
        border none
        outline none
        cursor pointer
        margin-bottom auto
        margin-top auto
        box-shadow 0 2px 6px 0 rgba(126, 211, 33, 0.42)

    .section-title
        font-family yekan-bold
        font-size .9em
        font-style normal
        margin-top 24px
        margin-bottom 16px
        font-stretch normal
        letter-spacing normal
        color: #7c7c7c

    tr.head
        height 25px
        border-collapse collapse
        border none

    tr.head td
        font-family yekan-bold
        font-size .8em
        line-height 25px
        color #fff
        text-align center
        border-left 1px solid #fff

    tr.head td:last-child
        border none

    .left-cursor
        border-radius 100px
        display inline-flex
        height 28px
        width 28px
        margin-top auto
        margin-bottom auto
        margin-left 4px
        border none
        outline none
        background-color #24d5d8
        cursor pointer
        img
            display flex
            margin auto
            transform rotate(180deg)
            pointer-events none
            @media only screen and (max-width: 900px)
                width 6px


    .right-cursor
        border-radius 100px
        height 28px
        width 28px
        margin-top auto
        margin-bottom auto
        margin-right 4px
        display inline-flex
        border none
        outline none
        background-color #24d5d8
        cursor pointer

        img
            display flex
            margin auto
            pointer-events none
            @media only screen and (max-width: 900px)
                width 6px


</style>