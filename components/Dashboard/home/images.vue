<template>

    <div style="padding-bottom: 32px">

        <table-title :title="sectionTitle.title" :icon="sectionTitle.icon"></table-title>

        <empty-feature v-if="images.length === 0" :title="emptySection.title" :icon="emptySection.icon" :url="createImage">

        </empty-feature>

        <div v-else style="border-radius: 3px; width: 100%; background-color: #fefefe; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); box-sizing: content-box">

            <table-header :headers="headers"></table-header>

            <div style="margin-left: 12px; margin-right: 12px; margin-top: 12px">
                <table style="width: 100%; border: none; border-collapse: collapse; table-layout: fixed">
                    <tr v-for="(item, index) in images" v-if="index < 5" style="height: 40px; border-collapse: collapse; font-family: iran-yekan;font-size: 0.8em; color: #333333;
                            border-bottom: solid 1px rgba(0, 0, 0, 0.25); left: 12px">
                        <td :width="headers[0].width" style="text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">{{item.name}}</td>
                        <td :width="headers[1].width" style="text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">{{item.version}}</td>
                        <td :width="headers[2].width" style="text-align: center; font-family: iran-sans; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">{{item.date}}</td>
                    </tr>
                </table>
            </div>

            <table-navigation :title="navigation.title" :count="(images ? images.length : 0)"
                              :button="navigation.button" :link="goToImages"></table-navigation>
        </div>
    </div>
</template>

<script>
    import FDate from "~/utils/date";
    import FFromDate from "~/utils/fromDate";
    import TableHeader from "./children/table-header";
    import TableTitle from "./children/table-title";
    import TableNavigation from "./children/table-navigation";
    import Moment from 'moment-jalaali'
    import EmptyFeature from "./children/empty-feature";

    export default {
        components: {EmptyFeature, TableNavigation, TableTitle, TableHeader, Moment},
        data() {
            return {
                emptySection:{
                  title:'ایمیج',
                  icon: 'ic-image',
                },
                sectionTitle: {
                    title: 'ایمیج‌ها',
                    icon: 'ic-image'
                },
                headers: [
                    {title: 'نام ایمیج', width: '33%'},
                    {title: 'آخرین ورژن', width: '33%'},
                    {title: 'آخرین آپدیت', width: '33%'}
                ],
                navigation: {
                    title: 'تعداد ایمیج‌ها',
                    button: 'لیست ایمیج‌ها'
                }
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
                                date: Moment(last_version.date).format('jYYYY/jMM/jDD')
                            };
                        } else {
                            return {
                                name,
                                date: Moment(created_at.date).format('jYYYY/jMM/jDD')
                            };
                        }
                    });
                }
            }
        }, methods: {
            goToImages() {
                this.$router.push('/dashboard/images/')
            },
            createImage() {
                this.$router.push('/dashboard/images/create')
            },
        }
    };
</script>

