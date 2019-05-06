<template>
    <div class="wrapper-image" v-if="!loading">
        <f-loading :isFull="true" v-if="isLoading"/>
        <f-empty v-if="!services || !services.length" title="هنوز سرویسی اضافه نشده !">
            <f-button styles="red" path="/dashboard/services/setup">اجرای سرویس جدید</f-button>
        </f-empty>

        <div class="images" v-else>
            <div style="overflow: hidden; margin-bottom: 32px">
                <div class="right" style="float: right;"><p class="title"> لیست سرویس‌ها</p></div>
                <div class="left" style="float: left; cursor: pointer; margin-top: 8px" @click="newService">
                    <svg width="180px" height="55px" viewBox="0 0 208 63" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter x="-6.0%" y="-21.8%" width="112.0%" height="143.6%" filterUnits="objectBoundingBox" id="filter-1">
                                <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                                <feColorMatrix values="0 0 0 0 0.141176471   0 0 0 0 0.835294118   0 0 0 0 0.847058824  0 0 0 0.737024694 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
                                <feMerge>
                                    <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                                    <feMergeNode in="SourceGraphic"></feMergeNode>
                                </feMerge>
                            </filter>
                        </defs>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Group-13" transform="translate(4.000000, 2.000000)" fill="#24D5D8">
                                <g id="Group-12" filter="url(#filter-1)">
                                    <path d="M27.5,0 L172.5,0 C187.687831,-2.78995922e-15 200,12.3121694 200,27.5 C200,42.6878306 187.687831,55 172.5,55 L27.5,55 C12.3121694,55 1.85997282e-15,42.6878306 0,27.5 C1.69274086e-15,12.3121694 12.3121694,2.78995922e-15 27.5,0 Z M172.5,51 C185.478692,51 196,40.4786916 196,27.5 C196,14.5213084 185.478692,4 172.5,4 C159.521308,4 149,14.5213084 149,27.5 C149,40.4786916 159.521308,51 172.5,51 Z" id="Combined-Shape-Copy"></path>
                                    <path d="M189.890482,25.5568291 C190.038682,26.8822631 190.036858,28.2207196 189.882668,29.5366471 C189.821851,30.0488236 189.360191,30.4353325 188.85842,30.394572 L188.64198,30.3889723 C187.094995,30.3889723 185.65675,31.3419616 185.061866,32.7612881 C184.429085,34.2690376 184.824329,36.0239549 186.042357,37.1269639 C186.424317,37.4725821 186.469897,38.0559918 186.14693,38.4569558 C185.314639,39.4935498 184.362668,40.4350794 183.315761,41.2560202 C182.912703,41.5673891 182.341,41.5219404 181.994982,41.1455891 C180.953805,40.0018195 179.101042,39.5712944 177.660844,40.1595224 C176.171029,40.7694981 175.207728,42.2695644 175.266462,43.8913913 C175.283521,44.4005726 174.907552,44.8376089 174.400051,44.8936059 C173.759717,44.9648391 173.119252,45 172.478918,45 C171.804334,45 171.131573,44.9610626 170.46285,44.8830576 C169.951702,44.8241957 169.573649,44.3758297 169.603992,43.8607883 C169.696975,42.2209903 168.746827,40.6943581 167.236306,40.0625045 C165.794155,39.4572169 163.920556,39.8857887 162.873518,41.043883 C162.525938,41.4268759 161.942514,41.4724548 161.54154,41.1493656 C160.519245,40.3266016 159.586157,39.3841605 158.77301,38.348478 C158.457466,37.9485559 158.505,37.373741 158.879407,37.0298158 C160.076468,35.9325367 160.469758,34.1940278 159.857945,32.7024262 C159.244177,31.2088713 157.781059,30.2653884 156.257124,30.3043258 C155.755614,30.3043258 155.164506,29.9378715 155.10955,29.4437964 C154.961349,28.1183625 154.963173,26.7787339 155.117103,25.4639784 C155.177789,24.9594853 155.573033,24.5870407 156.127937,24.6048816 C157.837969,24.6048816 159.331691,23.6778071 159.935821,22.2393375 C160.568602,20.7305462 160.175312,18.9758893 158.957284,17.8728803 C158.577277,17.5271319 158.529743,16.9446338 158.85284,16.5427582 C159.681224,15.5090291 160.635149,14.5667182 161.68401,13.743824 C162.084853,13.4314133 162.660594,13.4777736 163.004658,13.8549063 C164.045705,14.9998479 165.906281,15.4255546 167.336842,14.8412333 C168.828611,14.2302158 169.790219,12.7301496 169.733179,11.1074111 C169.716119,10.5991414 170.092349,10.162105 170.59972,10.1061081 C171.910861,9.96064637 173.229556,9.96533449 174.536791,10.1165262 C175.050022,10.1762996 175.426252,10.6238843 175.395648,11.1386652 C175.302665,12.7775517 176.252813,14.3043141 177.759558,14.938121 C179.207439,15.5422366 181.081168,15.1128835 182.124299,13.9576541 C182.470186,13.5746613 183.055434,13.5301242 183.454324,13.8502182 C184.472972,14.6662104 185.40593,15.60774 186.22676,16.6500639 C186.542304,17.0499861 186.496594,17.6257125 186.120364,17.9696378 C184.925126,19.0660053 184.531966,20.805556 185.141696,22.2971575 C185.738533,23.753468 187.161672,24.6951278 188.765437,24.6951278 C189.261477,24.6951278 189.835134,25.0648376 189.890482,25.5568291 Z M172.657658,38.7987988 C178.81074,38.7987988 183.798799,33.81074 183.798799,27.6576577 C183.798799,21.5045753 178.81074,16.5165165 172.657658,16.5165165 C166.504575,16.5165165 161.516517,21.5045753 161.516517,27.6576577 C161.516517,33.81074 166.504575,38.7987988 172.657658,38.7987988 Z" id="Combined-Shape" fill-rule="nonzero" transform="translate(172.500000, 27.500000) scale(-1, 1) translate(-172.500000, -27.500000) "></path>
                                    <circle id="Oval-Copy-2" transform="translate(172.500000, 27.500000) scale(-1, 1) translate(-172.500000, -27.500000) " cx="172.5" cy="27.5" r="8.75"></circle>
                                </g>
                            </g>
                        </g>
                        <text x="148"
                              y="29"
                              fill="#FFFFFF"
                              style="font-family: iran-sans; font-size: 1em"
                              text-anchor="start"
                              alignment-baseline="middle">
                            ساخت سرویس جدید
                        </text>
                    </svg>
                </div>
            </div>

            <box-table :titles="titleRow" :items="services" :func="details" :menu="menuList"></box-table>

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

    export default {
        layout: "dashboard",
        components: {
            BoxTable,
            FLoading,
            FButton,
            ActionButton,
            FEmpty,
            Moment
        },
        data() {
            return {
                isLoading: false,
                titleRow: [
                    {title: 'نام سرویس', width: '39%', name: 'name'},
                    {title: 'حافظه (مگابایت)', width: '23%', name: 'memory'},
                    {title: 'تاریخ ساخت', width: '24%', name: 'start_date'},
                    {title: 'وضعیت', width: '10%', name: 'state'}
                ],
                menuList:[
                    {method: this.details, icon: 'ic-logs.svg', title: 'جزئیات سرویس', style: {}},
                    {method: this.logs, icon: 'file.svg', title: '‌مشاهده لاگ‌ها', style: {}},
                    {method: this.remove, icon: 'ic_delete.svg', title: 'حذف سرویس', style: {color: '#fd3259'}},
                ]
            };
        },
        computed: {
            loading() {
                return this.$store.state.loading;
            },
            services() {
                let services = this.$store.state.services;
                if (services) {
                    return services.map(
                        ({memory, start_date, name, service_type, state}) => {
                            return {
                                name,
                                //version: last_version.version,
                                service_type: service_type,
                                memory: memory,
                                state: `<div style="display: flex"><canvas class='state' style="border-radius: 100px; margin-top: auto; margin-bottom: auto;background-color: ${state.toString().toLowerCase() === 'running' ? '#3ccc38' : '#fd3259'};"/></div>`,
                                start_date:  Moment(start_date).format('jYYYY/jMM/jDD')
                            };
                        }
                    );
                }
            }
        },
        destroyed() {
            this.$store.commit("SET_DATA", {data: null, id: "services"});
        },

        created() {
            this.getData();
            window.onclick = function (event) {
                if (!event.target.matches('.dropbtn')) {
                    var dropdowns = document.getElementsByClassName("dropdown-content");
                    var i;
                    for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
                }
            }
        },
        methods: {
            async getData() {
                try {
                    await this.$store.dispatch("getServices");
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }
            },
            notify(id) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }

                document.getElementById(id).classList.toggle("show");
            },
            remove(index) {
                this.$ga.event({
                    eventCategory: "service",
                    eventAction: "click btn remove service",
                    eventLabel: "service name",
                    eventValue: this.services[index].name
                });
                this.$alertify(
                    {
                        title: `حذف سرویس`,
                        description: `آیا از حذف ${this.services[index].name}  مطمئن هستید؟`
                    },
                    status => {
                        if (status) {
                            this.isLoading = true;
                            this.$store
                                .dispatch("deleteService", this.services[index].name)
                                .then(res => {
                                    this.getData();
                                    this.isLoading = false;
                                    this.$ga.event({
                                        eventCategory: "service",
                                        eventAction: "remove service",
                                        eventLabel: "service name",
                                        eventValue: this.services[index].name
                                    });
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                })
                                .catch(e => {
                                    this.isLoading = false;
                                    this.$ga.event({
                                        eventCategory: "service",
                                        eventAction: "fail remove service",
                                        eventLabel: "service name",
                                        eventValue: this.services[index].name
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
            details(index) {
                this.$ga.event({
                    eventCategory: "service",
                    eventAction: "click btn details service",
                    eventLabel: "service name",
                    eventValue: this.services[index].name
                });
                this.$router.push(`/dashboard/services/${this.services[index].name}`);
            },
            logs(index) {
                this.$ga.event({
                    eventCategory: "service",
                    eventAction: "click btn logs service",
                    eventLabel: "service name",
                    eventValue: this.services[index].name
                });
                this.$router.push(`/dashboard/services/${this.services[index].name}/logs`);
            }, newService() {
                this.$router.push('/dashboard/services/setup')
            }
        }
    };
</script>

<style scoped lang="stylus">


    .title
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal


</style>

<style lang="css">

    .state {
        width: 16px !important;
        height: 16px !important;
        margin-right: 18px !important;
        animation: moved 2s infinite ease-in-out !important;
        -webkit-animation: moved 2s infinite ease-in-out !important;
        animation-play-state: running !important;

    }

    @media only screen and (max-width: 766px){
        .state{
            width: 12px !important;
            height: 12px !important;
            margin-right: 5px !important;
        }
    }


    @keyframes moved {
        0% {
            opacity: 1 !important;
            transform: scale(1) !important;
        }
        10% {
            opacity: .95 !important;
            transform: scale(.99) !important
        }
        20% {
            opacity: .9 !important;
            transform: scale(.98) !important
        }
        30% {
            opacity: .85 !important;
            transform: scale(.97) !important
        }
        40% {
            opacity: .8 !important;
            transform: scale(.96) !important
        }
        50% {
            opacity: .75 !important;
            transform: scale(.95) !important
        }
        60% {
            opacity: .8 !important;
            transform: scale(.96) !important
        }
        70% {
            opacity: .85 !important;
            transform: scale(.97) !important
        }
        80% {
            opacity: .9 !important;
            transform: scale(.98) !important
        }
        90% {
            opacity: .95 !important;
            transform: scale(.99) !important;
        }
        100% {
            opacity: 1 !important;
            transform: scale(1) !important
        }
    }

    @-webkit-keyframes moved {
        0% {
            opacity: 1 !important;
            transform: scale(1) !important;
        }
        10% {
            opacity: .95 !important;
            transform: scale(.99) !important
        }
        20% {
            opacity: .9 !important;
            transform: scale(.98) !important
        }
        30% {
            opacity: .85 !important;
            transform: scale(.97) !important
        }
        40% {
            opacity: .8 !important;
            transform: scale(.96) !important
        }
        50% {
            opacity: .75 !important;
            transform: scale(.95) !important
        }
        60% {
            opacity: .8 !important;
            transform: scale(.96) !important
        }
        70% {
            opacity: .85 !important;
            transform: scale(.97) !important
        }
        80% {
            opacity: .9 !important;
            transform: scale(.98) !important
        }
        90% {
            opacity: .95 !important;
            transform: scale(.99) !important;
        }
        100% {
            opacity: 1 !important;
            transform: scale(1) !important
        }
    }
</style>

