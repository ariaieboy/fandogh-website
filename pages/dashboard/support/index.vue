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

            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'index',
        layout: 'dashboard',
        data() {
            return {
                page_title: 'پشتیبانی',
                search_hint: 'جست‌و‌جو در تیکت‌ها...',
                cancel_text: 'انصراف',
                new_ticket_text: 'تیکت جدید',
                apply_ticket_text: ''
            }
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

        div.support-header-action-container
            display flex
            flex-direction row
            flex .4
            width 100%

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

            button.support-cancel-ticket-button:hover
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)


        div.support-header-search-bar
            width 100%
            box-shadow 0 3px 6px rgba(0, 0, 0, 0.07)
            background-color #fefefe
            border-radius 3px
            height 45px
            flex 0.6
            flex-direction row
            display flex
            padding 4px 4px
            transition all .3s ease-in-out

            div.support-search-bar-action-container
                flex 0.07
                height 100%
                width 100%
                display flex

                img
                    width 22px
                    height 22px
                    margin auto
                    filter invert(1)
                    cursor pointer

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
            box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)




</style>
