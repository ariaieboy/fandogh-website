<template>
    <div>
        <div style="box-shadow: 0 2px 6px rgba(0,0,0,0.07); border-radius: 3px" class="table-responsive table-multicolor">
            <div class="table-title font-roboto">Environment Variables</div>
            <b-table
                    :fields="header"
                    :responsive="true"
                    :items="service.env"
                    style="max-height: 800px"
                    empty-text="متغیری برای این سرویس ست نشده است"
                    show-empty
            ></b-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "env",
        props: ['service'],
        data() {
            return {
                header: [
                    {
                        sortable: false,
                        label: "نام متغییر",
                        key: "name",
                        tdClass: "ellipsis ltr"
                    },
                    {
                        sortable: false,
                        label: "مقدار متغیر",
                        key: "value",
                        tdClass: "ellipsis ltr"
                    },
                    {
                        sortable: false,
                        label: "مقدار سکرت",
                        key: "secret",
                        tdClass: "ellipsis ltr"
                    }
                ],
                data: [{name: "NODE_ENV", value: "Production"}],
                image: this.$route.params.image,
            }
        },
        computed: {

            windowWidth() {
                return this.$store.state.windowWidth;
            },
        }
    }
</script>

<style scoped lang="stylus">

    .table-title
        display block
        box-sizing border-box
        padding 14px 0
        width 100%
        border-radius 3px 3px 0 0
        background-color #0045ff
        color #fff
        text-align center
        font-family yekan

</style>
