<template>
    <div style="width: 100%; background: #F4F6FF">

        <div class="parallax-container">
            <div class="lang-detail-parent-container"
                 :style="{backgroundImage: 'url(' + require('../../assets/svg/' + language_model[language_id].banner)  + ')', backgroundPosition: 'top', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}">
            </div>
        </div>
        <div class="lang-logo-container">
            <h1>{{ '< ' + language_model[language_id].title_en + ' >' }}</h1>
            <div>
                <div>
                    <img :src="require('../../assets/svg/services/language/' + language_model[language_id].logo + '.svg')"
                         :alt="language_id"/>
                </div>

            </div>
        </div>

        <h2 class="lang-detail-desc-title">{{language_model[language_id].slogan}}</h2>

        <div class="row features-box">
            <div v-for="item in language_feature_model[language_id]"
                 class="feature-card col-lg-5 col-md-5 col-sm-12 col-xs-12 container-fluid">
                <span>
                    <img :src="require('./icons/' + item.icon)" :alt="item.icon">
                </span>
                <div>
                    <h3 class="feature-card-title">{{item.title}}</h3>
                    <p class="feature-card-description">{{item.description}}</p>
                </div>
            </div>
        </div>


        <!--<div style="width: 100%; display: flex; background: #0045ff; padding: 16px">-->
            <!--<div class="row lang-detail-media-container">-->

                <!--<div class="col-lg-3 col-md-3 col-xs-12 col-md-12 lang-menu-container">-->

                    <!--<p class="menu-title">آموزش مرحله به مرحله</p>-->

                    <!--<div v-for="(menu, index) in language_tutorials_model[language_id]"-->
                         <!--:key="menu.title"-->
                         <!--class="lang-menu-item"-->
                         <!--:class="[menu.selected ? 'selected' : '']"-->
                         <!--@click="menuItemSelected(index)">-->
                        <!--<p class="menu-item-number">{{index + 1}}</p>-->
                        <!--<p class="menu-item-title">{{menu.title}}</p>-->
                    <!--</div>-->

                    <!--<button @click="$router.push('/user/register')" class="menu-button">ثبت‌نام</button>-->
                <!--</div>-->

                <!--<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">-->

                    <!--<vue-plyr class="tut_player" :key="menu_item.video"-->
                              <!--:options="{controls: ['play-large', 'play', 'progress', 'mute', 'volume' ,'current-time','fullscreen', 'download']}">-->
                        <!--<video style="width: 100%">-->
                            <!--<source style="width: 100%" :src="require('../../assets/media/' + menu_item.video + '.mp4')"-->
                                    <!--type="video/mp4"/>-->
                        <!--</video>-->
                    <!--</vue-plyr>-->

                <!--</div>-->

            <!--</div>-->

        <!--</div>-->

        <!--<div class="lang-detail-desc-container row">-->
        <!--<p>چرا پروژه جاوایی خود را روی سکوی ابری فندق مستقر کنید</p>-->
        <!--<div v-for="item in java_lang_features"-->
        <!--class="col-lg-5 col-md-5 col-sm-12 col-xs-12 lang-detail-spec-card container-fluid">-->
        <!--<img :src="require('../../assets/svg/' + item.icon + '.svg' )" :alt="item.icon">-->
        <!--<div>-->
        <!--<p class="lang-detail-spec-card-title">{{item.title}}</p>-->
        <!--<p class="lang-detail-spec-card-description">{{item.description}}</p>-->
        <!--</div>-->
        <!--</div>-->

        <!--</div>-->

        <div class="framework-container row" v-if="frameworks_model[language_id].length > 0">
            <h2 class="framework-title">فریم‌ورک‌های پشتیبانی شده</h2>

            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 feature-sec-menu">
                <div @click="frameworkItemSelected(index)" v-for="(item, index) in frameworks_model[language_id]"
                     :style=""
                     :class="[item.selected ? 'feature-selected' : 'feature-unselected']">{{item.title}}
                </div>
            </div>

            <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 feature-sec-card">

                <img :src="require('../../assets/svg/frameworks/' + framework.image + '.svg')"
                     :alt="framework.image"
                     class="col-2"/>
                <div class="col-10 card-container">
                    <h3 class="card-title">{{framework.title}}</h3>
                    <p class="card-description" v-html="framework.description"></p>
                </div>

            </div>

        </div>


    </div>

</template>

