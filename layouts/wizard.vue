<template>
    <div class="wrapper" style="padding-bottom: 100px">
        <f-loading :isFull="true" v-if="loading"/>
        <no-ssr>
            <f-d-header v-model="wizard_mode" style="z-index: 10000"/>
            <div :class=" ['wrapper-content', (isMobile ? '' : 'container-fluid'),{'is-small':openSidebar}]">
                <transition name="fade">
                    <div v-if="isMenuAvailable && wizard_mode.gui" :class="['wrapper-sidebar open']">
                        <admin-sidebar :items="items" v-bind.sync="stepPage"></admin-sidebar>
                    </div>
                </transition>
                <div :class="['wrapper-main',{'open':openSidebar}]"
                     :style="{opacity:(isMobile && openSidebar ? '0.5' : '1.0')}">
                    <div class="dash-container">
                        <div :class="[(isMobile ? '' : 'container-fluid')]">

                            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                 style=" margin: 0; display: flex; flex-direction: column"
                                 :style="{padding:(isMobile ? '0 16px': '0px')}">
                                <transition name="fade">
                                    <banner v-if="wizard_mode.gui" class="col-xs-12 col-lg-12 col-md-12 col-sm-12"
                                            style="padding: 0; margin: 0;"
                                            :page="stepPage.page">
                                    </banner>
                                    <banner v-else class="col-xs-12 col-lg-12 col-md-12 col-sm-12"
                                            style="padding: 0; margin: 0;"
                                            :page="cliPage.page">
                                    </banner>
                                </transition>


                                <transition name="fade"
                                            style="display: flex"
                                            v-if="$route.query.ns">
                                    <keep-alive v-if="wizard_mode.gui">
                                        <component :is="stepPage.step_name"
                                                   style="flex: 1"
                                                   @update-service-kind="updateServiceKind"
                                                   :manifest_model.sync="manifest_model">

                                        </component>
                                    </keep-alive>
                                    <cli-setup-mode v-else
                                                    style="flex: 1"
                                                    :manifest_model.sync="manifest_model"
                                                    @update-service-kind="updateServiceKind">
                                    </cli-setup-mode>
                                </transition>

                            </div>

                            <div class="navigation-container">
                                <transition name="fade">
                                <span class="navigation-btn" @click="backward" v-if="wizard_mode.gui">
                                <svg class="backward" width="180px" height="45px" viewBox="0 0 180 45" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <!-- Generator: Sketch 53.1 (72631) - https://sketchapp.com -->
                                    <desc>Created with Sketch.</desc>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Group-18">
                                            <path d="M3,0 L157.5,7.10542736e-15 C169.926407,4.82273345e-15 180,10.0735931 180,22.5 C180,34.9264069 169.926407,45 157.5,45 L3,45 C1.34314575,45 2.02906125e-16,43.6568542 0,42 L0,3 C-2.02906125e-16,1.34314575 1.34314575,7.48448398e-16 3,4.4408921e-16 Z M156.6175,41 C166.783682,41 175.025,32.7172679 175.025,22.5 C175.025,12.2827321 166.783682,4 156.6175,4 C146.451318,4 138.21,12.2827321 138.21,22.5 C138.21,32.7172679 146.451318,41 156.6175,41 Z"
                                                  id="Combined-Shape" fill="#FFFFFF"></path>
                                            <ellipse id="Oval" fill="#FEFEFE" cx="156.6175" cy="22.5" rx="16.4175"
                                                     ry="16.5"></ellipse>
                                            <g id="ic_navigate_next" transform="translate(143.185000, 9.000000)">
                                                <g id="Icon-24px">
                                                    <path d="M12.5859101,5.411639 C11.8101815,4.63201231 10.5554279,4.62904664 9.77253124,5.41587743 L10.3853564,4.79997278 C9.6072987,5.58194029 9.61210224,6.85598242 10.3914593,7.64096608 L14.7232538,12.0040339 C15.504682,12.7911037 15.5026108,14.069282 14.7232538,14.8542657 L10.3914593,19.2173335 C9.61003109,20.0044033 9.60245974,21.271496 10.3853564,22.0583268 L9.77253124,21.4424222 C10.5505889,22.2243897 11.8114772,22.2249851 12.5859101,21.4466606 L19.1587525,14.8407888 C19.9344811,14.0611621 19.9331854,12.7958353 19.1587525,12.0175108 L12.5859101,5.411639 Z"
                                                          id="Shape" fill="#6C6C6C"></path>
                                                    <polygon id="Shape" points="0 0 27.86 0 27.86 28 0 28"></polygon>
                                                </g>
                                            </g>
                                        </g>
                                    </g>


                                    <text x="92"
                                          y="21"
                                          :fill="(stepPage.step === 0 ? '#9c9c9c' : '#000000')"
                                          style="font-family: iran-yekan; font-size: 16px; font-weight: bold; user-select: none"
                                          text-anchor="start"
                                          alignment-baseline="middle">
                                        قبلی
                                    </text>
                                    </svg>
                                </span>
                                </transition>

                                <button class="create-svc-btn" @click="deploy">اتمام ساخت</button>
                                <transition name="fade">
                                <span class="navigation-btn" @click="forward" v-if="wizard_mode.gui">

                               <svg class="forward" width="180px" height="45px" viewBox="0 0 180 45" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <!-- Generator: Sketch 53.1 (72631) - https://sketchapp.com -->
                                <desc>Created with Sketch.</desc>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Group-18"
                                       transform="translate(90.000000, 22.500000) scale(-1, 1) translate(-90.000000, -22.500000) ">
                                        <path d="M3,0 L157.5,7.10542736e-15 C169.926407,4.82273345e-15 180,10.0735931 180,22.5 C180,34.9264069 169.926407,45 157.5,45 L3,45 C1.34314575,45 3.8818616e-15,43.6568542 0,42 L0,3 C-2.02906125e-16,1.34314575 1.34314575,7.48448398e-16 3,4.4408921e-16 Z M156.6175,41 C166.783682,41 175.025,32.7172679 175.025,22.5 C175.025,12.2827321 166.783682,4 156.6175,4 C146.451318,4 138.21,12.2827321 138.21,22.5 C138.21,32.7172679 146.451318,41 156.6175,41 Z"
                                              id="Combined-Shape" fill="#FFFFFF"></path>
                                        <circle id="Oval" fill="#FEFEFE" cx="156.5" cy="22.5" r="16.5"></circle>
                                        <g id="ic_navigate_next" transform="translate(143.000000, 9.000000)">
                                            <g id="Icon-24px">
                                                <path d="M12.6491559,5.411639 C11.8695292,4.63201231 10.6084702,4.62904664 9.82163944,5.41587743 L10.4375441,4.79997278 C9.65557658,5.58194029 9.66040426,6.85598242 10.4350899,7.63235949 L14.8058278,12.0126405 C15.5864399,12.794957 15.5805134,14.069282 14.8058278,14.8456591 L10.4350899,19.2259401 C9.65447779,20.0082566 9.65071331,21.271496 10.4375441,22.0583268 L9.82163944,21.4424222 C10.603607,22.2243897 11.8708314,22.2249851 12.6491559,21.4466606 L19.2550277,14.8407888 C20.0346544,14.0611621 20.0333522,12.7958353 19.2550277,12.0175108 L12.6491559,5.411639 Z"
                                                      id="Shape" fill="#6C6C6C"></path>
                                                <polygon id="Shape" points="0 0 28 0 28 28 0 28"></polygon>
                                            </g>
                                        </g>
                                    </g>
                                </g>


                                    <text x="118"
                                          y="21"
                                          :fill="(stepPage.step === 5 ? '#9c9c9c' : '#000000')"
                                          style="font-family: iran-yekan; font-size: 16px; font-weight: bold; user-select: none"
                                          text-anchor="start"
                                          alignment-baseline="middle">
                                        بعدی
                                    </text>
                                </svg>
                            </span>
                                </transition>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <notification/>
            <alert/>
        </no-ssr>
    </div>
