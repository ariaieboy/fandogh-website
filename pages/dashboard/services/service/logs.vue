<template>
    <div>
        <f-loading :isFull="true" v-if="loading"/>
        <div class="log-command-container">

            <div v-if="windowWidth >= 992" :class="[realtime ? 'active' : 'normal']"
                 v-tooltip="'مشاهده زنده لاگ‌ها'"
                 @click="toggleRealtimeLog">

                <span :class="[realtime ? 'active' : 'normal']"
                      style="padding: 5px">

                    <span :class="[realtime ? 'active' : 'normal']">
                    </span>

                </span>

            </div>
            <div v-if="windowWidth >= 992" class="normal"
                 v-tooltip="'درخواست مجدد لاگ‌ها'"
                 @click="refreshLogs">
                <img src="../../../../assets/svg/ic_refresh.svg"
                     alt="refresh">
            </div>
            <div v-if="windowWidth >= 992" :class="[withTimeStamp ? 'active' : 'normal']"
                 v-tooltip="'اضافه کردن تاریخ لاگ‌ها'"
                 @click="toggleTimestamp">
                <img src="../../../../assets/svg/ic_calendar.svg" alt="calendar">
            </div>

            <div v-if="windowWidth < 992"
                 style="flex:1; display: flex; flex-direction: row; margin: 16px auto;">
                <div :class="[realtime ? 'active' : 'normal']"
                     v-tooltip="'مشاهده زنده لاگ‌ها'"
                     @click="toggleRealtimeLog">

                <span :class="[realtime ? 'active' : 'normal']"
                      style="padding: 5px">

                    <span :class="[realtime ? 'active' : 'normal']">
                    </span>

                </span>

                </div>
                <div class="normal"
                     v-tooltip="'درخواست مجدد لاگ‌ها'"
                     @click="refreshLogs">
                    <img src="../../../../assets/svg/ic_refresh.svg"
                         alt="refresh">
                </div>
                <div :class="[withTimeStamp ? 'active' : 'normal']"
                     v-tooltip="'اضافه کردن تاریخ لاگ‌ها'"
                     @click="toggleTimestamp">
                    <img src="../../../../assets/svg/ic_calendar.svg" alt="calendar">
                </div>
            </div>

            <div class="slider-container"
                 v-tooltip="'تعداد خط‌های لاگ که از سرویس شما نمایش داده می‌شود'">
                <vue-slider style="flex: 1; padding-top: 8px"
                            v-model="logLines"
                            v-bind="logOptions"
                            @change="refreshLogs"
                            v-on:drag-end="refreshLogs"/>
                <div class="range-title">
                    <p style="float: left;">{{`${logLines}L`}}</p>
                    <p>{{logLineRangeMax}}</p>
                </div>
            </div>

        </div>
        <log v-if="!loading" :logs="logs ? logs.split('\n') : []"/>
        <span v-if="showFab" class="fab-button"
              @click="backToTop">
            <img src="../../../../assets/svg/arrow.svg" alt="back_top">
        </span>
    </div>
</template>

