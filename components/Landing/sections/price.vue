<template>

    <div id="prices" class="row price-parent-container">

        <div class="row price-header">
            <img src="../../../assets/svg/bottom_curve.svg" alt="bt" class="bottom-curve" width="100%"/>
            <div>
                <p>{{title}}</p>
            </div>
        </div>

        <div class="container-fluid" style="width: 100%; max-width: 1750px; padding-left: 0; padding-right: 0">

            <div class="ready-plan-container container-fluid">
                <p class="resource-description">{{resource_description}}</p>
                <p class="ready-plan-title">{{plan_title}}</p>
                <div></div>
                <p class="ready-plan-description">{{plan_description}}</p>
            </div>

            <div style="width: 100%; box-sizing: border-box; clear: both; height: max-content; display: flex; flex-direction: column; position: relative">

                <div class="row bg-test" style="width: 100%; display: flex; justify-content: center">
                    <div class="row card-plan-container container-fluid" style="max-width: 2200px">

                        <div v-for="item in plans" style="padding: 16px; max-width: 820px"
                             class="col-auto col-md-6 col-xs-12 col-sm-12 container-fluid">

                            <div class="card-plan">
                                <div>
                                    <img :src="require('../../../assets/svg/plans/' + item.icon + '.svg')"
                                         :alt="item.icon"/>
                                    <div style="width: 100%; display: flex; flex-direction: column">
                                        <p class="card-plan-title">{{item.title}}</p>
                                        <p class="card-plan-price">{{item.price}}</p>
                                    </div>
                                </div>
                                <div class="row" style="width: 100%; margin-top: 32px; margin-left: 0; margin-right: 0">
                                    <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"
                                         style="display: flex; flex-direction: column">
                                        <div style="display: flex; width: 100%">
                                            <span class="card-plan-config-title">رم (حافظه تصادفی)</span>
                                            <span class="card-plan-config-description">{{item.config['memory']}}</span>
                                        </div>

                                        <div style="display: flex; width: 100%; margin-top: 16px;">
                                            <span class="card-plan-config-title">حافظه ذخیره‌سازی</span>
                                            <span class="card-plan-config-description">{{item.config['shared_storage']}}</span>
                                        </div>

                                        <div style="display: flex; width: 100%; margin-top: 16px;">
                                            <span class="card-plan-config-title">Load Balancer</span>
                                            <span class="card-plan-config-description">{{item.config['load_balancer']}}</span>
                                        </div>

                                        <div style="display: flex; width: 100%; margin-top: 16px;">
                                            <span class="card-plan-config-title">Monitoring</span>
                                            <span class="card-plan-config-description">{{item.config['monitoring']}}</span>
                                        </div>

                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"
                                         style="display: flex; flex-direction: column">
                                        <div style="display: flex; width: 100%">
                                            <span class="card-plan-config-title">پردازنده</span>
                                            <span class="card-plan-config-description">{{item.config['cpu']}}</span>
                                        </div>

                                        <div style="display: flex; width: 100%; margin-top: 16px;">
                                            <span class="card-plan-config-title">Dedicated Volume</span>
                                            <span class="card-plan-config-description">{{item.config['dedicated_storage']}}</span>
                                        </div>

                                        <div style="display: flex; width: 100%; margin-top: 16px;">
                                            <span class="card-plan-config-title">Image Registry</span>
                                            <span class="card-plan-config-description">{{item.config['image_registry']}}</span>
                                        </div>

                                        <div style="display: flex; width: 100%; margin-top: 16px;">
                                            <span class="card-plan-config-title">پشتیبانی حرفه‌ای</span>
                                            <span class="card-plan-config-description">{{item.config['support']}}</span>
                                        </div>

                                    </div>
                                </div>
                                <div style="width: 100%; display: flex; margin-top: 48px; justify-content: center">
                                    <button style="width: 100%; margin-left: 20%; margin-right: 20%; height: 45px;border-radius: 5px;box-shadow: 0 0 6px 0 rgba(41, 121, 255, 0.4);border: solid 1px #0045ff;background-color: #0045ff;color: #fefefe; font-family: iran-yekan; font-size: 1.4em; outline: none" @click="$router.push(item.action_href)">
                                        {{item.action}}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="calculator-parent-container">
                            <p class="calculator-title">{{calculator_title}}</p>
                            <p class="calculator-description">{{calculator_description}}</p>

                            <div class="container-fluid"
                                 style="width: 100%; padding: 16px; box-sizing: padding-box; max-width: 2100px">
                                <div class="row calculator-container">

                                    <div class="row" style="width: 100%; margin-left: 0; margin-right: 0">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 calculator-slider-container">

                                            <label class="col-lg-4 col-md-4 col-sm-12 col-xs-12"
                                                   style="font-family: iran-yekan;font-size: 19px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.68;letter-spacing: normal;text-align: right;color: #707070; margin-top: -12px; outline: none;">
                                                رم (حافظه تصادفی)
                                                <input style="border-radius: 5px; border: solid 1px #0045ff;height: 48px; width: 90%;padding-left: 16px; padding-right: 16px; outline: none; font-family: iran-sans"
                                                       type="number"
                                                       min="0.5"
                                                       step="0.5"
                                                       max="64"
                                                       value="planData.memory"
                                                       v-model="planData.memory"/>

                                            </label>

                                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12"
                                                 style="margin-top: 20px; padding: 0; height: max-content">
                                                <vue-slider
                                                        v-model="planData.memory"
                                                        v-bind="memoryOptions"/>
                                                <div class="range-title">
                                                    <p>{{memoryRangeMin}}</p>
                                                    <p style="float: left;">{{memoryRangeMax}}</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 calculator-slider-container">

                                            <label class="col-lg-4 col-md-4 col-sm-12 col-xs-12"
                                                   style="font-family: iran-yekan;font-size: 19px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.68;letter-spacing: normal;text-align: right;color: #707070; margin-top: -12px; outline: none;">
                                                Dedicated Volume
                                                <input style="font-family: iran-sans; border-radius: 5px; border: solid 1px #0045ff;height: 48px; width: 90%;padding-left: 16px; padding-right: 16px; outline: none;"
                                                       type="number"
                                                       min="0"
                                                       step="1"
                                                       max="1000"
                                                       value="planData.dedicatedVolume"
                                                       v-model="planData.dedicatedVolume"/>

                                            </label>

                                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12"
                                                 style="margin-top: 20px; padding: 0; height: max-content">
                                                <vue-slider
                                                        v-model="planData.dedicatedVolume"
                                                        v-bind="dedicatedVolumeOptions"/>
                                                <div class="range-title">
                                                    <p>{{volumeRangeMin}}</p>
                                                    <p style="float: left;">{{volumeRangeMax}}</p>
                                                </div>
                                            </div>

                                        </div>


                                    </div>

                                    <div style="height: 0; border: solid 1px #d8d8d8; border-radius: 25px;"></div>

                                    <div class="row"
                                         style="width: 100%; margin-top: 32px; margin-right: 0; margin-left: 0">

                                        <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12"
                                             style="display: flex; padding: 0">
                                            <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"
                                                 style="display: flex; flex-direction: column">
                                                <div style="display: flex; width: 100%">
                                                    <span class="calculator-config-title">رم (حافظه تصادفی)</span>
                                                    <span class="calculator-config-description">{{planData.memory}} گیگابایت</span>
                                                </div>


                                                <div style="display: flex; width: 100%; margin-top: 16px;">
                                                    <span class="calculator-config-title">حافظه ذخیره‌سازی</span>
                                                    <span class="calculator-config-description">۲.۵ گیگابایت</span>
                                                </div>

                                                <div style="display: flex; width: 100%; margin-top: 16px;">
                                                    <span class="calculator-config-title">Load Balancer</span>
                                                    <span class="calculator-config-description">رایگان</span>
                                                </div>

                                                <div style="display: flex; width: 100%; margin-top: 16px;">
                                                    <span class="calculator-config-title">Monitoring</span>
                                                    <span class="calculator-config-description">رایگان</span>
                                                </div>

                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"
                                                 style="display: flex; flex-direction: column">
                                                <div style="display: flex; width: 100%">
                                                    <span class="calculator-config-title">پردازنده</span>
                                                    <span class="calculator-config-description">۰.۵ هسته</span>
                                                </div>

                                                <div style="display: flex; width: 100%; margin-top: 16px;">
                                                    <span class="calculator-config-title">Dedicated Volume</span>
                                                    <span class="calculator-config-description">{{planData.dedicatedVolume}} گیگابات</span>
                                                </div>

                                                <div style="display: flex; width: 100%; margin-top: 16px;">
                                                    <span class="calculator-config-title">Image Registry</span>
                                                    <span class="calculator-config-description">رایگان</span>
                                                </div>

                                                <div style="display: flex; width: 100%; margin-top: 16px;">
                                                    <span class="calculator-config-title">پشتیبانی حرفه‌ای</span>
                                                    <span class="calculator-config-description">رایگان</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 calculator-result-container">
                                            <p>ماهیانه</p>
                                            <p class="calc-result">{{(planData.memory * 60000 + planData.dedicatedVolume
                                                *
                                                1200).toLocaleString()}}</p>
                                            <p>تومان</p>

                                        </div>

                                    </div>

                                    <div style="width: 100%; margin-top: 16px; display: flex; justify-content: center;">
                                        <button style="outline: none;border: none; width: 300px;height: 45px;border-radius: 5px;box-shadow: 0 0 6px 0 rgba(41, 121, 255, 0.4); background-color: #0045ff; color: #fefefe; font-family: iran-yekan; font-size: 1.4em;" @click="$router.push('/user/login')">
                                            سفارش پلن
                                        </button>
                                    </div>

                                </div>
                            </div>


                        </div>

                        <div style="width: 100%; margin-top: 64px">

                            <div class="payg-parent-container container-fluid" style="max-width: 2100px">

                                <div class="row payg-div">

                                    <div class="coming-soon-container">
                                        <p>به زودی...</p>
                                    </div>


                                    <div class="payg-container">

                                        <p class="payg-title">{{pay_as_you_go_title}}</p>

                                        <div class="row"
                                             style="width: 100%; margin-top: 16px; margin-left: 0; margin-right: 0">

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 payg-config-container">

                                                <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"
                                                     style="display: flex; flex-direction: column">

                                                    <div style="display: flex; width: 100%">
                                                        <span class="card-plan-config-title">رم (حافظه تصادفی)</span>
                                                        <span class="card-plan-config-description">نامحدود</span>
                                                    </div>

                                                    <div style="display: flex; width: 100%; margin-top: 16px;">
                                                        <span class="card-plan-config-title">حافظه ذخیره‌سازی</span>
                                                        <span class="card-plan-config-description">سفارشی</span>
                                                    </div>

                                                    <div style="display: flex; width: 100%; margin-top: 16px;">
                                                        <span class="card-plan-config-title">Load Balancer</span>
                                                        <span class="card-plan-config-description">رایگان</span>
                                                    </div>

                                                    <div style="display: flex; width: 100%; margin-top: 16px;">
                                                        <span class="card-plan-config-title">Monitoring</span>
                                                        <span class="card-plan-config-description">رایگان</span>
                                                    </div>

                                                </div>
                                                <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"
                                                     style="display: flex; flex-direction: column">
                                                    <div style="display: flex; width: 100%">
                                                        <span class="card-plan-config-title">پردازنده</span>
                                                        <span class="card-plan-config-description">نامحدود</span>
                                                    </div>

                                                    <div style="display: flex; width: 100%; margin-top: 16px;">
                                                        <span class="card-plan-config-title">Dedicated Volume</span>
                                                        <span class="card-plan-config-description">سفارشی</span>
                                                    </div>

                                                    <div style="display: flex; width: 100%; margin-top: 16px;">
                                                        <span class="card-plan-config-title">Image Registry</span>
                                                        <span class="card-plan-config-description">رایگان</span>
                                                    </div>

                                                    <div style="display: flex; width: 100%; margin-top: 16px;">
                                                        <span class="card-plan-config-title">پشتیبانی حرفه‌ای</span>
                                                        <span class="card-plan-config-description">رایگان</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>


