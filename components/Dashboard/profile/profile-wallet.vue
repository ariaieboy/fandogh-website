<template>
    <div style="padding-bottom: 32px">

        <div class="row" style="width: 100%">
            <div class="wallet-remaining-container">
                <p class="wallet-title">موجودی کیف پول:</p>
                <p class="wallet-value">{{remaining}} تومان</p>
            </div>

        </div>

        <div class="member-invite-container">
            <input v-model="credit" dir="rtl" type="number" placeholder="حداقل مبلغ افزایش موجودی ۱۰,۰۰۰ تومان است"
                   style="flex: 0.9 0 auto; padding: 0 16px; border: none; outline: none;border-radius: 3px;font-family: iran-sans">
            <button style="color: #fefefe; flex: 0.1 0 auto; border: none; outline: none; background-color: #24D5D8;font-family: iran-yekan; border-top-left-radius: 3px; border-bottom-left-radius: 3px; cursor: pointer; font-size: 1.1em"
                    @click="chargeCredit(credit)">
                افرایش موجودی
            </button>

        </div>

        <p class="section-title">تاریخچه شارژ کیف‌پول شما:</p>

        <TitleRow v-bind:celSpec="rowTitle"></TitleRow>

        <ProfileWalletRow v-for="(item, index) of rowValue"
                          :key="index"
                          v-bind:rowNo="index"
                          v-bind:celSpec="item"/>

        <!--<div class="row" style="margin-top: 32px;">-->
            <!--<div class="container-fluid">-->
                <!--<div style="margin: 4px; display: flex; box-sizing: content-box; width: 300px; height: 35px; border-radius: 25px; background-color: #fefefe;">-->

                    <!--<div class="right-cursor" @click="nextPage">-->
                        <!--<img src="~/assets/svg/arrow.svg" alt="arrow"/>-->
                    <!--</div>-->

                    <!--<div style="width: 80%; height: 35px; overflow: hidden; white-space: nowrap; display: inline-flex;direction: ltr ">-->

                        <!--<a v-for="item of pageRangeSection"-->
                           <!--:class="[currentPage === item ? 'page-active': 'page-inactive']"-->
                           <!--:key="item"-->
                           <!--@click="pageClicked(item)">{{item}}</a>-->

                    <!--</div>-->

                    <!--<div class="left-cursor" @click="prevPage">-->
                        <!--<img src="~/assets/svg/arrow.svg" alt="arrow"/>-->
                    <!--</div>-->

                <!--</div>-->

            <!--</div>-->

        <!--</div>-->


    </div>
</template>

