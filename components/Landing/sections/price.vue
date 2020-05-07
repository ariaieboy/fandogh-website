<template>

    <div id="prices" class="row price-parent-container">

        <div class="price-header">
            <img src="../../../assets/svg/price-tag.svg" alt="bt"/>
            <div>
                <h3>{{title}}</h3>
                <p>{{price_section_description}}</p>
                <a href="/pricing" target="_blank" rel="noopener">{{price_link}}</a>
            </div>
        </div>
    </div>


</template>

<script>
    import 'vue-slider-component/theme/default.css';

    export default {
        name: "price",
        data() {
            return {
                title: 'قیمت محصولات سکوی ابری فندق',
                price_section_description: 'قیمت‌گذاری رقابتی و منعطف برای هر نوع پروژه‌ای و با هر مقیاسی، کیفیت بالا در مقابل هزینه کم.\n' +
                    'هر نوع پروژه‌ای با هر مقایسی را به سادگی بر روی فندق اجرا کنید.',
                price_link: 'مطالعه بیشتر'
            }
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"


    .price-parent-container
        width 100%
        background-color #0045ff
        padding 16px
        box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)

        div.price-header
            display flex
            flex-direction row
            width 100%
            @media only screen and (max-width 992px)
                flex-direction column

            img
                width 192px
                height 192px
                margin-top auto
                margin-bottom auto
                opacity 0.9
                flex 0.2
                @media only screen and (max-width 992px)
                    margin-right auto
                    margin-left auto
                    width 128px
                    height 128px


            div
                width 100%
                z-index 2
                display flex
                flex-direction column
                padding-left 16px
                padding-right 16px
                flex 0.8

                h3
                    width 100%
                    font-size 2.3em
                    line-height 1.71
                    font-family iran-yekan
                    font-weight bold
                    font-style normal
                    font-stretch normal
                    letter-spacing normal
                    text-align center
                    color #fefefe
                    @media only screen and (max-width: 1230px)
                        font-size 2em
                    @media only screen and (max-width: 920px)
                        font-size 1.7em

                p
                    width 100%
                    font-size 1.3em
                    line-height 1.71
                    padding-top 16px
                    padding-left 32px
                    padding-right 32px
                    font-family iran-yekan
                    font-weight normal
                    font-style normal
                    font-stretch normal
                    letter-spacing normal
                    color #ebebeb
                    text-align center
                    @media only screen and (max-width: 1230px)
                        font-size 1.3em
                        padding-left 16px
                        padding-right 16px
                    @media only screen and (max-width: 920px)
                        font-size 1.1em
                        padding-left 16px
                        padding-right 16px

                a
                    width 250px
                    height 38px
                    background #00E5FF
                    color #222222
                    margin-top 16px
                    font-family iran-yekan
                    border-radius 3px
                    box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)
                    margin-left auto
                    margin-right auto
                    text-align center
                    font-size 1.1em
                    line-height 38px
                    transition all .3s ease-in-out

                a:hover
                    box-shadow 0 3px 10px rgba(0, 0, 0, 0.27)


    .resource-description
        padding 0 20%
        font-family iran-yekan
        font-size 1.4em
        font-weight bold
        font-style normal
        font-stretch normal
        line-height 1.73
        letter-spacing normal
        text-align center
        color #3c3c3c
        @media only screen and (max-width: 992px)
            font-size 1.1em
            padding 0 10%

</style>