<script>
    export default {
        name: "_id",
        layout: 'default',
        data() {
            return {
                language_id: this.$route.params.id,
                language_model: {

                    python: {
                        title_en: 'Python',
                        title_fa: 'پایتون',
                        slogan: 'دنیای بی‌کران پایتون بر روی سکوی ابری فندق',
                        logo: 'python_lang',
                        banner: 'python_bg.svg',
                        meta: [
                            {
                                hid: 'keywords',
                                name: 'keywords',
                                content: 'فریم‌ورک,زبان‌ها,توسعه‌دهندگان,معماری,معماری ابری,سکو,سکوی ابری,سکوی ابری فندق,تکنولوژی,docker,پشتیبانی,پایتون,Python,Django,Django Project,متن باز,برنامه‌نویسی,Rapid Development,هاست پایتون'
                            }
                        ]
                    },
                    java: {
                        title_en: 'Java',
                        title_fa: 'جاوا',
                        slogan: 'دنیای بی‌کران جاوا بر روی سکوی ابری فندق',
                        logo: 'java_lang',
                        banner: 'java_bg.svg',
                        meta: [
                            {
                                hid: 'keywords',
                                name: 'keywords',
                                content: 'فریم‌ورک,زبان‌ها,توسعه‌دهندگان,معماری,معماری ابری,سکو,سکوی ابری,سکوی ابری فندق,تکنولوژی,docker,پشتیبانی,Java,جاوا,Spring Boot,کد نویسی,هاست جاوا'
                            }
                        ]
                    },
                    php: {
                        title_en: 'PHP',
                        title_fa: 'پی‌اچ‌پی',
                        slogan: 'دنیای بی‌کران پی‌اچ‌پی بر روی سکوی ابری فندق',
                        logo: 'php_lang',
                        banner: 'php_bg.svg',
                        meta: [
                            {
                                hid: 'keywords',
                                name: 'keywords',
                                content: 'فریم‌ورک,زبان‌ها,توسعه‌دهندگان,معماری,معماری ابری,سکو,سکوی ابری,سکوی ابری فندق,تکنولوژی,docker,پشتیبانی,PHP,پی‌اچ‌پی,Laravel,رایگان,هاست php,MVC,Symfony,dependencyها,'
                            }
                        ]
                    },
                    java_script: {
                        title_en: 'Java Script',
                        title_fa: 'جاوا اسکریپت',
                        slogan: 'دنیای بی‌کران جاوا اسکریپت بر روی سکوی ابری فندق',
                        logo: 'nodejs_lang',
                        banner: 'java_script_bg.svg',
                        meta: [
                            {
                                hid: 'keywords',
                                name: 'keywords',
                                content: 'فریم‌ورک,زبان‌ها,توسعه‌دهندگان,معماری,معماری ابری,سکو,سکوی ابری,سکوی ابری فندق,تکنولوژی,docker,پشتیبانی,Java Script,هاست جاوا اسکریپت,هاست node,'
                            }
                        ]
                    },
                    c_sharp: {
                        title_en: 'C#',
                        title_fa: 'سی شارپ',
                        slogan: 'دنیای بی‌کران سی شارپ بر روی سکوی ابری فندق',
                        logo: 'c_sharp_lang',
                        banner: 'c_sharp_bg.svg',
                        meta: [
                            {
                                hid: 'keywords',
                                name: 'keywords',
                                content: 'فریم‌ورک,زبان‌ها,توسعه‌دهندگان,معماری,معماری ابری,سکو,سکوی ابری,سکوی ابری فندق,تکنولوژی,docker,پشتیبانی,C#,سی شارپ,Asp.Net Core,Asp.Net,Net Core,Cross Platform,هاست net core,'
                            }
                        ]
                    }

                },
                language_feature_model: {
                    java: [
                        {
                            title: 'پشتیبانی کامل از زبان‌ها',
                            description: 'تمام تلاشمان را میکنیم تا با کمک توسعه‌دهندگان و استفاده از تجربیات دیگران زبان‌های معروف و پر کاربرد را پیوسته منطبق با معماری ابری ارائه کنیم تا شما تمام تمرکز خود را همیشه بر روی توسعه محصولات خود معطوف کنید.',
                            icon: 'code.png'
                        },
                        {
                            title: 'آزادی انتخاب فریم‌ورک',
                            description: 'محدودیت در سکوی ابری فندق به وسعت آسمان و تنوع فریم‌ورک‌ها به تعداد ابرهای این آسمان‌ است تا شما بتوانید تکنولوژی دلخواه خود را به راحتی هرچه تمام‌تر بر روی این سکو مستقر کنید.',
                            icon: 'framework.svg'
                        },
                        {
                            title: 'اجرای مستقیم کد‌ها',
                            description: 'کدهای خود را به هر زبانی که هستند به راحتی و به صورت مستقیم ظرف چند دقیقه بر روی سکوی ابری فندق مستقر کنید بی‌آنکه نیاز باشد دانشی در مورد docker داشته باشید.',
                            icon: 'source_deploy.svg'
                        },
                        {
                            title: 'منطبق با معماری ابری',
                            description: 'سرویس‌های شما بر روی سکوی ابری فندق به صورت خودکار روی سرورهای متعدد قابل اجرا خواهند بود و مایکروسرویس‌های شما می‌توانند با امکانات service discovery فندق سرویس مورد نظر را پیدا کرده و با هم تعامل داشته باشند.',
                            icon: 'cloud_architecture.svg'
                        },
                    ],
                    python: [
                        {
                            title: 'پشتیبانی کامل از زبان‌ها',
                            description: 'تمام تلاشمان را میکنیم تا با کمک توسعه‌دهندگان و استفاده از تجربیات دیگران زبان‌های معروف و پر کاربرد را پیوسته منطبق با معماری ابری ارائه کنیم تا شما تمام تمرکز خود را همیشه بر روی توسعه محصولات خود معطوف کنید.',
                            icon: 'code.png'
                        },
                        {
                            title: 'آزادی انتخاب فریم‌ورک',
                            description: 'محدودیت در سکوی ابری فندق به وسعت آسمان و تنوع فریم‌ورک‌ها به تعداد ابرهای این آسمان‌ است تا شما بتوانید تکنولوژی دلخواه خود را به راحتی هرچه تمام‌تر بر روی این سکو مستقر کنید.',
                            icon: 'framework.svg'
                        },
                        {
                            title: 'اجرای مستقیم کد‌ها',
                            description: 'کدهای خود را به هر زبانی که هستند به راحتی و به صورت مستقیم ظرف چند دقیقه بر روی سکوی ابری فندق مستقر کنید بی‌آنکه نیاز باشد دانشی در مورد docker داشته باشید.',
                            icon: 'source_deploy.svg'
                        },
                        {
                            title: 'منطبق با معماری ابری',
                            description: 'سرویس‌های شما بر روی سکوی ابری فندق به صورت خودکار روی سرورهای متعدد قابل اجرا خواهند بود و مایکروسرویس‌های شما می‌توانند با امکانات service discovery فندق سرویس مورد نظر را پیدا کرده و با هم تعامل داشته باشند.',
                            icon: 'cloud_architecture.svg'
                        },
                    ],
                    php: [
                        {
                            title: 'پشتیبانی کامل از زبان‌ها',
                            description: 'تمام تلاشمان را میکنیم تا با کمک توسعه‌دهندگان و استفاده از تجربیات دیگران زبان‌های معروف و پر کاربرد را پیوسته منطبق با معماری ابری ارائه کنیم تا شما تمام تمرکز خود را همیشه بر روی توسعه محصولات خود معطوف کنید.',
                            icon: 'code.png'
                        },
                        {
                            title: 'آزادی انتخاب فریم‌ورک',
                            description: 'محدودیت در سکوی ابری فندق به وسعت آسمان و تنوع فریم‌ورک‌ها به تعداد ابرهای این آسمان‌ است تا شما بتوانید تکنولوژی دلخواه خود را به راحتی هرچه تمام‌تر بر روی این سکو مستقر کنید.',
                            icon: 'framework.svg'
                        },
                        {
                            title: 'اجرای مستقیم کد‌ها',
                            description: 'کدهای خود را به هر زبانی که هستند به راحتی و به صورت مستقیم ظرف چند دقیقه بر روی سکوی ابری فندق مستقر کنید بی‌آنکه نیاز باشد دانشی در مورد docker داشته باشید.',
                            icon: 'source_deploy.svg'
                        },
                        {
                            title: 'منطبق با معماری ابری',
                            description: 'سرویس‌های شما بر روی سکوی ابری فندق به صورت خودکار روی سرورهای متعدد قابل اجرا خواهند بود و مایکروسرویس‌های شما می‌توانند با امکانات service discovery فندق سرویس مورد نظر را پیدا کرده و با هم تعامل داشته باشند.',
                            icon: 'cloud_architecture.svg'
                        },
                    ],
                    c_sharp: [
                        {
                            title: 'پشتیبانی کامل از زبان‌ها',
                            description: 'تمام تلاشمان را میکنیم تا با کمک توسعه‌دهندگان و استفاده از تجربیات دیگران زبان‌های معروف و پر کاربرد را پیوسته منطبق با معماری ابری ارائه کنیم تا شما تمام تمرکز خود را همیشه بر روی توسعه محصولات خود معطوف کنید.',
                            icon: 'code.png'
                        },
                        {
                            title: 'آزادی انتخاب فریم‌ورک',
                            description: 'محدودیت در سکوی ابری فندق به وسعت آسمان و تنوع فریم‌ورک‌ها به تعداد ابرهای این آسمان‌ است تا شما بتوانید تکنولوژی دلخواه خود را به راحتی هرچه تمام‌تر بر روی این سکو مستقر کنید.',
                            icon: 'framework.svg'
                        },
                        {
                            title: 'اجرای مستقیم کد‌ها',
                            description: 'کدهای خود را به هر زبانی که هستند به راحتی و به صورت مستقیم ظرف چند دقیقه بر روی سکوی ابری فندق مستقر کنید بی‌آنکه نیاز باشد دانشی در مورد docker داشته باشید.',
                            icon: 'source_deploy.svg'
                        },
                        {
                            title: 'منطبق با معماری ابری',
                            description: 'سرویس‌های شما بر روی سکوی ابری فندق به صورت خودکار روی سرورهای متعدد قابل اجرا خواهند بود و مایکروسرویس‌های شما می‌توانند با امکانات service discovery فندق سرویس مورد نظر را پیدا کرده و با هم تعامل داشته باشند.',
                            icon: 'cloud_architecture.svg'
                        },
                    ],
                    java_script: [
                        {
                            title: 'پشتیبانی کامل از زبان‌ها',
                            description: 'تمام تلاشمان را میکنیم تا با کمک توسعه‌دهندگان و استفاده از تجربیات دیگران زبان‌های معروف و پر کاربرد را پیوسته منطبق با معماری ابری ارائه کنیم تا شما تمام تمرکز خود را همیشه بر روی توسعه محصولات خود معطوف کنید.',
                            icon: 'code.png'
                        },
                        {
                            title: 'آزادی انتخاب فریم‌ورک',
                            description: 'محدودیت در سکوی ابری فندق به وسعت آسمان و تنوع فریم‌ورک‌ها به تعداد ابرهای این آسمان‌ است تا شما بتوانید تکنولوژی دلخواه خود را به راحتی هرچه تمام‌تر بر روی این سکو مستقر کنید.',
                            icon: 'framework.svg'
                        },
                        {
                            title: 'اجرای مستقیم کد‌ها',
                            description: 'کدهای خود را به هر زبانی که هستند به راحتی و به صورت مستقیم ظرف چند دقیقه بر روی سکوی ابری فندق مستقر کنید بی‌آنکه نیاز باشد دانشی در مورد docker داشته باشید.',
                            icon: 'source_deploy.svg'
                        },
                        {
                            title: 'منطبق با معماری ابری',
                            description: 'سرویس‌های شما بر روی سکوی ابری فندق به صورت خودکار روی سرورهای متعدد قابل اجرا خواهند بود و مایکروسرویس‌های شما می‌توانند با امکانات service discovery فندق سرویس مورد نظر را پیدا کرده و با هم تعامل داشته باشند.',
                            icon: 'cloud_architecture.svg'
                        },
                    ]
                },
                language_tutorials_model: {
                    java: [
                        {
                            title: 'init کردن پروژه',
                            selected: true,
                            video: 'sample'
                        },
                        {
                            title: 'انتخاب context',
                            selected: false,
                            video: 'sample'
                        },
                        {
                            title: 'انتخاب Build Tools',
                            selected: false,
                            video: 'sample'
                        },
                        {
                            title: 'Deploy کردن پروژه',
                            selected: false,
                            video: 'sample'
                        }
                    ],
                    python: [
                        {
                            title: 'init کردن پروژه',
                            selected: true,
                            video: 'sample'
                        },
                        {
                            title: 'انتخاب context',
                            selected: false,
                            video: 'sample'
                        },
                        {
                            title: 'انتخاب Build Tools',
                            selected: false,
                            video: 'sample'
                        },
                        {
                            title: 'Deploy کردن پروژه',
                            selected: false,
                            video: 'sample'
                        }
                    ],
                    nodejs: [
                        {
                            title: 'init کردن پروژه',
                            selected: true,
                            video: 'sample'
                        },
                        {
                            title: 'انتخاب context',
                            selected: false,
                            video: 'sample'
                        },
                        {
                            title: 'انتخاب Build Tools',
                            selected: false,
                            video: 'sample'
                        },
                        {
                            title: 'Deploy کردن پروژه',
                            selected: false,
                            video: 'sample'
                        }
                    ],
                    php: [
                        {
                            title: 'init کردن پروژه',
                            selected: true,
                            video: 'sample'
                        },
                        {
                            title: 'انتخاب context',
                            selected: false,
                            video: 'sample'
                        },
                        {
                            title: 'انتخاب Build Tools',
                            selected: false,
                            video: 'sample'
                        },
                        {
                            title: 'Deploy کردن پروژه',
                            selected: false,
                            video: 'sample'
                        }
                    ],
                    c_sharp: [
                        {
                            title: 'init کردن پروژه',
                            selected: true,
                            video: 'sample'
                        },
                        {
                            title: 'انتخاب context',
                            selected: false,
                            video: 'sample'
                        },
                        {
                            title: 'انتخاب Build Tools',
                            selected: false,
                            video: 'sample'
                        },
                        {
                            title: 'Deploy کردن پروژه',
                            selected: false,
                            video: 'sample'
                        }
                    ]
                },
                menu_item: {
                    title: 'init کردن پروژه',
                    selected: true,
                    video: 'sample'
                },
                framework: {
                    title: 'Spring Boot',
                    description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                    image: 'spring_boot_framework',
                },
                frameworks_model: {
                    java: [
                        {
                            title: 'Spring Boot',
                            selected: true,
                            card: {
                                title: 'Spring Boot',
                                description: 'فریم‌ورک محبوب Spring Boot که در جمع هواداران Java از جایگاه‌ ویژه‌ای برخوردار، در سال ۲۰۰۳ توسط Rod Johnson توسعه یافت به بازار ارائه شد. این فریم ورک قابلیت‌های بسیاری را در کنار عدم اجبار ساختاری خاص بر روی نحوه کد نویسی به شما ارائه می‌کند و از همین رو از جذابیت بسیار بالایی برخوردار است.<br>\n' +
                                    'اگر شما هم دوست‌دار این فریم‌ورک قدرتمند هستید، خبر خوب آن است که سکوی ابری فندق به صورت کاملا حرفه‌ای از این فریم‌ورک پشتیبانی کرده و آن را منطبق با معماری ابری به شما ارائه می‌کند.\n',
                                image: 'spring_boot_framework',
                            }
                        }
                    ],
                    python: [
                        {
                            title: 'Django Project',
                            selected: true,
                            card: {
                                title: 'Django Project',
                                description: 'Django Project یک فریم‌ورک متن باز و رایگان بر پایه زبان برنامه‌نویسی پایتون است که اولین بار در سال ۲۰۰۵ به صورت رسمی معرفی شد و تا به امروز طرفداران آن روز به روز افزایش یافته‌اند.<br>هدف اصلی Django ارائه راهکارهایی برای ساده‌سازی روند توسعه پروژه‌های پایتونی بوده است و به Rapid Development کمک شایانی کرده است. حال برای آنکه این سرعت با همان کیفیت حفظ شود، ما در سکوی ابری فندق این فریم‌ورک را منعطف و منطبق با معماری ابری برای شما فراهم کرده‌ایم تا پروژه‌های خود را به صورت مستقیم بر روی سکو مستقر کنید.',
                                image: 'django_project_framework',
                            }
                        },
                    ],
                    php: [
                        {
                            title: 'Laravel',
                            selected: true,
                            card: {
                                title: 'Laravel',
                                description: 'یکی از فریم‌ورک‌های پر استفاده و رایگان برای زبان برنامه‌نویسی پر مخاطب PHP، فریم‌ورک Laravel است که در سال ۲۰۱۱ روانه بازار شد و توانست به سرعت اعتماد توسعه‌دهندگان را کسب کند.<br>\n' +
                                    'این فریم‌ورک با نگاه به Symfony و مدل معماری توسعه MVC طراحی و پیاده‌سازی شده است و به دلیل ماژولار بودن بخش زیادی از آن استفاده ‌dependencyها در آن بسیار راحت شده است.<br>\n' +
                                    'حال این فریم‌ورک قدرتمند بر روی سکوی ابری فندق پیاده‌سازی و مستقر شده است تا شما توسعه‌دهندگان عزیز از آن استفاده کنید و روند توسعه محصولاتتان را سرعت بخشید.\n',
                                image: 'laravel_framework',
                            }
                        },
                    ],
                    c_sharp: [
                        {
                            title: 'Asp.Net Core',
                            selected: true,
                            card: {
                                title: 'Asp.Net Core',
                                description: 'Asp.Net Core یک فریم‌ورک‌ متن‌باز از محصولات شرکت مایکروسافت است که در سال ۲۰۱۷ روانه بازار شد. این فریم‌ورک به لحاظ سرعت و توان اجرایی از نسخه قدیمی‌تر آن یعنی Asp.Net به مراتب بهتر است. از دیگر مزایای این فریم‌ورک ماژولار بودن آن است که این توانایی را به Asp.Net Core می‌دهد تا هم به صورت Fully Functional بر روی ویندوز اجرا شود و هم به صورت Cross Platform بر روی دیگر سیستم‌عامل‌ها نیز به کار خود ادامه دهد و همین امر موجب محبوبیت بسیار زیاد این فریم‌ورک شده است.سکوی ابری فندق به صورت کامل از این فریم‌ورک پشتیبانی ‌می‌کند و حال شما می‌توانید از آن به طور مستقیم استفاده کنید.',
                                image: 'asp_core_framework',
                            }
                        },
                    ],
                    java_script: [
                        // {
                        //     title: 'Node.js',
                        //     selected: true,
                        //     card: {
                        //         title: 'Node.js',
                        //         description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        //         image: 'nodejs_framework',
                        //     }
                        // },
                    ]
                },
            }
        },
        methods: {
            menuItemSelected(index) {
                this.language_tutorials_model[this.language_id].forEach(menu => {
                    menu.selected = false
                });

                this.language_tutorials_model[this.language_id][index].selected = true;
                this.menu_item = this.language_tutorials_model[this.language_id][index];
            },
            frameworkItemSelected(index) {
                this.frameworks_model[this.language_id].forEach(framework => {
                    framework.selected = false
                });

                this.frameworks_model[this.language_id][index].selected = true
                this.framework = this.frameworks_model[this.language_id][index].card
            }
        },
        mounted() {

            if (this.frameworks_model[this.language_id].length > 0) {
                this.frameworks_model[this.language_id][0].selected = true;
                this.framework = this.frameworks_model[this.language_id][0].card
            }
        },
        head() {
            return {
                title: `${this.language_model[this.language_id].title_fa} | سکوی ابری فندق`,
                meta: this.language_model[this.language_id].meta

            };
        }
    }