<script>
    import ProfileWalletRow from "~/components/Dashboard/profile/wallet-value-row";
    import TitleRow from "~/components/Dashboard/profile/title-row";
    import ErrorReporter from "../../../utils/ErrorReporter";

    export default {
        name: "profile-wallet",
        components: {
            ProfileWalletRow,
            TitleRow,

        }, data() {

            return {
                credit:null,
                remaining: 0,
                rowTitle: [
                    {title: 'ردیف', width: '8%'},
                    {title: 'تاریخ', width: '15%'},
                    {title: 'مقدار تراکنش (تومان)', width: '16%'},
                    {title: 'نام کاربر', width: '16%'},
                    {title: 'مانده موجودی (تومان)', width: '20%'},
                    {title: 'توضیحات', width: '25%'},
                ],
                rowValue: [
                    {
                        date: '۱۳۹۷/۰۱/۱۲',
                        transactionAmount: '+ ۱۰۰٬۰۰۰',
                        username: 'سورنا',
                        remaining: '۱۰۰٬۰۰۰',
                        description: 'ندارد'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۳',
                        transactionAmount: '- ۱۰۰٬۰۰۰',
                        username: 'سورنا',
                        remaining: '۰',
                        description: 'ندارد'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۴',
                        transactionAmount: '+ ۱۰۰٬۰۰۰',
                        username: 'سورنا',
                        remaining: '۱۰۰٬۰۰۰',
                        description: 'ندارد'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۵',
                        transactionAmount: '+ ۱۰۰٬۰۰۰',
                        username: 'سورنا',
                        remaining: '۲۰۰٬۰۰۰',
                        description: 'ندارد'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۶',
                        transactionAmount: '- ۱۰۰٬۰۰۰',
                        username: 'سورنا',
                        remaining: '۱۰۰٬۰۰۰',
                        description: 'ندارد'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۷',
                        transactionAmount: '+ ۱۰۰٬۰۰۰',
                        username: 'سورنا',
                        remaining: '۲۰۰٬۰۰۰',
                        description: 'ندارد'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۸',
                        transactionAmount: '+ ۱۰۰٬۰۰۰',
                        username: 'سورنا',
                        remaining: '۳۰۰٬۰۰۰',
                        description: 'ندارد'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۹',
                        transactionAmount: '+ ۱۰۰٬۰۰۰',
                        username: 'سورنا',
                        remaining: '۴۰۰٬۰۰۰',
                        description: 'ندارد'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۲۰',
                        transactionAmount: '+ ۱۰۰٬۰۰۰',
                        username: 'سورنا',
                        remaining: '۵۰۰٬۰۰۰',
                        description: 'ندارد'
                    },
                ],
                totalPage: 15,
                currentPage: 1,
                previousPage: 1,
                pageRange: [],
                pageRangeSection: []
            }
        }, methods: {
            async requestWalletRemaining(){

                try {
                    this.$store.commit("SET_DATA", {data: true, id: "loading"});
                    let response = await this.$store.dispatch("walletRemaining");
                    this.remaining = response.remaining
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    if (e.status === 401) {
                        this.$router.replace('/user/login')
                    } else {
                        ErrorReporter(e, this.$data, true).forEach(error => {
                            this.$notify({
                                title: error,
                                time: 4000,
                                type: "error"
                            });
                        });
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }
            },
            async chargeCredit(credit){
                if(credit === null){
                    return
                }
                if(credit < 100){
                    return
                }

                try {
                    this.$store.commit("SET_DATA", {data: true, id: "loading"});
                    let response = await this.$store.dispatch("chargeWallet", credit);
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    this.$router.push(`plans/bill/${response.invoice.id}`);
                } catch (e) {
                    if (e.status === 401) {
                        this.$router.replace('/user/login')
                    } else {
                        ErrorReporter(e, this.$data, true).forEach(error => {
                            this.$notify({
                                title: error,
                                time: 4000,
                                type: "error"
                            });
                        });
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }



            },
            pageClicked(position) {
                this.currentPage = position;
                if (this.totalPage > 7 && position < this.totalPage) {
                    this.recalculatePages(position)
                }

            }, nextPage() {
                if (this.currentPage < this.totalPage) {
                    this.currentPage++;
                    if (this.totalPage > 7) {
                        this.recalculatePages(this.currentPage)
                    }
                }
            }, prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    if (this.totalPage > 7) {
                        this.recalculatePages(this.currentPage)
                    }
                }
            }, createPageRange() {
                for (var i = 1; i <= this.totalPage; i++) {
                    this.pageRange.push(i);
                    if (i <= 7) {
                        this.pageRangeSection.push(i);
                    }
                }
            }, recalculatePages(index) {

                if (index + 6 > this.totalPage) {
                    this.pageRangeSection.length = 0;
                    for (var j = this.totalPage - 6; j <= this.totalPage; j++) {
                        this.pageRangeSection.push(j)
                    }
                    return this.pageRangeSection;
                } else {

                    this.pageRangeSection.length = 0;
                    for (var i = index; i <= index + 6; i++) {
                        this.pageRangeSection.push(i)
                    }
                    return this.pageRangeSection;
                }
            }
        }, created() {
            this.requestWalletRemaining();
            this.createPageRange();
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"

    *
        -webkit-user-select: none
        -moz-user-select: none
        -ms-user-select: none
        user-select: none

    ::-webkit-scrollbar
        display none

    -ms-overflow-style none
    scrollbar-width none

    .box-row
        min-height 45px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        background-color #ffffff

    .charge-button
        width 100%
        height 45px
        line-height 45px
        background-color #7ed321
        color #ffffff
        font-family iran-yekan
        display block
        font-size 1em
        border none
        outline none
        cursor pointer
        margin-bottom auto
        margin-top auto

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

    .page-inactive
        font-family iran-sans
        line-height 35px
        font-size 16px
        color #7c7c7c
        height 35px
        cursor pointer
        text-align center
        margin auto
        margin-left 12px
        margin-right 12px
        direction ltr

    .page-active
        font-family iran-sans
        line-height 35px
        font-size 17px
        margin auto
        font-weight bold
        margin-left 12px
        margin-right 12px
        color #2979ff
        height 35px
        cursor pointer
        text-align center

    .wallet-remaining-container
        width 100%
        height max-content
        padding-top 32px
        padding-bottom 32px
        display flex
        p.wallet-title
            font-family: iran-yekan;
            font-size: 2em;
            font-style: normal;
            margin-bottom auto
            margin-top auto
            float right
            padding-right 16px
            display inline-block
            font-stretch: normal;
            color: $fontBlack;

        p.wallet-value
            font-family: iran-sans;
            font-size: 2em;
            font-style: normal;
            font-stretch: normal;
            padding-right 16px
            display inline-block
            margin-bottom auto
            margin-top auto
            float right
            padding-left 16px
            text-align right
            color: $fontBlack;

    .member-invite-container
        border-radius 3px
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.09)
        width 50%
        min-width 350px
        height 50px
        background-color #fefefe
        margin-top 24px
        margin-bottom 64px
        display flex
        padding 0

</style>