<script>

    import Log from "~/components/Dashboard/log/‌index";
    import FInput from "~/components/elements/input";
    import FDate from "~/utils/date";
    import {removeValue} from "~/utils/cookie";
    import moment from "moment-jalaali";
    import 'vue-slider-component/theme/default.css';
    import FLoading from "~/components/Loading";

    moment.loadPersian();


    export default {
        name: "logs",
        layout: "dashboard",
        props: ['service'],

        data() {
            return {
                image: "نام سرویس: " + this.service.name,
                logInterval: null,
                logLineRangeMin: '100L',
                logLineRangeMax: '1000L',
                logLines: 100,
                logs: '',
                showFab: false,
                lastScrollPosition: 0,
                last_log_timestamp: null,
                loading: false,
                withTimeStamp: false,
                realtime: false,
                logOptions: {
                    dotSize: 16,
                    width: 'auto',
                    height: 12,
                    contained: false,
                    direction: 'ltr',
                    interval: 100,
                    min: 100,
                    max: 1000,
                    disabled: false,
                    clickable: true,
                    tooltip: 'none',
                    useKeyboard: false,
                    enableCross: true,
                    fixed: false,
                    lazy: true,
                    included: true,
                    order: true,
                    process: true,
                    dotStyle: {backgroundColor: '#24d5d8', boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.17)'},
                    railStyle: {backgroundColor: 'rgba(0, 69, 255, 0.4)', cursor: 'pointer'},
                    processStyle: {backgroundColor: '#0045ff'},
                    labelStyle: {
                        color: '#0045ff',
                        fontFamily: 'iran-yekan',
                        fontWeight: 'bold',
                        letterSpacing: 'normal'
                    }
                }
            };
        },
        created() {
            this.loading = true;
            this.getData();
        },
        destroyed() {
        },
        methods: {
            backToTop() {
                document.getElementById('service_title').scrollIntoView({behavior: 'smooth'})
            },
            onScroll() {
                const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.showFab = currentScrollPosition > 500;
            },
            toggleRealtimeLog() {
                this.realtime = !this.realtime;
                if (this.realtime) {
                    this.getData();
                }
            },
            toggleTimestamp() {
                this.loading = true;
                this.realtime = false;
                this.logs = '';
                this.last_log_timestamp = null;
                this.withTimeStamp = !this.withTimeStamp;
                this.getData();
            },
            refreshLogs() {
                this.realtime = false;
                this.loading = true;
                this.logs = '';
                this.last_log_timestamp = null;
                this.getData();
            },
            FDate(value) {
                return FDate({date: value})
            },
            async getData() {
                try {
                    let logObject = await this.$store.dispatch("getServiceLog", {
                        name: this.service.name,
                        max_logs: this.logLines,
                        last_logged_time: this.last_log_timestamp,
                        with_timestamp: this.withTimeStamp
                    });
                    if (logObject['logs']) {
                        logObject['logs'] += this.logs;
                        this.logs = logObject['logs'];
                    }

                    this.last_log_timestamp = logObject['last_logged_time'];

                    let internal = null;
                    if (this.realtime) {
                        setTimeout(() => {
                            this.getData();
                        }, 5000);
                    } else {
                        clearInterval(internal);
                    }
                    this.loading = false;
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    }
                    this.loading = false;
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }
            }
        },
        mounted() {
            this.$store.commit("SET_DATA", {id: "manifest", data: {}});
            removeValue("name");
            removeValue("versions");
            window.addEventListener('scroll', this.onScroll)
        },
        computed: {
            builds() {
                return this.$store.state.serviceLog;
            },
            date() {
                if (this.builds) {
                    let date = moment.unix(this.builds.last_logged_time).format("jD jMMMM jYYYY");
                    return "تاریخ ساخت: " + date
                }
            },
            windowWidth() {
                return this.$store.state.windowWidth;
            },
        },
        components: {
            Log,
            FInput,
            FLoading
        },
        beforeDestroy() {
            clearInterval(this.logInterval);
            this.$store.commit("SET_DATA", {data: null, id: "serviceLog"});
            window.removeEventListener('scroll', this.onScroll)
        },
    }
</script>

