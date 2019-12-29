<template>
    <div class="wrapper-secrets" v-if="!loading">
        <f-loading :isFull="true" v-if="isLoading"/>

        <div class="secretss">
            <div style="overflow: hidden; margin-bottom: 32px">

                <div class="right" style="float: right;"><p class="title_header"> لیست سکرت‌ها</p></div>
                <div class="left" style="float: left; cursor: pointer; margin-top: 8px"
                     v-if="verifyUserAccess({ADMIN: 'ADMIN'})"
                     @click="$router.push({path: '/dashboard/secret/create'})">
                    <svg width="180px" height="55px" viewBox="0 0 208 63" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <path d="M31.5,2 L176.5,2 C191.687831,2 204,14.3121694 204,29.5 C204,44.6878306 191.687831,57 176.5,57 L31.5,57 C16.3121694,57 4,44.6878306 4,29.5 C4,14.3121694 16.3121694,2 31.5,2 Z M176.5,53 C189.478692,53 200,42.4786916 200,29.5 C200,16.5213084 189.478692,6 176.5,6 C163.521308,6 153,16.5213084 153,29.5 C153,42.4786916 163.521308,53 176.5,53 Z M179.03125,25.2185617 L179.030991,25.2185617 L179.030991,28.8125 L175.375,28.8125 L175.375,25.2185617 C175.375,24.2879693 176.19513,23.53125 177.203125,23.53125 C178.21112,23.53125 179.03125,24.2882084 179.03125,25.2185617 Z M189.375855,16.8751063 C189.75,17.0085528 190,17.363349 190,17.7612398 L190,41.2208817 C190,41.5612314 189.815982,41.8751366 189.519306,42.0413938 C189.428397,42.0925687 187.26002,43.3046052 184.652493,44.5374546 C181.065005,46.2335713 178.490225,47.09375 177,47.09375 C175.509775,47.09375 172.934995,46.2335713 169.347507,44.5374546 C166.739736,43.3046052 164.571603,42.0925687 164.48045,42.0413938 C164.183773,41.8751366 164,41.5612314 164,41.2208817 L164,17.7612398 C164,17.363349 164.25,17.0085528 164.6239,16.8751063 C164.838954,16.7987113 169.967742,15 177,15 C184.032258,15 189.161046,16.7987113 189.375855,16.8751063 Z M170.337977,29.9371881 L170.337977,37.6119509 C170.337977,38.1312902 170.758065,38.5521975 171.276393,38.5521975 L182.723607,38.5521975 C183.241935,38.5521975 183.662023,38.1312902 183.662023,37.6119509 L183.662023,29.937433 C183.662023,29.4180937 183.241935,28.9971864 182.723607,28.9971864 L181.852151,28.9971864 L181.852151,25.3177371 C181.852151,22.6326475 179.679863,20.4561236 177,20.4561236 C174.320381,20.4561236 172.147849,22.6326475 172.147849,25.3177371 L172.147849,28.9969416 L171.276393,28.9969416 C170.758065,28.9969416 170.337977,29.4180937 170.337977,29.9371881 Z M177,31.65625 C177.448568,31.65625 177.8125,32.0591019 177.8125,32.5561635 L177.8125,34.8188365 C177.8125,35.3158981 177.448568,35.71875 177,35.71875 C176.551221,35.71875 176.1875,35.3158981 176.1875,34.8188365 L176.1875,32.5561635 C176.1875,32.0593362 176.551221,31.65625 177,31.65625 Z"
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
                        <text x="142"
                              y="29"
                              fill="#1d1d1d"
                              style="font-family: iran-sans; font-size: 1em"
                              text-anchor="start"
                              alignment-baseline="middle">
                            ساخت سکرت جدید
                        </text>
                    </svg>
                </div>
            </div>

            <f-empty v-if="!secrets || !secrets.length" title="هنوز سکرتی اضافه نشده است !"></f-empty>

            <box-table v-else
                       :titles="titleRow"
                       :items="secrets"
                       :func="verifyUserAccess({ADMIN: 'ADMIN'}) ? edit : null"
                       :menu="verifyUserAccess({ADMIN: 'ADMIN'}) ? menuListComplete: menuList">
            </box-table>

        </div>
    </div>
</template>

<script>

    import FButton from "~/components/elements/button";
    import ActionButton from "~/components/Dashboard/table/action-button";
    import FEmpty from "~/components/Dashboard/empty";
    import FLoading from "~/components/Loading";
    import BoxTable from "../../../components/Dashboard/table/box-table";
    import Moment from 'moment-jalaali'
    import RoleAccessHandler from "../../../utils/RoleAccessHandler";

    export default {
        layout: "dashboard",
        components: {
            FLoading,
            FButton,
            ActionButton,
            FEmpty,
            BoxTable,
            Moment
        },
        data() {
            return {
                isLoading: false,
                titleRow: [
                    {title: 'نام سکرت', width: '39%', name: 'name', class: {}},
                    {title: 'تاریخ ساخت', width: '19%', name: 'created_at', class: {}},
                    {title: 'نوع سکرت', width: '39%', name: 'type', class: {}},
                ],
                menuList: [],
                menuListComplete: [
                    {method: this.edit, icon: 'edit.svg', title: 'ویرایش سکرت', style: {}},
                    {method: this.remove, icon: 'ic_delete.svg', title: 'حذف سکرت', style: {color: '#fd3259'}},
                ]
            };
        },
        computed: {
            loading() {
                return this.$store.state.loading;
            },
            secrets() {
                let secrets = this.$store.state.secrets;
                if (secrets) {
                    return secrets.map(({memory, created_at, name, type, state}) => {
                        return {
                            name,
                            type: type,
                            memory: `Mi ${memory}`,
                            created_at: Moment(created_at).format('jYYYY/jMM/jDD')
                        };
                    });
                }
            }
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
                    await this.$store.dispatch("getSecret");
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    }
                }
            },
            edit(index) {
                this.$ga.event({
                    eventCategory: "secret",
                    eventAction: "click btn edit secret",
                    eventLabel: "secret name",
                    eventValue: this.secrets[index].name
                });
                this.$router.push({path: `/dashboard/secret/edit/${this.secrets[index].name}`});
            },
            remove(index) {
                this.$ga.event({
                    eventCategory: "secret",
                    eventAction: "click btn remove secret",
                    eventLabel: "secret name",
                    eventValue: this.secrets[index].name
                });
                this.$alertify(
                    {
                        title: `حذف سکرت`,
                        description: ` آیا از حذف ${this.secrets[index].name} مطمئن هستید؟`
                    },
                    status => {
                        if (status) {
                            this.isLoading = true;
                            this.$store
                                .dispatch("deleteSecret", this.secrets[index].name)
                                .then(res => {
                                    this.getData();
                                    this.isLoading = false;
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                    this.$ga.event({
                                        eventCategory: "secret",
                                        eventAction: "remove secret",
                                        eventLabel: "secret name",
                                        eventValue: this.secrets[index].name
                                    });
                                })
                                .catch(e => {
                                    this.isLoading = false;
                                    this.$ga.event({
                                        eventCategory: "secret",
                                        eventAction: "fail remove secret",
                                        eventLabel: "secret name",
                                        eventValue: this.secrets[index].name
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
    };
</script>
<style scoped lang="stylus">

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