</template>

<script>
    import 'vue-slider-component/theme/default.css';

    export default {
        name: "price",
        data() {
            return {
                title: 'قیمت‌گذاری‌ها',
                resource_description: '\n' +
                    '                سرویس‌ها در فندق با منابع کاملا اختصاصی کار میکنند و معماری آن‌ها به صورتی طراحی شده است تا\n' +
                    '                بهینه‌ترین استفاده از منابع را داشته و بهترین راندمان را داشته باشند.',
                plan_title: 'پلن‌های آماده',
                plan_description: '\n' +
                    '                هر دوره ۳ ماهه، سکوی ابری فندق داده‌های مربوط به مصرف منابع مشتریان را طبقه بندی میکند و بسته به\n' +
                    '                نوع کاربری کسب‌و‌کار آن‌ها را دسته‌بندی می‌کند.در انتها، ما این دسته‌بندی‌ها را در قالب پلن‌های\n' +
                    '                پیشنهادی بر روی سایت قرار میدهیم، تا آن دسته از کاربرانی که میزان منابع مورد نیاز برای پروژه‌\n' +
                    '                خود را به درستی نمی‌توانند محاسبه کنند از این پلن‌های آماده استفاده کنند.',
                calculator_title: 'ماشین حساب',
                calculator_description: 'با استفاده از ماشین حساب، پلن دلخواه خود را بسازید',
                pay_as_you_go_title: 'Pay As You Go',
                plans: [
                    {
                        title: 'پلن رایگان',
                        price: 'رایگان',
                        icon: 'free_plan',
                        config: {
                            memory: '۴۰۰ مگابایت',
                            cpu: '۰.۵ هسته',
                            shared_storage: '۲.۵ گیگابایت',
                            dedicated_storage: 'ندارد',
                            load_balancer: 'رایگان',
                            image_registry: 'نامحدود',
                            monitoring: 'رایگان',
                            support: 'رایگان'

                        },
                        action: 'ثبت‌نام',
                        action_href: '/user/register'
                    },
                    {
                        title: 'پلن پایه',
                        price: 'ماهیانه ۳۰,۰۰۰ تومان',
                        icon: 'basic-plan',
                        config: {
                            memory: '۵۰۰ مگابایت',
                            cpu: '۰.۵ هسته',
                            shared_storage: '۲.۵ گیگابایت',
                            dedicated_storage: 'ندارد',
                            load_balancer: 'رایگان',
                            image_registry: 'نامحدود',
                            monitoring: 'رایگان',
                            support: 'رایگان'

                        },
                        action: 'ثبت‌نام',
                        action_href: '/user/register'
                    },
                    {
                        title: 'پلن اقتصادی',
                        price: 'ماهیانه ۷۲,۰۰۰ هزار تومان',
                        icon: 'base-plan',
                        config: {
                            memory: '۱ گیگابایت',
                            cpu: '۰.۵ هسته',
                            shared_storage: '۲.۵ گیگابایت',
                            dedicated_storage: '۱۰ گیگابایت',
                            load_balancer: 'رایگان',
                            image_registry: 'نامحدود',
                            monitoring: 'رایگان',
                            support: 'رایگان'

                        },
                        action: 'ثبت‌نام',
                        action_href: '/user/register'
                    },
                    {
                        title: 'پلن استارتاپی',
                        price: 'ماهیانه ۱۸۰,۰۰۰ تومان',
                        icon: 'economy-plan',
                        config: {
                            memory: '۲ گیگابایت',
                            cpu: '۱ هسته',
                            shared_storage: '۲.۵ گیگابایت',
                            dedicated_storage: '۵۰ گیگابایت',
                            load_balancer: 'رایگان',
                            image_registry: 'نامحدود',
                            monitoring: 'رایگان',
                            support: 'رایگان'

                        },
                        action: 'ثبت‌نام',
                        action_href: '/user/register'
                    },
                ],
                planData: {
                    memory: .5,
                    cpu: 0.5,
                    dedicatedVolume: 0,
                },
                memoryRangeMin: '0.5GB',
                memoryRangeMax: '64GB',
                volumeRangeMin: '10GB',
                volumeRangeMax: '1T',
                memoryOptions: {
                    dotSize: 32,
                    width: 'auto',
                    height: 24,
                    contained: false,
                    direction: 'rtl',
                    interval: 0.5,
                    min: 0.5,
                    max: 64,
                    disabled: false,
                    clickable: true,
                    tooltip: 'none',
                    useKeyboard: false,
                    enableCross: true,
                    fixed: false,
                    included: true,
                    order: true,
                    process: true,
                    dotStyle: {backgroundColor: '#00ffff', boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.17)'},
                    railStyle: {backgroundColor: 'rgba(0, 69, 255, 0.25)', cursor: 'pointer'},
                    processStyle: {backgroundColor: '#0045ff'},
                    labelStyle: {
                        color: '#2979ff',
                        fontFamily: 'iran-yekan',
                        fontWeight: 'bold',
                        letterSpacing: 'normal'
                    }
                },
                dedicatedVolumeOptions: {
                    dotSize: 32,
                    width: 'auto',
                    height: 24,
                    contained: false,
                    direction: 'rtl',
                    min: 0,
                    max: 1000,
                    interval: 1,
                    disabled: false,
                    clickable: true,
                    duration: 0.5,
                    tooltip: 'none',
                    useKeyboard: false,
                    enableCross: true,
                    fixed: false,
                    included: true,
                    order: true,
                    process: true,
                    dotStyle: {backgroundColor: '#00ffff', boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.17)'},
                    railStyle: {backgroundColor: 'rgba(0, 69, 255, 0.25)', cursor: 'pointer'},
                    processStyle: {backgroundColor: '#0045ff'},
                    labelStyle: {
                        color: '#2979ff',
                        fontFamily: 'iran-yekan',
                        fontWeight: 'bold',
                        letterSpacing: 'normal'
                    }
                }


            }
        }
    }
