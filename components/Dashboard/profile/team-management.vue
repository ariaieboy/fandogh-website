<template>
    <div class="row" style="margin-right: 0; margin-left: 0;width: 100%; height: max-content">


        <div class="member-invite-container">
            <input v-model="new_member_email" dir="rtl" type="email" placeholder="ایمیل عضو هم‌تیمی جدید را وارد کنید"
                   style="flex: 0.9 0 auto; padding: 0 16px; border: none; outline: none;border-radius: 3px;font-family: iran-yekan">
            <button style="color: #fefefe; flex: 0.1 0 auto; border: none; outline: none; background-color: #24D5D8;font-family: iran-yekan; border-top-left-radius: 3px; border-bottom-left-radius: 3px; cursor: pointer; font-size: 1.1em"
                    @click="inviteMember(new_member_email)">
                افزودن هم‌تیمی
            </button>

        </div>

        <div v-if="pending_invitations" class="pending-invitations-container">
            <p>دعوت‌های در انتظار</p>

            <div class="row" style="width: 100%; margin-left: 0; margin-right: 0">
                <div v-for="item in pending_invitations" class="col-lg-5 col-md-5 col-xs-12 col-sm-12 pending-invitation-card">
                    <img src="../../../static/icons/ic_delete.svg" alt="delete">
                    <p>{{item.receiver}}</p>
                </div>
            </div>

        </div>

        <div class="team-list-container">

            <p>اعضای تیم فضانام</p>

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
    import ErrorReporter from "../../../utils/ErrorReporter";

    export default {
        name: "team-management",
        components: {},
        data() {
            return {

                new_member_email: '',
                pending_invitations: null

            }
        },
        methods: {

            async inviteMember(email) {
                try {
                    this.$store.commit("SET_DATA", {data: true, id: "loading"});
                    let response = await this.$store.dispatch("requestUserInvitation", email);
                    this.$notify({
                        title: response.message,
                        time: 4000,
                        type: "success"
                    });
                    this.new_member_email = '';
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    if (e.status === 401) {
                        this.$router.replace('/user/login')
                    } else {
                        ErrorReporter(e, this.$data, true).forEach(error => {
                            this.$notify({
                                title: error,
                                time: 4000,
                                type: "error"
                            });
                        });
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }
            }
        }
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

    .pending-invitations-container
        width 100%

        div.pending-invitation-card
            border-radius 3px
            background #fefefe
            box-shadow 0 2px 6px rgba(0, 0, 0, 0.17)
            height 54px
            padding-right 16px
            padding-left 16px
            display flex
            margin-left 12px
            margin-bottom 12px
            img
                width 20px
                height 20px
                margin-top auto
                margin-bottom auto
                cursor pointer
            p
                flex 1
                line-height 54px
                text-align left
                height 54px

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
