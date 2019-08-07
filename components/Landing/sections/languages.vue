<template>
    <div class="languages-container">

        <img v-for="item in languages" :src="require('../../../assets/svg/languages/' + item.name + '.svg')" :alt="item.name"/>

    </div>
</template>

<script>
    export default {
        name: "languages",
        data(){
            return{
                languages:[
                    {
                        name: "laravel",
                        href: ""
                    },
                    {
                        name: "asp-core",
                        href: ""
                    },
                    {
                        name: "java",
                        href: ""
                    },
                    {
                        name: "python",
                        href: ""
                    },
                    {
                        name: "nodejs",
                        href: ""
                    },
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .languages-container
        width 100%
        background-color #0045FF
        height max-content
        display flex
        justify-content center
        z-index 1
        padding 24px 16px
        overflow scroll
        @media only screen and (max-width: 1230px)
            padding 16px
        img
            margin-left 16px
            margin-right 16px
            width: 72px
            height 72px
            @media only screen and (max-width: 1230px)
                width: 48px
                height 48px



</style>
