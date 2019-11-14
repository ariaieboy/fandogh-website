<template>
    <div v-if="verifyUserAccess({ADMIN: 'ADMIN'})">
        <div>
            <h2 class="title_header">ویرایش سکرت</h2>

            <docker-secret :secret="secret" :editing="true" v-if="secret && secret.type === 'docker-registry'"></docker-secret>
            <general-secret v-else-if="secret && secret.type === 'environment-secret'" :secret="secret" :editing="true"></general-secret>
        </div>
    </div>
</template>

<script>
    import RoleAccessHandler from "../../../../utils/RoleAccessHandler";
    import DockerSecret from "../components/docker-secret";
    import GeneralSecret from "../components/environment-secret";

    export default {
        layout: "dashboard",
        name: "secret-name",
        data() {
            return {
                loading: false,
                loadingProgress: false,
                secret: null
            }
        },
        computed: {
            progress() {
                return this.$store.state.progress;
            },
            name() {
                return this.$route.params.name;
            }
        },
        components: {
            GeneralSecret,
            DockerSecret
        },
        destroyed() {
        },
        mounted() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
            this.$ga.event({
                eventCategory: "secret",
                eventAction: "put secret"
            });
            this.getSecretDetails()
        },
        methods: {
            verifyUserAccess(permitted_roles) {
                return RoleAccessHandler(permitted_roles)
            },
            async getSecretDetails() {
                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                try {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    this.secret = await this.$store.dispatch("getSecretDetails", this.name);
                }catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    }
                }

            }
        }
    };
</script>


<style lang="stylus" scoped>

    .title_header
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal

</style>


<style lang="stylus">

    .v-label
        background transparent !important


</style>
