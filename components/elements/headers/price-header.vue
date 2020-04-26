<template>

    <div class="price-header-container">

        <div class="row inner-container">

            <div class="col-xs-12 col-md-8 col-lg-8 col-sm-12">

                <h2 v-if="en" style="font-family: 'Helvetica Neue'">{{title}}</h2>
                <h2 v-else>{{title}}</h2>
                <p class="price-header-description" v-html="description">{{description}}</p>

            </div>

            <div v-if="links" class="col-xs-12 col-md-4 col-lg-4 col-sm-12 price-header-links-container">

                <div class="divider"></div>
                <div class="description-container">
                    <p>مستندات مرتبط</p>
                    <a :href="link.href" v-for="link in links" target="_blank" rel="noopener">{{link.title}}</a>
                </div>

            </div>

            <div v-if="alter" class="col-xs-12 col-md-4 col-lg-4 col-sm-12 price-header-links-container">

                <div class="divider"></div>
                <div class="description-container">
                    <p style="color: #001069; font-size: 3em; text-align: center; margin-bottom: auto; margin-top: auto;">{{alter}}</p>
                </div>

            </div>

        </div>

        <div class="price-header-divider"></div>

    </div>

</template>

<script>
    export default {
        name: "price-header",
        props: ['title', 'description', 'links', 'alter', 'en'],
        data() {
            return {}
        }
    }
</script>

<style lang="stylus" scoped>

    .price-header-container
        width 100%
        background #fefefe
        display flex
        flex-direction column

        .inner-container
            padding 32px 16px
            width 100%


    h2
        font-family: 'yekan'
        font-size: 2em
        font-weight: normal
        font-style: normal
        font-stretch: normal
        line-height: 1.24
        letter-spacing: normal
        text-align: right
        color: #535353
        padding-right 16px
        @media only screen and (max-width 992px)
            padding-right 0
            font-size 1.5em


    .price-header-description
        color #535353
        padding-top 24px
        padding-left 32px
        padding-right 16px
        font-size 1.1em
        @media only screen and (max-width 992px)
            padding-right 0
            padding-left 0
            font-size 1em


    .price-header-links-container
        display flex
        flex-direction row

        div.divider
            width 1px
            background rgba(112, 112, 112, 0.5)
            @media only screen and (max-width 992px)
                display none

        div.description-container
            width 100%
            display flex
            flex-direction column
            padding-right 32px
            padding-left 32px
            @media only screen and (max-width 992px)
                padding-right 0
                padding-left 0

            p
                color #535353
                font-size 1.4em
                @media only screen and (max-width 992px)
                    font-size 1.2em

            a
                color #0045FF
                font-size 1.1em
                cursor pointer
                max-width 275px
                line-height 2
                padding-top 5px
                @media only screen and (max-width 992px)
                    font-size 1em



    .price-header-divider
        height 1px
        background rgba(112, 112, 112, 0.5)

</style>