</script>

<style lang="stylus" scoped>
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

    .lang-logo-container
        width 100%
        display flex
        flex-direction column
        margin-top -241px
        @media only screen and (max-width 1230px)
            margin-top: -191px

        h1
            font-family: 'Helvetica Neue';
            font-size: 4em;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.24;
            letter-spacing: normal;
            text-align: center;
            direction ltr
            color: #f8f8f8;
            @media only screen and (max-width 1230px)
                font-size 3em

        div
            width: 320px
            height 320px
            background-color #F4F6FF
            border-radius 100%
            display flex
            margin-left auto
            margin-right auto
            margin-top 16px
            @media only screen and (max-width 1230px)
                width: 250px
                height 250px

            div
                width: 300px
                height 300px
                border-radius 100%
                display flex
                margin auto
                box-shadow: 0 0 31px 0 rgba(0, 69, 255, 0.5);
                background-image: linear-gradient(to bottom, #0045ff, #002380)
                @media only screen and (max-width 1230px)
                    width: 230px
                    height 230px

                img
                    width 100%
                    height 100%
                    padding 64px
                    size 100%

    .lang-detail-desc-title
        font-family: iran-yekan;
        font-size: 2.3em
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.72;
        letter-spacing: normal;
        text-align: center;
        color: #0045ff;
        margin-top 48px
        margin-bottom 48px
        @media only screen and (max-width 1230px)
            font-size 1.7em


    .features-box
        width 100%
        padding 48px 16px

    .feature-card
        width 100%
        display flex
        padding-left 16px
        padding-right 16px
        margin-bottom 24px
        margin-top 24px

        span
            width 60px
            height 60px
            display flex
            border-radius 50%
            background #0045ff

            img
                width 32px
                height auto
                margin auto

        div
            width 100%
            flex 1
            padding-left 16px
            padding-right 16px

            h3.feature-card-title
                font-family iran-yekan
                font-size 1.4em
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.71
                letter-spacing normal
                text-align right
                color #3c3c3c
                margin-bottom 5px
                @media only screen and (max-width 992px)
                    font-size 1.2em

            p.feature-card-description
                font-family iran-yekan
                font-size 1.2em
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.75
                letter-spacing normal
                text-align right
                color #535353
                @media only screen and (max-width 992px)
                    font-size 1em

    .lang-detail-media-container
        width 100%
        padding 24px 16px
        border-radius: 5px;
        box-shadow: 0 0 44px 0 rgba(0, 0, 0, 0.51);
        background-color: #080295;
        display flex

        div.lang-menu-container
            width 100%;
            display flex
            height available
            flex-direction column

            p.menu-title
                font-family: iran-yekan;
                font-size: 1.6em
                font-weight: bold;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.71;
                width 100%
                letter-spacing: normal;
                text-align: center;
                color: #fafafa;
                margin-bottom 32px

            button.menu-button
                border-radius: 5px;
                background-color: #0045ff;
                margin-left 16px
                margin-right 16px
                height 40px
                font-family: iran-yekan;
                font-size: 1.2em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 40px
                letter-spacing: normal;
                text-align: center;
                color: #fafafa;
                margin-bottom 16px
                outline none

    .lang-menu-item
        display flex
        width 100%
        height max-content
        flex-direction row
        cursor pointer
        margin-left 16px
        margin-right 16px

        p.menu-item-number
            font-family iran-sans
            font-size: 1.2em;
            width 40px
            height 40px
            border: solid 2px #8c8c8c;
            border-radius 100%
            text-align center
            line-height 40px
            color #8c8c8c
            transition all .2s ease-in-out

        p.menu-item-title
            padding-left 16px
            height available
            padding-right 16px
            font-family: iran-yekan;
            font-size: 1.2em;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height 40px
            letter-spacing: normal;
            text-align: right;
            color: #8c8c8c;
            transition all .2s ease-in-out


        &.selected
            p.menu-item-number
                width 40px
                height 40px
                font-family iran-sans
                font-size: 1.2em;
                background #fafafa
                border-radius 100%
                color #080295
                border none
                text-align center
                line-height 40px
                font-weight bold
                transition all .2s ease-in-out

            p.menu-item-title
                padding-left 16px
                height available
                padding-right 16px
                font-family: iran-yekan;
                font-size: 1.2em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height 40px
                letter-spacing: normal;
                text-align: right;
                color: #fafafa;
                transition all .2s ease-in-out

    .lang-detail-desc-container
        width 100%
        padding 32px
        background #225eff

        p
            font-family: iran-yekan;
            font-size: 2.2em
            font-weight: bold;
            width 100%
            font-style: normal;
            font-stretch: normal;
            line-height: 1.72;
            letter-spacing: normal;
            text-align: center;
            color: #fafafa;
            margin-bottom 64px
            @media only screen and (max-width: 992px)
                font-size 1.6em

    .lang-detail-spec-card
        width 100%
        display flex
        padding-left 16px
        padding-right 16px
        margin-bottom 32px

        img
            margin-top 0
            height max-content
            @media only screen and (max-width 992px)
                width 58px

        div
            width 100%
            flex 1
            padding-left 16px
            padding-right 16px

            p.lang-detail-spec-card-title
                font-family iran-yekan
                font-size 1.4em
                font-weight bold
                font-style normal
                font-stretch normal
                line-height 1.71
                letter-spacing normal
                text-align right
                color #fafafa
                margin-bottom 8px
                @media only screen and (max-width 992px)
                    font-size 1.2em

            p.lang-detail-spec-card-description
                font-family iran-yekan
                font-size 1.2em
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.75
                letter-spacing normal
                text-align right
                color #f8faff
                margin-bottom 12px
                @media only screen and (max-width 992px)
                    font-size 1em

    .framework-container
        width 100%
        background #fefefe
        padding 16px
        height max-content
        padding-bottom 64px

        h2.framework-title
            font-family: iran-yekan;
            font-size: 2.2em
            font-weight: normal;
            font-style: normal;
            width 100%
            font-stretch: normal;
            line-height: 1.72;
            letter-spacing: normal;
            text-align: center;
            margin-top 32px
            color: #0045ff;
            margin-bottom 100px
            @media only screen and (max-width: 992px)
                font-size 1.6em


    .feature-sec-menu
        display flex
        flex-direction column
        padding-right 32px
        position sticky
        top 100px
        height max-content

        div.feature-selected
            cursor pointer
            height 40px
            line-height 40px
            font-size 1.2em
            font-family iran-yekan
            color #0045ff
            display flex
            width unset
            border-right 2px solid #0045ff
            text-align center
            padding-right 12px
            font-weight bold

        div.feature-unselected
            cursor pointer
            height 40px
            line-height 40px
            font-size 1.2em
            font-family iran-yekan
            color #8c8c8c
            width unset
            display flex
            border-right 2px solid #A7A7A7
            text-align center
            padding-right 12px
            font-weight normal

        @media only screen and (max-width: 992px)
            flex-direction row
            top 16px
            display flex
            overflow-x: auto
            overflow-y hidden
            border-radius 25px
            height max-content
            padding-right 0
            scrollbar-width: none
            scrollbar-height: none
            background-color #0045ff
            white-space nowrap
            margin-bottom 16px
            box-shadow 0 0 6px 0 rgba(0, 69, 255, 0.4)
            div.feature-selected
                border none
                color #fefefe
                width max-content
                font-size .9em
                text-align right
                padding-left 12px

            div.feature-unselected
                border none
                color #e3e6ef
                font-size .9em
                width max-content
                padding-left 12px
                text-align right


    .feature-sec-card
        box-sizing padding-box
        padding 16px
        display flex
        height max-content

        img
            margin-top 0
            top 0
            height max-content
            filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
            @media only screen and (max-width: 1230px)
                width 64px
                margin-bottom auto
                margin-top: -5px
                height max-content

        div.card-container
            width 100%
            display flex
            flex-direction column
            padding-right 24px
            padding-left 24px

            h3.card-title
                font-family 'Helvetica Neue'
                font-size 1.8em
                font-weight bold
                font-style normal
                font-stretch normal
                line-height 1.25
                letter-spacing normal
                text-align right
                color #0045ff
                margin-bottom 6px
                @media only screen and (max-width: 1230px)
                    font-size 1.2em

            div.card-divider
                height 0
                border solid 1px #d4d4d4
                margin-left 30%
                margin-bottom 5px
                @media only screen and (max-width: 1230px)
                    margin-left 15%

            p.card-subtitle
                font-family 'Helvetica Neue'
                font-size 1.2em
                font-weight bold
                font-style normal
                font-stretch normal
                line-height 1.25
                letter-spacing normal
                text-align right
                color #7c7c7c
                margin-bottom 6px
                @media only screen and (max-width: 1230px)
                    font-size 1em


            p.card-description
                font-family iran-yekan
                font-size 1.1em
                margin-top 12px
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.75
                letter-spacing normal
                text-align right
                color #3c3c3c
                margin-bottom 8px

            @media only screen and (max-width: 1230px)
                margin-top 12px


</style>

<style lang="stylus">

    .tut_player
        .plyr
            border-radius 0 0 5px 5px !important
            width 100% !important
            @media only screen and (max-width: 992px) {
                border-radius 0 !important
            }


    .plyr--video .plyr__control.plyr__tab-focus, .plyr--video .plyr__control:hover, .plyr--video .plyr__control[aria-expanded=true] {
        background: transparent !important;
        color: #fff;
        outline none !important
    }

    .plyr--full-ui input[type=range] {
        border-radius: 25px !important;
        color: rgba(255, 255, 255, 0.99) !important;
        @media only screen and (max-width: 992px) {
            border-radius 0 !important
        }

    }

    .plyr--video .plyr__controls {
        background: rgba(0, 69, 255, 0.7) !important;
        bottom: 0;
        color: #fff;
        left: 0;
        padding: 5px !important;
        position: absolute;
        margin 12px !important
        border-radius 25px !important
        right: 0;
        outline none !important
        transition: opacity .4s ease-in-out, -webkit-transform .4s ease-in-out;
        transition: opacity .4s ease-in-out, transform .4s ease-in-out;
        transition: opacity .4s ease-in-out, transform .4s ease-in-out, -webkit-transform .4s ease-in-out;
        z-index: 3;
    }

    .plyr__controls > .plyr__control:first-child, .plyr__controls > .plyr__control:first-child + [data-plyr=pause] {
        margin-left: 0;
        margin-right: 0 !important;
    }

    .plyr__progress__container
        width available !important
        flex 1 !important


    .plyr--full-ui.plyr--video .plyr__control--overlaid
        display: block;
        background: rgba(0, 69, 255, 0.7) !important;
        border-radius: 5px !important;
        padding 24px !important

</style>
