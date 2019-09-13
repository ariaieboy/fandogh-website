<template>
    <div class="row" style="width: 100%; height: max-content; padding-right: 6px; padding-left: 6px; margin-left: 0">


        <div v-if="verifyUserAccess({ADMIN:'ADMIN'})" class="member-invite-container">
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
                <div v-for="item in pending_invitations"
                     class="col-lg-3 col-md-5 col-xs-12 col-sm-12 pending-invitation-card">
                    <img @click="provokeInvitation(item.token, item.receiver)" src="../../../static/icons/ic_delete.svg"
                         alt="delete">
                    <p>{{item.receiver}}</p>
                </div>
            </div>

        </div>

        <div class="team-list-container">

            <p class="section-title">اعضای تیم فضانام</p>

            <div v-for="(member, index ) in members" class="member-container">

                <div v-if="member.is_owner" class="member-action-container">
                    <span class="owner-label">Owner</span>
                </div>
                <div v-else-if="editing === member.id" class="member-action-container">
                    <img @click="cancelRoleEditing" class="cancel-editing"
                         src="../../../assets/svg/ic_close_red.svg" alt="cancel">
                </div>

                <div v-else-if="verifyUserAccess({ADMIN:'ADMIN'})" class="member-action-container">
                    <img @click="removeMember(member.email, member.id)" class="remove-member"
                         src="../../../static/icons/ic_delete.svg" alt="remove">
                    <img @click="editMemberRole(member.role, member.id)" class="edit-member"
                         src="../../../assets/svg/edit.svg"
                         alt="edit">
                </div>


                <div v-if="!member.is_owner" class="member-access-level-container">

                    <p v-for="role in member.roles" @click="editing !== null && editing === member.id ? changeMemberRole(index, member.id, role, member.email) : null"
                       :class="['access-level-label', {'enabled': member.role === role }, {'editing': editing !== null && editing === member.id}]">
                        {{role.toString().charAt(0) + role.toString().toLowerCase().slice(1)}}</p>

                </div>

                <p class="member-name">{{member.email}}</p>

            </div>

        </div>

    </div>

</template>

