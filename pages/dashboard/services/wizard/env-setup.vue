<template>

    <div>

        <banner :page="page"></banner>


    </div>
    
</template>

<script>
    import Banner from "../../../../components/wizard/banner/banner";


    export default {
        name: "env-setup",
        components:{
            Banner,

        },
        data(){
            return{

                page: {
                    title: 'Environment variables',
                    description: 'برای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند در\n' +
                        '                ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند\n' +
                        '                در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که\n' +
                        '                می‌ماند در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق\n' +
                        '                که می‌ماند در ذهن‌ها'
                },

            }
        },
        methods:{

        },
        watch:{

        },
        computed:{

        },
        created(){

        },
        mounted(){

        }
    }
</script>

<style lang="stylus" scoped>

</style>