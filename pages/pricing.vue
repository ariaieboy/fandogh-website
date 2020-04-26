<template>
    <div style="width: 100%; max-width: 1750px; margin-left: auto; margin-right: auto; background: rgba(225,223,223,0.2);">

        <div class="parallax-container">
            <h1>{{title}}</h1>
            <p class="header-description" v-html="description"></p>
        </div>

        <div class="price-page-navigation">
            <div class="inner-container">
                <div v-for="item in navigation_menu"
                     class="navigation-item-container"
                     @click="moveToSection(item.id)">

                    <img :src="require('../assets/svg/' + item.icon + '.svg')" :alt="item.icon"/>
                    <p>{{item.title}}</p>

                </div>

            </div>

            <div style="background: #d0d0d0; height: 1px"></div>

        </div>

        <price-header id="plan_section" :title="headers.plans.title"
                      :description="headers.plans.description"
                      :links="headers.plans.links">

        </price-header>

        <div style="width: 100%; padding: 0 16px; margin-top: 32px; margin-bottom: 32px" class="row">

            <div style="width: 100%; display: flex; flex-direction: column;"
                 class="col-xs-12 col-sm-5 col-md-3 col-lg-3">

                <div v-for="(plan, index) in plans"
                     @click="selectPlan(index)" style="padding: 0; width: 100%">
                    <div class="plan-card-container">

                        <div class="header" :class="{'selected': selected_plan.index === index}">
                            <div style="display: flex; flex-direction: row">
                                <img :src="require('../assets/svg/plans/' + plan.icon + '.svg')" :alt="plan.icon">
                                <div style="display: flex; flex-direction: column; padding-right: 16px">
                                    <p class="header-title">{{plan.title}}</p>
                                    <p class="header-description">{{plan.price}}</p>
                                </div>
                            </div>

                            <div class="divider" style="margin-top: 8px; margin-bottom: 8px"></div>

                            <div style="display: inline-flex; flex-wrap: wrap">
                                <div v-for="(conf, index) in plan.thumb_config"
                                     class="detail-container">
                                    <span class="detail-title">{{conf.title}}:</span>
                                    <span v-if="index + 1 !== plan.thumb_config.length" class="left detail-amount">| {{conf.detail}}</span>
                                    <span v-else class="left detail-amount">{{conf.detail}}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div class="row col-xs-12 col-sm-7 col-md-9 col-lg-9 plan-spec-container"
                 id="plan-spec">
                <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7" style="margin-top: 16px; margin-bottom: 16px;">

                    <div class="header-spec">

                        <div style="display: flex; flex-direction: row">
                            <img :src="require('../assets/svg/plans/' + selected_plan.icon + '.svg')"
                                 :alt="selected_plan.icon">
                            <div style="display: flex; flex-direction: column; padding-right: 16px">
                                <p class="header-title">{{selected_plan.title}}</p>
                                <p class="header-description">{{selected_plan.price}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="plan-description-container">
                        <p>{{selected_plan.description}}</p>
                    </div>

                    <div class="plan-config-container row">
                        <p style="font-size: 1.3em; font-family: iran-yekan; color: #111;
                                  padding-left: 0; padding-right: 0; font-weight: bold;"
                           class="col-xs-12">مشخصات:</p>
                        <div v-for="(conf, index) in selected_plan.config"
                             class="detail-container col-lg-6 col-md-6 col-sm-12 col-xs-12"
                             style="padding-left: 0; padding-right: 0"
                             :style="{backgroundColor: (isMobile ? (index % 2 === 0 ? '#f5f5f5' : 'transparent') : (index % 4 < 2  ? '#f5f5f5' : 'transparent')),
                             borderBottomLeftRadius: isMobile ? '3px' : (index % 4 === 0  ? '0' : '3px'),
                             borderBottomRightRadius: isMobile ? '3px' : (index % 4 === 0  ? '3px' : '0'),
                             borderTopLeftRadius: isMobile ? '3px' : (index % 4 === 0  ? '0' : '3px'),
                             borderTopRightRadius: isMobile ? '3px' : (index % 4 === 0  ? '3px' : '0')}">
                            <p class="detail-title">{{conf.title}}</p>
                            <p class="detail-amount">{{conf.detail}}</p>
                        </div>
                    </div>

                    <div style="width: 100%; display: flex">
                        <a class="plan-button" :href="selected_plan.button.url" target="_blank" rel="noopener">
                            {{selected_plan.button.text}}
                        </a>
                    </div>

                </div>

                <div class="row col-xs-12 col-sm-12 col-md-5 col-lg-5 plan-spec-inner-container">

                    <p style="font-size: 1.3em; font-family: iran-yekan; color: #111; height: max-content; font-weight: bold;"
                       class="col-xs-12 col-sm-12 col-md-12 col-lg-12">مزایا:</p>

                    <div v-for="spec in selected_plan.specs"
                         class="inner-container col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <p class="description">- {{spec.detail}}</p>
                    </div>

                    <p style="font-size: 1.2em; font-family: iran-yekan; color: #111; height: max-content; margin-top: 16px;
                                font-weight: bold;"
                       class="col-xs-12 col-sm-12 col-md-12 col-lg-12">مناسب برای پروژه‌های:</p>

                    <div v-for="item in selected_plan.suited_for"
                         class="inner-container"
                         style="display: inline-flex; flex-wrap: wrap">

                        <img :src="require('../assets/svg/plans/projects/' + item.icon + '.svg')"
                             :alt="item.icon"
                             v-tooltip="item.title"
                             class="project-icon-container">

                    </div>

                </div>

            </div>

        </div>

        <price-header id="calculator_section" :title="headers.calculator.title"
                      :description="headers.calculator.description"
                      :links="headers.calculator.links">

        </price-header>

        <div style="width: 100%; padding: 32px 16px;" class="row">

            <div class="calculator-parent-container">

                <div class="container-fluid"
                     style="width: 100%; padding: 16px; box-sizing: padding-box; max-width: 2100px; display: flex; flex-direction: column">
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
                                    حافظه ذخیره‌سازی اختصاصی
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

                    </div>

                    <div class="row"
                         style="width: 100%; margin-top: 32px; margin-right: 0; margin-left: 0">

                        <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12"
                             style="display: flex; padding: 0">
                            <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"
                                 style="display: flex; flex-direction: column">
                                <div style="display: flex; width: 100%">
                                    <span class="calculator-config-title">رم (حافظه تصادفی)</span>
                                    <span class="calculator-config-description">{{planData.memory}} GB</span>
                                </div>


                                <div style="display: flex; width: 100%; margin-top: 16px;">
                                    <span class="calculator-config-title">حافظه ذخیره‌سازی اشتراکی</span>
                                    <span class="calculator-config-description">۲.۵ GB</span>
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
                                    <span class="calculator-config-description">{{planData.memory / 2 > 0.5 ? planData.memory / 2 : 0.5}} Core</span>
                                </div>

                                <div style="display: flex; width: 100%; margin-top: 16px;">
                                    <span class="calculator-config-title">حافظه ذخیره‌سازی اختصاصی</span>
                                    <span class="calculator-config-description">{{planData.dedicatedVolume}} GB</span>
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


                </div>


            </div>

        </div>

        <price-header id="payg_section" :title="headers.pay_as_you_go.title"
                      :description="headers.pay_as_you_go.description"
                      :en="true"
                      :alter="headers.pay_as_you_go.alter">

        </price-header>

        <div style="width: 100%;">

            <div class="payg-parent-container" style="max-width: 2100px">

                <div class="row payg-div">

                    <div class="coming-soon-container">
                        <p>به زودی...</p>
                    </div>


                    <div class="payg-container">

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
                                        <span class="card-plan-config-title">حافظه ذخیره‌سازی اختصاصی</span>
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

