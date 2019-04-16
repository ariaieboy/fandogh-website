<template>

    <div style="padding-bottom: 32px">

        <table-title :title="sectionTitle.title" :icon="sectionTitle.icon"></table-title>
        <empty-feature v-if="secrets.length === 0" :title="emptySection.title" :icon="emptySection.icon" :url="goToSecrets">
        </empty-feature>

        <div v-else style="border-radius: 3px; width: 100%; background-color: #fefefe; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); box-sizing: content-box">

            <table-header :headers="headers"></table-header>

            <div style="margin-left: 12px; margin-right: 12px; margin-top: 12px">
                <table style="width: 100%; border: none; border-collapse: collapse;">
                    <tr v-for="(secret, index) in secrets" v-if="index < 5" style="height: 40px; border-collapse: collapse; font-family: iran-yekan;font-size: 0.8em; color: #333333;
                            border-bottom: solid 1px rgba(0, 0, 0, 0.25); left: 12px">
                        <td :width="headers[0].width" style="text-align: center; text-overflow: ellipsis">
                            {{secret.name}}
                        </td>
                        <td :width="headers[1].width" style="text-align: center; font-family: iran-sans">{{secret.created_at}}</td>
                        <td :width="headers[2].width" style="text-align: center; padding-left: 6px; padding-right: 6px">
                            {{secret.type}}
                        </td>
                    </tr>
                </table>
            </div>

            <table-navigation :title="navigation.title" :count="(secrets ? secrets.length : 0)"
                              :button="navigation.button"
                              :link="goToSecrets">

            </table-navigation>

        </div>
    </div>

</template>

<script>
    import Moment from 'moment-jalaali';
    import TableTitle from "./children/table-title";
    import TableHeader from "./children/table-header";
    import TableNavigation from "./children/table-navigation";
    import EmptyFeature from "./children/empty-feature";

    export default {
        layout: "dashboard",
        components: {EmptyFeature, TableNavigation, TableHeader, TableTitle},
        data() {
            return {
                emptySection:{
                    title:'سکرت',
                    icon: 'ic-secret',
                },
                sectionTitle: {
                    title: 'سکرت‌ها',
                    icon: 'ic-secret'
                },
                headers: [
                    {title: 'نام سکرت', width: '33%'},
                    {title: 'تاریخ ساخت', width: '33%'},
                    {title: 'نوع سکرت', width: '33%'},
                ],
                navigation: {
                    title: 'تعداد سکرت‌ها',
                    button: 'لیست سکرت‌ها'
                },
                header: [
                    {
                        label: "نام سکرت",
                        sortable: false,
                        key: "name",
                        tdClass: "ellipsis ltr"
                    },
                    {
                        label: "نوع سکرت",
                        sortable: false,
                        key: "type"
                    },
                    {
                        label: "تاریخ ساخت سکرت",
                        sortable: false,
                        key: "created_at"
                    }
                ]
            };
        },
        computed: {
            secrets() {
                let secrets = this.$store.state.secrets;
                if (secrets) {
                    return secrets.map(({memory, created_at, name, type, state}) => {
                        return {
                            name,
                            type: type,
                            memory: `Mi ${memory}`,
                            created_at: Moment(created_at).format('jYYYY/jMM/jDD')
                        };
                    });
                }
            }
        },
        methods:{
            goToSecrets(){
                this.$router.push('/dashboard/secret/')
            }
        }
    };
</script>

