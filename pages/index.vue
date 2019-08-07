<template>
    <section style="background: #fefefe; width: 100%">

        <div class="row" style="width: 100%">

            <slider/>
            <languages/>
            <audiences/>
            <language-tutorials/>
            <platform-features/>
            <business-solution/>


            <!--<div style="z-index: 2; width: 100%;padding-bottom: 16px; background: #0045ff; margin-top: 32px; display: flex; flex-direction: column; position:relative;">-->

                <!--<p style="font-family: iran-yekan; font-size: 2.4em; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.71; letter-spacing: normal; text-align: center; color: #fefefe; margin-left: auto; margin-right: auto; margin-top: 64px">-->
                    <!--داستان‌هایی از موفقیت فندق-->
                <!--</p>-->

                <!--<div class="row" style="padding: 0 64px; box-sizing: padding-box">-->

                    <!--<div class="col-lg-5 col-md-5 col-sm-12 col-xs-12"-->
                         <!--style="display: flex; flex-direction: column; margin-top: 32px">-->
                        <!--<img src="../assets/svg/customers/botick.png" width="200px" alt="botick"-->
                             <!--style="margin-left: auto; margin-right: auto">-->

                        <!--<p style="  font-family: iran-yekan; margin-top:16px;font-size: 20px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: center;color: #fefefe;">-->
                            <!--میتونیم به جرات بگیم فندق یک محصول داخلی، با کیفیت بین‌المللی هستش که واقعا خیلی از مشکلات-->
                            <!--ما رو حل کرده و باعث شده ما زمان بیشتری رو صرف توسعه محصولمون بکنیم، بدون اینکه ذره‌ای-->
                            <!--نگرانی بابت زیرساخت داشته باشیم….</p>-->

                    <!--</div>-->
                    <!--<div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">-->

                        <!--<vue-plyr class="success_player"-->
                                  <!--style="margin-top: 32px; border-radius: 25px !important; background: #080295; width: 100%; margin-bottom: 1px"-->
                                  <!--:options="{controls: ['play-large', 'progress','fullscreen']}">-->
                            <!--<video style="width: 100%">-->
                                <!--<source style="width: 100%" src="../assets/media/sample.mp4" type="video/mp4"/>-->
                            <!--</video>-->
                        <!--</vue-plyr>-->


                    <!--</div>-->

                <!--</div>-->

            <!--</div>-->

            <!--<div id="prices" class="row" style="width: 100%; margin: -2.8px 0 0 0; height: max-content; position: relative">-->

                <!--<div class="row"-->
                     <!--style="width: 100%; display: flex; flex-direction: column; margin: 0; padding: 0; height: auto;">-->
                    <!--<img src="../assets/svg/bottom_curve.svg" alt="bt" class="bottom-curve" width="100%"-->
                         <!--style=""/>-->
                    <!--<div style="width: 100%; z-index: 2; margin-top: -10%; display: flex">-->
                    <!--<p style="width: 100%; font-family: iran-yekan; font-size: 2.4em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;text-align: center;color: #fefefe;">-->
                        <!--قیمت‌گذاری‌ها</p>-->
                    <!--</div>-->

                <!--</div>-->

                <!--<div style="width: 100%; margin-top: 100px; position: relative">-->
                    <!--<p style="padding: 0 20%;  font-family: iran-yekan; font-size: 1.4em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: center;color: #3c3c3c;">-->
                        <!--سرویس‌ها در فندق با منابع کاملا اختصاصی کار میکنند و معماری آن‌ها به صورتی طراحی شده است تا-->
                        <!--بهینه‌ترین استفاده از منابع را داشته و بهترین راندمان را داشته باشند.</p>-->
                    <!--<p style="margin-top: 64px;font-family: iran-yekan;font-size: 2.4em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: center;color: #0045ff;">-->
                        <!--پلن‌های آماده</p>-->
                    <!--<div style="  height: 0; border: solid 2px #0045ff; margin: 0 30%; border-radius: 25px"></div>-->
                    <!--<p style="padding: 0 10%; margin-top:16px; font-family: iran-yekan;font-size: 1.4em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: center;color: #707070;">-->
                        <!--هر دوره ۳ ماهه، سکوی ابری فندق داده‌های مربوط به مصرف منابع مشتریان را طبقه بندی میکند و بسته به-->
                        <!--نوع کاربری کسب‌و‌کار آن‌ها را دسته‌بندی می‌کند.در انتها، ما این دسته‌بندی‌ها را در قالب پلن‌های-->
                        <!--پیشنهادی بر روی سایت قرار میدهیم، تا آن دسته از کاربرانی که میزان منابع مورد نیاز برای پروژه‌-->
                        <!--خود را به درستی نمی‌توانند محاسبه کنند از این پلن‌های آماده استفاده کنند.</p>-->
                <!--</div>-->

                <!--<div style="width: 100%; box-sizing: border-box; clear: both; height: max-content; display: flex; flex-direction: column; position: relative">-->

                    <!--<div class="row bg-test"-->
                         <!--style="width: 100%;padding: 32px; box-sizing: padding-box;">-->

                        <!--<div style="padding: 16px" class="col-lg-6 col-md-6 col-xs-12 col-sm-12">-->
                            <!--<div style="border-radius: 25px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16); background-color: #ffffff; padding: 16px;">-->
                                <!--<div style="width: 100%; display: flex">-->
                                    <!--<img src="../assets/svg/plans/free_plan.svg" alt="free"/>-->
                                    <!--<div style="width: 100%; display: flex; flex-direction: column">-->
                                        <!--<p style="  font-family: iran-yekan; font-size: 2em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.7;letter-spacing: normal;text-align: right;color: #0045ff;padding-right: 16px;margin-bottom: 5px; margin-top: 8px">-->
                                            <!--پلن رایگان</p>-->
                                        <!--<p style="  font-family: iran-yekan; font-size: 1.7em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: right;color: #535353; padding-right: 16px;">-->
                                            <!--رایگان</p>-->
                                    <!--</div>-->
                                <!--</div>-->

                                <!--<div class="row" style="width: 100%; margin-top: 32px">-->
                                    <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                         <!--style="display: flex; flex-direction: column">-->
                                        <!--<div style="display: flex; width: 100%">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">رم (حافظه تصادفی)</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۴۰۰ مگابایت</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">حافظه ذخیره‌سازی</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۲.۵ گیگابایت</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Load Balancer</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Monitoring</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                    <!--</div>-->
                                    <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                         <!--style="display: flex; flex-direction: column">-->
                                        <!--<div style="display: flex; width: 100%">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پردازنده</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۰.۵ هسته</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Dedicated Volume</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">ندارد</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Image Registry</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پشتیبانی حرفه‌ای</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                    <!--</div>-->
                                <!--</div>-->

                                <!--<div style="width: 100%; display: flex; margin-top: 48px; justify-content: center">-->
                                    <!--<button style="width: 100%; margin-left: 20%; margin-right: 20%; height: 45px;border-radius: 5px;box-shadow: 0 0 6px 0 rgba(41, 121, 255, 0.4);border: solid 1px #0045ff;background-color: #0045ff;color: #fefefe; font-family: iran-yekan; font-size: 1.4em; outline: none">-->
                                        <!--ثبت‌نام-->
                                    <!--</button>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div style="padding: 16px" class="col-lg-6 col-md-6 col-xs-12 col-sm-12">-->
                            <!--<div style="border-radius: 25px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16); background-color: #ffffff; padding: 16px;">-->
                                <!--<div style="width: 100%; display: flex">-->
                                    <!--<img src="../assets/svg/plans/free_plan.svg" alt="free"/>-->
                                    <!--<div style="width: 100%; display: flex; flex-direction: column">-->
                                        <!--<p style="  font-family: iran-yekan; font-size: 2em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.7;letter-spacing: normal;text-align: right;color: #0045ff;padding-right: 16px;margin-bottom: 5px; margin-top: 8px">-->
                                            <!--پلن رایگان</p>-->
                                        <!--<p style="  font-family: iran-yekan; font-size: 1.7em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: right;color: #535353; padding-right: 16px;">-->
                                            <!--رایگان</p>-->
                                    <!--</div>-->
                                <!--</div>-->

                                <!--<div class="row" style="width: 100%; margin-top: 32px">-->
                                    <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                         <!--style="display: flex; flex-direction: column">-->
                                        <!--<div style="display: flex; width: 100%">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">رم (حافظه تصادفی)</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۴۰۰ مگابایت</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">حافظه ذخیره‌سازی</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۲.۵ گیگابایت</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Load Balancer</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Monitoring</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                    <!--</div>-->
                                    <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                         <!--style="display: flex; flex-direction: column">-->
                                        <!--<div style="display: flex; width: 100%">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پردازنده</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۰.۵ هسته</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Dedicated Volume</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">ندارد</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Image Registry</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پشتیبانی حرفه‌ای</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                    <!--</div>-->
                                <!--</div>-->

                                <!--<div style="width: 100%; display: flex; margin-top: 48px; justify-content: center">-->
                                    <!--<button style="width: 100%; margin-left: 20%; margin-right: 20%; height: 45px;border-radius: 5px;box-shadow: 0 0 6px 0 rgba(41, 121, 255, 0.4);border: solid 1px #0045ff;background-color: #0045ff;color: #fefefe; font-family: iran-yekan; font-size: 1.4em; outline: none">-->
                                        <!--ثبت‌نام-->
                                    <!--</button>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div style="padding: 16px" class="col-lg-6 col-md-6 col-xs-12 col-sm-12">-->
                            <!--<div style="border-radius: 25px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16); background-color: #ffffff; padding: 16px;">-->
                                <!--<div style="width: 100%; display: flex">-->
                                    <!--<img src="../assets/svg/plans/free_plan.svg" alt="free"/>-->
                                    <!--<div style="width: 100%; display: flex; flex-direction: column">-->
                                        <!--<p style="  font-family: iran-yekan; font-size: 2em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.7;letter-spacing: normal;text-align: right;color: #0045ff;padding-right: 16px;margin-bottom: 5px; margin-top: 8px">-->
                                            <!--پلن رایگان</p>-->
                                        <!--<p style="  font-family: iran-yekan; font-size: 1.7em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: right;color: #535353; padding-right: 16px;">-->
                                            <!--رایگان</p>-->
                                    <!--</div>-->
                                <!--</div>-->

                                <!--<div class="row" style="width: 100%; margin-top: 32px">-->
                                    <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                         <!--style="display: flex; flex-direction: column">-->
                                        <!--<div style="display: flex; width: 100%">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">رم (حافظه تصادفی)</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۴۰۰ مگابایت</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">حافظه ذخیره‌سازی</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۲.۵ گیگابایت</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Load Balancer</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Monitoring</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                    <!--</div>-->
                                    <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                         <!--style="display: flex; flex-direction: column">-->
                                        <!--<div style="display: flex; width: 100%">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پردازنده</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۰.۵ هسته</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Dedicated Volume</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">ندارد</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Image Registry</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پشتیبانی حرفه‌ای</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                    <!--</div>-->
                                <!--</div>-->

                                <!--<div style="width: 100%; display: flex; margin-top: 48px; justify-content: center">-->
                                    <!--<button style="width: 100%; margin-left: 20%; margin-right: 20%; height: 45px;border-radius: 5px;box-shadow: 0 0 6px 0 rgba(41, 121, 255, 0.4);border: solid 1px #0045ff;background-color: #0045ff;color: #fefefe; font-family: iran-yekan; font-size: 1.4em; outline: none">-->
                                        <!--ثبت‌نام-->
                                    <!--</button>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div style="padding: 16px" class="col-lg-6 col-md-6 col-xs-12 col-sm-12">-->
                            <!--<div style="border-radius: 25px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16); background-color: #ffffff; padding: 16px;">-->
                                <!--<div style="width: 100%; display: flex">-->
                                    <!--<img src="../assets/svg/plans/free_plan.svg" alt="free"/>-->
                                    <!--<div style="width: 100%; display: flex; flex-direction: column">-->
                                        <!--<p style="  font-family: iran-yekan; font-size: 2em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.7;letter-spacing: normal;text-align: right;color: #0045ff;padding-right: 16px;margin-bottom: 5px; margin-top: 8px">-->
                                            <!--پلن رایگان</p>-->
                                        <!--<p style="  font-family: iran-yekan; font-size: 1.7em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: right;color: #535353; padding-right: 16px;">-->
                                            <!--رایگان</p>-->
                                    <!--</div>-->
                                <!--</div>-->

                                <!--<div class="row" style="width: 100%; margin-top: 32px">-->
                                    <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                         <!--style="display: flex; flex-direction: column">-->
                                        <!--<div style="display: flex; width: 100%">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">رم (حافظه تصادفی)</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۴۰۰ مگابایت</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">حافظه ذخیره‌سازی</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۲.۵ گیگابایت</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Load Balancer</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Monitoring</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                    <!--</div>-->
                                    <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                         <!--style="display: flex; flex-direction: column">-->
                                        <!--<div style="display: flex; width: 100%">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پردازنده</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۰.۵ هسته</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Dedicated Volume</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">ندارد</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Image Registry</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                        <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                            <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پشتیبانی حرفه‌ای</span>-->
                                            <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                        <!--</div>-->

                                    <!--</div>-->
                                <!--</div>-->

                                <!--<div style="width: 100%; display: flex; margin-top: 48px; justify-content: center">-->
                                    <!--<button style="width: 100%; margin-left: 20%; margin-right: 20%; height: 45px;border-radius: 5px;box-shadow: 0 0 6px 0 rgba(41, 121, 255, 0.4);border: solid 1px #0045ff;background-color: #0045ff;color: #fefefe; font-family: iran-yekan; font-size: 1.4em; outline: none">-->
                                        <!--ثبت‌نام-->
                                    <!--</button>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->

                        <!--<div style="width: 100%; margin-top: 64px">-->
                            <!--<p style="  font-family: iran-yekan;font-size: 2.4em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: center;color: #0045ff;">-->
                                <!--ماشین حساب</p>-->
                            <!--<p style="  font-family: iran-yekan;font-size: 1.6em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: center;color: #707070; padding: 0 20%;">-->
                                <!--با استفاده از ماشین حساب، پلن دلخواه خود را بسازید</p>-->

                            <!--<div style="width: 100%; padding: 16px; box-sizing: padding-box">-->
                                <!--<div class="row"-->
                                     <!--style="width: 100%;  border-radius: 25px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16); background-color: #ffffff; display: flex; flex-direction: column; padding: 32px; box-sizing: padding-box">-->

                                    <!--<div>-->

                                    <!--</div>-->

                                    <!--<div style="height: 0; border: solid 1px #d8d8d8; border-radius: 25px;"></div>-->

                                    <!--<div class="row" style="width: 100%; margin-top: 32px">-->

                                        <!--<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12" style="display: flex;">-->
                                            <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                                 <!--style="display: flex; flex-direction: column">-->
                                                <!--<div style="display: flex; width: 100%">-->
                                                    <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">رم (حافظه تصادفی)</span>-->
                                                    <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۴۰۰ مگابایت</span>-->
                                                <!--</div>-->

                                                <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                    <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">حافظه ذخیره‌سازی</span>-->
                                                    <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۲.۵ گیگابایت</span>-->
                                                <!--</div>-->

                                                <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                    <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Load Balancer</span>-->
                                                    <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                                <!--</div>-->

                                                <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                    <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Monitoring</span>-->
                                                    <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                                <!--</div>-->

                                            <!--</div>-->
                                            <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                                 <!--style="display: flex; flex-direction: column">-->
                                                <!--<div style="display: flex; width: 100%">-->
                                                    <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پردازنده</span>-->
                                                    <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۰.۵ هسته</span>-->
                                                <!--</div>-->

                                                <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                    <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Dedicated Volume</span>-->
                                                    <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">ندارد</span>-->
                                                <!--</div>-->

                                                <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                    <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Image Registry</span>-->
                                                    <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                                <!--</div>-->

                                                <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                    <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پشتیبانی حرفه‌ای</span>-->
                                                    <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                                <!--</div>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                        <!--<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12"-->
                                             <!--style="display: flex; flex-direction: column; justify-content: center">-->
                                            <!--<p style="  font-family: iran-yekan;font-size: 2.5em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: center;color: #535353;">-->
                                                <!--ماهیانه</p>-->
                                            <!--<p style="  font-family: iran-sans;font-size: 3em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: center;color: #0045ff;">-->
                                                <!--2,160,000</p>-->
                                            <!--<p style="  font-family: iran-yekan;font-size: 2.5em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.73;letter-spacing: normal;text-align: center;color: #535353;">-->
                                                <!--تومان</p>-->

                                        <!--</div>-->

                                    <!--</div>-->

                                    <!--<div style="width: 100%; margin-top: 16px; display: flex; justify-content: center;">-->
                                        <!--<button style="outline: none;border: none; width: 300px;height: 45px;border-radius: 15px;box-shadow: 0 0 6px 0 rgba(41, 121, 255, 0.4); background-color: #0045ff; color: #fefefe; font-family: iran-yekan; font-size: 1.4em;">-->
                                            <!--خرید پلن-->
                                        <!--</button>-->
                                    <!--</div>-->

                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div style="width: 100%; margin-top: 64px">-->

                            <!--<div style="width: 100%; padding: 16px; box-sizing: padding-box">-->

                                <!--<div class="row"-->
                                     <!--style="width: 100%; height: max-content;  border-radius: 25px 25px 25px 25px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16); background-color: #0045ff; display: flex; flex: 3">-->

                                    <!--<div style="flex: 1; height: available; padding: 32px; display: flex">-->

                                        <!--<p style="margin-top: auto; margin-bottom: auto; text-align: center;width: 100%; font-family: iran-yekan; font-size: 3.5em; font-weight: bold">-->
                                            <!--به زودی...</p>-->

                                    <!--</div>-->

                                    <!--<div style="flex: 2; height: 100%; background-color: #fefefe; border-radius: 125px 1000px 1000px 125px; display: flex; flex-direction: column; padding: 32px; box-sizing: padding-box">-->

                                        <!--<p style="text-align: center;width: 100%; font-family: iran-yekan; font-size: 2.5em; font-weight: bold; color: #0045ff">-->
                                            <!--Pay As You Go</p>-->

                                        <!--<div class="row" style="width: 100%; margin-top: 16px">-->

                                            <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"-->
                                                 <!--style="display: flex; justify-content: center; margin-right: 48px; margin-bottom: 32px">-->
                                                <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                                     <!--style="display: flex; flex-direction: column">-->
                                                    <!--<div style="display: flex; width: 100%">-->
                                                        <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">رم (حافظه تصادفی)</span>-->
                                                        <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۴۰۰ مگابایت</span>-->
                                                    <!--</div>-->

                                                    <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                        <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">حافظه ذخیره‌سازی</span>-->
                                                        <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۲.۵ گیگابایت</span>-->
                                                    <!--</div>-->

                                                    <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                        <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Load Balancer</span>-->
                                                        <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                                    <!--</div>-->

                                                    <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                        <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Monitoring</span>-->
                                                        <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                                    <!--</div>-->

                                                <!--</div>-->
                                                <!--<div class="col-xs-6 col-sm-6 col-lg-6 col-md-6"-->
                                                     <!--style="display: flex; flex-direction: column">-->
                                                    <!--<div style="display: flex; width: 100%">-->
                                                        <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پردازنده</span>-->
                                                        <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">۰.۵ هسته</span>-->
                                                    <!--</div>-->

                                                    <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                        <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Dedicated Volume</span>-->
                                                        <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">ندارد</span>-->
                                                    <!--</div>-->

                                                    <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                        <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">Image Registry</span>-->
                                                        <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                                    <!--</div>-->

                                                    <!--<div style="display: flex; width: 100%; margin-top: 16px;">-->
                                                        <!--<span style=" font-family: iran-yekan; font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1">پشتیبانی حرفه‌ای</span>-->
                                                        <!--<span style="  font-family: iran-yekan;font-size: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #3c3c3c; flex: 1; padding-right: 16px">رایگان</span>-->
                                                    <!--</div>-->
                                                <!--</div>-->
                                            <!--</div>-->

                                        <!--</div>-->

                                    <!--</div>-->

                                <!--</div>-->

                            <!--</div>-->

                        <!--</div>-->

                    <!--</div>-->

                <!--</div>-->

            <!--</div>-->

        </div>
    </section>
