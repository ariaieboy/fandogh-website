<template>
    <div v-if="history === null" class="row" style="margin-left: 0; margin-right: 0; width: 100%; height: max-content">
        <div v-if="verifyUserAccess({ADMIN: 'ADMIN', DEVELOPER: 'DEVELOPER'})" v-for="(item, index) in service_history"
             class="col-lg-6 col-md-6 col-xs-12 col-sm-12"
             style="padding-left: 8px; padding-right: 8px; height: max-content">
            <div class="rollback-parent-container" @click="historySelected(index)">
                <span class="rollback-icon">
                    <img src="../../../../assets/svg/ic-rollback.svg" alt="rollback"/>
                </span>
                <div class="rollback-spec-container">
                    <span class="history-version">نسخه سرویس: <span>{{item.history_id}}</span></span>
                    <span class="history-date">تاریخ ساخت: <span>{{item.date}}</span></span>
                </div>
            </div>
        </div>
    </div>


    <div v-else class="row" style="margin-right: 0; margin-left: 0">
        <div v-if="verifyUserAccess({ADMIN: 'ADMIN', DEVELOPER: 'DEVELOPER'})" class="rollback-manifest-container">
            <div class="rollback-action-container">

                <div class="rollback-parent-container">
                    <span class="rollback-icon">
                        <img src="../../../../assets/svg/ic-rollback.svg" alt="rollback"/>
                    </span>
                    <div class="rollback-spec-container" @click="forceRollback">
                        <span class="history-version">بازگشت به نسخه سرویس: <span>{{history.history_id}}</span></span>
                        <span class="history-date">تاریخ ساخت: <span>{{history.date}}</span></span>
                    </div>
                </div>
                <div class="rollback-parent-container" @click="removeHistory">
                    <span class="action-icon">
                        <img src="../../../../static/icons/ic_delete.svg" alt="rollback"/>
                    </span>
                    <div class="rollback-spec-container">
                        <span class="history-version">حذف نسخه سرویس: <span>{{history.history_id}}</span></span>
                    </div>
                </div>
                <div class="rollback-parent-container" @click="cancelRollback">
                    <span class="action-icon">
                        <img src="../../../../assets/svg/ic-back.svg" alt="rollback"
                             style="transform: rotate(180deg); padding: 9px;"/>
                    </span>
                    <div class="rollback-spec-container">
                        <span class="history-version">بازگشت</span>
                    </div>
                </div>

            </div>
            <div class="manifest-view">
                <p>مانیفست سرویس {{service.name}}</p>
                <pre v-html="JSONstringify(history.manifest)"></pre>
            </div>
        </div>
    </div>
</template>

