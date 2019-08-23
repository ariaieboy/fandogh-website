<template>
    <div class="single-sidebar">
        <ul>
            <li><router-link :to="{path:'about-us'}">درباره ما</router-link></li>
            <li><router-link :to="{path:'our-values'}">ارزش‌های ما</router-link></li>
            <li><router-link :to="{path:'/contact-us'}">تماس با ما</router-link></li>
            <li><router-link :to="{path:'conditions-of-use'}">شرایط استفاده از خدمات</router-link></li>
        </ul>
    </div>
</template>
<style lang="stylus" scoped>
    ul,li
        padding 0
        margin 0
    .single-sidebar
        width 270px
        height max-content
        border-radius: 5px;
        background rgba(0, 69, 255, 0.36)
        min-height 500px
        padding-top 24px
        ul
            display block
            li
                a
                    display block
                    padding 12px 24px
                    font-family iran-yekan
                    color #2c2c2c
                    &.nuxt-link-active
                        background-color #0045ff
                        color #fefefe
                        font-weight bold

    @media only screen and (max-width: 768px)
        .single-sidebar
            width 100%
            display block
            min-height auto
            position unset
            ul
                margin-bottom 24px
</style>