</template>

<script>
    import FDHeader from "~/components/wizard/header";
    import AdminSidebar from "~/components/wizard/sidebar";
    import "normalize.css";
    import Notification from "~/components/Dashboard/notification";
    import Alert from "~/components/Dashboard/alert";
    import {readCookieReq, readCookie} from "../utils/cookies.js";
    import {alertReport} from "../utils/AlertError";
    import FLoading from "~/components/Loading";
    import Moment from 'moment-jalaali';
    import ServiceKind from "../pages/dashboard/services/wizard/index";
    import ImageSetup from "../pages/dashboard/services/wizard/image-setup";
    import EnvSetup from "../pages/dashboard/services/wizard/env-setup";
    import VolumeSetup from "../pages/dashboard/services/wizard/volume-setup";
    import PortMappingSetup from "../pages/dashboard/services/wizard/port-mapping-setup";
    import HealthCheckSetup from "../pages/dashboard/services/wizard/health-check-setup";
    import CommandArgsSetup from "../pages/dashboard/services/wizard/command-args-setup";
    import Banner from "../components/wizard/banner/banner";
    import 'vuetify/dist/vuetify.min.css';
    import ErrorReporter from "../utils/ErrorReporter";
    import Popover from "../components/wizard/tooltip/popover";
    import CliSetupMode from "../components/wizard/cli-setup-mode";

    export default {
        name: "wizard",
        components: {
            CliSetupMode,
            FDHeader,
            FLoading,
            AdminSidebar,
            Notification,
            Alert,
            Moment,
            ServiceKind,
            ImageSetup,
            EnvSetup,
            VolumeSetup,
            PortMappingSetup,
            HealthCheckSetup,
            CommandArgsSetup,
            Banner,
            Popover
        },
        data() {

            return {

                wizard_mode: {
                    manifest: false,
                    gui: true
                },
                loading: false,
                tooltips: {
                    image_version: 'asdadadasdsadasdasd'
                },
                finished: false,
                deploying_manifest: false,
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    counter: value => value.length <= 100 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    default_memory: value => value >= 50 || 'کمترین میزان رم قابل قبول ۵۰ مگابایت است',
                    service_regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                    default_replica: value => value >= 1 || 'کمترین مقدار مجاز ۱ است',
                    valid_port: value => value >= 1 && value <= 65535 || 'مقدار پورت باید بین ۱ تا ۶۵۵۳۵ باشد',
                    min_value: value => value >= 1 || 'کمترین زمان ۱ ثانیه است',
                    is_root_addressed: value => value.toString().startsWith('/') || 'آدرس وارد شده، باید از root (/) شروع شود',
                    has_space: value => !value.toString().includes(' ') || 'فاصله مجاز نیست'
                },
                manifest_model: {
                    service: {
                        kind: {
                            local_name: 'External Service',
                            prod_name: 'ExternalService',
                            is_active: true,
                            tooltip: 'این نوع سرویس‌ها از خارج namespace در دسترس هستند'
                        },
                        kinds: [
                            {
                                local_name: 'External Service',
                                name: 'ExternalService',
                                is_active: true,
                                tooltip: 'این نوع سرویس‌ها از خارج namespace در دسترس هستند'
                            },
                            {
                                local_name: 'Internal Service',
                                name: 'InternalService',
                                is_active: false,
                                tooltip: 'این نوع سرویس‌ها فقط از داخل namespace در دسترس هستند'
                            },

                        ],
                        service_name: {
                            label: 'نام سرویس',
                            hint: 'تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند',
                            counter: 100,
                            name: ''
                        },
                        memory: {
                            label: 'تعیین رم سرویس',
                            hint: 'میزان رم مورد نیاز برای ساخت سرویس',
                            default: '200',
                            amount: 200
                        },
                        replica: {
                            label: 'تعداد Replica‌',
                            hint: 'تعداد سرویس‌های مشابهی که میخواهید با این تنظیمات همزمان ساخته شوند',
                            default: '1',
                            count: 1
                        },
                        port: {
                            label: 'پورت',
                            hint: 'پورتی از پروژه شما که به ۸۰ مپ شده و از بیرون در دسترس قرار میگیرد',
                            default: '80',
                            number: null
                        },
                        path: {
                            label: 'path',
                            hint: 'path خاصی که مایل هستید سرویس شما روی آن پاسخ دهد',
                            dir: null
                        },
                        allow_http: {
                            label: 'HTTP فعال باشد',
                            value: "allow_http",
                            selected: true
                        },
                        domains: []

                    },
                    image: {
                        image_pull_policy: {title: 'If Not Present', value: 'IfNotPresent', selected: true},
                        registry: {
                            prefix: '',
                            local_name: 'Fandogh',
                            icon: 'ic-fandogh-mini.svg',
                            is_active: true,
                            tooltip: 'مبدا ایمیج رجیستری فندق'

                        },
                        registries: [

                            {
                                suffix: '',
                                local_name: 'Fandogh',
                                icon: 'ic-fandogh-mini-fill.svg',
                                is_active: true,
                                tooltip: 'مبدا ایمیج رجیستری فندق'

                            },
                            {
                                suffix: '/library',
                                local_name: 'Docker Hub',
                                icon: 'ic_docker.svg',
                                is_active: false,
                                tooltip: 'مبدا ایمیج رجیستری داکرهاب'
                            },
                            {
                                suffix: '',
                                local_name: 'Other',
                                icon: 'free_feature_img/favorite-image-registry.svg',
                                is_active: false,
                                tooltip: 'مبدا ایمیج رجیستری‌های دیگر'
                            }

                        ],
                        image_object: {
                            name: '',
                            version: ''
                        },
                        secret_obj: {
                            label: 'سکرت',
                            hint: 'نام سکرت را از این قسمت انتخاب نمایید',
                            default: '',
                            value: ''
                        },
                        image_pull_policy_obj: [
                            {
                                label: "If Not Present",
                                value: "IfNotPresent",
                                selected: true,
                                tooltip: 'در صورت فعال کردن این ویژگی، تنها در صورتی که ایمیج وجود نداشته باشد، فندق آن را دانلود میکند'
                            },
                            {
                                label: "Always",
                                value: "Always",
                                selected: false,
                                tooltip: 'در صورت فعال کردن این ویژگی، در هر بار ساخت سرویس، فندق آن ایمیج را دوباره دانلود می‌کند'
                            }
                        ]
                    },
                    environment_variable: {
                        name: null,
                        value: null,
                        secret: null,
                        hidden: false,
                        env_list: []
                    },
                    port_mapping: {
                        port_map: {
                            port: null,
                            target_port: null,
                            protocol: 'TCP'
                        },
                        protocol_list: [
                            {
                                label: "TCP",
                                value: "TCP",
                                selected: true
                            },
                            {
                                label: "UDP",
                                value: "UDP",
                                selected: false
                            }
                        ],
                        port_map_list: []
                    },
                    volumes: {
                        volume: {
                            mount_path: null,
                            sub_path: null,
                            volume_name: null
                        },
                        volume_kind: {
                            local_name: 'Shared Volume',
                            is_active: true,
                            tooltip: 'با انتخاب این گزینه داده‌های شما بر روی آدرس Shared Volumeای که وارد کرده‌اید ذخیره می‌شود.'
                        },
                        volume_kind_obj: [
                            {
                                local_name: 'Shared Volume',
                                is_active: true,
                                tooltip: 'با انتخاب این گزینه داده‌های شما بر روی آدرس Shared Volumeای که وارد کرده‌اید ذخیره می‌شود.'
                            },
                            {
                                local_name: 'Dedicated Volume',
                                is_active: false,
                                tooltip: 'با انتخاب این گزینه داده‌های شما بر روی آدرس Dedicated Volumeای که وارد کرده‌اید ذخیره می‌شود.'
                            }
                        ],
                        volume_list: []
                    },
                    service_commands: [],
                    service_command_args: [],
                    health_check: {
                        liveness_object: {
                            initial_delay_seconds: null,
                            period_seconds: null,
                            timeout_seconds: null,
                            http_get: {
                                path: null,
                                port: null
                            }
                        },
                        readiness_object: {
                            initial_delay_seconds: null,
                            period_seconds: null,
                            timeout_seconds: null,
                            http_get: {
                                path: null,
                                port: null
                            }
                        },
                    }
                },
                cliPage: {
                    page: {
                        title: 'ساخت سرویس با CLI',
                        description: 'شما روش ساخت سرویس با Online CLI را انتخاب کرده‌اید. این حالت برای کاربرانی طراحی شده‌ است که از محیط‌های ترمینالی استفاده می‌کنند و با آن تجربه و احساس راحتیِ بیشتری دارند. توجه داشته باشید در هر زمان که نیاز داشته باشید می‌توانید از نوار بالا گزینه GUI را انتخاب کنید، بدون آنکه نگران پاک شدن تنظیمات وارد شده باشید.'
                    }
                },
                stepPage: {
                    step: 0,
                    text: 'نوع سرویس',
                    component: '/dashboard/general',
                    active: true,
                    step_name: 'ServiceKind',
                    edited: true,
                    page: {
                        title: 'انتخاب نوع سرویس',
                        description: 'هر سرویس در فندق یک نسخه در حال اجرا از یک ورژن بخصوص از یکی از image های شماست. سرویس ها انواع مختلفی دارند و برای ساخت آن ها روش های متفاوتی در نظر گرفته شده است.'
                    }
                },
                items: [
                    {
                        step: 0,
                        text: 'نوع سرویس',
                        component: '/dashboard/general',
                        active: true,
                        step_name: 'ServiceKind',
                        edited: true,
                        page: {
                            title: 'انتخاب نوع سرویس',
                            description: 'هر سرویس در فندق یک نسخه در حال اجرا از یک ورژن بخصوص از یکی از image های شماست. سرویس ها انواع مختلفی دارند و برای ساخت آن ها روش های متفاوتی در نظر گرفته شده است.'
                        }
                    },
                    {
                        step: 1,
                        text: 'انتخاب ایمیج',
                        component: '/dashboard/general',
                        active: false,
                        step_name: 'ImageSetup',
                        edited: false,
                        page: {
                            title: 'انتخاب ایمیج',
                            description: 'سرویس ها در فندق از روی ایمیج ها ساخته می شوند و از طرفی سرویس ها همواره در حال بهبود و تغییر هستند. برای آنکه بتوانیم تاریخچه تغییرات در هر بار را در اختیار داشته باشیم image ها دارای یک شماره نسخه منحصر به فرد می باشند که کاربر در هر بار publish کردن٬ آن را مشخص می کند. به طور کلی در فندق هر Image معادل یک پروژه است. هر image دارای یک نام و تعداد دلخواه ورژن می باشد.'
                        },
                    },
                    {
                        step: 2,
                        text: 'Environment Variable',
                        component: '/dashboard/general',
                        active: false,
                        step_name: 'EnvSetup',
                        edited: false,
                        page: {
                            title: 'Environment variables',
                            description: 'environment variable‌ها آرایه‌ای از متغیر‌ها و مقادیری هستند که شما می‌خواهید هنگام اجرای سرویس، بر روی کانتینر‌ها set شوند و در دسترس باشند.'
                        },
                    },
                    {
                        step: 3,
                        text: 'Volumes',
                        component: '/dashboard/general',
                        active: false,
                        step_name: 'VolumeSetup',
                        edited: false,
                        page: {
                            title: 'Volumes',
                            description: 'همانطور که می‌دانید فندق به هر کدام از کاربران یک فضای ذخیره‌سازی مانا هنگام عضویت ارائه می‌دهد که محتویات آن با از بین رفتن یا ریست شدن سرویس از بین نمی‌رود.این فضای ذخیره سازی همواره در مسیر /mnt/shared-volume در تمام سرویس‌ها در دسترسی است. اما بعضا کاربران نیاز دارند که بخشی از این فضا را در مسیری بخصوص در دسترس قرار دهند یا به اصطلاح mount کنند.شما می‌توانید در صورت نیاز این فضا را بروی فضای ذخیره‌سازی shared یا بر روی یک Dedicated Volume، ایجاد نمایید.'
                        },
                    },
                    {
                        step: 4,
                        text: 'Port Mapping',
                        component: '/dashboard/general',
                        active: false,
                        step_name: 'PortMappingSetup',
                        edited: false,
                        page: {
                            title: 'Port Mapping',
                            description: 'بعضی مواقع یک سرویس بخصوص ممکن است نیاز داشته باشد بیش از یک پورت از خود را expose کند، البته منظور expose کردن برای سرویس‌های داخل همان namespace است، برای اینکار می‌توانید از این فیلد استفاده کنید.\n' +
                                '\n' +
                                'توجه داشته باشید که از طریق port_mapping نمی‌توانید پورتی را به طور External اکسپوز کنید، port_mapping پورت‌های یک سرویس را برای سرویس‌های دیگر همان namespace در دسترس قرار می‌دهد.'
                        },
                    },
                    {
                        step: 5,
                        text: 'Health Check',
                        component: '/dashboard/general',
                        active: false,
                        step_name: 'HealthCheckSetup',
                        edited: false,
                        page: {
                            title: 'Health Check',
                            description: 'پایداری سرویس شما در گروی این است که فندق بتواند به درستی سلامت و آمادگی آن را تشخیص دهد. در بسیاری از موارد بدون همکاری سرویس شما امکان اینکه این امر به طور دقیق انجام شود وجود ندارد٬ به همین دلیل، امکانی در manifest وجود دارد که از طریق آن می‌توانید یک API در اختیار فندق قرار دهید تا از طریق آن API فندق بتواند از صحت و آمادگی سرویس شما مطلع شود. روش کار به این شکل است که یک HTTP API مشخص می‌کنید که فندق آن را در بازه‌های زمانی مشخص فراخوانی می‌کند و اگر با کد 200 پاسخ دریافت کند به معنی سلامت سرویس شماست و در غیر اینصورت یعنی سرویس دچار مشکل شده است.'
                        },
                    },
                    {
                        step: 6,
                        text: 'Command/Command Args',
                        component: '/dashboard/general',
                        active: false,
                        step_name: 'CommandArgsSetup',
                        edited: false,
                        page: {
                            title: 'Command & Command Args',
                            description: 'گاهی نیاز است تا دستورات پیش‌فرض یا argumentهای داکرفایل یک سرویس را تغییر دهید و یا حتی جایگزین کنید. با استفاده از commands و command_args شما می‌توانید این عمل را انجام دهید.'
                        },
                    },
                ]
            }
        },
        computed: {
            domainsList() {
                if (!this.$store.state.domains) return [];
                return this.$store.state.domains.map(item => {
                    return {
                        title: item.name,
                        value: item.name
                    };
                });
            },
            message() {
                return this.$store.state.message;
            },
            openSidebar() {
                return this.$store.state.sideMunu
            },
            isMobile() {
                return this.$store.state.windowWidth <= 992;
            },
            isMenuAvailable() {
                if (this.$route.path.indexOf('account') !== -1) {
                    return false;
                } else return this.$route.path.indexOf('bill') === -1;
            }, accountExpired() {
                let plan = this.$store.state.activePlan;
                if (plan.hasOwnProperty('quota')) {
                    if (plan.quota.expires_at === null)
                        return false;
                    else
                        return Moment(plan.quota.expires_at).jDayOfYear() - Moment(new Date()).jDayOfYear() <= 3;
                } else
                    return false
            }, remainingTime() {
                let plan = this.$store.state.activePlan;
                return Math.max(Moment(plan.quota.expires_at).jDayOfYear() - Moment(new Date()).jDayOfYear(), 0)
            }
        },
        watch: {
            $route(to, from) {
                if (to.path.indexOf('/wizard') === -1 && !this.deploying_manifest) {
                    if (window.confirm('در صورت خروج،‌ کلیه تغییراتی که اعمال کرده‌اید حذف می‌شوند. آیا می‌خواهید خارج شوید؟')) {
                        this.$store.commit('SET_DATA', {id: 'manifest', data: {}})
                    } else {
                        this.$router.replace({
                            path: from.path,
                            query: from.query
                        })
                    }
                }
            },
            'manifest_model.service.kinds':
                {
                    handler: function (value, oldValue) {
                        let kind = this.manifest_model.service.kind;
                        this.addToManifest(kind.prod_name, 'kind')
                    }
                    ,
                    deep: true
                },
            'manifest_model.service.service_name':
                {
                    handler: function (value, oldValue) {
                        let name = value.name;
                        if (name.length.valueOf() === 0) {
                            this.deleteFromManifest('name')
                        } else {
                            if (this.rules.required(name) === true && this.rules.counter(name) === true && this.rules.service_regex(name) === true) {
                                this.addToManifest(name, 'name')
                            } else {
                                this.deleteFromManifest('name')
                            }
                        }
                    }, deep: true
                },
            'manifest_model.service.memory':
                {
                    handler: function (value, oldValue) {
                        let memory = parseInt(value.amount);
                        if (this.rules.default_memory(memory) !== true) {
                            this.deleteFromManifest('spec.resources.memory')
                        } else {
                            this.addToManifest(memory.toString().concat('Mi'), 'spec.resources.memory')
                        }
                    }, deep: true
                },
            'manifest_model.service.replica':
                {
                    handler: function (value, oldValue) {
                        let count = parseInt(value.count);
                        if (this.rules.default_replica(count) !== true) {
                            this.deleteFromManifest('spec.replicas')
                        } else {
                            this.addToManifest(count, 'spec.replicas')
                        }
                    }, deep: true
                },
            'manifest_model.service.allow_http':
                {
                    handler: function (value, oldValue) {
                        if (value.selected === null) {
                            this.deleteFromManifest('spec.allow_http');
                            return
                        }
                        this.addToManifest(value.selected, 'spec.allow_http')
                    }, deep: true
                },
            'manifest_model.service.path':
                {
                    handler: function (value, oldValue) {
                        if (value.dir === null) {
                            this.deleteFromManifest('spec.path');
                            return
                        }
                        if (value.dir.toString().length === 0) {
                            this.deleteFromManifest('spec.path')
                        } else {
                            this.addToManifest(value.dir, 'spec.path')
                        }
                    }, deep: true
                },
            'manifest_model.service.port':
                {
                    handler: function (value, oldValue) {
                        if (value.number === null) {
                            this.deleteFromManifest('spec.port')
                        } else if (this.rules.valid_port(value.number) !== true) {
                            this.deleteFromManifest('spec.port')
                        } else {
                            this.addToManifest(parseInt(value.number), 'spec.port')
                        }
                    }, deep: true
                },
            'manifest_model.service.domains':
                {
                    handler: function (value, oldValue) {
                        let list = [...value];
                        let mapList = list.map(v => {
                            return {name: v}
                        });
                        this.addToManifest(mapList, 'spec.domains');
                        if (mapList.length === 0) {
                            this.deleteFromManifest('spec.domains')
                        }
                    }
                },
            'manifest_model.health_check':
                {
                    handler: function (value, oldValue) {
                        let liveness_empty = false;
                        let readiness_empty = false;
                        const liveness_keys = Object.keys(value['liveness_object']);
                        const readiness_keys = Object.keys(value['readiness_object']);

                        for (let key of liveness_keys) {
                            if (key === 'http_get') {
                                if (value.liveness_object[key]['path'] === null || value.liveness_object[key]['path'] === '') {
                                    liveness_empty = true;
                                }
                                if (value.liveness_object[key]['port'] === null || value.liveness_object[key]['port'] === '') {
                                    liveness_empty = true;
                                }
                            } else {
                                if (value.liveness_object[key] === null || value.liveness_object[key] === '') {
                                    liveness_empty = true;
                                }
                            }
                        }


                        for (let key of readiness_keys) {

                            if (key === 'http_get') {
                                if (value.readiness_object[key]['path'] === null || value.readiness_object[key]['path'] === '') {
                                    readiness_empty = true;
                                }
                                if (value.readiness_object[key]['port'] === null || value.readiness_object[key]['port'] === '') {
                                    readiness_empty = true;
                                }
                            } else {
                                if (value.readiness_object[key] === null || value.readiness_object[key] === '') {
                                    readiness_empty = true;
                                }
                            }
                        }


                        if (!readiness_empty || !liveness_empty) {
                            this.items.forEach(item => {
                                if (item.step_name === 'HealthCheckSetup') {
                                    item.edited = true;
                                }
                            })
                        } else {
                            this.items.forEach(item => {
                                if (item.step_name === 'HealthCheckSetup') {
                                    item.edited = false;
                                }
                            })
                        }
                    }, deep: true
                },
            'manifest_model.environment_variable.env_list':
                {
                    handler: function (value, oldValue) {
                        if ([...value].length > 0) {
                            this.items.forEach(item => {
                                if (item.step_name === 'EnvSetup') {
                                    item.edited = true;
                                }
                            })
                        } else {
                            this.items.forEach(item => {
                                if (item.step_name === 'EnvSetup') {
                                    item.edited = false;
                                }
                            })
                        }

                        if (value.length === 0)
                            this.deleteFromManifest('spec.env');
                        else
                            this.addToManifest(value, 'spec.env')
                    }, deep: true
                },
            'manifest_model.port_mapping.port_map_list':
                {
                    handler: function (value, oldValue) {
                        if ([...value].length > 0) {
                            this.items.forEach(item => {
                                if (item.step_name === 'PortMappingSetup') {
                                    item.edited = true;
                                }
                            });
                            this.addToManifest([...value], 'spec.port_mapping')
                        } else {
                            this.items.forEach(item => {
                                if (item.step_name === 'PortMappingSetup') {
                                    item.edited = false;
                                }
                            });
                            this.deleteFromManifest('spec.port_mapping')
                        }
                    }, deep: true
                },
            'manifest_model.volumes.volume_list':
                {
                    handler: function (value, oldValue) {
                        if ([...value].length > 0) {
                            this.items.forEach(item => {
                                if (item.step_name === 'VolumeSetup') {
                                    item.edited = true;
                                }
                            })
                        } else {
                            this.items.forEach(item => {
                                if (item.step_name === 'VolumeSetup') {
                                    item.edited = false;
                                }
                            })
                        }
                        if (value.length === 0) {
                            this.deleteFromManifest('spec.volume_mounts')
                        } else {
                            this.addToManifest(value, 'spec.volume_mounts')
                        }
                    }, deep: true
                },
            'manifest_model.service_commands': {
                handler: function (value, oldValue) {
                    if (this.manifest_model.service_command_args.length > 0 || this.manifest_model.service_commands.length > 0) {
                        this.items.forEach(item => {
                            if (item.step_name === 'CommandArgsSetup') {
                                item.edited = true;
                            }
                        })
                    } else {
                        this.items.forEach(item => {
                            if (item.step_name === 'CommandArgsSetup') {
                                item.edited = false;
                            }
                        })
                    }

                    if (value.length === 0) {
                        this.deleteFromManifest('spec.command')
                    } else {
                        this.addToManifest(value, 'spec.command')
                    }

                }, deep: true

            },
            'manifest_model.service_command_args': {
                handler: function (value, oldValue) {
                    if (this.manifest_model.service_command_args.length > 0 || this.manifest_model.service_commands.length > 0) {
                        this.items.forEach(item => {
                            if (item.step_name === 'CommandArgsSetup') {
                                item.edited = true;
                            }
                        })
                    } else {
                        this.items.forEach(item => {
                            if (item.step_name === 'CommandArgsSetup') {
                                item.edited = false;
                            }
                        })
                    }

                    if (value.length === 0) {
                        this.deleteFromManifest('spec.command_args')
                    } else {
                        this.addToManifest(value, 'spec.command_args')
                    }

                }, deep: true

            },
            'manifest_model.image.image_object':
                {
                    handler: function (value, oldValue) {
                        if (value.name === null) {
                            this.items.forEach(item => {
                                if (item.step_name === 'ImageSetup') {
                                    item.edited = false;

                                }
                            })
                        }

                        if (value.name !== '') {
                            this.items.forEach(item => {
                                if (item.step_name === 'ImageSetup') {
                                    item.edited = true;
                                }
                            })
                        } else {
                            this.items.forEach(item => {
                                if (item.step_name === 'ImageSetup') {
                                    item.edited = false;
                                }
                            })
                        }
                    }, deep: true
                },
            'manifest_model.health_check.liveness_object': {
                handler: function (value, oldValue) {
                    var empty = false;
                    let keys = Object.keys(value);
                    for (let key of keys) {
                        if (value[key] === null || value[key] === '') {
                            this.deleteFromManifest('spec.liveness_probe');
                            empty = true;
                            break
                        } else if (key === 'http_get') {
                            if (this.rules.is_root_addressed(value[key]['path']) !== true || this.rules.has_space(value[key]['path']) !== true) {
                                this.deleteFromManifest('spec.liveness_probe');
                                empty = true;
                                break
                            }
                            if (this.rules.valid_port(value[key]['port']) !== true) {
                                this.deleteFromManifest('spec.liveness_probe');
                                empty = true;
                                break
                            }
                        } else {
                            if (this.rules.min_value(value[key]) !== true) {
                                this.deleteFromManifest('spec.liveness_probe');
                                empty = true;
                                break
                            }
                        }
                    }

                    if (!empty) {
                        this.addToManifest(value, 'spec.liveness_probe')
                    }

                }, deep: true
            },
            'manifest_model.health_check.readiness_object': {
                handler: function (value, oldValue) {
                    let empty = false;
                    let keys = Object.keys(value);
                    for (let key of keys) {
                        if (value[key] === null || value[key] === '') {
                            this.deleteFromManifest('spec.readiness_probe');
                            empty = true;
                            break
                        } else if (key === 'http_get') {
                            if (this.rules.is_root_addressed(value[key]['path']) !== true || this.rules.has_space(value[key]['path']) !== true) {
                                this.deleteFromManifest('spec.readiness_probe');
                                empty = true;
                                break
                            }

                            if (this.rules.valid_port(value[key]['port']) !== true) {
                                this.deleteFromManifest('spec.readiness_probe');
                                empty = true;
                                break
                            }
                        } else {
                            if (this.rules.min_value(value[key]) !== true) {
                                this.deleteFromManifest('spec.readiness_probe');
                                empty = true;
                                break
                            }
                        }
                    }

                    if (!empty) {
                        this.addToManifest(value, 'spec.readiness_probe')
                    }
                }, deep: true
            }
        },
        created() {
        }
        ,
        beforeMount() {
            let token;
            let valid = false;
            if (process.browser) {
                token = readCookie("USER_TOKEN");
                valid = token ? true : false;
                if (!valid) {
                    this.$router.push("/user/login");
                }
            }
        }
        ,
        mounted() {
            this.$store.dispatch("getDomains", {verified: true});
            this.getImages();
            this.$store.dispatch("getSecret");


            this.handelEventSize();
            window.addEventListener('beforeunload', (event) => {
                // event.returnValue = 'There is pending work. Sure you want to leave?';
                // localStorage.removeItem('vuex')
            });
            if (this.isMobile) {
                this.$store.commit('SET_DATA', {id: 'isNativeMenus', data: null});
                this.$store.commit("SET_DATA", {data: false, id: "sideMunu"});
            }
            let manifest = this.$store.state.manifest;
            // if (!Object.keys(manifest).length) this.$router.push({ path: this._steps[0].path })
            this.persistData(manifest);
            this.handelRyChat();

            //populating manifest
            if (this.$route.query.hasOwnProperty('service')) {
                this.dumpManifest(this.$route.query.service, manifest)
            } else {
                manifest = JSON.parse(localStorage.getItem('vuex')).manifest;
                this.populateManifest(manifest)
            }

        }
        ,
        methods: {
            updateServiceKind(kind_value) {

                this.manifest_model.service.kinds.forEach(item => {
                    item.is_active = false
                });

                if (kind_value === this.manifest_model.service.kinds[0].name) {
                    this.manifest_model.service.kinds[0].is_active = true;
                    this.manifest_model.service.kind.prod_name = this.manifest_model.service.kinds[0].name;
                    this.manifest_model.service.kind.local_name = this.manifest_model.service.kinds[0].local_name;
                    this.manifest_model.service.kind.tooltip = this.manifest_model.service.kinds[0].tooltip

                } else {
                    this.manifest_model.service.kinds[1].is_active = true;
                    this.manifest_model.service.kind.prod_name = this.manifest_model.service.kinds[1].name;
                    this.manifest_model.service.kind.local_name = this.manifest_model.service.kinds[1].local_name;
                    this.manifest_model.service.kind.tooltip = this.manifest_model.service.kinds[1].tooltip
                }


                if (this.manifest_model.service.kind.name === 'ExternalService') {
                    this.manifest_model.service.port.number = null;
                    this.manifest_model.service.allow_http.selected = true
                } else {
                    this.manifest_model.service.domains = [];
                    this.manifest_model.service.port.number = null;
                    this.manifest_model.service.allow_http.selected = null;
                    this.manifest_model.service.path.dir = null
                }

            },
            async getImages() {
                try {
                    await this.$store.dispatch("getImages");
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }
            }
            ,
            getImageV(value) {

                this.$store.dispatch("getImageVersions", value)

            }
            ,
            onRegistryClicked(index) {
                this.manifest_model.image.registries.forEach(item => {
                    item.is_active = false
                });
                this.manifest_model.image.registries[index].is_active = true;
                this.manifest_model.image.registry = this.manifest_model.image.registries[index];

                this.manifest_model.image.image_object.name = null;
                this.manifest_model.image.image_object.version = null;

                if (this.manifest_model.image.registry.local_name === 'Fandogh' &&
                    this.manifest_model.image.secret_obj.value !== null &&
                    this.manifest_model.image.secret_obj.value !== '') {
                }

            }
            ,
            async dumpManifest(service_name, manifest) {
                this.loading = true;
                await this.$store.dispatch('dumpServiceManifest', service_name)
                    .then(response => {
                        this.loading = false;
                        manifest = JSON.parse(localStorage.getItem('vuex')).manifest;
                        this.populateManifest(manifest)
                    }).catch(e => {
                        if (e.status === 401) {
                            this.$router.push("/user/login");
                        } else {
                            ErrorReporter(e, this.$data, true).forEach(error => {
                                this.$notify({
                                    title: error,
                                    time: 4000,
                                    type: "error"
                                });
                            });
                        }
                    })
            }
            ,
            populateManifest(manifest) {
                if (manifest.hasOwnProperty('name')) {
                    this.manifest_model.service.service_name.name = manifest.name
                }

                if (manifest.hasOwnProperty('kind')) {
                    let kind_name = manifest.kind;

                    this.manifest_model.service.kinds.forEach(item => {
                        item.is_active = false;
                        if (item.name === kind_name) {
                            item.is_active = true;
                            this.manifest_model.service.kind.tooltip = item.tooltip;
                            this.manifest_model.service.kind.local_name = item.local_name;
                            this.manifest_model.service.kind.prod_name = item.name;
                            this.manifest_model.service.kind.is_active = item.is_active;
                        }
                    })
                } else {
                    this.manifest_model.service.kinds[0].is_active = true;
                    this.manifest_model.service.kind.is_active = this.manifest_model.service.kinds[0].is_active;
                    this.manifest_model.service.kind.prod_name = this.manifest_model.service.kinds[0].name;
                    this.manifest_model.service.kind.local_name = this.manifest_model.service.kinds[0].local_name;
                    this.manifest_model.service.kind.tooltip = this.manifest_model.service.kinds[0].tooltip;
                }

                if (manifest.hasOwnProperty('spec')) {
                    let spec = manifest.spec;

                    if (spec.hasOwnProperty('resources')) {
                        if (spec.resources.hasOwnProperty('memory')) {
                            let memory = spec.resources.memory;
                            this.manifest_model.service.memory.amount = memory.toString().replace('Mi', '')
                        }
                    } else {
                        this.manifest_model.service.memory.amount = this.memory.default
                    }

                    if (spec.hasOwnProperty('replicas')) {
                        this.manifest_model.service.replica.count = spec.replicas
                    } else {
                        this.manifest_model.service.replica.count = this.manifest_model.service.replica.default
                    }

                    if (spec.hasOwnProperty('image')) {
                        let image = '';
                        image = spec.image;

                        if (image.split('/').length > 2) {
                            this.onRegistryClicked(2)
                        } else if (image.split('/').length === 2) {
                            this.onRegistryClicked(1)
                        } else {
                            this.onRegistryClicked(0);
                            this.getImageV(image.split(':')[0])
                        }
                        this.manifest_model.image.image_object.name = '';
                        this.manifest_model.image.image_object.version = '';
                        let image_parts = image.split(':');
                        for (let index = 0; index < image_parts.length; index++) {
                            if (index !== image_parts.length - 1) {
                                this.manifest_model.image.image_object.name += image_parts[index] || ''
                            } else {
                                this.manifest_model.image.image_object.version += image_parts[index] || ''
                            }
                        }
                    }

                    if (spec.hasOwnProperty('image_pull_policy')) {
                        this.manifest_model.image.image_pull_policy_obj.forEach((item, index) => {
                            item.selected = false;
                            if (item.value === spec.image_pull_policy) {
                                item.selected = true
                            }
                        })
                    }

                    if (spec.hasOwnProperty('image_pull_secret')) {
                        this.manifest_model.image.secret_obj.value = spec.image_pull_secret
                    }

                    if (spec.hasOwnProperty('env')) {

                        spec.env.forEach(item => {
                            this.manifest_model.environment_variable.env_list.push(item)
                        })
                    }

                    if (spec.hasOwnProperty('port_mapping')) {

                        spec.port_mapping.forEach(item => {
                            this.manifest_model.port_mapping.port_map_list.push(item)
                        })
                    }

                    if (spec.hasOwnProperty('volume_mounts')) {

                        spec.volume_mounts.forEach(item => {
                            this.manifest_model.volumes.volume_list.push(item)
                        })
                    }

                    if (manifest.spec.hasOwnProperty('port')) {
                        this.manifest_model.service.port.number = spec.port
                    }

                    if (spec.hasOwnProperty('path')) {
                        this.manifest_model.service.path.dir = spec.path
                    }

                    if (spec.hasOwnProperty('allow_http')) {
                        this.manifest_model.service.allow_http.selected = spec.allow_http
                    }

                    if (spec.hasOwnProperty('domains')) {
                        spec.domains.forEach((domain, index) => {
                            if (domain.name.toString().includes('fandogh.cloud')) {
                                spec.domains.splice(index, 1);

                            }
                        });

                        if ([...spec.domains].length === 0) {
                            this.deleteFromManifest('spec.domains')
                        } else {
                            spec.domains.forEach(item => {
                                this.manifest_model.service.domains.push(item['name'])
                            })
                        }

                    }

                    if (spec.hasOwnProperty('liveness_probe')) {
                        this.manifest_model.health_check.liveness_object = spec.liveness_probe
                    }

                    if (spec.hasOwnProperty('readiness_probe')) {
                        this.manifest_model.health_check.readiness_object = spec.readiness_probe
                    }


                    if (spec.hasOwnProperty('command')){
                        this.manifest_model.service_commands = [...spec.command]
                    }

                    if (spec.hasOwnProperty('command_args')){
                        this.manifest_model.service_command_args = [...spec.command_args]
                    }

                } else {

                    this.manifest_model.service.kinds.forEach(item => {
                        item.is_active = false
                    });
                    this.manifest_model.service.kinds[0].is_active = true;
                    this.manifest_model.service.kind.is_active = this.manifest_model.service.kinds[0].is_active;
                    this.manifest_model.service.kind.prod_name = this.manifest_model.service.kinds[0].name;
                    this.manifest_model.service.kind.local_name = this.manifest_model.service.kinds[0].local_name;
                    this.manifest_model.service.kind.tooltip = this.manifest_model.service.kinds[0].tooltip;

                    this.manifest_model.service.replica.count = this.manifest_model.service.replica.default;
                    this.manifest_model.service.memory.amount = this.manifest_model.service.memory.default;
                    this.manifest_model.service.allow_http.selected = false;
                    this.manifest_model.service.allow_http.selected = true

                }
            }
            ,
            isManifestValid() {
                if (this.manifest_model.service.service_name.name.length === 0) {
                    this.$notify({
                        title: 'نام سرویس را وارد نکرده‌اید',
                        time: 4000,
                        type: 'error'
                    });
                    return false
                }

                if (this.manifest_model.service.kind.name === 'ExternalService') {
                    if (this.manifest_model.service.port.number === null) {
                        this.$notify({
                            title: 'لطفا پورت را مشخص نمایید',
                            time: 4000,
                            type: 'error'
                        });
                        return false
                    }
                }

                if (this.manifest_model.image.image_object.name.length === 0 || this.manifest_model.image.image_object.version.length === 0) {
                    this.$notify({
                        title: 'ایمیج و نسخه آن را مشخص نمایید',
                        time: 4000,
                        type: 'error'
                    });
                    return false
                }

                if (this.manifest_model.image.registry.local_name === 'Docker Hub') {
                    if (this.manifest_model.image.image_object.name.split('/').length !== 2) {
                        this.$notify({
                            title: 'ساختار ایمیج وارد شده برای داکر صحیح نمی‌باشد',
                            time: 4000,
                            type: 'error'
                        });
                        return false
                    }
                }

                if (this.manifest_model.image.registry.local_name === 'Other') {
                    if (this.manifest_model.image.image_object.name.split('/').length < 3) {
                        this.$notify({
                            title: 'ساختار ایمیج وارد شده برای رجیستری‌های غیر داکر صحیح نمی‌باشد',
                            time: 4000,
                            type: 'error'
                        });
                        return false
                    }
                }

                if (this.manifest_model.environment_variable.env_list.length > 0) {
                    var invalid = false;
                    this.manifest_model.environment_variable.env_list.forEach(env => {
                        if (env.value === '****' && env.hidden) {
                            invalid = true;
                        }
                    });

                    if (invalid) {
                        this.$notify({
                            title: 'شما باید مقادیر ‌envهایی که hidden شده‌اند را دوباره وارد نمایید در غیر این صورت مقادیر با **** جایگزین شده و باعث تداخل در روند سرویس شما می‌شود.',
                            time: 8000,
                            type: 'error'
                        });
                        return false;
                    }
                }

                return true;
            }
            ,
            deploy() {

                if (this.isManifestValid()) {
                    this.loading = true;
                    this.deploying_manifest = true;
                    this.$store.commit("SET_DATA", {data: true, id: "loading"});
                    this.$store.dispatch('createServiceManifest').then(res => {
                        this.loading = false;
                        this.finished = true;
                        // removeValue('name')
                        // removeValue('versions')
                        this.$store.commit("SET_DATA", {id: "service", data: res});
                        this.$router.replace(`/dashboard/services/${res.name}`);
                        this.$store.commit('SET_DATA', {id: 'manifest', data: {}})
                    }).catch(e => {
                        this.loading = false;
                        this.finished = false;
                        // ErrorReporter(e, [], true).forEach(error => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        //
                        // })
                        this.$notify({
                            title: e,
                            time: 4000,
                            type: 'error'
                        })
                    })
                }
            }
            ,
            addToManifest(value, path) {
                this.$store.dispatch('manifestGenerator', {
                    value: value,
                    path: path
                })
            }
            ,
            deleteFromManifest(path) {
                this.$store.dispatch('manifestDeleter', {
                    path: path
                })
            }
            ,
            persistData(manifest) {
                for (let key in manifest) {
                    if (manifest.hasOwnProperty(key)) {
                        if (typeof manifest[key] === 'object' && !Array.isArray(manifest[key])) {
                            this.persistData(manifest[key])
                        } else {
                            if (this.$parent.hasOwnProperty(key)) {
                                this.$parent[key] = manifest[key]
                            }
                        }
                    }
                }
            }
            ,
            handelRyChat() {
                let elm = document.querySelector('#raychatFrame');
                if (!elm) {
                    const raychatScript = document.createElement('script');
                    raychatScript.innerText = '!function(){function t(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,localStorage.getItem("rayToken")?t.src="https://app.raychat.io/scripts/js/"+o+"?rid="+localStorage.getItem("rayToken")+"&href="+window.location.href:t.src="https://app.raychat.io/scripts/js/"+o;var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}var e=document,a=window,o="b34779ab-3e49-4256-8f71-ec8ae7e76d64";"complete"==e.readyState?t():a.attachEvent?a.attachEvent("onload",t):a.addEventListener("load",t,!1)}();';
                    document.head.appendChild(raychatScript)
                }
            }
            ,
            handelEventSize() {
                var vm = this;
                window.addEventListener("resize", function (e) {
                    vm.setSize(e);
                });
                if (process.browser) {
                    this.setDefaultSize();
                }
            }
            ,
            setSize(e) {
                this.$store.dispatch("SET_SIZE", {
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }
            ,
            setDefaultSize(e) {
                this.$store.dispatch("SET_SIZE", {
                    width: window.innerWidth,
                    height: window.innerHeight
                });
                if (this.isMobile) {
                    this.$store.dispatch("TOGGLE_NAV", {data: null, id: "sidebar"});
                }
            }
            ,
            backward() {
                if (this.stepPage.step > 0) {

                    this.items.forEach(item => {
                        item.active = item.text === this.items[this.stepPage.step - 1].text;
                    });

                    this.items.forEach(item => {
                        if (item.active) {
                            this.stepPage.step = item.step;
                            this.stepPage.step_name = item.step_name;
                            this.stepPage.active = item.active;
                            this.stepPage.text = item.text;
                            this.stepPage.component = item.component;
                            this.stepPage.edited = item.edited;
                            this.stepPage.page = item.page;
                        }
                    })
                }
            }
            ,
            forward() {

                if (this.stepPage.step < 5) {

                    this.items.forEach(item => {
                        item.active = item.text === this.items[this.stepPage.step + 1].text;
                    });

                    this.items.forEach(item => {
                        if (item.active) {
                            this.stepPage.step = item.step;
                            this.stepPage.step_name = item.step_name;
                            this.stepPage.active = item.active;
                            this.stepPage.text = item.text;
                            this.stepPage.component = item.component;
                            this.stepPage.edited = item.edited;
                            this.stepPage.page = item.page;
                        }
                    })

                }

            }
        }
        ,
    }
    ;
</script>

<style lang="css">
    .fade-enter-active {
        transition: opacity .3s ease-in-out;
    }

    .fade-enter, .fade-leave-to, .fade-leave-active /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>

<style lang="stylus" scoped>

    @import '../assets/css/main.styl'
    @import '../assets/css/variables.styl'

    *
        box-sizing content-box

    $spaceTop = 45
    .parent-sidebar
        position relative

    // transition all 0.5s
    .dash-container
        box-sizing content-box
        margin-top $spaceTop + 68px
        padding-bottom 20px
        min-height calc(100vh - 120px)
        @media only screen and (max-width: 1230px)
            margin 0
            margin-top $spaceTop + 60px
            width 100%

    .wrapper
        width 100%
        background $bgColor

        &-content
            display flex
            width 95%
            max-width 1800px
            font-size 16px
            transition $transitionMain
            @media only screen and (max-width: 1250px)
                width 100%
                font-size 14px
            @media only screen and (max-width: 1230px)
                width 100%
                font-size 10px
            @media only screen and (max-width: 992px)
                width 100%
                font-size 12px

        &-sidebar
            position relative
            min-width $widthSidebarClose
            transition $transitionMain

            &.open
                min-width $widthSidebarOpen
            @media only screen and (max-width: $sizeMd)
                min-width 0
                &.open
                    min-width 0

        &-main
            flex-grow 1
            box-sizing border-box
            // margin-right 0.8em
            // margin-left 0.8em
            min-width calc(100vh - 5.25em)
            transition $transitionMain

            &.open
                min-width calc(100vh - 23em)
            @media only screen and (max-width: $sizeMd)
                min-width 0
                &.open
                    min-width 0


    .navigation-btn
        flex 1 1 available
        cursor pointer

        svg.backward
            border-radius 3px 25px 25px 3px
            box-shadow 0 2px 6px rgba(0, 0, 0, 0.17)

        svg.forward
            box-shadow 0 2px 6px rgba(0, 0, 0, 0.17)
            border-radius 25px 3px 3px 25px

    .navigation-container
        display flex
        flex-direction row
        justify-content center
        height 45px
        flex-wrap wrap

    .create-svc-btn
        font-family: iran-yekan
        text-align: center
        font-size: 16px
        font-weight: bold
        color: #fefefe
        flex 1 1 auto
        max-width 200px
        min-width 100px
        min-font-size 10px
        max-font-size 16px
        height 45px
        border-radius: 3px
        vertical-align: middle
        margin-left 6px
        margin-right 6px
        outline: none
        box-shadow: 0 2px 5px 1px rgba(36, 213, 216, 0.5)
        background-color: #24d5d8

    @-webkit-keyframes shake {
        59% {
            margin-left: 0 !important
        }
        60%, 80% {
            margin-left: 0 !important
        }
        70%, 90% {
            margin-left: 0 !important
        }
    }

    @keyframes shake {
        59% {
            margin-left: 0 !important
        }
        60%, 80% {
            margin-left: !important
        }
        70%, 90% {
            margin-left: !important
        }
    }

    .v-input--has-state.error--text .v-label {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text .v-messages {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text .v-input__slot {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text input {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }
</style>


<style lang="stylus">

    .v-label {
        margin-right: 0 !important;
        align-self: start !important;
        right: auto !important;
        left: auto !important;
        background: #fefefe !important;
        width: fit-content !important;
        padding: 0 8px !important;
        float: right !important;
    }

    .v-text-field__slot
        align-items: end !important;
        height: 38px !important;


    .v-text-field
        input
            flex: 0 1 auto !important;
            line-height: 38px !important;
            height: 38px !important;
            max-height 38px !important
            padding: 5px 20px !important;
            text-align left !important
            cursor revert !important
            max-width: 100%;
            min-width: 0;
            width: 100%


    .v-label {
        vertical-align: middle !important;
    }

    /*.v-input--is-focused{*/
    /*left: auto !important;*/
    /*}*/

    .application--is-rtl .v-text-field .v-label {
        -webkit-transform-origin: none !important;
        transform-origin: none !important
    }

    .v-label {
        font-size: 16px;
        line-height: 1 !important;
        min-height: 8px;
        transition: .3s cubic-bezier(.25, .8, .5, 1)
    }

    .application--is-rtl .v-text-field .v-label {
        -webkit-transform-origin: top right;
        transform-origin: top right;
    }

    .application--is-rtl .v-text-field .v-counter {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .application--is-rtl .v-text-field--enclosed .v-input__append-outer {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }


    .v-text-field > .v-input__control > .v-input__slot:after, .v-text-field > .v-input__control > .v-input__slot:before
        bottom: -1px;
        content: "";
        position: absolute;
        transition: .3s cubic-bezier(.25, .8, .5, 1) !important;
        width: 100%


    .v-text-field .v-label {
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        top: 7px;
        -webkit-transform-origin: top right !important;
        transform-origin: top right !important;
        white-space: nowrap;
        margin-right 0 !important;
        pointer-events: none
    }

    .v-messages {
        flex: 1 1 auto;
        font-size: .7em !important;
        min-height: 12px;
        vertical-align middle !important;
        min-width: 1px;
        line-height 1 !important
        text-align right || center !important;
        position: relative
        margin-top -2px !important
    }

    .v-counter
        font-family iran-sans !important
        direction ltr !important
        margin-top 2px !important

    .v-select .vs__dropdown-toggle
        margin-bottom 8px !important
        min-height 46px !important
        border none !important
        border-bottom 1px solid #a4a4a4 !important
        border-radius 0 !important
        background-color #fff !important

    .v-input--has-state.error--text .v-label {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text .v-messages {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text .v-input__slot {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text input {
        -webkit-animation: none !important;
        animation: none !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .vs__selected {
        display: flex;
        align-items: center;
        background-color: rgba(41, 121, 255, .5) !important;
        border: 1px solid #0093ff !important;
        border-radius: 25px !important;
        color: #ffffff !important;
        font-family iran-yekan !important
        line-height: 1.4;
        margin: 4px 2px 0;
        padding: 0 0 0 16px !important
    }

    .vs__deselect {
        display: inline-flex;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none !important;
        margin-left: 12px !important;
        margin-right 2px !important
        margin-top 2px !important
        margin-bottom 2px !important
        padding: 9px !important;
        border: 1px solid #0093ff !important;
        border-radius 50px !important
        cursor: pointer;
        background: #fefefe !important;
        fill: rgba(60, 60, 60, .5) !important;
        text-shadow: 0 1px 0 #fff
    }


    .tooltip {
        display: block !important;
        z-index: 10000;
        max-width: 300px;
        font-family: iran-yekan;
        line-height: 1.7;
        font-size: 0.9em;
    }

    .tooltip .tooltip-inner {
        background: black;
        color: white;
        border-radius: 16px;
        padding: 5px 10px 4px;
    }

    .tooltip .tooltip-arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 5px;
        border-color: black;
        z-index: 1;
    }

    .tooltip[x-placement^="top"] {
        margin-bottom: 5px;
    }

    .tooltip[x-placement^="top"] .tooltip-arrow {
        border-width: 5px 5px 0 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }

    .tooltip[x-placement^="bottom"] {
        margin-top: 5px;
    }

    .tooltip[x-placement^="bottom"] .tooltip-arrow {
        border-width: 0 5px 5px 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }

    .tooltip[x-placement^="right"] {
        margin-left: 5px;
    }

    .tooltip[x-placement^="right"] .tooltip-arrow {
        border-width: 5px 5px 5px 0;
        border-left-color: transparent !important;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        left: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
    }

    .tooltip[x-placement^="left"] {
        margin-right: 5px;
    }

    .tooltip[x-placement^="left"] .tooltip-arrow {
        border-width: 5px 0 5px 5px;
        border-top-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        right: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
    }

    .tooltip.popover .popover-inner {
        background: #f9f9f9;
        color: black;
        padding: 24px;
        display: flex;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(0, 0, 0, .7);
    }

    .tooltip.popover .popover-arrow {
        border-color: #f9f9f9;
    }

    .tooltip[aria-hidden='true'] {
        visibility: hidden;
        opacity: 0;
        transition: opacity .15s, visibility .15s;
    }

    .tooltip[aria-hidden='false'] {
        visibility: visible;
        opacity: 1;
        transition: opacity .15s;
    }

    div.v-text-field__suffix {
        margin-left 16px
    }

    .cancel-button
        font-size .9em
        color $grayMedium
        padding 12px 24px
        border-radius 3px
        font-family iran-yekan
        cursor pointer
        user-select none

    @-webkit-keyframes shake {
        59% {
            margin-left: 0 !important
        }
        60%, 80% {
            margin-left: 0 !important
        }
        70%, 90% {
            margin-left: 0 !important
        }
    }

    @keyframes shake {
        59% {
            margin-left: 0 !important
        }
        60%, 80% {
            margin-left: !important
        }
        70%, 90% {
            margin-left: !important
        }
    }

</style>
