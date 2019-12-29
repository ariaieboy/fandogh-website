<template>
    <div class="wrapper-image" v-if="!loading">
        <f-loading :isFull="true" v-if="isLoading"/>

        <div class="images">

            <div style="overflow: hidden; margin-bottom: 32px">
                <div class="right" style="float: right;"><p class="title_header"> لیست ایمیج‌ها</p></div>
                <div v-if="verifyUserAccess({ADMIN: 'ADMIN', DEVELOPER: 'DEVELOPER'})" class="left" style="float: left; cursor: pointer; margin-top: 8px"
                     @click="$router.push({path: '/dashboard/images/create', query: {ns: $route.query.ns}})">
                    <svg width="180px" height="55px" viewBox="0 0 208 63" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter x="-6.0%" y="-21.8%" width="112.0%" height="143.6%" filterUnits="objectBoundingBox"
                                    id="filter-1">
                                <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1"
                                                result="shadowBlurOuter1"></feGaussianBlur>
                                <feColorMatrix
                                        values="0 0 0 0 0.141176471   0 0 0 0 0.835294118   0 0 0 0 0.847058824  0 0 0 0.74 0"
                                        type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
                                <feMerge>
                                    <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                                    <feMergeNode in="SourceGraphic"></feMergeNode>
                                </feMerge>
                            </filter>
                        </defs>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Group-4-Copy" transform="translate(4.000000, 2.000000)" fill="#24D5D8">
                                <g id="Group-5-Copy" filter="url(#filter-1)">
                                    <path d="M27.5,0 L172.5,0 C187.687831,-2.78995922e-15 200,12.3121694 200,27.5 C200,42.6878306 187.687831,55 172.5,55 L27.5,55 C12.3121694,55 1.85997282e-15,42.6878306 0,27.5 C1.69274086e-15,12.3121694 12.3121694,2.78995922e-15 27.5,0 Z M172.5,51 C185.478692,51 196,40.4786916 196,27.5 C196,14.5213084 185.478692,4 172.5,4 C159.521308,4 149,14.5213084 149,27.5 C149,40.4786916 159.521308,51 172.5,51 Z"
                                          id="Combined-Shape-Copy"></path>
                                    <g id="Group-Copy-6" transform="translate(155.000000, 6.000000)">
                                        <path d="M32.9663077,26.964749 L34.0286647,27.5578352 C34.5108909,27.8270496 34.6835711,28.4362124 34.4143568,28.9184386 C34.3183714,29.090371 34.1737623,29.230139 33.9986625,29.3202166 L18.0292078,37.5354725 C17.7363707,37.6861183 17.3881375,37.682932 17.098106,37.5269529 L1.15137817,28.9507964 C0.66497323,28.6892076 0.482723715,28.0828389 0.744312481,27.596434 C0.837163541,27.4237843 0.978711833,27.282233 1.15135954,27.1893783 L2.19738991,26.6267943 L17.098106,34.6404053 C17.3881375,34.7963843 17.7363707,34.7995706 18.0292078,34.6489248 L32.9663077,26.964749 Z"
                                              id="Combined-Shape"></path>
                                        <path d="M33.1354934,23.412522 L34.023375,23.9063267 C34.5060347,24.174763 34.6796971,24.7836467 34.4112608,25.2663064 C34.3150307,25.4393322 34.1696051,25.5798993 33.9934106,25.670197 L18.0278069,33.8523798 C17.7357203,34.0020707 17.3887733,33.998903 17.0994687,33.8439038 L1.15663909,25.3023016 C0.669821327,25.0414819 0.486613681,24.435402 0.747433363,23.9485842 C0.840519856,23.7748391 0.982877289,23.6324786 1.15662049,23.5393885 L1.95794055,23.1100478 L17.0271724,31.1836075 C17.3164771,31.3386066 17.6634241,31.3417744 17.9555107,31.1920834 L33.1354934,23.412522 Z"
                                              id="Combined-Shape"></path>
                                        <path d="M33.1354934,19.8957756 L34.023375,20.3895803 C34.5060347,20.6580166 34.6796971,21.2669002 34.4112608,21.74956 C34.3150307,21.9225858 34.1696051,22.0631529 33.9934106,22.1534506 L18.0278069,30.3356334 C17.7357203,30.4853243 17.3887733,30.4821566 17.0994687,30.3271574 L1.15663909,21.7855552 C0.669821327,21.5247355 0.486613681,20.9186556 0.747433363,20.4318378 C0.840519856,20.2580927 0.982877289,20.1157322 1.15662049,20.0226421 L1.95794055,19.5933014 L17.0271724,27.666861 C17.3164771,27.8218602 17.6634241,27.8250279 17.9555107,27.675337 L33.1354934,19.8957756 Z"
                                              id="Combined-Shape"></path>
                                        <path d="M11.0302073,10.3671206 L28.5973156,5.40095814 C29.1287722,5.25071715 29.6813973,5.55975345 29.8316383,6.09121002 C29.8850751,6.28023523 29.8816573,6.4808123 29.8218116,6.66790722 L24.3678426,23.7185846 C24.2673636,24.032711 24.0184617,24.277095 23.7025476,24.3718037 L6.41305536,29.5550654 C5.88403231,29.7136625 5.32660598,29.4133731 5.1680088,28.88435 C5.11185213,28.6970316 5.11185002,28.4973587 5.16800272,28.3100391 L10.3443557,11.0422626 C10.4425284,10.7147687 10.7012091,10.4601274 11.0302073,10.3671206 Z"
                                              id="Rectangle-Copy-6"
                                              transform="translate(17.497620, 17.480218) rotate(-315.000000) translate(-17.497620, -17.480218) "></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                        <text x="142"
                              y="29"
                              fill="#1d1d1d"
                              style="font-family: iran-sans; font-size: 1em"
                              text-anchor="start"
                              alignment-baseline="middle">
                            ساخت ایمیج جدید
                        </text>
                    </svg>
                </div>
            </div>

            <f-empty v-if="!images || !images.length" title="هنوز ایمیجی اضافه نشده !"></f-empty>

            <box-table v-else :titles="titleRow" :items="images" :func="versions" :menu="verifyUserAccess({ADMIN:'ADMIN', DEVELOPER: 'DEVELOPER'})? menuListComplete : menuList"></box-table>

        </div>
    </div>