<script>
    import ErrorReporter from "../../../utils/ErrorReporter";
    import RoleAccessHandler from "../../../utils/RoleAccessHandler";
    import {getValue} from "../../../utils/cookie";

    export default {
        name: "team-management",
        components: {},
        data() {
            return {

                new_member_email: '',
                pending_invitations: [],
                members: [],
                editing: null,
                current_role: null,
                new_role: null,
                role: null

            }
        },
        created() {
            if(this.verifyUserAccess({ADMIN:'ADMIN'}))
                this.getPendingInvitations();

            this.getNamespaceMembers();
        },
        methods: {
            verifyUserAccess(permitted_roles){
                return RoleAccessHandler(permitted_roles)
            },
            async changeMemberRole(index, id, new_role, email) {

                if (new_role === this.current_role) {
                    this.cancelRoleEditing()
                    return;
                }

                this.$ga.event({
                    eventCategory: "membership role",
                    eventAction: "editing member role",
                    eventLabel: '',
                    eventValue: `${email}`
                });
                this.$alertify(
                    {
                        title: 'تغییر دسترسی',
                        description: `آیا از تغییر دسترسی ${email} مطمئن هستید؟`,
                        label: 'تایید دسترسی',
                        img: new_role === 'ADMIN' ? require('../../../components/Dashboard/alert/images/ic_role_admin.svg') :
                            new_role === 'DEVELOPER' ? require('../../../components/Dashboard/alert/images/ic_role_devops_engineer.svg') :
                                require('../../../components/Dashboard/alert/images/ic_role_operator.svg')
                    },
                    status => {
                        if (status) {
                            this.$store.commit("SET_DATA", {data: true, id: "loading"});
                            this.$store
                                .dispatch("changeMemberRole", {member_id: id, new_role: new_role})
                                .then(res => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.members.forEach((item, position) => {
                                        if (index === position) {
                                            item.role = res.role
                                        }
                                    });
                                    this.cancelRoleEditing();

                                    this.$notify({
                                        title: 'تغییر در سطح دسترسی با موفقیت انجام شد',
                                        type: "success"
                                    });
                                    this.$ga.event({
                                        eventCategory: "membership role",
                                        eventAction: "editing member role",
                                        eventLabel: 'role edit successful',
                                        eventValue: `${email}`
                                    });
                                })
                                .catch(e => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$notify({
                                        title: e.data.message,
                                        time: 4000,
                                        type: "error"
                                    });
                                    this.cancelRoleEditing()
                                    this.$ga.event({
                                        eventCategory: "membership role",
                                        eventAction: "editing member role",
                                        eventLabel: 'role edit canceled',
                                        eventValue: `${email}`
                                    });
                                });
                        } else {
                            this.cancelRoleEditing()
                        }
                    }
                );

            },
            cancelRoleEditing() {
                this.editing = null;
                this.current_role = null;
            },

            editMemberRole(current_role, id) {

                this.editing = id;
                this.current_role = current_role;

            },

            async removeMember(email, id) {

                this.editing = null;
                this.current_role = null;

                this.$ga.event({
                    eventCategory: "membership",
                    eventAction: "editing member",
                    eventLabel: 'remove',
                    eventValue: `${email}`
                });
                this.$alertify(
                    {
                        title: "حذف از فضانام",
                        description: `آیا از حذف ${email} از فضانام خود مطمئن هستید؟`
                    },
                    status => {
                        if (status) {
                            this.$store.commit("SET_DATA", {data: true, id: "loading"});
                            this.$store
                                .dispatch("removeMemberFromNamespace", id)
                                .then(res => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.getNamespaceMembers()
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                    this.$ga.event({
                                        eventCategory: "membership",
                                        eventAction: "editing member",
                                        eventLabel: 'remove successful',
                                        eventValue: `${email}`
                                    });
                                })
                                .catch(e => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$notify({
                                        title: e.data.message,
                                        type: "error"
                                    });
                                    this.$ga.event({
                                        eventCategory: "membership",
                                        eventAction: "editing member",
                                        eventLabel: 'remove canceled',
                                        eventValue: `${email}`
                                    });
                                });
                        }
                    }
                );

            },
            async getNamespaceMembers() {
                try {
                    this.$store.commit("SET_DATA", {data: true, id: "loading"});
                    let response = await this.$store.dispatch("requestNamespaceMembers");
                    this.members  = response.map(
                        ({id, username, email, role, roles, is_owner}) => {
                            return {
                                id,
                                username,
                                email,
                                role,
                                roles: roles.sort().reverse(),
                                is_owner
                            }
                        }
                    );
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
            provokeInvitation(token, email) {
                this.$ga.event({
                    eventCategory: "invitation",
                    eventAction: "removing pending invitation"
                    // eventLabel:'user',
                    // eventValue:'userId'
                });
                this.$alertify(
                    {
                        title: "حذف دعوت‌نامه",
                        description: `آیا از حذف دعوت‌نامه ${email} مطمئن هستید؟`
                    },
                    status => {
                        if (status) {
                            this.$store.commit("SET_DATA", {data: true, id: "loading"});
                            this.$store
                                .dispatch("revokePendingInvitation", token)
                                .then(res => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.getPendingInvitations()
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                    this.$ga.event({
                                        eventCategory: "invitation",
                                        eventAction: "removing pending invitation"
                                        // eventLabel:'user',
                                        // eventValue:'userId'
                                    });
                                })
                                .catch(e => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$notify({
                                        title: e.data.message,
                                        type: "error"
                                    });
                                    this.$ga.event({
                                        eventCategory: "invitation",
                                        eventAction: "canceled removing pending invitation"
                                        // eventLabel:'user',
                                        // eventValue:'userId'
                                    });
                                });
                        }
                    }
                );
            },
            async getPendingInvitations() {
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
        @media only screen and (max-width 1030px)
            margin-bottom 32px

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
                margin-left 12px
            @media only screen and (max-width 992px)
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
        margin-top 16px
        display flex
        padding-bottom 32px
        flex-direction column
        @media only screen and (max-width 1030px)
            margin-top 16px

    .member-container
        width 100%
        display flex
        height 52px
        margin-bottom 3px
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
                justify-content center
                justify-items center
                background $totalWhite
                box-shadow 0 4px 6px rgba(0, 0, 0, 0.07)
                width 100%
                padding-top 12px
                padding-bottom 12px

            img.edit-member
                width 52px
                height 52px
                margin-top auto
                margin-bottom auto
                cursor pointer
                padding 16px
                background $totalWhite
                box-shadow 0 2px 6px rgba(0, 0, 0, 0.07)
                @media only screen and (max-width 1030px)
                    width 18px
                    height 18px
                    padding unset
                    margin-right 6px
                    box-shadow unset
                    background unset

            img.remove-member
                width 52px
                height 52px
                margin-top auto
                margin-bottom auto
                padding 16px
                cursor pointer
                margin-left 3px
                background $totalWhite
                box-shadow 0 2px 6px rgba(0, 0, 0, 0.07)
                @media only screen and (max-width 1030px)
                    width 18px
                    height 18px
                    padding unset
                    margin-left 6px
                    box-shadow unset
                    background unset

            img.cancel-editing
                width 52px
                height 52px
                margin-top auto
                margin-bottom auto
                cursor pointer
                padding 18px
                background-color $totalWhite
                box-shadow 0 2px 6px rgba(0, 0, 0, 0.07)
                @media only screen and (max-width 1030px)
                    width 16px
                    height 16px
                    padding 1px
                    box-shadow unset
                    background unset

        p.member-name
            padding-left 16px
            padding-right 32px
            font-family "Helvetica Neue"
            font-size 1em
            flex 1
            height 52px
            width max-content
            text-align left
            margin-right auto
            line-height 52px
            background $totalWhite
            box-shadow 0 2px 6px rgba(0, 0, 0, 0.07)
            @media only screen and (max-width 1030px)
                height max-content
                line-height 26px
                margin-bottom 0
                margin-top 8px
                text-align center
                width 100%
                font-size 1.2em
                margin-left auto
                margin-right auto
                box-shadow unset
                    background unset

        div.member-access-level-container
            display flex
            margin-left auto
            margin-right 3px
            @media only screen and (max-width 1030px)
                order 3
                width 100%
                margin-right unset
                margin-left unset
                margin-bottom 16px
                margin-top 3px

            p.access-level-label
                height 52px
                width 150px
                text-align center
                line-height 52px
                color $fontBlack
                font-family "Helvetica Neue"
                margin auto auto auto 3px
                font-size 1em
                background $totalWhite
                box-shadow 0 2px 6px rgba(0, 0, 0, 0.07)
                @media only screen and (max-width 1030px)
                    height 32px
                    line-height 32px
                    margin-left 1.5px
                    margin-right 1.5px
                    font-size 1.1em
                    flex 1

                &.enabled
                    background $colorBlueArea
                    color $totalWhite

                &.enabled:hover
                    background $colorBlueArea !important
                    color $totalWhite !important

                &.editing
                    cursor pointer

                &.editing:hover
                    background $blueHard
                    color $totalWhite
                    cursor pointer

    .section-title
        font-size 1.3em
        color $fontGray
        font-family iran-yekan

    .owner-label
        font-family "Helvetica Neue"
        margin-top auto
        margin-bottom auto
        font-weight bold
        padding 0 30px
        line-height 52px
        text-align center
        height 52px
        margin-left 3px
        background $green
        color white
        @media only screen and (max-width 1030px)
            height 42px
            line-height 42px
</style>
