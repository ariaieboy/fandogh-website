<template>
    <div style="width: 100vw; height: 100vh; display: flex; align-items: center; background-color: #f0f4f8;">
        <nuxt-child/>
        <div class="col-lg-4 col-md-5 col-sm-12 col-xs-12 container-fluid"
             style="background-color: #fefefe;margin: auto; border-radius: 3px;
             vertical-align: auto; box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16); top: 40px; bottom: 40px;">
            <f-loading :isFull="true" v-if="loading"/>

            <div v-if="showModal" class="row" style="padding: 32px;">

                <img v-if="successful" class="payment-image" src="../../../assets/svg/payment-ok.svg" alt="payment-ok"/>
                <img v-else class="payment-image" src="../../../assets/svg/payment-error.svg" alt="payment-error"/>

                <p v-if="successful" style="color: black; text-align: center; width: 100%; font-size: 1.1em">پرداخت
                    موفقیت آمیز بود</p>
                <p v-else style="color: black; text-align: center; width: 100%; font-size: 1.1em">پرداخت با مشکل مواجه
                    شد!</p>

                <button v-if="successful" class="pay-button"
                        style="box-shadow: 0 3px 6px 0 rgba(60, 204, 56, 0.42); background-color: #3ccc38;"
                        @click="moveToProfile">اتمام پرداخت
                </button>

                <button v-else class="pay-button" @click="moveToPlanPage">بازگشت</button>

            </div>

        </div>
    </div>
</template>

<script>
    import FLoading from "~/components/Loading";
    import ErrorReporter from "~/utils/ErrorReporter";

    export default {
        name: "verify",
        layout: "land",
        components: {
            FLoading,
        }
        , data() {

            return {
                showModal: false,
                successful: false
            }

        },
        computed: {
            loading() {
                return this.$store.state.loading;
            }
        },
        mounted() {
            this.$store.commit("SET_DATA", {data: true, id: "loading"});
            this.verifyPayment();
            window.onbeforeunload = function() {
                return "You can not refresh payment verification page, it may result in data loss!";
            }
        }, methods: {
            async verifyPayment() {

                console.log('verification called: ' + Date.now());
                let id = this.$route.params['id'];
                let ref = this.$route.query['refid'];

                try {
                    await this.$store.dispatch('plan/verifyPayment', {'refId': ref, 'attemptId': id});
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    this.showModal = true;
                    this.successful = true;

                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    this.showModal = true;
                    this.successful = false;
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
            }, moveToPlanPage() {
                this.$router.push("/dashboard/plans")

            }, moveToProfile() {
                this.$router.push("/dashboard/account")
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .payment-image
        display block
        margin-left auto
        margin-right auto
        max-width 200px
        height auto

    .pay-button
        width 200px
        height 40px
        border-radius 25px
        display block
        margin-left auto
        margin-right auto
        border none
        outline none
        background-color #DB0A6C
        color white
        font-family iran-yekan
        font-size 0.9em
        cursor pointer
        box-shadow 0 3px 6px 0 rgba(219, 10, 108, 0.42)


</style>
