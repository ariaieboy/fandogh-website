<template>
    <div class="footer">
        <div class="top-footer">
            <div class="footer--menu">
                <ul>
                    <li><a rel="noopener" target="_blank" href="http://blog.fandogh.cloud" >بلاگ</a></li>
                    <li><router-link :to="{path:'/conditions-of-use'}">شرایط استفاده از خدمات</router-link></li>
                    <li><router-link :to="{path:'/contact-us'}">ارتباط با ما</router-link></li>
                    <li><router-link :to="{path:'/about-us'}">درباره ما</router-link></li>
                </ul>
            </div>
            <div class="footer--icons">
                <ul>
                    <li>
                        <a rel="noopener" target="_blank" href="https://github.com/fandoghpaas"> <img alt="github icon" src="~/assets/img/github-logo.png" /> </a>
                    </li>
                    <li>
                        <a rel="noopener" target="_blank" href="https://twitter.com/fandoghpaas"> <img alt="twitter icon" src="~/assets/img/twitter-logo-button.png" /> </a>
                    </li>
                    <li>
                        <a rel="noopener" target="_blank" href="mailto:info@fandogh.cloud"> <img alt="email icon" src="~/assets/img/closed-envelope-circle.png" /> </a>
                    </li>
                </ul>
            </div>
        </div>
            
    </div>
</template>

<style lang="stylus" scoped>
    .footer
        .top-footer
            padding 0 90px
            background: #3f10ae
            height 90px
            display flex
            justify-content space-between
            .footer--menu, .footer--icons
                align-self center
                ul
                    li
                        display inline-block
                        margin-left 24px
        .thin-footer
            background-color #22095d
            height 45px
            text-align center
            display flex
            p
                align-self center
                text-align center
                width 100%

    @media only screen and (max-width: 900px)
        .footer
            .top-footer
                padding 0 10px
                flex-flow column
                height auto
                .footer--menu
                    ul
                        li
                            display block
                            text-align center
                            padding 12px 0
            .thin-footer
                p
                    font-size 12px

</style>