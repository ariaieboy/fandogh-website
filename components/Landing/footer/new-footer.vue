<template>
    <div class="row footer-container">

        <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12" style="display: flex; box-sizing: padding-box">
            <div style=" padding: 32px 12px; width: max-content">
                <p class="footer-col-title">محصولات</p>
                <ul>
                    <li>
                        <a class="footer-col-option" href="https://fandogh.cloud/managed-services" target="_blank" rel="noopener">سرویس‌های مدیریت شده</a>
                    </li>

                    <li>
                        <a class="footer-col-option" href="https://fandogh.cloud/languages" target="_blank" rel="noopener">سرویس‌های مستقیم</a>
                    </li>

                    <!--<li>-->
                        <!--<a class="footer-col-option">ذخیره سازی</a>-->
                    <!--</li>-->
                </ul>
            </div>
            <div style="width: max-content; padding: 32px 12px;">
                <p class="footer-col-title">منابع</p>
                <ul>
                    <li>
                        <a class="footer-col-option" href="https://docs.fandogh.cloud/docs/getting-started.html" target="_blank" rel="noopener">مستندات</a>
                    </li>
                    <li>
                        <a class="footer-col-option" href="https://github.com/fandoghpaas/fandogh-manifests" rel="noopener">مانیفست‌ها</a>
                    </li>
                    <li>
                        <a class="footer-col-option" href="https://blog.fandogh.cloud/" target="_blank" rel="noopener">وبلاگ</a>
                    </li>
                    <li>
                        <a class="footer-col-option" href="https://github.com/fandoghpaas/fandogh-cli/blob/master/api-docs/api-contract.yaml" target="_blank" rel="noopener">API</a>
                    </li>
                    <li>
                        <a class="footer-col-option" href="https://docs.fandogh.cloud/docs/getting-started.html" target="_blank" rel="noopener">CLI</a>
                    </li>
                </ul>
            </div>
            <div style="width: max-content; padding: 32px 12px;">
                <p class="footer-col-title">درباره ما</p>
                <ul>
                    <li>
                        <a class="footer-col-option" @click="$router.push('/comparison')" rel="noopener">چرا فندق؟</a>
                    </li><li>
                        <a class="footer-col-option" @click="$router.push('/about-us')" rel="noopener">درباره ما</a>
                    </li>
                    <li>
                        <a class="footer-col-option" @click="$router.push('/our-values')" rel="noopener">ارزش‌های ما</a>
                    </li>
                    <li>
                        <a class="footer-col-option" @click="$router.push('/conditions-of-use')" rel="noopener">قوانین سکو</a>
                    </li>
                    <li>
                        <a class="footer-col-option" @click="$router.push('/contact-us')" rel="noopener">تماس با ما</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 left-footer-container">


            <div class="footer-social-container">

                <a rel="noopener" target="_blank" href="https://github.com/fandoghpaas"> <img
                        src="../../../assets/svg/social/github.svg" alt="github"/></a>
                <a rel="noopener" target="_blank" href="https://twitter.com/fandoghpaas"><img
                        src="../../../assets/svg/social/twitter.svg" alt="twitter"/></a>
                <a rel="noopener" target="_blank" href="https://linkedin.com/company/fandogh-paas"><img
                        src="../../../assets/svg/social/linkedin.svg" alt="linkedin"/></a>
                <a rel="noopener" target="_blank" href="https://facebook.com/fandoghpaas/"><img
                        src="../../../assets/svg/social/facebook.svg" alt="facebook"/></a>
                <a rel="noopener" target="_blank" href="https://t.me/fandoghpaas"><img
                        src="../../../assets/svg/social/telegram.svg" alt="telegram"/></a>
                <a rel="noopener" target="_blank" href="https://virgool.io/@fandogh.cloud"><img
                        src="../../../assets/svg/social/virgool.svg" alt="virgool"/></a>
                <a rel="noopener nofollow" target="_blank" href="mailto:support@fandogh.cloud"><img
                        src="../../../assets/svg/social/email.svg" alt="email"/></a>

            </div>


        </div>

        <div class="copy-right-container">

            <img src="../../../assets/svg/ic-fandogh-mini.svg" alt="fandogh-logo">
            <p>
                تمام حقوق مادی و معنوی این سایت متعلق به سکوی ابری فندق است
            </p>
        </div>

    </div>

</template>

<script>
    export default {
        name: "new-footer"
    }
</script>

<style lang="stylus" scoped>

    .footer-container
        width 100% !important
        background-color #000f50
        height max-content !important
        position relative
        display flex
        margin-left 0
        margin-right 0

    .copy-right-container
        width 100%
        margin-top 16px
        display flex
        flex-direction column

        img
            margin-left auto
            margin-right auto
            width 54px
            filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)

        p
            margin-top 12px
            width 100%
            padding-left 25%
            padding-right 25%
            font-family iran-yekan
            font-size 1.1em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.75
            letter-spacing normal
            text-align center
            color #c4c2c2
        @media only screen and (max-width: 992px)
            img
                width 32px

            p
                padding-left 15%
                padding-right 15%
                font-size .9em


    .footer-col-title
        font-family iran-yekan
        font-size 1.1em
        font-weight bold
        font-style normal
        font-stretch normal
        line-height 1.75
        letter-spacing normal
        text-align right
        margin-bottom 8px
        color #fefefe
        @media only screen and (max-width: 992px)
            font-size 1em

    .footer-col-option
        font-family iran-yekan
        font-size .9em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.75
        letter-spacing normal
        text-align right
        color #c4c2c2
        cursor pointer
        @media only screen and (max-width: 992px)
            font-size .8em


    .footer-col-option:hover
        color #00ffff


    .footer-social-container
        width 100%
        display flex
        justify-content right
        max-width 450px
        margin 16px auto 0 auto
        @media only screen and (max-width: 992px)
            justify-content center

        img
            margin-left 12px
            width 32px
            cursor pointer
            @media only screen and (max-width: 992px)
                width 24px

        img:hover
            filter invert(0%) sepia(89%) saturate(6474%) hue-rotate(110deg) brightness(99%) contrast(109%)


</style>
