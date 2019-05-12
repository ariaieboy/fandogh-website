<template>
    <div>
        <p class="title">ساخت سرویس با Fandogh-CLI</p>
        <p style="margin-top: 32px">در این بخش‌ نحوه نصب و ساخت سرویس توسط فندق cli توضیح داده شده است</p>


        <div style="padding: 16px; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.07); background-color: #fefefe; margin-top: 16px">

            <h3>نصب Fandogh-CLI</h3>
            <div style="height: 2px; background-color: rgba(0,0,0,0.25); border-radius: 25px; width: 75%; margin-bottom: 48px"></div>
            <p>اولین قدم برای استفاده از فندق نصب CLI است. این CLI به شما کمک می کند تا بتوانید با استفاده از ترمینال، محیط ابری که به شما اختصاص داده شده است را مدیریت کنید. برای نصب CLI شما نیاز به داشتن پایتون و pip دارید.</p>
            <p>برای نصب CLI دستور زیر را اجرا کنید:</p>
            <p class="command">pip install fandogh-cli --upgrade $</p>

            <p>برای اینکه مطمئن شوید نصب به درستی انجام گرفته دستور زیر را اجرا کنید.</p>
            <p class="command">fandogh --version $</p>

            <p>برای دیدن مستندات دستورات Fandogh-CLI می توانید از قابلیت help-- استفاده کنید. این پارامتر مستندات تمام زیر دستورها و پارامترهای دستور را به شما نمایش می دهد. چند مثال:</p>
            <p class="command">fandogh --help $<br>fandogh login --help $<br>fandogh image --help $</p>

            <h3 style="margin-top: 50px">احراز هویت در فندق</h3>
            <div style="height: 2px; background-color: rgba(0,0,0,0.25); border-radius: 25px; width: 75%; margin-bottom: 48px"></div>
            <p>شما برای اینکه قادر به استفاده از امکانات فندق باشید قبل از هر چیز نیاز به login کردن دارید. بدین منظور می توانید از دستور زیر استفاده کنید.</p>
            <p class="command">fandogh login --username YOUR_USERNAME --password YOUR_PASSWORD $<br> Logged in successfully</p>


            <h3 style="margin-top: 50px">تعریف تصویر یا Image</h3>
            <div style="height: 2px; background-color: rgba(0,0,0,0.25); border-radius: 25px; width: 75%; margin-bottom: 48px"></div>
            <p>به منظور استقرار سرویس های شما بر روی فندق، این سرویسها باید به صورت تصویر داکر (Docker Image) تعریف شوند. اولین منظور تعریف نام تصویر است. برای مثال اگر نام تصویر شما ‌<span style="background-color: #2979ff; color: #fefefe; padding-left: 5px; padding-right: 5px; border-radius: 3px;">hello- world</span> است، میتوانید با استفاده از دستور زیر آن را در فندق تعریف کنید.</p>
            <p class="command">fandogh image init --name hello-world $<br>
            Image created successfully</p>


            <h3 style="margin-top: 50px">انتشار تصویر یا Image</h3>
            <div style="height: 2px; background-color: rgba(0,0,0,0.25); border-radius: 25px; width: 75%; margin-bottom: 48px"></div>
            <p>به منظور استقرار سرویس های شما بر روی فندق، این سرویسها باید به صورت تصویر داکر (Docker Image) تعریف شوند. اولین منظور تعریف نام تصویر است. برای مثال اگر نام تصویر شما پس از تعریف تصویر، شما میتوانید با استفاده از دستور <span style="background-color: #2979ff; color: #fefefe; padding-left: 5px; padding-right: 5px; border-radius: 3px;">image publish</span> نسخه جدیدی از تصویر را منتشر کنید. این دستور فایل Dockerfile و تمام فایلهای مرتبط به آن که در دایرکتوری جاری هستند را به صورت یک فایل zip شده به فندق ارسال می کند تا تصویر در سمت سرور ایجاد شود.</p>
            <p class="caution">توجه: شما با تعریف فایل .dockerignore میتوانید فایلها و دایرکتوریهای که نیازی به ارسال آنها برای ایجاد تصویر نیست را مستثنی کنید. با این کار معمولا حجم فایل zip شده کاهش چشم گیری پیدا میکند که منجر میشود ترافیک و زمان کمتری برای ارسال این فایل به فندق نیاز باشد.</p>
            <p class="command">fandogh image publish --version v1 $<br>
            Uploading the workspace  [####################################]  100%<br>
            "Version created successfully"<br>
            workspace is ready.<br><br>
            ... Image build logs</p>

            <p class="caution">توجه: به صورت پیش فرض پس از آپلود workspace بر روی فندق build log های تصویر به صورت real time به شما نمایش داده می شود، که می توانند به شما کمک کنند تا دلیل مشکلات احتمالی در Dockerfile خود را پیدا کنید. اگر نیاز به دیدن این log ها ندارید با استفاده از آپشن <span style="font-weight: bold; padding-left: 2px; padding-right: 2px;">d-</span> می توانید این امکان را غیر فعال کنید.</p>

            <p class="caution">توجه: شما با استفاده از دستور <span style="font-weight: bold; padding-left: 2px; padding-right: 2px; ">‍image logs</span> می توانید خروجی build log های مرتبط با هر یک از نسخه های تصویر را مشاهده نمایید.</p>
            <p style="margin-top: 32px">چند مثال:</p>
            <p class="command">fandogh image logs --version v1 $<br>
            fandogh image logs --image X --version V $<br>
                fandogh image logs --help $</p>


            <h3 style="margin-top: 50px">استقرار وب سایت بر روی فندق</h3>
            <div style="height: 2px; background-color: rgba(0,0,0,0.25); border-radius: 25px; width: 75%; margin-bottom: 48px"></div>
            <p>پس از اینکه تصویر شما با موفقیت توسط فندق ساخته شد، شما میتوانید با استفاده از دستور <span style="background-color: #2979ff; color: #fefefe; padding-left: 5px; padding-right: 5px; border-radius: 3px;">service deploy</span> یک سرویس از روی تصویر خود بر روی فندق مستقر کنید.</p>
            <p>شما می توانید پارامترهایی مانند متغیرهای محیط و یا پورتی که وب سرور شما بر روی آن در حال سرویس دهی است را تعریف نمایید.</p>
            <p>چند مثال:</p>

            <p>۱- ایجاد یک سرویس از روی نسخه v1 تصویری با نام hello-world با نام hello-word</p>
            <p class="command">fandogh service deploy --image hello-world --version v1 --name hello-world $</p>

            <p>۲- ایجاد یک سرویس از روی نسخه v1 تصویری با نام hello-world با نام hello-word با فرض اینکه وب سایت بر روی پورت 8080 در حال سرویس دهی است</p>
            <p class="command">fandogh service deploy --image hello-world --version v1 --name hello-world --port 8080 $</p>

            <p>مشاهده دستور help</p>
            <p class="command">fandogh service deploy --help $</p>

        </div>




    </div>
</template>

<script>
    export default {
        name: "cli_setup",
        layout: 'dashboard',
        created() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"})
        },
        computed:{

        },
        methods:{

        },
    }
</script>

<style lang="stylus" scoped>

    .title
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal

    .command
        border-radius 5px
        background-color #4554ff
        border-left 5px solid #181198
        padding 16px
        line-height 1.75
        text-align left
        color: #fefefe
        border-right 5px solid #181198

    .caution
        padding 16px
        color #474747
        border-radius 3px
        background-color rgba(255, 181, 6, 0.58)
        border-right 5px solid orange

    h3
        font-family iran-yekan
        font-weight bold

</style>