</template>

<script>
    import FButton from "~/components/elements/button";
    import FDate from "~/utils/date";
    import Alert from "~/components/Dashboard/alert";
    import ActionButton from "~/components/Dashboard/table/action-button";
    import FLoading from "~/components/Loading";
    import FEmpty from "~/components/Dashboard/empty";
    import BoxTable from "../../../components/Dashboard/table/box-table";
    import Moment from 'moment-jalaali'
    import RoleAccessHandler from "../../../utils/RoleAccessHandler";

    export default {
        layout: "dashboard",
        data() {
            return {
                isLoading: false,
                titleRow: [
                    {title: 'نام ایمیج', width: '27%', name: 'name'},
                    {title: 'تاریخ ساخت', width: '19%', name: 'created_at'},
                    {title: 'تاریخ بروزرسانی', width: '23%', name: 'date'},
                    {title: 'آخرین ورژن', width: '27%', name: 'version'},
                ],
                menuList: [
                    {method: this.versions, icon: 'ic-logs.svg', title: 'ورژن‌های ایمیج', style: {}},
                    {method: this.createVersion, icon: 'ic-upload.svg', title: 'آپلود نسخه جدید', style: {}},
                ],
                menuListComplete:[
                    {method: this.versions, icon: 'ic-logs.svg', title: 'ورژن‌های ایمیج', style: {}},
                    {method: this.createVersion, icon: 'ic-upload.svg', title: 'آپلود نسخه جدید', style: {}},
                    {method: this.remove, icon: 'ic_delete.svg', title: 'حذف ایمیج', style: {color: '#fd3259'}},
                ]
            };
        },

        components: {
            FLoading,
            FEmpty,
            FButton,
            ActionButton,
            BoxTable,
            Moment
        },
        computed: {
            loading() {
                return this.$store.state.loading;
            },
            images() {
                let images = this.$store.state.images;
                if (images) {
                    return images.map(({created_at, name, last_version}) => {
                        if (last_version) {
                            return {
                                name,
                                created_at: Moment(created_at).format('jYYYY/jMM/jDD'),
                                date: `<div style="display: flex"> <canvas style="margin-top: auto; margin-bottom: auto;" class="version-date"></canvas> ${Moment(last_version.date).format('jYYYY/jMM/jDD')}</div>`,
                                version: last_version.version
                            };
                        } else {
                            return {
                                name,
                                created_at: Moment(created_at).format('jYYYY/jMM/jDD'),
                            };
                        }
                    });
                }
            }
        },

        destroyed() {
            this.$store.commit("SET_DATA", {data: null, id: "images"});
        },
        created() {
            this.getData();
        },
        methods: {
            verifyUserAccess(permitted_roles){
                return RoleAccessHandler(permitted_roles)
            },
            async getData() {
                try {
                    await this.$store.dispatch("getImages");
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    } else {
                        this.$notify({
                            title: e.data.message,
                            time: 4000,
                            type: "error"
                        });
                    }
                }
            },
            versions(index) {
                this.$ga.event({
                    eventCategory: "image",
                    eventAction: "click btn list version image"
                    // eventLabel:'user',
                    // eventValue:'userId'
                });
                this.$router.push({path: `/dashboard/images/${this.images[index].name}/versions`, query: {ns: this.$route.query.ns}});
            },
            createVersion(index) {
                this.$ga.event({
                    eventCategory: "image",
                    eventAction: "click btn upload version image"
                    // eventLabel:'user',
                    // eventValue:'userId'
                });
                this.$router.push({path: `/dashboard/images/${this.images[index].name}/versions/create`, query: {ns: this.$route.query.ns}});
            },
            remove(index) {
                this.$ga.event({
                    eventCategory: "image",
                    eventAction: "click btn remove image"
                    // eventLabel:'user',
                    // eventValue:'userId'
                });
                this.$alertify(
                    {
                        title: "حذف ایمیج",
                        description: `آیا از حذف ${this.images[index].name} مطمئن هستید؟`
                    },
                    status => {
                        if (status) {
                            this.isLoading = true;
                            this.$store
                                .dispatch("deleteImage", this.images[index].name)
                                .then(res => {
                                    this.getData();
                                    this.isLoading = false;
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                    this.$ga.event({
                                        eventCategory: "image",
                                        eventAction: "remove image"
                                        // eventLabel:'user',
                                        // eventValue:'userId'
                                    });
                                })
                                .catch(e => {
                                    this.isLoading = false;
                                    this.$notify({
                                        title: e.data.message,
                                        type: "error"
                                    });
                                    this.$ga.event({
                                        eventCategory: "image",
                                        eventAction: "canceled remove image"
                                        // eventLabel:'user',
                                        // eventValue:'userId'
                                    });
                                });
                        }
                    }
                );
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .title_header
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal

</style>

<style lang="stylus">

    .version-date {
        width: 16px !important;
        display inline-flex !important
        height: 16px !important;
        background url("../../../static/icons/arrow-up.svg") !important
        background-repeat no-repeat !important
        background-position center !important
        margin-left: 12px !important

    }

    @media only screen and (max-width: 766px){
        .version-date{
            transform scale(.5) !important
            margin-left: 5px !important
        }
    }
</style>

