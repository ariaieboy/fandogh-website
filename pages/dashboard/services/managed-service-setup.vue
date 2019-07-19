<template>
    <div>

    </div>

</template>

<script>
    export default {
        name: "managed-service-setup",
        layout: 'dashboard',
        service_name: null,
        data() {
            return {

                managed_service: {
                    mysql:
                        {
                            title: 'Mysql',
                            description: 'Database',
                            icon: 'mysql',
                            path: "mysql"
                        },

                    postgresql:
                        {
                            title: 'Postgresql',
                            description: 'Database',
                            icon: 'postgresql',
                            path: "postgresql"
                        },

                    redis:
                        {
                            title: 'Redis',
                            description: 'Cache Database',
                            icon: 'redis',
                            path: "redis"
                        },

                    proxy:
                        {
                            title: 'Proxy',
                            description: 'Proxy Service',
                            icon: 'proxy',
                            path: "proxy"
                        }
                }

            }
        },
        computed:{
            service_name(){
                return this.$route.query.hasOwnProperty('service') ? this.$route.query.service : null
            }
        }
    }
</script>

<style scoped>

</style>
