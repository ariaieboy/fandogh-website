<template>
    <div class="row" style="min-height: 300px">
        <div class="col-lg-11 col-md-10 col-sm-8 col-xs-12 container-fluid">

            <p class="namespace-title">ساخت فضانام جدید</p>

            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-12"
                 style="border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.09); width: 100%; height: 62px; background-color: #fefefe; margin-top: 24px;margin-bottom: 64px; display: flex; padding: 0">
                <input v-model="namespace" dir="auto" type="text" placeholder="نام فضانام جدید را وارد نمایید..."
                       style="flex: 0.7 0 auto; padding: 0 16px; border: none; outline: none;border-radius: 3px;font-family: iran-yekan">
                <button style="color: #fefefe; flex: 0.3 0 auto; border: none; outline: none; background-color: #24D5D8;font-family: iran-yekan; border-top-left-radius: 3px; border-bottom-left-radius: 3px; cursor: pointer; font-size: 1.2em"
                        @click="createNamespace(namespace)">
                    ساخت فضانام
                </button>
            </div>

            <p class="namespace-title">لیست فضانام‌های شما</p>

            <div style="margin-top: 24px">
                <div class="row-custom between-xs">

                    <namespace-card v-for="ns in namespaces" :key="ns.name" :namespace="ns"></namespace-card>

                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import NamespaceCard from "../../../components/Namespace/namespace-card";
    import ErrorReporter from "~/utils/ErrorReporter";

    export default {
        name: "namespaces",
        layout: "dashboard",
        data() {
            return {
                namespaces: [],
                namespace: '',
            };
        },
        components: {NamespaceCard},

        methods: {
            async createNamespace(namespace) {
                if(namespace.toString().trim().length === 0)
                    return 0;

                this.$store.commit('SET_DATA', {data: true, id: 'loading'});
                try {
                    await this.$store.dispatch('createNewNamespace', namespace);
                    this.namespace = '';
                    this.fetchUserNamespaces();
                    this.$store.commit('SET_DATA', {data: false, id: 'loading'})
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    } else {
                        ErrorReporter(e, this.$data, true).forEach(error => {
                            this.$notify({
                                title: error,
                                time: 4000,
                                type: "error"
                            });
                        });

                    }
                }
            },
            async fetchUserNamespaces() {
                this.namespaces.length = 0;
                try {
                    this.namespaces = await this.$store.dispatch('requestUserNamespaces');
                    this.$store.commit('SET_DATA', {data: false, id: 'loading'})
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    } else {
                        ErrorReporter(e, this.$data, true).forEach(error => {
                            this.$notify({
                                title: error,
                                time: 4000,
                                type: "error"
                            });
                        });

                    }
                }
            },
            rtl(element) {
                if (element.setSelectionRange) {
                    element.setSelectionRange(0, 0);
                }
            }
        }, computed: {}, created() {

            this.fetchUserNamespaces();

        }
    }
</script>

<style scoped lang="stylus">

    @import '../../../assets/css/variables.styl'

    .row-custom
        box-sizing: border-box;
        display: flex;
        flex: 1 0 auto;
        justify-content start
        flex-direction: row;
        flex-wrap: wrap

    .namespace-title
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal

</style>

<style lang="css">
    input[type="text"]:-moz-placeholder {
        text-align: right;
        direction: rtl;
    }

    input[type="text"]:-ms-input-placeholder {
        text-align: right;
        direction: rtl;
    }

    input[type="text"]::-webkit-input-placeholder {
        text-align: right;
        direction: rtl;
    }
</style>
