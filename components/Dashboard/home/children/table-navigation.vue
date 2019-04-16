<template>
    <div class="parent">
        <p>{{title}}: {{count}}</p>
        <button class="detail-button" @click="link">{{button}}</button>
    </div>
</template>

<script>
    export default {
        name: "table-navigation",
        props: ['title', 'count', 'button', 'link'],
    }
</script>

<style lang="stylus" scoped>

    .parent
        display block
        padding 16px 12px

        p
            margin 0
            display inline-block
            font-size 1em
            color #7c7c7c

    .detail-button
        border-radius 5px
        box-shadow 0 2px 6px 0 rgba(36, 213, 216, 0.42)
        background-color #24d5d8
        color #ffffff
        font-family iran-yekan
        font-size 12px
        padding 8px 16px
        outline none
        border none
        display inline-block
        float left
        cursor pointer

</style>