</script>

<style lang="stylus" scoped>


    .price-parent-container
        width 100%
        margin -3.8px 0 0 0
        height max-content
        position relative

        div.price-header
            width: 100%
            display: flex
            flex-direction: column
            margin: 0
            margin-top -1px
            padding: 0
            height: auto

            div
                width 100%
                z-index 2
                margin-top -10%
                display flex
                @media only screen and (max-width: 920px)
                    margin-top: -16%

                img
                    margin-top -1px

                p
                    width 100%
                    font-family iran-yekan
                    font-size 2.4em
                    font-weight bold
                    font-style normal
                    font-stretch normal
                    line-height 1.71
                    letter-spacing normal
                    text-align center
                    color #fefefe
                    @media only screen and (max-width: 1230px)
                        font-size 2em
                    @media only screen and (max-width: 920px)
                        font-size 1.7em


    .ready-plan-container
        width 100%
        margin-top 100px
        position relative
        max-width 1500px
        @media only screen and (max-width: 992px)
            margin-top 50px
        @media only screen and (min-width: 1850px)
            margin-top 200px

        div
            height 0
            border solid 2px #0045ff
            margin 0 30%
            border-radius 25px
            @media only screen and (max-width: 992px)
                border solid 1px #0045ff

    .resource-description
        padding 0 20%
        font-family iran-yekan
        font-size 1.4em
        font-weight bold
        font-style normal
        font-stretch normal
        line-height 1.73
        letter-spacing normal
        text-align center
        color #3c3c3c
        @media only screen and (max-width: 992px)
            font-size 1.1em
            padding 0 10%

    .ready-plan-title
        margin-top 64px
        font-family iran-yekan
        font-size 2.4em
        font-weight bold
        font-style normal
        font-stretch normal
        line-height 1.73
        letter-spacing normal
        text-align center
        color #0045ff
        @media only screen and (max-width: 992px)
            font-size 1.7em
            margin-top 32px
            margin-bottom 8px

    .ready-plan-description
        padding 0 10%
        margin-top 16px
        font-family iran-yekan
        font-size 1.4em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.73
        letter-spacing normal
        text-align center
        color: #707070
        @media only screen and (max-width: 992px)
            font-size 1.1em

    .bg-test
        background-size 50%
        background url("../../../assets/svg/price_bg.svg") no-repeat right top
        @media only screen and (max-width: 1230px)
            background none

    .card-plan
        border-radius 25px
        box-shadow 0 0 10px 0 rgba(0, 0, 0, 0.16)
        background-color #ffffff
        padding 16px

        div
            width 100%
            display flex

            img
                width 140px
                filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
                @media only screen and (max-width: 992px)
                    width 90px

    .card-plan-title
        font-family iran-yekan
        font-size 2em
        font-weight bold
        font-style normal
        font-stretch normal
        line-height 1.7
        letter-spacing normal
        text-align right
        color #0045ff
        padding-right 16px
        margin-bottom 5px
        margin-top 8px
        @media only screen and (max-width: 992px)
            font-size 1.4em

    .card-plan-price
        font-family iran-yekan
        font-size 1.7em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.73
        letter-spacing normal
        text-align right
        color #535353
        padding-right 16px
        @media only screen and (max-width: 992px)
            font-size 1.1em

    .card-plan-config-title
        font-family iran-yekan
        font-size 1em
        font-weight bold
        font-style normal
        font-stretch normal
        line-height 1.75
        letter-spacing normal
        text-align right
        color #3c3c3c
        @media only screen and (max-width: 992px)
            font-size .85em
        @media only screen and (min-width: 1850px)
            font-size 1.2em

    .card-plan-config-description
        font-family iran-yekan
        font-size 1em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.75
        letter-spacing normal
        text-align left
        color #3c3c3c
        padding-right 16px
        padding-left 16px
        flex 1
        @media only screen and (max-width: 992px)
            font-size .85em
            padding-right 0
            padding-left 0
        @media only screen and (min-width: 1850px)
            font-size 1.2em

    .card-plan-container
        width 100%
        padding 32px
        box-sizing padding-box
        @media only screen and (max-width: 992px)
            padding 0

    .calculator-parent-container
        width 100%
        margin-top 64px
        @media only screen and (max-width: 992px)
            margin-top 32px

    .calculator-title
        font-family iran-yekan
        font-size 2.4em
        font-weight bold
        font-style normal
        font-stretch normal
        line-height 1.73
        letter-spacing normal
        text-align center
        color #0045ff
        @media only screen and (max-width: 992px)
            font-size 1.7em

    .calculator-description
        font-family iran-yekan
        font-size 1.6em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.73
        letter-spacing normal
        text-align center
        color #707070
        padding 0 20%
        @media only screen and (max-width: 992px)
            font-size 1.2em


    .calculator-container
        width 100%
        border-radius 25px
        box-shadow 0 0 10px 0 rgba(0, 0, 0, 0.16)
        background-color #ffffff
        display flex
        flex-direction column
        padding 32px
        box-sizing padding-box
        margin-left 0
        margin-right 0


    .calculator-config-title
        font-family iran-yekan
        font-size 1.2em
        font-weight bold
        font-style normal
        font-stretch normal
        line-height 1.75
        letter-spacing normal
        text-align right
        color #3c3c3c
        margin-top 8px
        @media only screen and (max-width: 992px)
            font-size .9em

    .calculator-config-description
        font-family iran-sans
        font-size 1.3em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.75
        letter-spacing normal
        text-align left
        color #3c3c3c
        margin-top 8px
        padding-right 16px
        padding-left 16px
        flex 1
        @media only screen and (max-width: 992px)
            font-size .9em
            padding-right 0
            padding-left 0

    .calculator-result-container
        display flex
        flex-direction column
        justify-content center
        @media only screen and (max-width: 992px)
            margin-top 16px
            flex-direction unset

        p
            font-family iran-yekan
            font-size 2.5em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.73
            letter-spacing normal
            text-align center
            color #535353
            @media only screen and (max-width: 992px)
                font-size 1.4em


        p.calc-result
            font-family iran-sans
            font-size 3em
            font-weight bold
            font-style normal
            font-stretch normal
            line-height 1.73
            letter-spacing normal
            text-align center
            color #0045ff
            @media only screen and (max-width: 992px)
                font-size 1.8em
                padding-left 24px
                padding-right 24px

    .range-title
        box-sizing content-box
        position relative
        width 100%
        margin-top -8px
        margin-bottom 16px

        p
            color #2979ff
            font-family iran-yekan
            font-size 1em
            font-weight bold
            margin 0
            display inline-block

    .calculator-slider-container
        padding 0
        display flex
        flex-direction row
        height max-content
        @media only screen and (max-width: 1230px)
            flex-direction column

    .payg-parent-container
        width 100%
        padding 16px
        box-sizing padding-box

        div.payg-div
            width 100%
            height max-content
            border-radius 25px 25px 25px 25px
            box-shadow 0 0 10px 0 rgba(0, 0, 0, 0.16)
            background-color #0045ff
            margin-left 0
            margin-right 0
            display flex
            flex 3
            @media only screen and (max-width: 992px)
                flex-direction column


    .coming-soon-container
        flex 1
        height available
        padding 32px
        display flex

        p
            margin-top auto
            margin-bottom auto
            text-align center
            width 100%
            font-family iran-yekan
            font-size 3.5em
            font-weight bold
            @media only screen and (max-width: 992px)
                font-size 2.6em


    .payg-container
        flex 2
        height 100%
        background-color #fefefe
        border-radius 125px 1000px 1000px 125px
        display flex
        flex-direction column
        padding 32px
        box-sizing padding-box
        @media only screen and (max-width: 992px)
            border-radius 0 0 25px 25px

        p.payg-title
            text-align center
            width 100%
            font-family iran-yekan
            font-size 2.5em
            font-weight bold
            color #0045ff

    .payg-config-container
        display flex
        justify-content center
        margin-right 48px
        margin-bottom 32px
        @media only screen and (max-width: 992px)
            margin-right 0
            margin-bottom 16px

</style>

<style lang="css">
    .vue-slider-dot-handle {
        background-image: url("../../../assets/svg/double-arrow.svg");
        background-repeat: no-repeat;
        background-size: 18px;
        background-position: center;
    }
</style>
