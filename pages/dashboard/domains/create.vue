<template>
    <div class="row">
        <h2 class="title_header">افزودن دامنه</h2>

        <div class="row" style="width: 100%">
            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-12"
                 style="border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.09); width: 100%; height: 62px; background-color: #fefefe; margin-top: 24px;margin-bottom: 64px; display: flex; padding: 0">
                <input v-model="name" dir="ltr" type="text" placeholder="نام دامنه جدید را وارد نمایید..."
                       style="flex: 0.7 0 auto; padding: 0 16px; border: none; outline: none;border-radius: 3px;font-family: iran-yekan">
                <button style="color: #fefefe; flex: 0.3 0 auto; border: none; outline: none; background-color: #24D5D8;
                font-family: iran-yekan; border-top-left-radius: 3px; border-bottom-left-radius: 3px; cursor: pointer; font-size: 1.2em"
                        @click="createDomain">
                    ساخت دامنه
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import FInput from "~/components/elements/input";
    import FButton from "~/components/elements/button";
    import ErrorReporter from "~/utils/ErrorReporter";
    import FormValidator from "~/utils/formValidator";

    export default {
        layout: "dashboard",
        components: {
            FInput,
            FButton
        },
        data() {
            return {
                name: "",
                loading: false,
            };
        },
        mounted() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
            this.$ga.event({
                eventCategory: "domain",
                eventAction: "click btn create domain"
            });
        },
        destroyed() {
        },
        methods: {
            createDomain() {
                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                this.$store
                    .dispatch("createDomain", this.$data)
                    .then(res => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        this.$notify({
                            title: "دامنه با موفقیت ساخته شد",
                            time: 4000,
                            type: "success"
                        });
                        this.$router.push(`/dashboard/domains/${this.name}`);
                    })
                    .catch(e => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        ErrorReporter(e, this.$data, true).forEach(error => {
                            this.$notify({
                                title: error,
                                time: 4000,
                                type: "error"
                            });
                        });
                    });
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
