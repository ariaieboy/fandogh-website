<template>
    <div class="row" style="width: 100%; height: max-content; padding-right: 6px; padding-left: 6px">


        <div class="member-invite-container">
            <input v-model="new_member_email" dir="rtl" type="email" placeholder="ایمیل هم‌تیمی جدید را وارد کنید"
                   style="flex: 0.9 0 auto; padding: 0 16px; border: none; outline: none;border-radius: 3px;font-family: iran-yekan">
            <button style="color: #fefefe; flex: 0.1 0 auto; border: none; outline: none; background-color: #24D5D8;font-family: iran-yekan; border-top-left-radius: 3px; border-bottom-left-radius: 3px; cursor: pointer; font-size: 1.1em"
                    @click="inviteMember(new_member_email)">
                افزودن هم‌تیمی
            </button>

        </div>

        <div v-if="pending_invitations.length > 0" class="pending-invitations-container">
            <p class="section-title">دعوت‌های در انتظار</p>

            <div class="row" style="width: 100%; margin-left: 0; margin-right: 0">
                <div v-for="item in pending_invitations" class="col-lg-3 col-md-3 col-xs-12 col-sm-12 pending-invitation-card">
                    <img src="../../../static/icons/ic_delete.svg" alt="delete">
                    <p>{{item.receiver}}</p>
                </div>
            </div>

        </div>

        <div class="team-list-container">

            <p class="section-title">اعضای تیم فضانام</p>

            <div class="member-container">

                <div class="member-access-level-container">

                    <p class="access-level-label-disabled">Operator</p>
                    <p class="access-level-label-disabled">DevOps</p>
                    <p class="access-level-label-enabled">Admin</p>

                </div>

                <div class="member-action-container">
                    <img class="remove-member" src="../../../static/icons/ic_delete.svg" alt="remove">
                    <img class="edit-member" src="../../../assets/svg/edit.svg" alt="edit">
                </div>

                <p class="member-name">sorena.sarabadani@gmail.com</p>

            </div>


            <div class="member-container">

                <div class="member-access-level-container">

                    <p class="access-level-label-enabled">Operator</p>
                    <p class="access-level-label-disabled">DevOps</p>
                    <p class="access-level-label-disabled">Admin</p>

                </div>

                <div class="member-action-container">
                    <img class="remove-member" src="../../../static/icons/ic_delete.svg" alt="remove">
                    <img class="edit-member" src="../../../assets/svg/edit.svg" alt="edit">
                </div>

                <p class="member-name">sorena.sarabadani@gmail.com</p>

            </div>


            <div class="member-container">

                <div class="member-access-level-container">

                    <p class="access-level-label-disabled">Operator</p>
                    <p class="access-level-label-enabled">DevOps</p>
                    <p class="access-level-label-disabled">Admin</p>

                </div>

                <div class="member-action-container">
                    <img class="remove-member" src="../../../static/icons/ic_delete.svg" alt="remove">
                    <img class="edit-member" src="../../../assets/svg/edit.svg" alt="edit">
                </div>

                <p class="member-name">sorena.sarabadani@gmail.com</p>

            </div>


            <div class="member-container">

                <div class="member-access-level-container">

                    <p class="access-level-label-disabled">Operator</p>
                    <p class="access-level-label-enabled">DevOps</p>
                    <p class="access-level-label-disabled">Admin</p>

                </div>

                <div class="member-action-container">
                    <img class="remove-member" src="../../../static/icons/ic_delete.svg" alt="remove">
                    <img class="edit-member" src="../../../assets/svg/edit.svg" alt="edit">
                </div>

                <p class="member-name">sorena.sarabadani@gmail.com</p>

            </div>


            <div class="member-container">

                <div class="member-access-level-container">

                    <p class="access-level-label-disabled">Operator</p>
                    <p class="access-level-label-disabled">DevOps</p>
                    <p class="access-level-label-enabled">Admin</p>

                </div>

                <div class="member-action-container">
                    <img class="remove-member" src="../../../static/icons/ic_delete.svg" alt="remove">
                    <img class="edit-member" src="../../../assets/svg/edit.svg" alt="edit">
                </div>

                <p class="member-name">sorena.sarabadani@gmail.com</p>

            </div>


            <div class="member-container">

                <div class="member-access-level-container">

                    <p class="access-level-label-enabled">Operator</p>
                    <p class="access-level-label-disabled">DevOps</p>
                    <p class="access-level-label-disabled">Admin</p>

                </div>

                <div class="member-action-container">
                    <img class="remove-member" src="../../../static/icons/ic_delete.svg" alt="remove">
                    <img class="edit-member" src="../../../assets/svg/edit.svg" alt="edit">
                </div>

                <p class="member-name">sorena.sarabadani@gmail.com</p>

            </div>


            <div class="member-container">

                <div class="member-access-level-container">

                    <p class="access-level-label-enabled">Operator</p>
                    <p class="access-level-label-disabled">DevOps</p>
                    <p class="access-level-label-disabled">Admin</p>

                </div>

                <div class="member-action-container">
                    <img class="remove-member" src="../../../static/icons/ic_delete.svg" alt="remove">
                    <img class="edit-member" src="../../../assets/svg/edit.svg" alt="edit">
                </div>

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
                pending_invitations: []

            }
        },
        created(){
            this.getPendingInvitations()
        },
        methods: {

            async getPendingInvitations(){
                try {
                    this.$store.commit("SET_DATA", {data: true, id: "loading"});
                    this.pending_invitations = await this.$store.dispatch("requestPendingInvitations");
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
            },
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
                    this.getPendingInvitations()
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
        min-width 350px
        height 50px
        background-color #fefefe
        margin-top 24px
        margin-bottom 64px
        display flex
        padding 0

    .pending-invitations-container
        width 100%
        margin-bottom 48px

        div.pending-invitation-card
            background #fefefe
            box-shadow 0 2px 6px rgba(0, 0, 0, 0.17)
            height 54px
            padding-right 16px
            padding-left 16px
            display flex
            margin-left 6px
            margin-bottom 12px
            @media only screen and (max-width 1030px)
                margin-bottom 1px
                margin-left 0
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
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.17)
        margin-top 1px
        @media only screen and (max-width 1030px)
            flex-direction column
            height max-content
            justify-items center

        div.member-action-container
            display flex
            @media only screen and (max-width 1030px)
                margin-left auto
                margin-right auto
                order 1
                margin-top 12px
                margin-bottom 12px

            img.edit-member
                width 22px
                height 22px
                margin-top auto
                margin-bottom auto
                cursor pointer
                @media only screen and (max-width 1030px)
                    width 18px
                    height 18px

            img.remove-member
                width 22px
                height 22px
                margin-top auto
                margin-bottom auto
                cursor pointer
                margin-left 16px
                @media only screen and (max-width 1030px)
                    width 18px
                    height 18px

        p.member-name
            padding-left 16px
            padding-right 32px
            font-family "Helvetica Neue"
            font-size 1em
            width max-content
            line-height 52px
            @media only screen and (max-width 1030px)
                height max-content
                line-height 26px
                margin-bottom 0
                margin-top 8px
                font-size 1.2em
                margin-left auto
                margin-right auto

        div.member-access-level-container
            display flex
            margin-left auto
            margin-right 16px
            @media only screen and (max-width 1030px)
                order 3
                margin-right auto
                margin-bottom 16px

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
                @media only screen and (max-width 1030px)
                    height 30px
                    line-height 30px
                    width 100px

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
                @media only screen and (max-width 1030px)
                    height 30px
                    line-height 30px
                    width 100px

    .section-title
        font-size 1.3em
        color $fontGray
        font-family iran-yekan
</style>