<style lang="stylus" scoped>

    .log-command-container
        width 100%
        display flex
        flex-direction row
        margin-bottom 8px
        @media only screen and (max-width 992px)
            flex-direction column
            background-color #fefefe
            border-radius 3px
            box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.07)

        div.normal
            width 40px
            height 40px
            padding 10px
            cursor pointer
            display flex
            margin-left 5px
            background-color #fefefe
            border-radius 3px
            box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.07)
            transition all .3s ease-in-out
            @media only screen and (max-width 992px)
                box-shadow unset
                background-color unset
                border-radius unset

            img
                user-select none
                width 100%
                height 100%
                filter: none

            span.normal
                border-radius 50%
                width 100%
                height 100%
                background-color rgba(0, 0, 0, 0.25)
                display flex

                span
                    animation unset
                    -webkit-animation unset
                    -moz-animation unset
                    -o-animation unset
                    -ms-animation unset

        div.active
            width 40px
            height 40px
            padding 10px
            cursor pointer
            margin-left 5px
            background-color #0045ff
            border-radius 3px
            box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.07)
            transition all .3s ease-in-out
            @media only screen and (max-width 992px)
                box-shadow unset

            img
                width 100%
                height 100%
                user-select none
                filter: brightness(0) invert(1);

            span.active
                border-radius 50%
                width 100%
                height 100%
                background-color rgba(255, 255, 255, 0.6)
                display flex
                animation heart-beat 3s infinite linear
                -webkit-animation heart-beat 3s infinite linear
                -moz-animation heart-beat 3s infinite linear
                -o-animation heart-beat 3s infinite linear
                -ms-animation heart-beat 3s infinite linear

                span
                    animation heart-beat 1.5s infinite linear
                    -webkit-animation heart-beat 1.5s infinite linear
                    -moz-animation heart-beat 1.5s infinite linear
                    -o-animation heart-beat 1.5s infinite linear
                    -ms-animation heart-beat 1.5s infinite linear


        div.slider-container
            display flex
            flex 1
            margin-top auto
            margin-bottom auto
            height 40px
            padding-right 16px
            padding-left 16px
            flex-direction column
            margin-left auto
            background-color #fefefe
            border-radius 3px
            box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.07)
            @media only screen and (max-width 992px)
                margin-left 0
                box-shadow unset
                background-color unset
                border-radius unset


    .range-title
        box-sizing content-box
        position relative
        width 100%
        margin-top -9px
        margin-bottom 16px
        @media only screen and (max-width 992px)
            margin-top 0

        p
            color #0045ff
            font-family iran-yekan
            font-size .7em
            font-weight bold
            margin 0
            display inline-block
            @media only screen and (max-width 992px)
                font-size 0.8em


    .fab-button
        position fixed
        margin-bottom 24px
        margin-right 16px
        bottom 0
        z-index 9999999999
        width 48px
        height 48px
        border-radius 50%
        background-color #0045ff
        padding 16px
        cursor pointer
        opacity .3
        transition all .2s linear
        @media only screen and (max-width 992px)
            width 36px
            height 36px
            padding 12px

        img
            transform rotate(270deg)
            width 100%
            height 100%
            opacity .3

    .fab-button:hover
        opacity 1
        box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.17)

        img
            opacity 1


    @-webkit-keyframes heart-beat {
        0% {
            -webkit-transform: scale(1);
        }
        10% {
            -webkit-transform: scale(.95);
        }
        20% {
            -webkit-transform: scale(.9);
        }
        30% {
            -webkit-transform: scale(.85);
        }
        40% {
            -webkit-transform: scale(.8);
        }
        50% {
            -webkit-transform: scale(.75);
        }
        60% {
            -webkit-transform: scale(.8);
        }
        70% {
            -webkit-transform: scale(.85);
        }
        80% {
            -webkit-transform: scale(.9);
        }
        90% {
            -webkit-transform: scale(.95);
        }
        100% {
            -webkit-transform: scale(1);
        }
    }

    @keyframes heart-beat {
        0% {
            -webkit-transform: scale(1);
        }
        10% {
            -webkit-transform: scale(.95);
        }
        20% {
            -webkit-transform: scale(.9);
        }
        30% {
            -webkit-transform: scale(.85);
        }
        40% {
            -webkit-transform: scale(.8);
        }
        50% {
            -webkit-transform: scale(.75);
        }
        60% {
            -webkit-transform: scale(.8);
        }
        70% {
            -webkit-transform: scale(.85);
        }
        80% {
            -webkit-transform: scale(.9);
        }
        90% {
            -webkit-transform: scale(.95);
        }
        100% {
            -webkit-transform: scale(1);
        }
    }

</style>

<style lang="css">

    .vue-slider-dot-handle {
        background-image: url("../../../../assets/svg/arrow.svg");
        background-repeat: no-repeat;
        background-size: 5px;
        background-position: center;
        transform: rotate(0deg);
    }

    .v-select .vs__dropdown-toggle {
        margin-bottom: 0 !important;
    }

    .v-text-field {
        padding-top: 3px !important;
    }
</style>
