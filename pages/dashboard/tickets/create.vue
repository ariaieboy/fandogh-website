<template>
    <div>

        <form @submit.prevent="postTicket">
            <div class="form-group">
                <label>
                    <input type="text" placeholder="موضوع" v-model="ticket.title">
                </label>

                <label>
                    <select>
                        <option value="TECHNICAL">فنی</option>
                        <option value="TECHNICAL">فروش</option>
                    </select>
                </label>
                <label>
                    <textarea v-model="ticket.description"></textarea>
                </label>

                <div class="browser-container fandogh-form-group col-lg-6 col-md-6 col-xs-12 col-sm-12"
                     style="margin-top: 16px">
                    <input type="file" @change="onFileSelected">
                </div>
                <button class="btn btn-green" type="submit">ارسال تیکت</button>
            </div>
        </form>
    </div>
</template>

<script>
    import File from "~/components/elements/file";
    import LabelDisable from "../../../components/elements/label/label-disable";
    import {mapActions} from "vuex";

    export default {
        name: "create",
        components: {LabelDisable},
        layout: "dashboard",
        comments: {
            File,
        },
        data() {
            return {
                ticket: {
                    title: null,
                    description: null,
                    department: "SALE",
                    file: null
                }
            }

        },
        methods: {
            postTicket() {
                const fd = new FormData()
                fd.append('file', this.ticket.file)
                fd.append('title',this.ticket.title)
                fd.append('description',this.ticket.description)
                fd.append('department',this.ticket.department)
                this.$store.dispatch('tickets/postTicket', fd).then((res) => {
                    this.$notify({
                        title: res,
                        time: 3000,
                        type: "success"
                    });
                }).catch((err) => {
                    this.$notify({
                        title: err,
                        time: 3000,
                        type: "error"
                    });
                })
            },
            onFileSelected(event) {
                this.ticket.file = event.target.files[0]
            }
        }
    }
</script>

<style scoped>

</style>