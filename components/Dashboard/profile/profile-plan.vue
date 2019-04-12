<template>

    <div style="margin-bottom: 50px">
        <p class="date-tile">تاریخ پایان پلن شما:
            <span class="date-value" v-if="planExpirationDate">{{planExpirationDate}}</span>
            <span class="date-value" v-else>نامحدود</span>
        </p>
        <div class="row plan-container" style="padding: 12px;">

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="height: 100px">
                <div class="container-fluid row plan-item">
                    <img class="plan-image" alt="cpu" src="../../../assets/svg/ic-cpu.svg">
                    </img>

                    <div style="margin-top: auto;margin-bottom: auto;margin-right: 24px; padding: 0;">
                        <p class="plan-title">پردازنده</p>
                        <p class="plan-value">{{quota.cpu_limit}} هسته</p>

                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="height: 100px">
                <div class="container-fluid row plan-item">
                    <img alt="storage"
                         class="plan-image"
                         style="transform: scale(0.8)"
                         src="../../../assets/svg/ic-storage.svg">
                    </img>

                    <div style="margin-top: auto;margin-bottom: auto;margin-right: 24px; padding: 0;">

                        <p class="plan-title">حافظه ذخیره‌سازی</p>
                        <p class="plan-value">{{quota.volume_limit}} گیگابایت</p>

                    </div>
                </div>
            </div>


            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="height: 100px">
                <div class="container-fluid row plan-item">
                    <img alt="memory" src="../../../assets/svg/ic-memory.svg" class="plan-image"
                         style="transform: rotate(45deg) scale(1.1)">
                    </img>

                    <div style="margin-top: auto;margin-bottom: auto;margin-right: 24px; padding: 0;">

                        <p class="plan-title">رم</p>
                        <p class="plan-value">{{(quota.memory_limit > 1024 ? quota.memory_limit / 1024 :
                            quota.memory_limit)}}
                            <span v-if="quota.memory_limit>1024">گیگابایت</span>
                            <span v-else>مگابایت</span>
                        </p>

                    </div>
                </div>
            </div>

        </div>

        <div class="row " style="width: 100%; margin-top: 40px; margin-right: 0; margin-left: 0">
            <div class="container-fluid navigation-container">
                <button class="navigation-button"
                        style="background-color: #2979ff; box-shadow: 0 2px 6px 0 rgba(41, 121, 255, 0.42)"
                        @click="navigateToPlanPage">
                    ساخت پلن جدید
                </button>

                <button class="navigation-button"
                        style="box-shadow: 0 2px 6px 0 rgba(126, 211, 33, 0.42); background-color: #7ed321;">
                    تمدید پلن فعلی
                </button>
            </div>
        </div>
    </div>

</template>

<script>
    import {getValue} from "../../../utils/cookie";
    import Moment from 'moment-jalaali';

    export default {
        props: ['cpu', 'memory', 'dedicatedVolume'],
        name: "profile-plan",
        data() {
            return {
                quota: {},
            }
        },
        components:{
          Moment,
        },
        computed:{

            namespace(){
                return getValue('namespace');
            },
            planExpirationDate(){
                if(this.quota.hasOwnProperty('expires_at')){
                    if(this.quota.expires_at){
                        return Moment(this.quota.expires_at).format('jYYYY/jMM/jDD');
                    }
                }
                return false;
            }

        },
        methods: {
            async requestUserPlan() {
                try {
                    let plan = await this.$store.dispatch('getNameSpace', this.namespace);
                    this.quota = plan.quota;
                    console.log('quota')
                    console.log(plan.quota)
                }catch (e) {
                    switch (e.status) {
                        case 401:
                            this.$router.push("/user/login");
                            break;
                        case 400:
                            this.$notify({
                                title: e.data.message,
                                type: 'error'
                            });
                            break;
                    }
                }

            },
            navigateToPlanPage(){
                this.$router.push('/dashboard/plans');
            }
        },
        created() {
            this.requestUserPlan();
        }
    }
</script>

<style lang="stylus" scoped>

    .plan-container
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        background-color #ffffff

    .plan-item
        width 100%
        height 100%
        margin 0
        justify-content right
        display flex
        position relative
        @media only screen and (max-width: 900px)
            margin-top 12px

        img.plan-image
            padding 0
            width 80px
            height 100%
            margin-top auto
            margin-bottom auto
            filter invert(41%) sepia(99%) saturate(4513%) hue-rotate(185deg) brightness(100%) contrast(108%)

        p.plan-title
            margin 0
            font-family yekan-bold
            font-size 1.1em

        p.plan-value
            margin 0
            font-family iran-sans
            font-size 1em

    .navigation-container
        width min-content
        margin-right auto
        margin-left auto
        display flex
        position relative
        justify-content center
        @media only screen and (max-width: 700px)
            display block


    .navigation-button
        width 200px
        height 40px
        background-color #2979ff
        outline none
        border none
        position relative
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(41, 121, 255, 0.42)
        color #ffffff
        font-family iran-yekan
        font-size 0.9em
        margin-left 5px
        align-self center
        margin-right 5px
        cursor pointer
        @media only screen and (max-width: 700px)
            margin-top 12px

    .date-tile
        font-family yekan-bold
        font-size .9em
        font-style normal
        margin-top 24px
        margin-bottom 16px
        font-stretch normal
        letter-spacing normal
        color: #7c7c7c


    .date-value
        font-family iran-sans
        font-size .9em
        font-style normal
        margin-top 24px
        margin-bottom 16px
        font-stretch normal
        letter-spacing normal
        color: #222


</style>