<template>

    <!--<div>-->
    <!--<div style="padding-bottom: 32px">-->
        <!--<div style="box-sizing: content-box; padding: 12px; position:relative; display: flex; max-height: 36px">-->
            <!--<img src="../../../assets/svg/ic-docker.svg" alt="images-icon" style="max-width: 36px"/>-->
            <!--<span style="margin-top: auto; margin-bottom: auto; margin-right: 12px; color: #7c7c7c;">ایمیج ها</span>-->
        <!--</div>-->

        <!--<div style="border-radius: 3px; width: 100%; background-color: #fefefe; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); box-sizing: content-box">-->
            <!--<div style="background-color: #2979ff; border-top-left-radius: 3px; border-top-right-radius: 3px; margin-top: 0; padding-left: 12px; padding-right: 12px">-->
            <!--<table style="width: 100%; border: none; border-collapse: collapse;">-->
                <!--<tr style="height: 40px; border-collapse: collapse;   color: #fefefe;font-family: IRANYekan;font-size: 0.8em; font-weight: bold">-->
                    <!--<td width="25%" style="text-align: center">نام ایمیج</td>-->
                    <!--<td width="25%" style="text-align: center">ورژن</td>-->
                    <!--<td width="25%" style="text-align: center">آخرین آپدیت</td>-->
                    <!--<td width="25%" style="text-align: center">مبدا رجیستری</td>-->
                <!--</tr>-->
            <!--</table>-->
            <!--</div>-->
            <!--<div style="margin-left: 12px; margin-right: 12px; margin-top: 12px">-->
            <!--<table style="width: 100%; border: none; border-collapse: collapse;">-->
                <!--<tr v-for="item in images" style="height: 40px; border-collapse: collapse; font-family: IRANYekan;font-size: 0.8em; color: #333333;-->
                            <!--border-bottom: solid 1px rgba(0, 0, 0, 0.25); left: 12px">-->
                    <!--<td width="25%" style="text-align: center">{{item.name}}</td>-->
                    <!--<td width="25%" style="text-align: center">{{item.version}}</td>-->
                    <!--<td width="25%" style="text-align: center">{{item.date}}</td>-->
                    <!--<td width="25%" style="text-align: center">فندق</td>-->
                <!--</tr>-->
            <!--</table>-->
            <!--</div>-->

            <!--<div style=" display: block; padding: 12px">-->
                <!--<p style="margin:0; display: inline-block; font-size: 1em; color: #7c7c7c">تعداد ایمیج‌ها: {{images.length}}</p>-->
                <!--<button style="border-radius: 5px;box-shadow: 0 2px 6px 0 rgba(36, 213, 216, 0.42);background-color: #24d5d8;-->
  <!--color: #ffffff;  font-family: IRANYekan; font-size: 12px; padding: 8px 16px; outline: none; border: none; display: inline-block; float: left;-->
<!--cursor: pointer;" @click="goToImages">-->
                    <!--لیست ایمیج‌ها-->
                <!--</button>-->
            <!--</div>-->
        <!--</div>-->

    <!--</div>-->

    <div class="images">
    <div class="dashboard-home-wrapper">
    <div class="dashboard-home-header">
    <div class="dashboard-home-title">
    <img src="~assets/img/icons/ic_images.svg" alt="images">
    <span>ایمیج های شما</span>
    <router-link to="/dashboard/images">لیست ایمیج ها</router-link>
    </div>
    </div>
    <div class="table-responsive dashboard-home-table" v-bar v-if="images && images.length">
    <div class="table-scrolled">
    <b-table
    :fixed="true"
    :fields="header"
    stacked="lg"
    :items="images"
    empty-text="دیتایی وجود ندارد"
    ></b-table>
    <!-- <div class="dashboard-home-sum">
    <span>تعداد ایمیج ها:</span>
    <span>10</span>
    </div>-->
    </div>
    </div>
    </div>
    </div>
    <!--</div>-->
</template>

<script>
    import FDate from "~/utils/date";
    import FFromDate from "~/utils/fromDate";

    export default {
        data() {
            return {
                header: [
                    {
                        label: "نام ایمیج",
                        sortable: false,
                        key: "name",
                        tdClass: "ltr ellipsis"
                    },

                    {
                        label: "ورژن",
                        sortable: false,
                        key: "version",
                        tdClass: "ltr ellipsis"
                    },
                    {
                        label: "آخرین آپدیت",
                        sortable: false,
                        key: "date"
                    }
                    // {
                    //   label: "مبداء رجیستری",
                    //   sortable: false,
                    //   key: "date"
                    // }
                ]
            };
        },
        computed: {
            images() {
                let images = this.$store.state.images;
                if (images) {
                    return images.map(({created_at, name, last_version}) => {
                        if (last_version) {
                            return {
                                name,
                                // created_at: FDate({ date: created_at }),
                                version: last_version.version,
                                date: FFromDate(last_version.date)
                            };
                        } else {
                            return {
                                name,
                                date: FFromDate(created_at)
                            };
                        }
                    });
                }
            }
        },methods:{
            goToImages(){
                this.$router.push('/dashboard/images/')
            }
        }
    };
</script>