</template>
<script>
    import MainApp from '../components/Main/index.vue'
    import Features from '~/components/Features'
    import Devider from '~/components/elements/devider'
    import Solution from '~/components/Solution'
    import Tutorial from '~/components/Tutorial'
    import Prices from '~/components/Prices'
    import FCustomer from '~/components/Customer'
    import Slider from "../components/Landing/sections/slider";
    import Languages from "../components/Landing/sections/languages";
    import Audiences from "../components/Landing/sections/audiences";
    import LanguageTutorials from "../components/Landing/sections/language-tutorials";
    import PlatformFeatures from "../components/Landing/sections/platform-features";
    import BusinessSolution from "../components/Landing/sections/business-solution";

    export default {
        components: {
            BusinessSolution,
            Slider,
            FCustomer,
            MainApp,
            Features,
            Devider,
            Solution,
            Tutorial,
            Prices,
            Languages,
            Audiences,
            LanguageTutorials,
            PlatformFeatures
        },
        data() {
            return {}
        }
    }
</script>

<style lang="stylus" scoped>

    .bottom-curve
        background: url('~/assets/svg/bottom_curve.svg');
        background-size cover
        width 100%

</style>

<style lang="stylus" scoped>
    .row
        margin 0

    .bg-test
        width 50%
        background-size contain
        background url("../assets/svg/price_bg.svg") no-repeat right
</style>

<style lang="stylus">

    row
        margin-left 0 !important
        margin-right 0 !important


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

    .success_player
        .plyr
            border-radius 25px !important
            width 100% !important
            @media only screen and (max-width: 992px) {
                border-radius 0 !important
            }


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
</style>
