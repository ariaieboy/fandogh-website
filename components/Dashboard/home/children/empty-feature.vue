<template>
    <div class="parent">

        <div class="title-box">
            <img :src="require('../../sidebar/icons/' + icon + '.svg')" :alt="title"></img>
            <span>‌{{title}} ها</span>
        </div>

        <p class="description">در حال حاضر شما هیچ {{title}} ثبت شده‌ای ندارید.</p>
        <p class="description">شما می‌توانید با کلیک کردن بر روی دکمه زیر {{title}} مورد نیاز خود را بسازید</p>

        <div style="height: 1px; margin: 20px 60px 0 60px; background-color: #2979ff"></div>

        <div v-if="privileged" style="display: flex; margin-top: 16px">
            <button  class="create-button" @click="url">ساخت {{title}} جدید</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "empty-feature",
        props:['title', 'url', 'icon', 'privileged'],
    }
</script>

<style lang="stylus" scoped>

    @import "../../../../assets/css/variables.styl"

    .parent
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        background-color #ffffff
        height 300px
        width 100%

    .create-button
        width 300px
        height 40px
        color white
        font-size 0.9em
        font-family iran-yekan
        background-color $colorPrimary
        border-radius 5px
        box-shadow 0 2px 6px 0 rgba(41, 121, 255, 0.42)
        margin-left auto
        margin-right auto
        outline none
        border none
        cursor pointer

    .description
        font-family iran-yekan
        font-size 1em
        color #606060
        text-align center
        margin 0 60px
        line-height 2

    .title-box
        width 100%
        height 80px
        display flex
        justify-content center
        white-space nowrap
        padding-top 12px
        padding-bottom 6px

        img
            display inline-flex
            width 80px
            filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)

        span
            display inline-flex
            margin auto 12px
            font-size 1.5em
            font-family iran-yekan

</style>
