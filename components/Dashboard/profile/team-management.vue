<template>
    <div class="row" style="margin-right: 0; margin-left: 0;width: 100%; height: max-content">


        <div class="member-invite-container">
            <input v-model="namespace" dir="rtl" type="email" placeholder="ایمیل عضو هم‌تیمی جدید را وارد کنید"
                   style="flex: 0.9 0 auto; padding: 0 16px; border: none; outline: none;border-radius: 3px;font-family: iran-yekan">
            <button style="color: #fefefe; flex: 0.1 0 auto; border: none; outline: none; background-color: #24D5D8;font-family: iran-yekan; border-top-left-radius: 3px; border-bottom-left-radius: 3px; cursor: pointer; font-size: 1.1em"
                    @click="createNamespace(namespace)">
                افزودن هم‌تیمی
            </button>

        </div>

        <div class="team-list-container">

            <div class="member-container">

                <div class="member-access-level-container">

                    <p class="access-level-label-disabled">Operator</p>
                    <p class="access-level-label-disabled">DevOps</p>
                    <p class="access-level-label-enabled">Admin</p>

                </div>

                <img class="remove-member" src="../../../static/icons/ic_delete.svg" alt="remove">

                <img class="edit-member" src="../../../assets/svg/edit.svg" alt="edit">

                <p class="member-name">sorena.sarabadani@gmail.com</p>

            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "team-management"
    }
</script>

<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"

    .member-invite-container
        border-radius 3px
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.09)
        width 50%
        min-width 450px
        height 50px
        background-color #fefefe
        margin-top 24px
        margin-bottom 64px
        display flex
        padding 0

    .team-list-container
        width 100%
        margin-top 32px
        display flex
        padding-bottom 32px
        flex-direction column

    .member-container
        width 100%
        display flex
        height 52px
        background $totalWhite
        border 3px
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.17)
        margin-top 1px

        img.edit-member
            width 22px
            height 22px
            margin-top auto
            margin-bottom auto
            cursor pointer

        img.remove-member
            width 22px
            height 22px
            margin-top auto
            margin-bottom auto
            cursor pointer
            margin-left 16px

        p.member-name
            padding-left 16px
            padding-right 32px
            font-family "Helvetica Neue"
            font-size 1em
            width max-content
            line-height 52px

        div.member-access-level-container
            display flex
            margin-left auto
            margin-right 16px

            p.access-level-label-disabled
                border-radius 25px
                border 1px solid $colorBlueArea
                height 35px
                width 150px
                text-align center
                line-height 35px
                font-family "Helvetica Neue"
                margin auto auto auto 12px
                color $fontBlack
                font-size 1em
                cursor pointer
            p.access-level-label-enabled
                border-radius 25px
                background $colorBlueArea
                height 35px
                width 150px
                text-align center
                line-height 35px
                font-size 1em
                font-family "Helvetica Neue"
                color $totalWhite
                margin auto auto auto 12px

</style>