<script>
    import ErrorReporter from "../../../../utils/ErrorReporter";
    import Moment from 'moment-jalaali'
    import RoleAccessHandler from "../../../../utils/RoleAccessHandler";

    export default {
        name: "rollback",
        props: ['service'],
        data() {
            return {
                service_history: [],
                history: null
            }
        },
        created() {

            this.requestServiceHistory(this.service.name)

        },
        methods: {
            verifyUserAccess(permitted_roles){
                return RoleAccessHandler(permitted_roles)
            },
            async forceRollback() {

                this.$ga.event({
                    eventCategory: "Rollback Service",
                    eventAction: "click btn to rollback service",
                    eventLabel: "rollback service",
                    eventValue: `${this.service.name}`
                });
                this.$alertify(
                    {
                        title: `Rollback Service`,
                        description: `توجه داشته باشید Rollback یک راه حل فوری ولی موقت است و شما باید از درست بودن نسخه‌ای که به آن Rollback می‌کنید مطمئن باشید!`,
                        label: 'Rollback',
                        img: require("../../../../components/Dashboard/alert/images/ic_rollback.svg")
                    },
                    status => {
                        if (status) {
                            this.$store.commit("SET_DATA", {data: true, id: "loading"});
                            this.$store.dispatch('requestServiceRollback', {
                                service_name: this.service.name,
                                history_id: this.history.history_id
                            })
                                .then(res => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$ga.event({
                                        eventCategory: "Rollback Service",
                                        eventAction: "click btn to rollback service",
                                        eventLabel: "rollback service",
                                        eventValue: `${this.service.name}`
                                    });
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                    location.reload()
                                })
                                .catch(e => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$ga.event({
                                        eventCategory: "Rollback Service",
                                        eventAction: "failed rollback service history",
                                        eventLabel: "rollback service",
                                        eventValue: `${this.service.name}`
                                    });
                                    this.$notify({
                                        title: e.data.message,
                                        type: "error"
                                    });
                                });
                        }
                    }
                );

            },
            removeHistory() {
                this.$ga.event({
                    eventCategory: "Rollback History",
                    eventAction: "click btn remove rollback history",
                    eventLabel: "rollback history name",
                    eventValue: `${this.service.name}:${this.history.history_id}`
                });
                this.$alertify(
                    {
                        title: `حذف Rollback History`,
                        description: `آیا از حذف rollback ${this.history.history_id}  مطمئن هستید؟`
                    },
                    status => {
                        if (status) {
                            this.$store.commit("SET_DATA", {data: true, id: "loading"});
                            console.log(this.history.history_id)
                            this.$store.dispatch("deleteServiceHistory", {
                                service_name: this.service.name,
                                history_id: this.history.history_id
                            })
                                .then(res => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$ga.event({
                                        eventCategory: "Rollback History",
                                        eventAction: "remove service history",
                                        eventLabel: "rollback history name",
                                        eventValue: `${this.service.name}:${this.history.history_id}`
                                    });
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                    this.requestServiceHistory(this.service.name)
                                })
                                .catch(e => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$ga.event({
                                        eventCategory: "Rollback History",
                                        eventAction: "fail remove service history item",
                                        eventLabel: "rollback history name",
                                        eventValue: `${this.service.name}:${this.history.history_id}`
                                    });
                                    this.$notify({
                                        title: e.data.message,
                                        type: "error"
                                    });
                                });
                        }
                    }
                );
            },
            cancelRollback() {
                this.history = null
            },
            JSONstringify(json) {

                if (typeof json != 'string') {
                    json = JSON.stringify(json, undefined, 2);
                }

                json = json.replace(/(}|{|,|")?/g, '');
                json = json.replace(/^\s*$(?:\r\n?|\n)/gm, '');

                return json

            },
            historySelected(index) {
                this.history = this.service_history[index]
            }
            ,
            async requestServiceHistory(service) {

                await this.$store.dispatch("requestServiceHistory", service)
                    .then(historyResponse => {
                        this.service_history = historyResponse.map(
                            ({id, created_at, manifest}) => {
                                return {
                                    history_id: id,
                                    manifest,
                                    date: Moment(created_at).format('jYYYY/jMM/jDD - HH:mm')
                                };
                            }
                        );
                    }).catch(e => {
                        if (e.status === 401) {
                            this.$router.push("/user/login");
                        } else {
                            ErrorReporter(e, this.$data, true).forEach(error => {
                                this.$notify({
                                    title: error,
                                    time: 4000,
                                    type: "error"
                                });
                            });
                        }
                    });

            }
            ,
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../../../../assets/css/variables.styl"

    .rollback-parent-container
        width 100%
        height 80px
        border-radius 5px
        box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)
        background $totalWhite
        padding 12px 16px
        margin-bottom 12px
        transition all .3s ease-in-out
        display flex
        cursor pointer
        @media only screen and (max-width 992px)
            height 65px
            margin-bottom 8px

        span.rollback-icon
            width 40px
            height 40px
            margin-top auto
            margin-bottom auto
            border-radius 50%
            display flex

            img
                margin auto
                width 100%
                height 100%
                padding 2px
                transition-property: transform;
                transition-duration: 1s;
                filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)


    .rollback-parent-container:hover
        box-shadow 0 3px 26px 0 rgba(0, 0, 0, 0.16)
        transition all .3s ease-in-out

        span.rollback-icon
            img
                animation-name: rotate
                animation-duration: 3s
                animation-iteration-count: infinite
                animation-timing-function: linear


    .rollback-spec-container
        width 100%
        flex 1
        height available
        display flex
        flex-direction column
        @media only screen and (max-width 992px)
            flex unset
            width max-content

        span.history-version
            font-family iran-yekan
            font-weight normal
            font-size 1em
            color $silverDark
            margin-right 12px
            margin-top auto
            margin-bottom auto
            text-align right
            @media only screen and (max-width 992px)
                margin-right 32px

            span
                font-family iran-sans
                font-weight normal
                line-height 1.75
                font-size 1em

        span.history-date
            font-family iran-yekan
            font-weight normal
            font-size 1em
            margin-top auto
            margin-bottom auto
            text-align right
            margin-right 12px
            line-height 1.75
            color $silverDark
            direction ltr
            @media only screen and (max-width 992px)
                margin-right 32px

            span
                font-family iran-sans
                line-height 1.75
                font-weight normal
                font-size .9em
                text-align left
                direction ltr


    .rollback-manifest-container
        width 100%
        display flex
        @media only screen and (max-width 992px)
            flex-direction column

        div.rollback-action-container
            flex 1
            display flex
            flex-direction column
            padding-left 16px
            @media only screen and (max-width 992px)
                padding-left 0
                order 1
                margin-top 16px

        div.manifest-view
            flex 1
            display flex
            flex-direction column
            background $totalWhite
            box-shadow 0 3px 6px rgba(0, 0, 0, 0.07)
            border-radius 5px

            p
                width 100%
                font-family iran-yekan
                font-size 1.1em
                line-height 1.75
                color $silverDark
                border-top-right-radius 5px
                border-top-left-radius 5px
                text-align center
                padding-top 8px
                padding-bottom 8px
                background rgba(0, 69, 255, 0.27)

            pre
                margin-right auto
                font-family "Helvetica Neue"
                font-size 1.1em
                width 100%
                line-height 1.75
                font-weight normal
                direction ltr
                margin-bottom 32px
                margin-top 16px
                padding-left 12px
                user-select text


    .action-icon
        width 40px
        height 40px
        margin-top auto
        margin-bottom auto
        border-radius 50%
        display flex

        img
            margin auto
            width 100%
            height 100%
            padding 6px

    .rotating {
        -webkit-animation: rotating 2s linear infinite;
        -moz-animation: rotating 2s linear infinite;
        -ms-animation: rotating 2s linear infinite;
        -o-animation: rotating 2s linear infinite;
        animation: rotating 2s linear infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(-360deg);
        }
    }

    @-webkit-keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(-360deg);
        }
    }


</style>
