<template>
    <div class="wrapper-image" v-if="!loading">
        <f-loading :isFull="true" v-if="isLoading"/>

        <div class="images">

            <div style="overflow: hidden; margin-bottom: 32px">
                <div class="right" style="float: right;"><p class="title_header"> لیست فضاهای ذخیره‌سازی</p></div>
                <div v-if="verifyUserAccess({ADMIN: 'ADMIN', DEVELOPER: 'DEVELOPER'})" class="left"
                     style="float: left; cursor: pointer; margin-top: 8px"
                     @click="$router.push({path: '/dashboard/volumes/create'})">
                    <svg width="185px" height="58px" viewBox="0 0 208 63" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Generator: Sketch 53.1 (72631) - https://sketchapp.com -->
                        <title>Group 29</title>
                        <desc>Created with Sketch.</desc>
                        <defs>
                            <filter x="-6.2%" y="-23.1%" width="112.4%" height="146.2%" filterUnits="objectBoundingBox" id="filter-1">
                                <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                                <feColorMatrix values="0 0 0 0 0.141176471   0 0 0 0 0.835294118   0 0 0 0 0.847058824  0 0 0 0.356342876 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
                                <feMerge>
                                    <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                                    <feMergeNode in="SourceGraphic"></feMergeNode>
                                </feMerge>
                            </filter>
                        </defs>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Group-29" filter="url(#filter-1)" transform="translate(4.000000, 2.000000)" fill="#24D5D8">
                                <path d="M26.5480769,2.06057393e-13 L166.528846,2.06057393e-13 C181.191108,2.03440061e-13 193.076923,11.5500336 193.076923,25.798077 C193.076923,40.0461204 181.191108,51.596154 166.528846,51.596154 L26.5480769,51.596154 C11.8858154,51.596154 6.11066753e-13,40.0461204 6.11066753e-13,25.798077 C6.12700859e-13,11.5500336 11.8858154,2.06057393e-13 26.5480769,2.06057393e-13 Z M166.278846,48.1346155 C178.615269,48.1346155 188.615385,38.1344997 188.615385,25.798077 C188.615385,13.4616543 178.615269,3.46153846 166.278846,3.46153846 C153.942424,3.46153846 143.942308,13.4616543 143.942308,25.798077 C143.942308,38.1344997 153.942424,48.1346155 166.278846,48.1346155 Z" id="Combined-Shape" fill-rule="nonzero"></path>
                                <g id="Group-28" transform="translate(153.000000, 9.000000)">
                                    <path d="M0.229590244,23.6597938 C1.39893516,27.8036196 6.89563685,30.9402865 13.5,30.9402865 C20.1043632,30.9402865 25.6010648,27.8036196 26.7704098,23.6597938 C26.9211699,24.194045 27,24.7450374 27,25.3082073 C27,30.239506 20.9558441,34.2371134 13.5,34.2371134 C6.04415588,34.2371134 0,30.239506 0,25.3082073 C0,24.7450374 0.078830069,24.194045 0.229590244,23.6597938 Z" id="Combined-Shape"></path>
                                    <path d="M0.229590244,18.0927835 C1.39893516,22.2366093 6.89563685,25.3732762 13.5,25.3732762 C20.1043632,25.3732762 25.6010648,22.2366093 26.7704098,18.0927835 C26.9211699,18.6270347 27,19.178027 27,19.7411969 C27,24.6724956 20.9558441,28.6701031 13.5,28.6701031 C6.04415588,28.6701031 0,24.6724956 0,19.7411969 C0,19.178027 0.078830069,18.6270347 0.229590244,18.0927835 Z" id="Combined-Shape"></path>
                                    <path d="M0.229590244,12.8041237 C1.39893516,16.9479495 6.89563685,20.0846164 13.5,20.0846164 C20.1043632,20.0846164 25.6010648,16.9479495 26.7704098,12.8041237 C26.9211699,13.3383749 27,13.8893673 27,14.4525372 C27,19.3838359 20.9558441,23.3814433 13.5,23.3814433 C6.04415588,23.3814433 0,19.3838359 0,14.4525372 C0,13.8893673 0.078830069,13.3383749 0.229590244,12.8041237 Z" id="Combined-Shape"></path>
                                    <ellipse id="Oval-Copy-28" cx="13.5" cy="8.90721649" rx="13.5" ry="8.90721649"></ellipse>
                                </g>
                            </g>
                        </g>

                        <text x="142"
                              y="29"
                              fill="#1d1d1d"
                              style="font-family: iran-sans; font-size: 1em !important;"
                              text-anchor="start"
                              alignment-baseline="middle">
                            ساخت فضای جدید
                        </text>
                    </svg>
                </div>
            </div>

            <f-empty v-if="!volumes || !volumes.length" title="هنوز فضای ذخیره‌سازی جدیدی اضافه نشده !"></f-empty>

            <box-table v-else :titles="titleRow" :items="volumes" :func="versions"
                       :menu="verifyUserAccess({ADMIN:'ADMIN', DEVELOPER: 'DEVELOPER', OPERATOR: 'OPERATOR'})? menuListComplete : menuList"></box-table>

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
        name: "index",
        layout: 'dashboard',
        components: {
            FLoading,
            FEmpty,
            FButton,
            ActionButton,
            BoxTable,
            Moment
        },
        data() {
            return {
                isLoading: false,
                titleRow: [
                    {title: 'نام فضای ذخیره‌سازی', width: '27%', name: 'name'},
                    {title: 'تاریخ ساخت', width: '19%', name: 'created_at'},
                    {title: 'حجم', width: '23%', name: 'capacity'},
                    {title: 'وضعیت', width: '27%', name: 'mounted_to'}
                ],
                menuList: [],
                menuListComplete: [
                    {method: this.remove, icon: 'ic_delete.svg', title: 'حذف فضای ذخیره‌سازی', style: {color: '#fd3259'}},
                ]
            }
        },
        created() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
            this.getData();
        },
        computed: {
            loading() {
                return this.$store.state.loading;
            },
            volumes() {
                let volumes = this.$store.state.volumes;
                if (volumes) {
                    return volumes.map(({name, age, capacity, mounted_to}) => {
                        console.log(age)
                        {
                            return {
                                name,
                                created_at: age ? Moment(age).format('jYYYY/jMM/jDD') : 'در حال ساخت',
                                capacity,
                                mounted_to: mounted_to ? 'آزاد' : mounted_to
                            };
                        }
                    });
                }
            }
        },

        destroyed() {
            this.$store.commit("SET_DATA", {data: null, id: "images"});
        },
        methods: {
            verifyUserAccess(permitted_roles) {
                return RoleAccessHandler(permitted_roles)
            },
            async getData() {
                try {
                    await this.$store.dispatch("getVolumes");
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
            remove(index) {
                this.$ga.event({
                    eventCategory: "volume",
                    eventAction: "click btn remove volume",
                    eventLabel: "volume name",
                    eventValue: this.volumes[index].name
                });
                this.$alertify(
                    {
                        title: `حذف فضای ذخیره‌سازی`,
                        description: ` آیا از حذف ${this.volumes[index].name} مطمئن هستید؟`
                    },
                    status => {
                        if (status) {
                            this.$store.commit("SET_DATA", {data: true, id: "loading"});
                            this.$store
                                .dispatch("deleteSelectedVolume", this.volumes[index].name)
                                .then(res => {
                                    this.getData();
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                    this.$ga.event({
                                        eventCategory: "volume",
                                        eventAction: "volume removed",
                                        eventLabel: "volume name",
                                        eventValue: this.volumes[index].name
                                    });
                                })
                                .catch(e => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$ga.event({
                                        eventCategory: "volume",
                                        eventAction: "failed to remove volume",
                                        eventLabel: "volume name",
                                        eventValue: this.volumes[index].name
                                    });
                                    this.$notify({
                                        title: e.data.message,
                                        type: "error"
                                    });
                                });
                        }
                    }
                );
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .title_header
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        padding-top 18px
        color #7c7c7c
        letter-spacing normal


</style>
