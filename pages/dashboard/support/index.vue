<template>

    <div class="row" style="width: 100%;">

        <div class="container-fluid col-lg-10 col-md-11 col-xs-12 col-sm-12">

            <div style="width: 100%;">

                <div class="right" style="float: right;"><p class="title_header">{{page_title}}</p></div>

                <div class="support-header-container">

                    <div class="support-header-action-container">

                        <button class="support-new-ticket-button">{{new_ticket_text}}</button>
                        <button class="support-cancel-ticket-button">{{cancel_text}}</button>

                    </div>

                    <div class="support-header-search-bar">

                        <div class="support-search-bar-action-container">
                            <img src="../../../assets/svg/ic-search.svg" alt="search">
                        </div>


                        <div class="support-header-search-container">
                            <input :placeholder="search_hint">
                        </div>

                    </div>

                </div>

                <div style="margin-left: 0; margin-right: 0">

                    <ticket-complete-row
                            v-if="tickets.results"
                            style="margin-left: 0; margin-right: 0;"
                            :header="titleRowComplete"
                            :cel-specs="tickets.results">
                    </ticket-complete-row>

                </div>

            </div>

        </div>

    </div>
</template>

<script>

    import TitleRow from "~/components/Dashboard/profile/title-row"
    import Moment from 'moment-jalaali'
    import TicketCompleteRow from "../../../components/Dashboard/support/ticket-complete-row"

    export default {
        name: 'index',
        layout: 'dashboard',
        components: {
            TicketCompleteRow,
            TitleRow,
            Moment

        }, data() {
            return {
                page_title: 'پشتیبانی',
                search_hint: 'جست‌و‌جو در تیکت‌ها...',
                cancel_text: 'انصراف',
                new_ticket_text: 'تیکت جدید',
                apply_ticket_text: '',
                titleRowComplete: [
                    {title: 'شماره', width: '8%'},
                    {title: 'وضعیت', width: '12%'},
                    {title: 'تاریخ', width: '15%'},
                    {title: 'بخش', width: '10%'},
                    {title: 'موضوع تیکت', width: '55%'}
                ],
                tickets: {},
            }
        },
        methods: {
            async getData() {
                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                try {
                    this.tickets = await this.$store.dispatch("getTickets");
                    this.tickets.results = this.tickets.results.map(({id, title, description, files, user, created_at, status, department}) => {
                        return {
                            id,
                            title,
                            description,
                            files,
                            user,
                            created_at: Moment(created_at).format('HH:mm jYYYY/jMM/jDD'),
                            status: status === 'PENDING' ? `<div class="ticket-status-pending"><p>در حال بررسی</p></div>` :
                                status === 'CLOSED' ? `<div class="ticket-status-closed"><p>بسته شده</p></div>` :
                                    status === 'ADMIN_ANSWER' ? `<div class="ticket-status-admin-answer"><p>پاسخ پشتیبان</p></div>` :
                                        status === 'USER_ANSWER' ? `<div class="ticket-status-user-answer"><p>در انتظار پاسخ</p></div>` : '',
                            department: department === 'TECHNICAL' ? 'فنی' : 'حسابداری'
                        };
                    });
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    } else {
                        this.$notify({
                            title: e.data.message,
                            time: 4000,
                            type: "error"
                        });
                    }
                }
            },
        },
        created() {
            this.getData()
        }
    }
</script>

<style lang="stylus" scoped>

    .title_header
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        padding-top 18px
        color #7c7c7c
        letter-spacing normal
        padding-bottom 16px

    .support-header-container
        width 100%
        display flex
        flex-direction row
        @media only screen and (max-width 992px)
            flex-direction column

        div.support-header-action-container
            display flex
            flex-direction row
            flex .45
            width 100%
            @media only screen and (max-width 992px)
                margin-bottom 16px

            button.support-new-ticket-button
                height 45px
                width 200px
                background-color aqua
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.07)
                border-radius 3px
                color #333
                font-size 1em
                font-family iran-yekan
                transition all .3s ease-in-out
                @media only screen and (max-width 992px)
                    height 34px
                    width 150px

            button.support-new-ticket-button:hover
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)


            button.support-apply-ticket-button
            button.support-apply-ticket-button:hover
            button.support-cancel-ticket-button
                height 45px
                width 200px
                background-color #FD3288
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.07)
                border-radius 3px
                color #fefefe
                font-size 1em
                font-family iran-yekan
                margin-right 6px
                transition all .3s ease-in-out
                @media only screen and (max-width 992px)
                    height 34px
                    width 150px

            button.support-cancel-ticket-button:hover
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)


        div.support-header-search-bar
            width 100%
            box-shadow 0 3px 6px rgba(0, 0, 0, 0.07)
            background-color #fefefe
            border-radius 3px
            height 45px
            flex 0.55
            flex-direction row
            display flex
            padding 4px 4px
            transition all .3s ease-in-out
            @media only screen and (max-width 992px)
                height 34px
                padding 2px 2px


            div.support-search-bar-action-container
                flex 0.07
                height 100%
                width 100%
                display flex

                img
                    width 18px
                    height 18px
                    margin auto
                    filter invert(1)
                    opacity .5
                    cursor pointer
                    transition all .3s ease-in-out
                    @media only screen and (max-width 992px)
                        width 16px
                        height 16px

            div.support-header-search-container
                background-color #F2F2F2
                flex 0.93
                height 100%
                width 100%
                border-radius 3px

                input
                    font-family iran-yekan
                    outline none
                    width 100%
                    height 100%
                    padding 0 8px

        div.support-header-search-bar:focus-within
            box-shadow 0 1px 6px 3px rgba(0, 0, 0, 0.17)

            div.support-search-bar-action-container

                img
                    opacity 1

</style>

<style lang="stylus">

    .ticket-status-pending
        display flex
        border-radius 5px
        margin 0 8px
        background-color rgba(0, 69, 255, 0.1)

        p
            margin auto
            color #0045FF
            font-size .9em

    .ticket-status-closed
        background-color rgba(96, 96, 96, 0.1)
        display flex
        border-radius 5px
        margin 0 8px

        p
            margin auto
            color rgba(96, 96, 96, 1)
            font-size .9em

    .ticket-status-admin-answer
        background-color rgba(60, 204, 56, 0.1)
        display flex
        border-radius 5px
        margin 0 8px

        p
            margin auto
            color rgba(60, 204, 56, 1)
            font-size .9em

    .ticket-status-user-answer
        background-color rgba(36, 213, 216, 0.1)
        display flex
        border-radius 5px
        margin 0 8px

        p
            margin auto
            color rgba(36, 213, 216, 1)
            font-size .9em

</style>
