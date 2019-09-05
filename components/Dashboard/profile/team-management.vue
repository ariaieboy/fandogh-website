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
        height 50px
        background-color #fefefe
        margin-top 24px
        margin-bottom 64px
        display flex
        padding 0

</style>
