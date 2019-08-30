<template>
    <div class="row" style="background: #F8FAFF;">

        <div class="row audience-header">
            <div class="audience-bg">
                <span>
                    <img :src="require('../../assets/svg/targets/' + audience_model[audience].icon)"
                         :alt="audience_model[audience].icon">
                </span>
                <p class="banner-title">{{audience_model[audience].title}}</p>
                <p class="banner-description">{{audience_model[audience].description}}</p>
            </div>
        </div>

        <div class="row" style="margin-left: 0; margin-right: 0; width: 100%">
            <div class="audience-toolbar">
                <p @click="$router.replace('/audience/' + item.name)" v-for="item in audience_model"
                   :class="['toolbar-option', {'selected': item.title === audience_model[audience].title}]">
                    {{item.title}}</p>
            </div>
        </div>

        <div class="row" style="margin-top: 32px; width: 100%; margin-left: 0; margin-right: 0;">

            <div class="descriptions">

                <h3>{{descriptions[audience].title}}</h3>
                <p v-html="descriptions[audience].description"></p>

                <div v-for="item in descriptions[audience].others" class="other-descriptions">

                    <h4>{{item.title}}</h4>
                    <p v-html="item.description"></p>

                </div>

            </div>
        </div>

        <div class="section-divider"></div>

        <div class="platform-feature-container">
            <h2>{{features[audience].title}}</h2>
            <h4>{{features[audience].description}}</h4>

            <div class="row"
                 style="width: 100%; margin-top: 48px; max-width: 1370px; margin-left: auto; margin-right: auto">

                <div v-for="feature in features[audience].cards"
                     class="platform-feature-card col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <span>
                        <img :src="require('./icons/' + feature.icon)" :alt="feature.icon">
                    </span>
                    <div>
                        <h5>{{feature.title}}</h5>
                        <p>{{feature.description}}</p>
                    </div>

                </div>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "_id",
        data() {
            return {

                audience: this.$route.params.id,
                audience_model: {

                    freelancers: {
                        title: 'Freelancers',
                        description: 'برای Freelancer هایی که نیاز به میزبانی یکپارچه و تطبیق‌پذیر دارند',
                        icon: 'freelancers.svg',
                        name: 'freelancers'
                    },
                    students: {
                        title: 'دانشجویان',
                        description: 'برای دانشجویان با ایده‌های ناب و بودجه محدود',
                        icon: 'students.svg',
                        name: 'students'
                    },
                    startups: {
                        title: 'استارتاپ‌ها',
                        description: 'سکویی برای توسعه، مدیریت و مقیاس‌پذیری پروژه‌های شما',
                        icon: 'startups.svg',
                        name: 'startups'
                    },
                    teams: {
                        title: 'تیم‌ها',
                        description: 'سهولت در توسعه و سادگی در مدیریت',
                        icon: 'teams.svg',
                        name: 'teams'
                    },
                    companies: {
                        title: 'شرکت‌ها',
                        description: 'راه‌حل‌های Enterprise در برابر هزینه‌های پایین و مزایای بی‌شمار',
                        icon: 'companies.svg',
                        name: 'companies'
                    }
                },
                descriptions: {
                    students: {
                        title: 'ایده خود را بر روی سکوی ابری فندق عملی کنید',
                        description: 'دانشجویان و دانش‌آموزان منابع بی کرانی از ایده دارند که متاسفانه به دلیل نبود برخی ابزارهای مورد نیاز و یا محدودیت‌های مالی، آن‌ها را به فراموشی میسپارند.<br>\n' +
                            'ما در سکوی ابری فندق به عنوان اولین ارائه کننده سکوی ابری عمومی در ایران، پیش‌قدم شدیم تا دانشجویان و دانش‌آموزان ایده‌های خود را بر روی بستر ابری بدون محدودیت و به صورت رایگان مستقر کنند و بازخورد‌های محصول خود را دریافت کنند تا ما هم در شادی و موفقیت این عزیزان شریک شویم.<br>\n',
                        others: [
                            {
                                title: 'پشتیبانی و ویژگی های منحصر به فرد',
                                description: 'ما در سکوی ابری فندق همه چیز را تا حد ممکن برای شما ساده‌سازی کرده‌ایم تا شما درگیری و مشغولیت ذهنی بابت تطبیق ایده‌های خود با ساختار و معماری ابری نداشته باشید.<br><br>مزایایی مانند مستندات کامل و پیوسته در حال توسعه، زبان‌های پشتیبانی شده و فریم‌ورک‌های مورد محبوب و مورد نیاز شما ، رابط‌های مدیریتی متعدد و … همه و همه برای این به وجود آمده‌اند تا شما با خیال راحت ایده‌های خود را عملیاتی کنید.<br>'
                            },
                            {
                                title: 'پیشینه سرویس‌های رایگان',
                                description: 'تعداد زیادی از کاربران از زمان تاسیس سکوی ابری فندق از سرویس رایگان ما استفاده کرده اند و لازم به ذکر است که درصد چشم گیری از آن‌ها در حال حاضر سرویس‌های خود را گسترش داده و ایده خود را از حالت MVP به یک محصول قابل ارائه و تجاری تبدیل کرده‌اند؛ حال شاید کسب‌و‌کار بعدی که تبدیل به یک استارتاپ موفق خواهد شد برای شما باشد.'
                            }
                        ]
                    },
                    freelancers: {
                        title: 'پروژه‌های خود را در کسری از ثانیه دسترس‌پذیر کنید',
                        description: 'یکی از ویژگی‌های بارز Freelancerها که در عین حال یک مشکل نیز برای آن‌ها حساب می‌شود، سرعت و مدیریت زمان است.<br>برای آنکه بتوانید در موعد مقرر پروژه‌های خود را به دست مدیران پروژه برسانید مطمئنا یک لیست بلند و بالایی از کارهایی که باید انجام دهید دارید؛ مواردی همچون تهیه سرور، مدیریت زیرساخت، تنظیمات، معماری پروژه و توسعه و …<br><br>برای همین منظور ما در سکوی ابری فندق شرایطی را فراهم کرده‌ایم تا مشکلات زیرساختی و پیچیده‌گی‌های آن از روی شانه شما برداشته شود و شما تمام وقت خود را صرف توسعه پروژه‌ها کنید.',
                        others: [
                            {
                                title: 'پشتیبانی و ویژگی های منحصر به فرد',
                                description: 'ما در سکوی ابری فندق همه چیز را تا حد ممکن برای شما ساده‌سازی کرده‌ایم تا شما درگیری و مشغولیت ذهنی بابت تطبیق ایده‌های خود با ساختار و معماری ابری نداشته باشید.<br><br>مزایایی مانند مستندات کامل و پیوسته در حال توسعه، زبان‌های پشتیبانی شده و فریم‌ورک‌های محبوب و مورد نیاز شما ، رابط‌های مدیریتی متعدد و … همه و همه برای این به وجود آمده‌اند تا شما به راحتی ایده های خود را عملیاتی کنید.'
                            },
                            {
                                title: 'استفاده از سرویس‌های رایگان',
                                description: 'شما می‌توانید در ابتدای کار خود برای آنکه بتوانید پروژه‌های خود را به سفارش دهنده‌ها نمایش دهید بدون پرداخت هرگونه هزینه‌ای نسخه‌های Prototype خود را بر روی سکوی ابری فندق مستقر کنید و در انتها و در صورت نیاز نسبت به تهیه پلن‌های  حرفه ای اقدام کنید و پروژه‌های خود را بر روی سکوی ابری فندق مستقر کنید.'
                            },
                        ]
                    },
                    teams:{
                        title: 'روند توسعه یکپارچه و ارتباط بهتر میان اعضای تیم توسعه',
                        description: 'یکی از مشکلات اصلی تیم‌ها در توسعه محصولات ارتباط میان نیرو‌های مختلف در دپارتمان‌های متفاوت و همچنین هنگام اضافه شدن نیروی جدید به هریک از بخش ها است؛ به این دلیل شما موظف هستید بخشی از زمان خود را در یک چرخه باطل صرف پرورش و تطبیق تازه‌وارد‌ها با پروژه‌ها کنید.<br><br>چیزی که سکوی ابری فندق به تیم‌ها ارائه می‌کند، راه حلی یکپارچه و آسان است که بر اساس تیم‌ها در تمام طول مدت استقرار، توسعه، تست و … می‌توانند بر روی آن حساب کنند و مطمئن باشند یک ساختار منسجم با ابزار و مستندات مشخص دارند.',
                        others: [
                            {
                                title: 'تمرکز ۱۰۰٪ بر روی توسعه اپلیکیشن‌ها',
                                description: 'یکی از مسائلی که باعث می‌شود اعضای تیم‌ها تمرکز خود را به صورت دوره‌ای از دست بدهند یا بعد از مدتی کوتاه احساس خستگی داشته باشند، توزیع ناعدلانه‌ی وظایف، خارج از چارچوب وظایف اصلی آن‌ها است.<br><br>برای مثال نیروی سمت سرور گاها باید در هنگام کار از تمرکز خود بزند و بر روی سرورها و یا مسائل شبکه یا مسائلی از این دست کار کند و این موضوع روند توسعه را مختل می‌کند.<br><br><br>\n' +
                                    'حال اگر تمام این نگرانی‌ها و مسائل را به  سکوی ابری فندق منتقل کنید، احتمال آنکه درگیر مسائل زیرساختی شوید شاید ۱ بار در سال باشد زیرا که سکوی ابری فندق تمام مسائل را پیش‌بینی کرده و مدیریت تمام این مسائل را به عهده گرفته است.\n'
                            }
                        ]
                    },
                    startups:{
                        title: 'سرعت بالا در توسعه و انتشار محصول',
                        description: 'مهمترین اصل در رقابت استارتاپ‌ها شاید ایده باشد اما در اصل مهمترین امر سرعت توسعه و انتشار آن ایده به صورت یک محصول قابل استفاده است.<br>چیزی که باعث می‌شود شما استارتاپی موفق داشته باشید این است که زودتر از رقبای خود ایده‌اتان را عملیاتی کنید و برای استفاده عموم مردم آن را منتشر کنید.<br><br>\n' +
                            'استفاده از سکوی ابری فندق به شما این امکان و تضمین را می‌دهد تا روند توسعه خود را بدون نگرانی در مورد زیرساخت و مسائل مدیریتی آن، چند برابر افزایش دهید و هیچ نگرانی بابت تامین منابع نداشته باشید.\n',
                        others:[
                            {
                                title: 'کاهش هزینه در برابر افزایش کیفیت',
                                description: 'کمتر محصولی پیدا می‌شود که در برابر راه‌حل‌های قدیمی و کیفیت بالا بتواند هزینه کمتری دریافت کند و این امر در استفاده از سکوی ابری فندق قابل مشاهده و لمس است.<br><br>\n' +
                                    'منابع مالی استارتاپ‌ها محدود است و استفاده از سکوی ابری فندق این امتیاز را در اختیار شما قرار می‌دهد تا بتوانید هزینه‌های خود را تا ۷۰ درصد کاهش داده و از منابع خود برای مارکتینگ و توسعه محصول خود استفاده کنید.\n'
                            },
                            {
                                title: 'خشت اول چون نهد معمار، راست',
                                description: 'یکی از مشکلاتی که استارتا‌پ‌ها بعد از کسب کاربر زیاد با آن مواجه می‌شوند یک ساختار monolithic و پیچیده است که به دلیل محدودیت‌های منابع در ابتدای کار پاسخگو بوده است ولی در ادامه مسیر کارها را دشوار کرده و باعث می‌شود هزینه‌ها افزایش یابند.<br><br>\n' +
                                    'با استفاده از سکوی ابری فندق شما می‌توانید به راحتی از همان ابتدای کار با یک ساختار SOA یا همان Service Oriented Architecture سرویس‌های خود را پیاده سازی کنید و ساختاری میکروسرویس داشته باشید و دیگر نگران مقیاس پذیری نباشید.<br>هرچند که هیچگاه برای این کار دیر نیست اما اگر از اول بنا را درست بسازید دیگر نیاز به هزینه‌های اضافی نخواهید داشت.\n'
                            },
                        ]
                    },
                    companies:{
                        title: 'پروژه‌های خود را با کیفیت و دقت بیشتری به دست کاربران برسانید',
                        description: 'اعتبار برای شرکت‌هایی که دیگر راه و کاربران خود را پیدا کرده‌اند از اهمیت خیلی بالایی برخوردار است. یکی از موارد حیاتی و بسیار حساس در شرکت‌ها و در کل، همه کسب‌و‌کارهای با مقیاس بالا امنیت زیرساخت و کیفیت آن است.<br><br>\n' +
                            'اگر شما هم به کیفیت کسب‌و‌کار خود خیلی اهمیت می‌دهید، پیشنهاد ما به شما استفاده از سکوی ابری فندق است زیرا که ما تمام تجربیات کاری خود در شرکت‌ها و بانک‌ها را تبدیل به یک معماری و در نهایت یک محصول درآورده‌ایم تا دیگر تجربیات تلخ دیگران را تجربه نکنید و از تجربه کیفیت بالا لذت ببرید.\n',
                        others:[
                            {
                                title: 'کاهش هزینه و منابع و افزایش سود',
                                description: 'اگر از مرحله استارتاپ گذر کرده‌اید و تبدیل به یک شرکت سود ده شده‌اید، لزوما به این معنا نیست که شما به تمام موقعیت‌های شغلی در شرکت خود احتیاج دارید و باید تک تک افراد متخصص در زمینه نرم‌افزار را استخدام کنید یا حتی زیرساخت خصوصی خود را فراهم کنید.<br><br>این کارها جز هزینه اضافی و گسترش بیش از اندازه کسب‌و‌کار چیز دیگری برای شما نخواهد داشت، حال پیشنهاد ما به شما این است که باری را از روی دوش خود برداشته و مدیریت زیرساخت را برای همیشه به سکوی ابری فندق بدهید تا بتوانید منابع مالی و زمانی خود را صرف بخش‌های دیگر کنید.'
                            }
                        ]
                    }
                },
                features: {

                    students: {
                        title: 'سکوی ابری فندق چه ویژگی‌هایی را به شما پیشنهاد می‌دهد؟',
                        description: 'برای آنکه بدانید در صورت استفاده از زیرساخت ابری فندق چه امتیازاتی را بدست ‌می‌آورید، ما برای شما بارزترین ‌آن‌ها را لیست کرده‌ایم تا یک بینش از پیش آماده نسبت به آینده سرویس‌ها داشته باشید.',
                        cards: [
                            {
                                title: 'ساخت و استقرار آسان',
                                description: 'به راحتی سرویس‌های خود را بدون نیاز به دانش پیچیده ابری ظرف مدت کمتر از ۱ دقیقه بر روی سکوی ابری فندق مستقر کنید.',
                                icon: 'source_deployment_icon.svg'
                            },
                            {
                                title: 'گستردگی زبان ها',
                                description: 'از زبان‌های پشتیبانی‌ شده سکوی ابری فندق استفاده کنید تا به صورت مستقیم پروژه‌های خود را به صورت کاملا داکرایز شده بر روی سکو مستقر کنید.',
                                icon: 'code.png'
                            },
                            {
                                title: 'گستردگی فریم ورک ها',
                                description: 'هر زبان برنامه‌نویسی فریم‌ورک‌های متنوعی دارد. ما هم در فندق این فریم‌ورک‌ها را به صورت شخصی‌سازی شده و با استاندارد‌های مشخص در اختیار شما قرار داده‌ایم تا برای راحتی کار و سرعت بخشیدن به روند توسعه از آن‌ها استفاده کنید.',
                                icon: 'framework_icon.svg'
                            },
                            {
                                title: 'پشتیبانی حرفه‌ای',
                                description: 'در هر مرحله و در هر زمان در کنار شماییم. چه کاربر رایگان باشید و چه یک شرکت بزرگ چند هزار نفری فرقی ندارد، ما برای پشتیبانی شما از بهترین افراد و توسعه‌دهندگان سکوی ابری فندق کمک می‌گیریم تا بهترین تجربه را از پشتیبانی داشته باشید.',
                                icon: 'technical-support.svg'
                            },
                            {
                                title: 'مدیریت آسان',
                                description: 'به راحتی عملیات DevOps را بر روی سکوی ابری فندق با رویکردی ساده شده و جدید تجربه کنید و مطمئن باشید تمام پیچیدگی‌ها را ما برای شما مدیریت می‌کنیم.',
                                icon: 'operation_tools.svg'
                            },
                            {
                                title: 'ساخت سرویس رایگان',
                                description: 'به صورت رایگان و بدون پرداخت هزینه منابع آزمایشی خود را دریافت کنید و ایده‌های خود را به صورت سرویس بر روی سکوی ابری فندق مستقر کنید.',
                                icon: 'ic-service.svg'
                            },
                        ]
                    },
                    freelancers: {
                        title: 'سکوی ابری فندق چه ویژگی‌هایی را به شما پیشنهاد می‌دهد؟',
                        description: 'برای آنکه بدانید در صورت استفاده از زیرساخت ابری فندق چه امتیازاتی را بدست ‌می‌آورید، ما برای شما بارزترین ‌آن‌ها را لیست کرده‌ایم تا یک بینش از پیش آماده نسبت به آینده سرویس‌ها داشته باشید.',
                        cards: [
                            {
                                title: 'ساخت و استقرار آسان',
                                description: 'به راحتی سرویس‌های خود را بدون نیاز به دانش پیچیده ابری ظرف مدت کمتر از ۱ دقیقه بر روی سکوی ابری فندق مستقر کنید.',
                                icon: 'source_deployment_icon.svg'
                            },
                            {
                                title: 'گستردگی زبان ها',
                                description: 'از زبان‌های پشتیبانی‌ شده سکوی ابری فندق استفاده کنید تا به صورت مستقیم پروژه‌های خود را به صورت کاملا داکرایز شده بر روی سکو مستقر کنید.',
                                icon: 'code.png'
                            },
                            {
                                title: 'گستردگی فریم ورک ها',
                                description: 'هر زبان برنامه‌نویسی فریم‌ورک‌های متنوعی دارد. ما هم در فندق این فریم‌ورک‌ها را به صورت شخصی‌سازی شده و با استاندارد‌های مشخص در اختیار شما قرار داده‌ایم تا برای راحتی کار و سرعت بخشیدن به روند توسعه از آن‌ها استفاده کنید.',
                                icon: 'framework_icon.svg'
                            },
                            {
                                title: 'پشتیبانی حرفه‌ای',
                                description: 'در هر مرحله و در هر زمان در کنار شماییم. چه کاربر رایگان باشید و چه یک شرکت بزرگ چند هزار نفری فرقی ندارد، ما برای پشتیبانی شما از بهترین افراد و توسعه‌دهندگان سکوی ابری فندق کمک می‌گیریم تا بهترین تجربه را از پشتیبانی داشته باشید.',
                                icon: 'technical-support.svg'
                            },
                            {
                                title: 'مدیریت آسان',
                                description: 'به راحتی عملیات DevOps را بر روی سکوی ابری فندق با رویکردی ساده شده و جدید تجربه کنید و مطمئن باشید تمام پیچیدگی‌ها را ما برای شما مدیریت می‌کنیم.',
                                icon: 'operation_tools.svg'
                            },
                            {
                                title: 'ساخت سرویس رایگان',
                                description: 'به صورت رایگان و بدون پرداخت هزینه منابع آزمایشی خود را دریافت کنید و ایده‌های خود را به صورت سرویس بر روی سکوی ابری فندق مستقر کنید.',
                                icon: 'ic-service.svg'
                            },
                            {
                                title: 'منابع و پلن‌های قابل شخصی‌سازی',
                                description: 'شما می‌توانید پلن خود را بسازید و تنها منابعی که مورد نیاز پروژه‌هایتان است را در کسری از ثانیه تهیه کنید و به سرویس‌های خود تخصیص دهید.',
                                icon: 'customized-plan.svg'
                            },
                            {
                                title: 'ابزار مدیریت CLI',
                                description: 'اگر  طرفدار استفاده از terminal هستید می‌توانید برای مدیریت سرویس‌های خود از fandogh cli استفاده کنید.',
                                icon: 'cli.svg'
                            },
                            {
                                title: 'ابزار مدیریت Wizard',
                                description: 'اگر مایل هستید همه چیز در یک محیط برای شما فراهم شده باشد، داشبورد فندق با امکانات متنوع به شما قابلیت مانیتورینگ، مدیریت و ساخت ایمیج ها، سرویس‌ها و … را می‌دهد.',
                                icon: 'wizard.svg'
                            },
                        ]
                    },
                    teams: {
                        title: 'سکوی ابری فندق چه ویژگی‌هایی را به شما پیشنهاد می‌دهد؟',
                        description: 'برای آنکه بدانید در صورت استفاده از زیرساخت ابری فندق چه امتیازاتی را بدست ‌می‌آورید، ما برای شما بارزترین ‌آن‌ها را لیست کرده‌ایم تا یک بینش از پیش آماده نسبت به آینده سرویس‌ها داشته باشید.',
                        cards: [
                            {
                                title: 'ساخت و استقرار آسان',
                                description: 'به راحتی سرویس‌های خود را بدون نیاز به دانش پیچیده ابری ظرف مدت کمتر از ۱ دقیقه بر روی سکوی ابری فندق مستقر کنید.',
                                icon: 'source_deployment_icon.svg'
                            },
                            {
                                title: 'گستردگی زبان ها',
                                description: 'از زبان‌های پشتیبانی‌ شده سکوی ابری فندق استفاده کنید تا به صورت مستقیم پروژه‌های خود را به صورت کاملا داکرایز شده بر روی سکو مستقر کنید.',
                                icon: 'code.png'
                            },
                            {
                                title: 'گستردگی فریم ورک ها',
                                description: 'هر زبان برنامه‌نویسی فریم‌ورک‌های متنوعی دارد. ما هم در فندق این فریم‌ورک‌ها را به صورت شخصی‌سازی شده و با استاندارد‌های مشخص در اختیار شما قرار داده‌ایم تا برای راحتی کار و سرعت بخشیدن به روند توسعه از آن‌ها استفاده کنید.',
                                icon: 'framework_icon.svg'
                            },
                            {
                                title: 'پشتیبانی حرفه‌ای',
                                description: 'در هر مرحله و در هر زمان در کنار شماییم. چه کاربر رایگان باشید و چه یک شرکت بزرگ چند هزار نفری فرقی ندارد، ما برای پشتیبانی شما از بهترین افراد و توسعه‌دهندگان سکوی ابری فندق کمک می‌گیریم تا بهترین تجربه را از پشتیبانی داشته باشید.',
                                icon: 'technical-support.svg'
                            },
                            {
                                title: 'مدیریت آسان',
                                description: 'به راحتی عملیات DevOps را بر روی سکوی ابری فندق با رویکردی ساده شده و جدید تجربه کنید و مطمئن باشید تمام پیچیدگی‌ها را ما برای شما مدیریت می‌کنیم.',
                                icon: 'operation_tools.svg'
                            },
                            {
                                title: 'منابع و پلن‌های قابل شخصی‌سازی',
                                description: 'شما می‌توانید پلن خود را بسازید و تنها منابعی که مورد نیاز پروژه‌هایتان است را در کسری از ثانیه تهیه کنید و به سرویس‌های خود تخصیص دهید.',
                                icon: 'customized-plan.svg'
                            },
                            {
                                title: 'ابزار مدیریت CLI',
                                description: 'اگر  طرفدار استفاده از terminal هستید می‌توانید برای مدیریت سرویس‌های خود از fandogh cli استفاده کنید.',
                                icon: 'cli.svg'
                            },
                            {
                                title: 'ابزار مدیریت Wizard',
                                description: 'اگر مایل هستید همه چیز در یک محیط برای شما فراهم شده باشد، داشبورد فندق با امکانات متنوع به شما قابلیت مانیتورینگ، مدیریت و ساخت ایمیج ها، سرویس‌ها و … را می‌دهد.',
                                icon: 'wizard.svg'
                            },
                        ]
                    },
                    startups: {
                        title: 'سکوی ابری فندق چه ویژگی‌هایی را به شما پیشنهاد می‌دهد؟',
                        description: 'برای آنکه بدانید در صورت استفاده از زیرساخت ابری فندق چه امتیازاتی را بدست ‌می‌آورید، ما برای شما بارزترین ‌آن‌ها را لیست کرده‌ایم تا یک بینش از پیش آماده نسبت به آینده سرویس‌ها داشته باشید.',
                        cards: [
                            {
                                title: 'ساخت و استقرار آسان',
                                description: 'به راحتی سرویس‌های خود را بدون نیاز به دانش پیچیده ابری ظرف مدت کمتر از ۱ دقیقه بر روی سکوی ابری فندق مستقر کنید.',
                                icon: 'source_deployment_icon.svg'
                            },
                            {
                                title: 'گستردگی زبان ها',
                                description: 'از زبان‌های پشتیبانی‌ شده سکوی ابری فندق استفاده کنید تا به صورت مستقیم پروژه‌های خود را به صورت کاملا داکرایز شده بر روی سکو مستقر کنید.',
                                icon: 'code.png'
                            },
                            {
                                title: 'گستردگی فریم ورک ها',
                                description: 'هر زبان برنامه‌نویسی فریم‌ورک‌های متنوعی دارد. ما هم در فندق این فریم‌ورک‌ها را به صورت شخصی‌سازی شده و با استاندارد‌های مشخص در اختیار شما قرار داده‌ایم تا برای راحتی کار و سرعت بخشیدن به روند توسعه از آن‌ها استفاده کنید.',
                                icon: 'framework_icon.svg'
                            },
                            {
                                title: 'پشتیبانی حرفه‌ای',
                                description: 'در هر مرحله و در هر زمان در کنار شماییم. چه کاربر رایگان باشید و چه یک شرکت بزرگ چند هزار نفری فرقی ندارد، ما برای پشتیبانی شما از بهترین افراد و توسعه‌دهندگان سکوی ابری فندق کمک می‌گیریم تا بهترین تجربه را از پشتیبانی داشته باشید.',
                                icon: 'technical-support.svg'
                            },
                            {
                                title: 'مدیریت آسان',
                                description: 'به راحتی عملیات DevOps را بر روی سکوی ابری فندق با رویکردی ساده شده و جدید تجربه کنید و مطمئن باشید تمام پیچیدگی‌ها را ما برای شما مدیریت می‌کنیم.',
                                icon: 'operation_tools.svg'
                            },
                            {
                                title: 'منابع و پلن‌های قابل شخصی‌سازی',
                                description: 'شما می‌توانید پلن خود را بسازید و تنها منابعی که مورد نیاز پروژه‌هایتان است را در کسری از ثانیه تهیه کنید و به سرویس‌های خود تخصیص دهید.',
                                icon: 'customized-plan.svg'
                            },
                            {
                                title: 'ابزار مدیریت CLI',
                                description: 'اگر  طرفدار استفاده از terminal هستید می‌توانید برای مدیریت سرویس‌های خود از fandogh cli استفاده کنید.',
                                icon: 'cli.svg'
                            },
                            {
                                title: 'ابزار مدیریت Wizard',
                                description: 'اگر مایل هستید همه چیز در یک محیط برای شما فراهم شده باشد، داشبورد فندق با امکانات متنوع به شما قابلیت مانیتورینگ، مدیریت و ساخت ایمیج ها، سرویس‌ها و … را می‌دهد.',
                                icon: 'wizard.svg'
                            },
                            {
                                title: 'منعطف با بودجه شما',
                                description: 'شما با استفاده از مزایای سکوی ابری فندق می‌توانید تا ۷۰ درصد در هزینه‌های خود صرفه‌جویی کنید.',
                                icon: 'cost.svg'
                            },
                            {
                                title: 'ساخت سرویس رایگان',
                                description: 'به صورت رایگان و بدون پرداخت هزینه منابع آزمایشی خود را دریافت کنید و ایده‌های خود را به صورت سرویس بر روی سکوی ابری فندق مستقر کنید.',
                                icon: 'ic-service.svg'
                            },
                            {
                                title: 'سیستم مانیتورینگ منابع',
                                description: 'با استفاده از سرویس مانیتورینگ سکوی ابری فندق، مصرف منابع سرویس‌های خود را به تفکیک رصد کنید و از روند کاری آن‌ها باخبر شوید.',
                                icon: 'ic-monitoring.svg'
                            },
                        ]
                    },
                    companies: {
                        title: 'سکوی ابری فندق چه ویژگی‌هایی را به شما پیشنهاد می‌دهد؟',
                        description: 'برای آنکه بدانید در صورت استفاده از زیرساخت ابری فندق چه امتیازاتی را بدست ‌می‌آورید، ما برای شما بارزترین ‌آن‌ها را لیست کرده‌ایم تا یک بینش از پیش آماده نسبت به آینده سرویس‌ها داشته باشید.',
                        cards: [
                            {
                                title: 'ساخت و استقرار آسان',
                                description: 'به راحتی سرویس‌های خود را بدون نیاز به دانش پیچیده ابری ظرف مدت کمتر از ۱ دقیقه بر روی سکوی ابری فندق مستقر کنید.',
                                icon: 'source_deployment_icon.svg'
                            },
                            {
                                title: 'گستردگی زبان ها',
                                description: 'از زبان‌های پشتیبانی‌ شده سکوی ابری فندق استفاده کنید تا به صورت مستقیم پروژه‌های خود را به صورت کاملا داکرایز شده بر روی سکو مستقر کنید.',
                                icon: 'code.png'
                            },
                            {
                                title: 'گستردگی فریم ورک ها',
                                description: 'هر زبان برنامه‌نویسی فریم‌ورک‌های متنوعی دارد. ما هم در فندق این فریم‌ورک‌ها را به صورت شخصی‌سازی شده و با استاندارد‌های مشخص در اختیار شما قرار داده‌ایم تا برای راحتی کار و سرعت بخشیدن به روند توسعه از آن‌ها استفاده کنید.',
                                icon: 'framework_icon.svg'
                            },
                            {
                                title: 'پشتیبانی حرفه‌ای',
                                description: 'در هر مرحله و در هر زمان در کنار شماییم. چه کاربر رایگان باشید و چه یک شرکت بزرگ چند هزار نفری فرقی ندارد، ما برای پشتیبانی شما از بهترین افراد و توسعه‌دهندگان سکوی ابری فندق کمک می‌گیریم تا بهترین تجربه را از پشتیبانی داشته باشید.',
                                icon: 'technical-support.svg'
                            },
                            {
                                title: 'مدیریت آسان',
                                description: 'به راحتی عملیات DevOps را بر روی سکوی ابری فندق با رویکردی ساده شده و جدید تجربه کنید و مطمئن باشید تمام پیچیدگی‌ها را ما برای شما مدیریت می‌کنیم.',
                                icon: 'operation_tools.svg'
                            },
                            {
                                title: 'منابع و پلن‌های قابل شخصی‌سازی',
                                description: 'شما می‌توانید پلن خود را بسازید و تنها منابعی که مورد نیاز پروژه‌هایتان است را در کسری از ثانیه تهیه کنید و به سرویس‌های خود تخصیص دهید.',
                                icon: 'customized-plan.svg'
                            },
                            {
                                title: 'ابزار مدیریت CLI',
                                description: 'اگر  طرفدار استفاده از terminal هستید می‌توانید برای مدیریت سرویس‌های خود از fandogh cli استفاده کنید.',
                                icon: 'cli.svg'
                            },
                            {
                                title: 'ابزار مدیریت Wizard',
                                description: 'اگر مایل هستید همه چیز در یک محیط برای شما فراهم شده باشد، داشبورد فندق با امکانات متنوع به شما قابلیت مانیتورینگ، مدیریت و ساخت ایمیج ها، سرویس‌ها و … را می‌دهد.',
                                icon: 'wizard.svg'
                            },
                            {
                                title: 'منعطف با بودجه شما',
                                description: 'شما با استفاده از مزایای سکوی ابری فندق می‌توانید تا ۷۰ درصد در هزینه‌های خود صرفه‌جویی کنید.',
                                icon: 'cost.svg'
                            },
                            {
                                title: 'سیستم مانیتورینگ منابع',
                                description: 'با استفاده از سرویس مانیتورینگ سکوی ابری فندق، مصرف منابع سرویس‌های خود را به تفکیک رصد کنید و از روند کاری آن‌ها باخبر شوید.',
                                icon: 'ic-monitoring.svg'
                            },
                            {
                                title: 'SLA متناسب با نیاز شما',
                                description: 'شما می‌توانید بر اساس نیاز‌هایتان SLA مورد نیاز شرکت خود را از ما درخواست کنید تا چیزی که متناسب با دغدغه‌های شما است پشتیبانی شود.',
                                icon: 'sla.svg'
                            },
                            {
                                title: 'مشاوره معماری',
                                description: 'سکوی ابری فندق در راه‌حل‌های شرکتی تمام تجربیات خود را در طول حضور بر روی سکو به شما منتقل می‌کند تا مطمئن شویم شما همواره بهترین خدمات را دریافت می‌کنید.',
                                icon: 'consulting.svg'
                            },
                            {
                                title: 'Managed Cluster',
                                description: 'در صورت نیاز شما می‌توانید سکوی ابری فندق شخصی سازی شده خود را از ما درخواست کنید تا ما برای شما بر روی هر زیرساختی که شما در نظر دارید مستقر کنیم.',
                                icon: 'managed-cluster.svg'
                            },
                        ]
                    },
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .row
        margin-left 0
        margin-right 0

    .audience-header
        width 100%
        height max-content
        padding-top 60px
        background-size 60%
        background url("../../assets/svg/pod_bg.svg") no-repeat top center

    .audience-bg
        width 100%
        height auto
        padding-top 60px
        display flex
        flex-direction column
        -webkit-backdrop-filter: blur(3.5px);
        backdrop-filter: blur(3.5px);
        background-image: linear-gradient(to bottom, rgba(0, 69, 255, 0.75), #0135c0 74%, #0230aa);

        span
            width 200px
            height 200px
            border-radius 50%
            background #fefefe
            display flex
            margin-left auto
            margin-right auto
            @media only screen and (max-width 992px)
                width 125px
                height 125px

            img
                width 123px
                height 123px
                margin auto
                @media only screen and (max-width 992px)
                    width 80px
                    height 80px


        p.banner-title
            font-family iran-yekan
            font-size 3em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.24
            margin-top 32px
            letter-spacing normal
            text-align center
            margin-bottom 0
            color #f8f8f8
            @media only screen and (max-width 992px)
                font-size 2.4em

        p.banner-description
            font-family iran-yekan
            font-size 2em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            margin-top 16px
            padding-right 20%
            padding-left 20%
            letter-spacing normal
            text-align center
            margin-bottom 48px
            color #dedede
            @media only screen and (max-width 992px)
                font-size 1.3em
                padding-left 16px
                padding-right 16px


    .audience-toolbar
        width 100%
        height 65px
        background-color #080295
        display flex
        flex-direction row
        padding-left 16px
        justify-content center
        padding-right 16px
        position sticky
        @media only screen and (max-width 992px)
            white-space nowrap
            flex-direction row
            justify-content unset
            overflow-x scroll
            overflow-y hidden

        p.toolbar-option
            font-family: iran-yekan;
            font-size: 1.3em;
            font-weight normal
            font-style: normal
            font-stretch: normal;
            line-height: 1.73;
            width unset
            letter-spacing: normal;
            text-align: center;
            color: #9c9c9c;
            margin auto 12px
            cursor pointer

            &.selected
                font-size 1.4em
                color #fefefe


    .platform-feature-container
        width 100%

        h2
            font-family iran-yekan
            font-size 2.4em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.73
            max-width 1230px
            letter-spacing normal
            text-align center
            color #3c3c3c
            margin-top 32px
            margin-left auto
            margin-right auto
            @media only screen and (max-width 992px)
                font-size 1.8em

        h4
            font-family iran-yekan
            font-size 1.4em
            max-width 1230px
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            margin-top 16px
            letter-spacing normal
            text-align center
            margin-left auto
            margin-right auto
            padding-left 10%
            padding-right 10%
            color #535353
            @media only screen and (max-width 992px)
                font-size 1.2em

    .platform-feature-card
        display flex
        width 100%
        margin-top 32px
        margin-bottom 32px

        span
            width 52px
            height 52px
            border-radius 5px
            background-color rgba(0, 69, 255, 0.2)
            display flex

            img
                width 36px
                height 36px
                margin auto
                filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)

        div
            display flex
            flex-direction column
            flex 1
            padding-right 16px

            h5
                font-family: iran-yekan;
                font-size: 1.4em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.75;
                letter-spacing: normal;
                text-align: right;
                color: #3c3c3c;

            p
                font-family: iran-yekan;
                font-size: 1.2em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.75;
                letter-spacing: normal;
                margin-top 8px
                text-align: right;
                color: #535353;


    .section-divider
        width 100%
        height 1px
        margin-top 48px
        margin-left 10%
        margin-right 10%
        margin-bottom 32px
        background-image: linear-gradient(to right, rgba(193, 193, 193, 0.1), #c1c1c1 60%, rgba(193, 193, 193, 0.1));


    .descriptions
        width 100%
        display flex
        flex-direction column
        padding-right 10%
        padding-left 10%
        margin-top 32px

        h3
            font-family: iran-yekan;
            font-size: 2.2em;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.73;
            letter-spacing: normal;
            text-align: center;
            color: #0045ff;
            @media only screen and (max-width: 992px)
                font-size 1.8em

        p
            font-family: iran-yekan;
            font-size: 1.5em;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            margin-top 32px
            line-height: 1.71;
            letter-spacing: normal;
            text-align: right;
            color: #5c5c5c;
            @media only screen and (max-width: 992px)
                font-size 1.2em

        div.other-descriptions
            width 100%
            display flex
            margin-top 48px
            flex-direction column

            h4
                font-family: iran-yekan;
                font-size: 2em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.73;
                letter-spacing: normal;
                text-align: center;
                color: #0045ff;
                @media only screen and (max-width: 992px)
                    font-size 1.6em

            p
                font-family: iran-yekan;
                font-size: 1.5em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.71;
                letter-spacing: normal;
                text-align: right;
                margin-top 32px
                color: #5c5c5c;
                @media only screen and (max-width: 992px)
                    font-size 1.2em

</style>
