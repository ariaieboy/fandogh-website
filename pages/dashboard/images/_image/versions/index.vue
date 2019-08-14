<template>
    <div class="wrapper-image" v-if="!loading">
        <f-empty v-if="!versions || !versions.length" title="هنوز ورژنی اضافه نشده !">
            <f-button
                    styles="red"
                    @onClick="$router.push(`/dashboard/images/${image}/versions/create`)"
            >افزودن ورژن
            </f-button>
        </f-empty>
        <div class="images" v-else>
            <div style="overflow: hidden; margin-bottom: 32px">
                <div class="right" style="float: right;"><p class="title_header"> لیست ورژن‌های
                    {{image}}</p></div>
                <div class="left" style="float: left; cursor: pointer; margin-top: 8px"
                     @click="$router.push(`/dashboard/images/${image}/versions/create`)">
                    <svg width="180px" height="55px" viewBox="0 0 208 63" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Generator: Sketch 53.1 (72631) - https://sketchapp.com -->
                        <title>Combined Shape</title>
                        <desc>Created with Sketch.</desc>
                        <defs>
                            <path d="M31.5,2 L176.5,2 C191.687831,2 204,14.3121694 204,29.5 C204,44.6878306 191.687831,57 176.5,57 L31.5,57 C16.3121694,57 4,44.6878306 4,29.5 C4,14.3121694 16.3121694,2 31.5,2 Z M176.5,53 C189.478692,53 200,42.4786916 200,29.5 C200,16.5213084 189.478692,6 176.5,6 C163.521308,6 153,16.5213084 153,29.5 C153,42.4786916 163.521308,53 176.5,53 Z M178.6,19 L178.6,27.4 L187,27.4 L187,31.6 L178.6,31.6 L178.6,40 L174.4,40 L174.4,31.6 L166,31.6 L166,27.4 L174.4,27.4 L174.4,19 L178.6,19 Z"
                                  id="path-1"></path>
                            <filter x="-3.5%" y="-9.1%" width="107.0%" height="125.5%" filterUnits="objectBoundingBox"
                                    id="filter-2">
                                <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1"
                                                result="shadowBlurOuter1"></feGaussianBlur>
                                <feColorMatrix
                                        values="0 0 0 0 0.141176471   0 0 0 0 0.835294118   0 0 0 0 0.847058824  0 0 0 0.3 0"
                                        type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                            </filter>
                        </defs>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Combined-Shape">
                                <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
                                <use fill="#24D5D8" fill-rule="evenodd" xlink:href="#path-1"></use>
                            </g>
                        </g>
                        <text x="140"
                              y="29"
                              fill="#1d1d1d"
                              style="font-family: iran-sans; font-size: 1em"
                              text-anchor="start"
                              alignment-baseline="middle">
                            ساخت ورژن جدید
                        </text>
                    </svg>
                </div>
            </div>

            <box-table :titles="titleRow" :items="versions" :menu="menuList"></box-table>


        </div>
    </div>
</template>

<script>

    import FButton from "~/components/elements/button";
    import Alert from "~/components/Dashboard/alert";
    import ActionButton from "~/components/Dashboard/table/action-button";
    import {setValue} from "~/utils/cookie";
    import FEmpty from "~/components/Dashboard/empty";
    import BoxTable from "../../../../../components/Dashboard/table/box-table";
    import Moment from 'moment-jalaali'

    export default {
        layout: "dashboard",
        data() {
            return {
                titleRow: [
                    {title: 'ورژن', width: '35%', name: 'version', class: {}},
                    {title: 'تاریخ ساخت', width: '21%', name: 'date', class: {}},
                    {title: 'حجم(مگابایت)', width: '20%', name: 'size', class: {}},
                    {title: 'وضعیت', width: '20%', name: 'state', class: {}},
                ],
                menuList: [
                    {method: this.createVersions, icon: 'ic-add.svg', title: 'ایجاد سرویس', style: {}},
                    {method: this.logs, icon: 'file.svg', title: 'مشاهده لاگ', style: {}},
                ]
            };
        },
        components: {
            FButton,
            Alert,
            ActionButton,
            FEmpty,
            BoxTable,
            Moment
        },
        computed: {
            image() {
                return this.$route.params.image
            },
            loading() {
                return this.$store.state.loading;
            },
            versions() {
                let versions = this.$store.state.versions;
                if (versions) {
                    return versions.map(({version, date, size, state}) => {
                        return {
                            version,
                            date: Moment(date).format('jYYYY/jMM/jDD'),
                            size: this.getSize(size),
                            state: this.getState(state)
                        };
                    });
                }
            }
        },
        created() {
            this.getData();
        },
        destroyed() {
            this.$store.commit("SET_DATA", {data: null, id: "versions"});
        },
        methods: {
            async getData() {
                try {
                    await this.$store.dispatch(
                        "getImageVersions",
                        this.$route.params.image
                    );
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
            getSize(size) {
                return `${(size / 1000000).toFixed(1)}`
            },
            getState(state) {

                return state === "FAILED"
                    ? `<span style="color: #ff2d55">خطا</span>`
                    : state === "BUILT"
                        ? `<span style="color: #2cac46">ساخته شده</span>`
                        : `<span style="color: #0045ff">در حال ساخت ...</span>`;
            },
            createVersions(index) {
                this.$router.push(`/dashboard/services/setup`);
                setValue({key: "versions", value: this.versions[index].version});
                setValue({key: "name", value: this.image});
            },
            logs(index) {
                this.$ga.event({
                    eventCategory: "images-version",
                    eventAction: "click btn logs version image"
                });
                this.$router.push(
                    `/dashboard/images/${this.image}/versions/${this.versions[index].version}/logs`
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
