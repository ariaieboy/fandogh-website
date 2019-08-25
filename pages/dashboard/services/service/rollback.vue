<template>
    <div class="row" style="margin-left: 0; margin-right: 0; width: 100%;">
        <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12" style="padding-left: 8px; padding-right: 8px">
            <div class="rollback-parent-container">
                <span>
                    <img src="../../../../assets/svg/ic-rollback.svg" alt="rollback"/>
                </span>
                <div class="rollback-spec-container">
                    <h5>نسخه سرویس: ۱۲</h5>
                    <p>تاریخ ساخت:۱۲:۵۰ - ۱۳۹۸/۰۶/۰۲</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "rollback"
    }
</script>

<style lang="stylus" scoped>

    @import "../../../../assets/css/variables.styl"

    .rollback-parent-container
        width 100%
        height 100px
        border-radius 5px
        margin-bottom 16px
        box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)
        background $totalWhite
        padding 16px
        transition all .3s ease-in-out
        display flex
        @media only screen and (max-width 992px)
            height 80px

        span
            width 50px
            height 50px
            margin-top auto
            margin-bottom auto
            border-radius 50%
            border 1px solid $colorPrimary
            display flex
            cursor pointer

            img
                margin auto
                width 100%
                height 100%
                padding 6px
                transition-property: transform;
                transition-duration: 1s;
                filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)

        span:hover
            img
                animation-name: rotate
                animation-duration: 3s
                animation-iteration-count: infinite
                animation-timing-function: linear


    .rollback-parent-container:hover
        box-shadow 0 3px 26px 0 rgba(0, 0, 0, 0.16)
        transition all .3s ease-in-out


    .rollback-spec-container
        width 100%
        flex 1
        height 100%
        display flex
        flex-direction column
        h5
            font-family iran-yekan
            font-weight normal
            font-size 1.2em
            color $silverDark
            flex 1
            margin-right 12px
            text-align right
        p
            font-family iran-yekan
            font-weight normal
            font-size 1em
            flex 1
            text-align right
            margin-right 12px
            margin-bottom 0
            color $silverDark


    .rotating {
        -webkit-animation: rotating 2s linear infinite;
        -moz-animation: rotating 2s linear infinite;
        -ms-animation: rotating 2s linear infinite;
        -o-animation: rotating 2s linear infinite;
        animation: rotating 2s linear infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(-360deg);
        }
    }

    @-webkit-keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(-360deg);
        }
    }


</style>