</template>

<script>

    import PriceHeader from "../components/elements/headers/price-header";
    import 'vue-slider-component/theme/default.css';

    export default {
        name: 'pricing',
        layout: 'default',
        components: {PriceHeader},
        data() {
            return {
                title: 'قیمت محصولات سکوی ابری فندق',
                description: 'قیمت‌گزاری رقابتی و منعطف برای هر نوع پروژه‌ای و با هر مقیاسی، کیفیت بالا در مقابل هزینه کم.<br/> هر نوع پروژه‌ای با هر مقایسی را به سادگی بر روی فندق اجرا کنید.',
                headers: {
                    plans: {
                        id: 'plan_section',
                        title: 'پلن‌های پیشنهادی',
                        description: 'شاید برای شروع، ایده‌ای از اینکه‌ چه\n' +
                            '                    میزان منابع برای پروژه و کسب‌وکار شما نیاز است نداشته باشید و به دنبال یک راهنمایی باشید. سکوی\n' +
                            '                    ابری فندق تجربه استفاده محصولات متفاوت را در قالب یک سری پیشنهاد برای شما تهیه کرده است تا\n' +
                            '                    بتوانید بسته به مقیاس پروژه خود، پلن مورد نیاز خود را انتخاب کنید.',
                        links: [
                            {
                                title: 'در مورد سیاست مدیریت و تخصیص منابع فندق بیشتر بدانید >',
                                href: 'https://docs.fandogh.cloud/docs/resources.html'
                            }
                        ]
                    }, calculator: {
                        id: 'calculator_section',
                        title: 'ماشین حساب',
                        description: 'با ماشین‌ حساب سکوی ابری فندق میزان منابع مورد نیاز خود را انتخاب کنید و از هزینه تمام شده ماهیانه آگاه شوید.<br>' +
                            'همچنین می‌توانید محاسبه کنید که در ازای هر میزان منابع، چه ویژگی‌هایی در اختیار شما قرار داده می‌شود.',
                        links: [
                            {
                                title: 'در مورد سیاست مدیریت و تخصیص منابع فندق بیشتر بدانید >',
                                href: 'https://docs.fandogh.cloud/docs/resources.html'
                            }
                        ]
                    }, pay_as_you_go: {
                        id: 'payg_section',
                        title: 'Pay As You Go',
                        description: 'به میزان مصرف پرداخت کنید و نگران محاسبه داینامیک مصرف منابع سرویس‌های خود نباشید.<br> سکوی ابری فندق به صورت هوشمند منابع مورد نیاز را به سرویس‌های شما تخصیص می‌دهد.',
                        alter: 'به زودی ...'
                    }
                },
                selected_plan: {
                    index: 0,
                    icon: 'free_plan',
                    title: 'پلن رایگان',
                    enabled: true,
                    price: 'رایگان و بدون هزینه',
                    description: 'مناسب برای پروژه‌های دانشجویی و ارائه محصولات MVP و کارهای آزمایشی برای تمام کاربرانی که قصد ندارند برای کار خود هزینه اولیه زیادی پرداخت کنند.',
                    thumb_config: [
                        {
                            title: 'رم',
                            detail: '400 Mi'
                        },
                        {
                            title: 'پردازنده',
                            detail: '0.5 Core'
                        },
                        {
                            title: 'حافظه ذخیره‌سازی اشتراکی',
                            detail: '2.5 GB'
                        },
                    ],
                    config: [
                        {
                            title: 'رم (حافظه تصادفی)',
                            detail: '400 Mi'
                        },
                        {
                            title: 'پردازنده',
                            detail: '0.5 Core'
                        },
                        {
                            title: 'حافظه ذخیره‌سازی اشتراکی',
                            detail: '2.5 GB'
                        },
                        {
                            title: 'تعداد سرویس مجاز',
                            detail: '2'
                        },
                        {
                            title: 'تعداد replica',
                            detail: '1'
                        },
                        {
                            title: 'بیشینه رم مجاز هر سرویس',
                            detail: '320 Mi'
                        }
                    ],
                    specs: [
                        {
                            detail: 'گواهی ssl رایگان'
                        },
                        {
                            detail: 'دامنه دلخواه'
                        },
                        {
                            detail: 'Load Balancer'
                        },
                        {
                            detail: 'Image Registry'
                        },
                        {
                            detail: 'مدیریت تیم و دسترسی‌ها'
                        }
                    ],
                    suited_for: [
                        {
                            title: 'Wordpress: مناسب برای پروژه‌های وردپرسی',
                            icon: 'wordpress'
                        },
                        {
                            title: 'Blog: مناسب‌ برای وبلاگ‌های شرکتی و شخصی',
                            icon: 'blog'
                        },
                        {
                            title: 'Bot: مناسب برای ساخت انواع ربات‌های سبک',
                            icon: 'bot'
                        },
                        {
                            title: 'Website: مناسب برای ساخت انواع وب‌سایت',
                            icon: 'website'
                        },
                        {
                            title: 'MVP: مناسب برای ساخت محصول اولیه',
                            icon: 'mvp'
                        }
                    ],
                    button: {
                        text: 'ثبت‌نام',
                        url: 'https://fandogh.cloud/user/register'
                    }
                },
                plans: [
                    {
                        index: 0,
                        icon: 'free_plan',
                        title: 'پلن رایگان',
                        enabled: true,
                        price: 'رایگان و بدون هزینه',
                        description: 'مناسب برای پروژه‌های دانشجویی و ارائه محصولات MVP و کارهای آزمایشی برای تمام کاربرانی که قصد ندارند برای کار خود هزینه اولیه زیادی پرداخت کنند.',
                        thumb_config: [
                            {
                                title: 'رم',
                                detail: '400 Mi'
                            },
                            {
                                title: 'پردازنده',
                                detail: '0.5 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                        ],
                        config: [
                            {
                                title: 'رم (حافظه تصادفی)',
                                detail: '400 Mi'
                            },
                            {
                                title: 'پردازنده',
                                detail: '0.5 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'تعداد سرویس مجاز',
                                detail: '2'
                            },
                            {
                                title: 'تعداد replica',
                                detail: '1'
                            },
                            {
                                title: 'بیشینه رم مجاز هر سرویس',
                                detail: '320 Mi'
                            }
                        ],
                        specs: [
                            {
                                detail: 'گواهی ssl رایگان'
                            },
                            {
                                detail: 'دامنه دلخواه'
                            },
                            {
                                detail: 'Load Balancer'
                            },
                            {
                                detail: 'Image Registry'
                            },
                            {
                                detail: 'مدیریت تیم و دسترسی‌ها'
                            }
                        ],
                        suited_for: [
                            {
                                title: 'Wordpress: مناسب برای پروژه‌های وردپرسی',
                                icon: 'wordpress'
                            },
                            {
                                title: 'Blog: مناسب‌ برای وبلاگ‌های شرکتی و شخصی',
                                icon: 'blog'
                            },
                            {
                                title: 'Bot: مناسب برای ساخت انواع ربات‌های سبک',
                                icon: 'bot'
                            },
                            {
                                title: 'Website: مناسب برای ساخت انواع وب‌سایت',
                                icon: 'website'
                            },
                            {
                                title: 'MVP: مناسب برای ساخت محصول اولیه',
                                icon: 'mvp'
                            }
                        ],
                        button: {
                            text: 'ثبت‌نام',
                            url: 'https://fandogh.cloud/user/register'
                        }
                    },
                    {
                        index: 1,
                        icon: 'base-plan',
                        title: 'پلن پایه',
                        enabled: true,
                        price: 'ماهیانه ۳۰ هزار تومان',
                        description: 'مناسب پروژه‌های کوچک که نیاز به ضمانت Uptime دارند؛ مانند چت بات‌ها، وب سایت‌های استاتیک و...‌',
                        thumb_config: [
                            {
                                title: 'رم',
                                detail: '512 Mi'
                            },
                            {
                                title: 'پردازنده',
                                detail: '0.5 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                        ],
                        config: [
                            {
                                title: 'رم (حافظه تصادفی)',
                                detail: '512 Mi'
                            },
                            {
                                title: 'پردازنده',
                                detail: '0.5 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'تعداد سرویس مجاز',
                                detail: '2'
                            },
                            {
                                title: 'تعداد replica',
                                detail: '1'
                            },
                            {
                                title: 'بیشینه رم مجاز هر سرویس',
                                detail: '400 Mi'
                            }
                        ],
                        specs: [
                            {
                                detail: 'ضمانت Uptime'
                            },
                            {
                                detail: 'گواهی ssl رایگان'
                            },
                            {
                                detail: 'دامنه دلخواه'
                            },
                            {
                                detail: 'Load Balancer'
                            },
                            {
                                detail: 'Image Registry'
                            },
                            {
                                detail: 'مدیریت تیم و دسترسی‌ها'
                            },
                            {
                                detail: 'ساخت بیش از یک فضانام'
                            }
                        ],
                        button: {
                            text: 'خرید پلن',
                            url: 'https://fandogh.cloud/dashboard/plans'
                        },
                        suited_for: [
                            {
                                title: 'Wordpress: مناسب برای پروژه‌های وردپرسی',
                                icon: 'wordpress'
                            },
                            {
                                title: 'Blog: مناسب‌ برای وبلاگ‌های شرکتی و شخصی',
                                icon: 'blog'
                            },
                            {
                                title: 'Bot: مناسب برای ساخت انواع ربات‌های سبک',
                                icon: 'bot'
                            },
                            {
                                title: 'Website: مناسب برای ساخت انواع وب‌سایت',
                                icon: 'website'
                            },
                            {
                                title: 'MVP: مناسب برای ساخت محصول اولیه',
                                icon: 'mvp'
                            }
                        ],
                    },
                    {
                        index: 2,
                        icon: 'economy-plan',
                        title: 'پلن اقتصادی',
                        enabled: true,
                        price: 'ماهیانه ۷۲ هزار تومان',
                        description: 'مناسب پروژه‌هایی که نیاز به ساخت بیش از ۲ سرویس دارند اما از مقیاس بزرگی برخوردار نیستند.',
                        thumb_config: [
                            {
                                title: 'رم',
                                detail: '1024 Mi'
                            },
                            {
                                title: 'پردازنده',
                                detail: '0.5 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اختصاصی',
                                detail: '10 GB'
                            },
                        ],
                        config: [
                            {
                                title: 'رم (حافظه تصادفی)',
                                detail: '1024 Mi'
                            },
                            {
                                title: 'پردازنده',
                                detail: '0.5 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اختصاصی',
                                detail: '10 GB'
                            },
                            {
                                title: 'تعداد سرویس مجاز',
                                detail: '5'
                            },
                            {
                                title: 'تعداد replica',
                                detail: '5'
                            },
                            {
                                title: 'بیشینه رم مجاز هر سرویس',
                                detail: '819 Mi'
                            }
                        ],
                        specs: [
                            {
                                detail: 'ضمانت Uptime'
                            },
                            {
                                detail: 'گواهی ssl رایگان'
                            },
                            {
                                detail: 'دامنه دلخواه'
                            },
                            {
                                detail: 'Load Balancer'
                            },
                            {
                                detail: 'Image Registry'
                            },
                            {
                                detail: 'مدیریت تیم و دسترسی‌ها'
                            },
                            {
                                detail: 'ساخت بیش از یک فضانام'
                            },
                            {
                                detail: 'ساخت بیش از ۲ سرویس'
                            },
                        ],
                        button: {
                            text: 'خرید پلن',
                            url: 'https://fandogh.cloud/dashboard/plans'
                        },
                        suited_for: [
                            {
                                title: 'Wordpress: مناسب برای پروژه‌های وردپرسی',
                                icon: 'wordpress'
                            },
                            {
                                title: 'Blog: مناسب‌ برای وبلاگ‌های شرکتی و شخصی',
                                icon: 'blog'
                            },
                            {
                                title: 'Bot: مناسب برای ساخت انواع ربات‌های سبک',
                                icon: 'bot'
                            },
                            {
                                title: 'Website: مناسب برای ساخت انواع وب‌سایت',
                                icon: 'website'
                            },
                            {
                                title: 'Online Shop: مناسب برای سایت‌های فروش آنلاین با هر مقیاسی',
                                icon: 'onlineshop'
                            },
                            {
                                title: 'Storage: مناسب برای ایجاد سرویس‌های Storage',
                                icon: 'storage'
                            },
                            {
                                title: 'MVP: مناسب برای ساخت محصول اولیه',
                                icon: 'mvp'
                            },
                        ],
                    },
                    {
                        index: 3,
                        icon: 'startup-plan',
                        title: 'پلن استارتاپی',
                        enabled: true,
                        price: 'ماهیانه ۱۸۰ هزار تومان',
                        description: ' این پلن برای آن دسته از پروژه‌های استارتاپی طراحی شده است که توزیع منابع و مدیریت هزینه برای ایشان از اهمیت بالایی برخوردار است.',
                        thumb_config: [
                            {
                                title: 'رم',
                                detail: '2048 Mi'
                            },
                            {
                                title: 'پردازنده',
                                detail: '1.0 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اختصاصی',
                                detail: '50 GB'
                            },
                        ],
                        config: [
                            {
                                title: 'رم (حافظه تصادفی)',
                                detail: '2048 Mi'
                            },
                            {
                                title: 'پردازنده',
                                detail: '1.0 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اختصاصی',
                                detail: '50 GB'
                            },
                            {
                                title: 'تعداد سرویس مجاز',
                                detail: '10'
                            },
                            {
                                title: 'تعداد replica',
                                detail: '10'
                            },
                            {
                                title: 'بیشینه رم مجاز هر سرویس',
                                detail: '1638 Mi'
                            }
                        ],
                        specs: [
                            {
                                detail: 'ضمانت Uptime'
                            },
                            {
                                detail: 'گواهی ssl رایگان'
                            },
                            {
                                detail: 'دامنه دلخواه'
                            },
                            {
                                detail: 'Load Balancer'
                            },
                            {
                                detail: 'Image Registry'
                            },
                            {
                                detail: 'مدیریت تیم و دسترسی‌ها'
                            },
                            {
                                detail: 'ساخت بیش از یک فضانام'
                            },
                            {
                                detail: 'ساخت بیش از ۲ سرویس'
                            },
                        ],
                        button: {
                            text: 'خرید پلن',
                            url: 'https://fandogh.cloud/dashboard/plans'
                        },
                        suited_for: [
                            {
                                title: 'Wordpress: مناسب برای پروژه‌های وردپرسی',
                                icon: 'wordpress'
                            },
                            {
                                title: 'Blog: مناسب‌ برای وبلاگ‌های شرکتی و شخصی',
                                icon: 'blog'
                            },
                            {
                                title: 'Bot: مناسب برای ساخت انواع ربات‌های سبک',
                                icon: 'bot'
                            },
                            {
                                title: 'AI: مناسب برای پروژه‌های هوش مصنوعی',
                                icon: 'ai'
                            },
                            {
                                title: 'Fintech: مناسب برای پروژه‌های Fintech با مقیاس‌های مختلف',
                                icon: 'fintech'
                            },
                            {
                                title: 'Website: مناسب برای ساخت انواع وب‌سایت',
                                icon: 'website'
                            },
                            {
                                title: 'Online Shop: مناسب برای سایت‌های فروش آنلاین با هر مقیاسی',
                                icon: 'onlineshop'
                            },
                            {
                                title: 'Storage: مناسب برای ایجاد سرویس‌های Storage',
                                icon: 'storage'
                            },
                            {
                                title: 'MVP: مناسب برای ساخت محصول اولیه',
                                icon: 'mvp'
                            },
                            {
                                title: 'Deep Learning: مناسب برای ساخت سرویس‌های Deep Learning که نیاز به منابع بالایی دارند',
                                icon: 'deeplearning'
                            }
                        ],
                    },
                    {
                        index: 4,
                        icon: 'mid-scale-plan',
                        title: 'پلن مقیاس متوسط',
                        enabled: true,
                        price: 'ماهیانه ۵۴۰ هزار تومان',
                        description: 'مناسب برای پروژه‌هایی با مقیاس متوسط به بالا که نیاز به منابع پردازشی و ذخیره‌سازی بالا دارند.',
                        thumb_config: [
                            {
                                title: 'رم',
                                detail: '5120 Mi'
                            },
                            {
                                title: 'پردازنده',
                                detail: '2.5 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اختصاصی',
                                detail: '200 GB'
                            },
                        ],
                        config: [
                            {
                                title: 'رم (حافظه تصادفی)',
                                detail: '5120 Mi'
                            },
                            {
                                title: 'پردازنده',
                                detail: '2.5 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اختصاصی',
                                detail: '200 GB'
                            },
                            {
                                title: 'تعداد سرویس مجاز',
                                detail: '50'
                            },
                            {
                                title: 'تعداد replica',
                                detail: '50'
                            },
                            {
                                title: 'بیشینه رم مجاز هر سرویس',
                                detail: '4096 Mi'
                            }
                        ],
                        specs: [
                            {
                                detail: 'ضمانت Uptime'
                            },
                            {
                                detail: 'گواهی ssl رایگان'
                            },
                            {
                                detail: 'دامنه دلخواه'
                            },
                            {
                                detail: 'Load Balancer'
                            },
                            {
                                detail: 'Image Registry'
                            },
                            {
                                detail: 'مدیریت تیم و دسترسی‌ها'
                            },
                            {
                                detail: 'ساخت بیش از یک فضانام'
                            },
                            {
                                detail: 'ساخت بیش از ۲ سرویس'
                            },
                            {
                                detail: 'پشیتبانی حرفه‌ای'
                            },
                        ], button: {
                            text: 'خرید پلن',
                            url: 'https://fandogh.cloud/dashboard/plans'
                        },
                        suited_for: [
                            {
                                title: 'Wordpress: مناسب برای پروژه‌های وردپرسی',
                                icon: 'wordpress'
                            },
                            {
                                title: 'Blog: مناسب‌ برای وبلاگ‌های شرکتی و شخصی',
                                icon: 'blog'
                            },
                            {
                                title: 'Bot: مناسب برای ساخت انواع ربات‌های سبک',
                                icon: 'bot'
                            },
                            {
                                title: 'AI: مناسب برای پروژه‌های هوش مصنوعی',
                                icon: 'ai'
                            },
                            {
                                title: 'Fintech: مناسب برای پروژه‌های Fintech با مقیاس‌های مختلف',
                                icon: 'fintech'
                            },
                            {
                                title: 'SaaS: مناسب برای پروژه‌های SaaS یا Software as a Service',
                                icon: 'saas'
                            },
                            {
                                title: 'Website: مناسب برای ساخت انواع وب‌سایت',
                                icon: 'website'
                            },
                            {
                                title: 'Online Shop: مناسب برای سایت‌های فروش آنلاین با هر مقیاسی',
                                icon: 'onlineshop'
                            },
                            {
                                title: 'Storage: مناسب برای ایجاد سرویس‌های Storage',
                                icon: 'storage'
                            },
                            {
                                title: 'MVP: مناسب برای ساخت محصول اولیه',
                                icon: 'mvp'
                            },
                            {
                                title: 'Deep Learning: مناسب برای ساخت سرویس‌های Deep Learning که نیاز به منابع بالایی دارند',
                                icon: 'deeplearning'
                            }
                        ],
                    },
                    {
                        index: 5,
                        icon: 'big-scale-plan',
                        title: 'پلن مقیاس بزرگ',
                        enabled: true,
                        price: 'ماهیانه ۲ میلیون تومان',
                        description: 'مناسب برای پروژه‌هایی با مقیاس بزرگ که نیاز به منابع پردازشی و ذخیره‌سازی بالا داشته و از سطح کیفی و کمی بالایی در میکروسیرویس‌های خود برخوردار هستند.',
                        thumb_config: [
                            {
                                title: 'رم',
                                detail: '24 GB'
                            },
                            {
                                title: 'پردازنده',
                                detail: '12 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اختصاصی',
                                detail: '465 GB'
                            },
                        ],
                        config: [
                            {
                                title: 'رم (حافظه تصادفی)',
                                detail: '24 GB'
                            },
                            {
                                title: 'پردازنده',
                                detail: '12 Core'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اختصاصی',
                                detail: '465 GB'
                            },
                            {
                                title: 'تعداد سرویس مجاز',
                                detail: '120'
                            },
                            {
                                title: 'تعداد replica',
                                detail: '120'
                            },
                            {
                                title: 'بیشینه رم مجاز هر سرویس',
                                detail: '19.5 GB'
                            }
                        ],
                        specs: [
                            {
                                detail: 'ضمانت Uptime'
                            },
                            {
                                detail: 'گواهی ssl رایگان'
                            },
                            {
                                detail: 'دامنه دلخواه'
                            },
                            {
                                detail: 'Load Balancer'
                            },
                            {
                                detail: 'Image Registry'
                            },
                            {
                                detail: 'مدیریت تیم و دسترسی‌ها'
                            },
                            {
                                detail: 'ساخت بیش از یک فضانام'
                            },
                            {
                                detail: 'ساخت بیش از ۲ سرویس'
                            },
                            {
                                detail: 'پشیتبانی حرفه‌ای'
                            },
                            {
                                detail: 'مهندسی مهاجرت به زیرساخت سکو ابری فندق'
                            }
                        ], button: {
                            text: 'خرید پلن',
                            url: 'https://fandogh.cloud/dashboard/plans'
                        },
                        suited_for: [
                            {
                                title: 'Wordpress: مناسب برای پروژه‌های وردپرسی',
                                icon: 'wordpress'
                            },
                            {
                                title: 'Blog: مناسب‌ برای وبلاگ‌های شرکتی و شخصی',
                                icon: 'blog'
                            },
                            {
                                title: 'Bot: مناسب برای ساخت انواع ربات‌های سبک',
                                icon: 'bot'
                            },
                            {
                                title: 'AI: مناسب برای پروژه‌های هوش مصنوعی',
                                icon: 'ai'
                            },
                            {
                                title: 'Fintech: مناسب برای پروژه‌های Fintech با مقیاس‌های مختلف',
                                icon: 'fintech'
                            },
                            {
                                title: 'SaaS: مناسب برای پروژه‌های SaaS یا Software as a Service',
                                icon: 'saas'
                            },
                            {
                                title: 'Website: مناسب برای ساخت انواع وب‌سایت',
                                icon: 'website'
                            },
                            {
                                title: 'Online Shop: مناسب برای سایت‌های فروش آنلاین با هر مقیاسی',
                                icon: 'onlineshop'
                            },
                            {
                                title: 'Storage: مناسب برای ایجاد سرویس‌های Storage',
                                icon: 'storage'
                            },
                            {
                                title: 'MVP: مناسب برای ساخت محصول اولیه',
                                icon: 'mvp'
                            },
                            {
                                title: 'Deep Learning: مناسب برای ساخت سرویس‌های Deep Learning که نیاز به منابع بالایی دارند',
                                icon: 'deeplearning'
                            }
                        ],
                    },
                    {
                        index: 6,
                        icon: 'enterprise-plan',
                        title: 'پلن شرکتی',
                        enabled: true,
                        price: 'با ما تماس بگیرید',
                        description: 'اگر نیاز به پلن‌های مخصوص مانند سکوی ابری اختصاصی دارید می‌توانید با ما تماس بگیرید.',
                        thumb_config: [
                            {
                                title: 'رم',
                                detail: 'سفارشی'
                            },
                            {
                                title: 'پردازنده',
                                detail: 'سفارشی'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: 'سفارشی'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اختصاصی',
                                detail: 'سفارشی'
                            },
                        ],
                        config: [
                            {
                                title: 'رم (حافظه تصادفی)',
                                detail: 'سفارشی'
                            },
                            {
                                title: 'پردازنده',
                                detail: 'سفارشی'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: 'سفارشی'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اختصاصی',
                                detail: 'سفارشی'
                            },
                            {
                                title: 'تعداد سرویس مجاز',
                                detail: 'نامحدود'
                            },
                            {
                                title: 'تعداد replica',
                                detail: 'سفارشی'
                            },
                            {
                                title: 'بیشینه رم مجاز هر سرویس',
                                detail: 'سفارشی'
                            }
                        ],
                        specs: [
                            {
                                detail: 'ضمانت Uptime'
                            },
                            {
                                detail: 'گواهی ssl رایگان'
                            },
                            {
                                detail: 'دامنه دلخواه'
                            },
                            {
                                detail: 'Load Balancer'
                            },
                            {
                                detail: 'Image Registry'
                            },
                            {
                                detail: 'مدیریت تیم و دسترسی‌ها'
                            },
                            {
                                detail: 'ساخت بیش از یک فضانام'
                            },
                            {
                                detail: 'ساخت بیش از ۲ سرویس'
                            },
                            {
                                detail: 'پشتیبانی حرفه‌ای'
                            },
                            {
                                detail: 'مشاوره معماری زیرساخت و پیاده‌سازی'
                            },
                            {
                                detail: 'مهندسی مهاجرت به زیرساخت سکو ابری فندق'
                            },
                            {
                                detail: 'سکوی ابری اختصاصی'
                            },
                        ],
                        button: {
                            text: 'تماس با ما',
                            url: 'mailto:support@fandogh.cloud'
                        },
                        suited_for: [
                            {
                                title: 'Wordpress: مناسب برای پروژه‌های وردپرسی',
                                icon: 'wordpress'
                            },
                            {
                                title: 'Blog: مناسب‌ برای وبلاگ‌های شرکتی و شخصی',
                                icon: 'blog'
                            },
                            {
                                title: 'Bot: مناسب برای ساخت انواع ربات‌های سبک',
                                icon: 'bot'
                            },
                            {
                                title: 'AI: مناسب برای پروژه‌های هوش مصنوعی',
                                icon: 'ai'
                            },
                            {
                                title: 'Fintech: مناسب برای پروژه‌های Fintech با مقیاس‌های مختلف',
                                icon: 'fintech'
                            },
                            {
                                title: 'SaaS: مناسب برای پروژه‌های SaaS یا Software as a Service',
                                icon: 'saas'
                            },
                            {
                                title: 'Enterprise: مناسب برای پروژ‌های شرکتی و مقیاس بزرگ',
                                icon: 'enterprise'
                            },
                            {
                                title: 'Website: مناسب برای ساخت انواع وب‌سایت',
                                icon: 'website'
                            },
                            {
                                title: 'Online Shop: مناسب برای سایت‌های فروش آنلاین با هر مقیاسی',
                                icon: 'onlineshop'
                            },
                            {
                                title: 'Storage: مناسب برای ایجاد سرویس‌های Storage',
                                icon: 'storage'
                            },
                            {
                                title: 'MVP: مناسب برای ساخت محصول اولیه',
                                icon: 'mvp'
                            },
                            {
                                title: 'Deep Learning: مناسب برای ساخت سرویس‌های Deep Learning که نیاز به منابع بالایی دارند',
                                icon: 'deeplearning'
                            }
                        ],
                    },
                ],
                navigation_menu: [
                    {
                        id: 'plan_section',
                        title: 'پلن‌ها',
                        icon: 'ic-plans'
                    },
                    {
                        id: 'calculator_section',
                        title: 'ماشین‌ حساب',
                        icon: 'ic-calculator'
                    },
                    {
                        id: 'payg_section',
                        title: 'Pay As You Go',
                        icon: 'ic-credit-card'
                    },
                ],
                planData: {
                    memory: .5,
                    cpu: 0.5,
                    dedicatedVolume: 0,
                },
                memoryRangeMin: '0.5GB',
                memoryRangeMax: '128GB',
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
                    max: 128,
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
        },
        head() {
            return {
                title: this.title,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'قیمت‌گزاری رقابتی و منعطف برای هر نوع پروژه‌ای و با هر مقیاسی، کیفیت بالا در مقابل هزینه کم. از پروژه‌های کوچک یا پروژه‌های شرکتی را با حداقل هزینه و حداکثر کیفیت تهیه کنید.'
                    },
                    {
                        hid: 'keywords',
                        name: 'keywords',
                        content: 'قیمت,پروژه,سکو,سکوی ابری,سکوی ابری فندق,تکنولوژی,docker,پشتیبانی'
                    }
                ]

            }
        },
        methods: {
            selectPlan(index) {

                this.selected_plan = this.plans[index];
                document.getElementById('plan-spec').scrollIntoView({block: 'nearest', behavior: 'smooth'});

            },
            moveToSection(id) {
                document.getElementById(id).scrollIntoView({block: 'nearest', behavior: 'smooth'});
            },
            handelEventSize() {
                var vm = this;
                window.addEventListener("resize", function (e) {
                    vm.setSize(e);
                });
                if (process.browser) {
                    this.setDefaultSize();
                }
            },
            setSize(e) {
                this.$store.dispatch("SET_SIZE", {
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            },
            setDefaultSize(e) {
                this.$store.dispatch("SET_SIZE", {
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.windowWidth <= 991;
            },
        },
        mounted() {
            this.handelEventSize();
        },
    }
</script>

<style lang="stylus" scoped>

    @import "../assets/css/variables.styl"

    .row
        margin-right 0
        margin-left 0

    .parallax-container
        width: 100%;
        height: 375px;
        background-image: linear-gradient(to bottom, #0045ff, #0135c0 74%, #0230aa);
        @media only screen and (max-width 1230px)
            height 270px

        div.lang-detail-parent-container
            background-size 60%
            width 100%
            height 100%
            @media only screen and (max-width 1230px)
                background-size 100%


    h1
        font-family: 'yekan'
        font-size: 3em
        font-weight: bold
        font-style: normal
        font-stretch: normal
        line-height: 1.24
        padding-top 128px
        letter-spacing: normal
        text-align: center
        color: #fefefe
        @media only screen and (max-width 1200px)
            font-size 2em
            padding-top 64px

    h2
        font-family: 'yekan'
        font-size: 2em
        font-weight: normal
        font-style: normal
        font-stretch: normal
        line-height: 1.24
        letter-spacing: normal
        text-align: right
        color: #535353


    p.header-description
        font-family 'yekan'
        font-size 1.5em
        color: #fefefe
        text-align center
        @media only screen and (max-width 1200px)
            font-size 1.1em


    .plan-card-container
        background #fefefe
        border-radius 3px
        box-shadow 0 3px 3px rgba(0, 0, 0, 0.07)
        display flex
        flex-direction column
        padding 0
        cursor pointer
        margin-bottom 8px
        transition all .3s ease-in-out

        .header
            width 100%
            background #fefefe
            display flex
            flex-direction column
            padding 16px
            border-radius 3px
            transition all .3s ease-in-out

            img
                filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
                width 54px
                height 54px
                margin auto 0

            p.header-title
                color #001069
                text-align right
                font-size 1.2em
                font-family iran-yekan
                font-weight bold
                margin-bottom 0

            p.header-description
                color #535353
                text-align right
                font-size 1.2em
                font-family iran-yekan
                font-weight normal
                margin-bottom 0

            span.detail-title
                color #343434
                width max-content
                font-size .9em
                margin-bottom 4px
                font-family iran-yekan
                line-height 1.75
                padding-right 4px

            span.detail-amount
                color #7a7a7a
                line-height 1.75
                width max-content
                direction ltr
                margin-bottom 4px
                font-family iran-sans
                font-size .9em
                padding-right 4px

            .divider
                height 1px
                background #535353

            &.selected
                background #0045ff
                box-shadow 0 3px 3px rgba(0, 0, 0, 0.07)
                transition all .3s ease-in-out

                img
                    filter none
                    width 54px
                    height 54px
                    margin auto 0

                p.header-title
                    color #fefefe
                    text-align right
                    font-size 1.2em
                    font-family iran-yekan
                    font-weight bold
                    margin-bottom 0

                p.header-description
                    color #e4e4e4
                    text-align right
                    font-size 1.2em
                    font-family iran-yekan
                    font-weight normal
                    margin-bottom 0

                span.detail-title
                    color #fefefe
                    width max-content
                    font-size .9em
                    direction ltr
                    font-family iran-yekan
                    margin-bottom 4px
                    line-height 1.75
                    padding-right 4px

                span.detail-amount
                    color #ebebeb
                    width max-content
                    line-height 1.75
                    font-family iran-sans
                    font-size .9em
                    direction ltr
                    margin-bottom 4px
                    padding-right 4px

                .divider
                    height 1px
                    background #e7ebf5


    .price-page-navigation
        position sticky
        top 64px
        width 100%
        height 48px
        background #EBEFFF
        display flex
        flex-direction column
        z-index 10000
        @media only screen and (max-width 1230px)
            top 0

        .inner-container
            width 100%
            height 100%
            display flex
            flex-direction row
            padding-left 16px
            padding-right 16px

            .navigation-item-container
                display flex
                flex-direction row
                padding-left 16px
                cursor pointer

                img
                    width 24px
                    height 24px
                    margin-top auto
                    margin-bottom auto
                    filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
                    transition all .3s ease-in-out
                    @media only screen and (max-width 1230px)
                        width 18px
                        height 18px

                p
                    margin-right 12px
                    color rgba(0, 69, 255, 0.9)
                    font-size 1.1em
                    margin-top auto
                    cursor pointer
                    margin-bottom auto
                    transition all .3s ease-in-out
                    @media only screen and (max-width 1230px)
                        font-size 1em

            .navigation-item-container:hover

                p
                    color rgba(0, 69, 255, 1)
                    filter drop-shadow(0 3px 6px rgba(0, 0, 0, .4))

                img
                    filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%) drop-shadow(0 3px 6px rgba(0, 0, 0, .4))


    .calculator-parent-container
        width 100%


    .calculator-container
        width 100%
        border-radius 5px
        box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.17)
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
        direction ltr
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
            font-size 3em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.73
            letter-spacing normal
            text-align center
            color #535353
            margin-bottom 0
            @media only screen and (max-width: 992px)
                font-size 1.4em


        p.calc-result
            font-family iran-sans
            font-size 3.2em
            font-weight bold
            font-style normal
            font-stretch normal
            line-height 1.73
            letter-spacing normal
            text-align center
            color #0045ff
            margin-bottom 0
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
        box-sizing padding-box
        margin-bottom 64px
        box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)

        div.payg-div
            width 100%
            height max-content
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
        border-radius 0 1000px 1000px 0
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

    .plan-config-container
        margin-top 16px

        .detail-container
            display flex
            flex-direction row
            height max-content
            padding-top 6px
            padding-bottom 6px
            border-radius 3px

            .detail-title
                color #333
                flex .7
                font-size 1em
                font-weight bold
                padding-right 10px
                font-family iran-yekan
                margin-bottom auto
                margin-top auto

            .detail-amount
                color #000
                padding-left 10px
                flex .3
                text-align left
                font-family iran-sans
                direction ltr
                font-size 1em
                margin-bottom auto
                margin-top auto


    .plan-description-container
        width 100%
        background rgba(168, 171, 255, 0.43)
        display flex
        flex-direction column
        padding 16px
        border-radius 3px

        p
            color #535353
            text-align right
            font-size 1em
            font-family iran-yekan
            font-weight normal
            margin-bottom 0


    .plan-spec-container
        border-radius 3px
        box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)
        background #fefefe
        width 100%
        position sticky
        top 128px
        height max-content
        padding-left 0
        padding-right 0
        min-height 300px
        margin-bottom 7px
        @media only screen and (max-width 1230px)
            top 58px

        .plan-spec-inner-container
            margin-top 16px
            margin-bottom 16px
            border-right 1px dashed rgba(0, 0, 0, 0.17)
            border-radius 3px
            display flex
            padding-left 0
            padding-right 0
            align-content start
            @media only screen and (max-width 992px)
                border-right none

            .inner-container
                display flex
                margin-bottom auto
                flex-direction row
                height max-content

                p.description
                    color #191919
                    flex 1
                    height max-content
                    text-align right
                    font-size 1em
                    margin-bottom 12px


    .plan-button
        background #00E5FF
        width 200px
        border-radius 5px
        color $fontBlack
        height 38px
        outline none
        box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)
        font-family iran-yekan
        margin-right auto
        margin-left auto
        text-align center
        line-height 38px
        font-size 1em
        margin-top 64px
        transition all .3s ease-in-out
        @media only screen and (max-width 992px)
            margin-top 16px
            margin-right unset
            margin-left unset
            width 100%

    .plan-button:hover
        box-shadow 0 3px 6px rgba(0, 0, 0, 0.27)


    .header-spec
        width 100%
        background #fefefe
        display flex
        flex-direction column
        margin-bottom 16px
        border-radius 3px
        transition all .3s ease-in-out

        img
            filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
            width 92px
            height 92px
            margin auto 0

        p.header-title
            color #001069
            text-align right
            font-size 1.7em
            font-family iran-yekan
            font-weight bold
            margin-bottom 0

        p.header-description
            color #535353
            text-align right
            font-size 1.6em
            font-family iran-yekan
            font-weight normal
            margin-bottom 0

        .divider
            height 1px
            background #535353


    .project-icon-container
        width 24px
        height 24px
        margin 8px 16px 8px 0
        cursor help
        box-shadow none
        background transparent
        filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
        transition all .3s ease-in-out


    .project-icon-container:hover
        filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.23))
        -webkit-filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.23))


</style>

<style lang="css">
    .vue-slider-dot-handle {
        background-image: url("../assets/svg/double-arrow.svg");
        background-repeat: no-repeat;
        background-size: 18px;
        background-position: center;
    }
</style>
