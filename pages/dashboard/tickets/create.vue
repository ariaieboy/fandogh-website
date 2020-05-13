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
                    <input type="file" @change="onFileSelected" multiple="multiple" ref="file">
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
                },
                formData: new FormData()
            }

        },
        methods: {
            postTicket() {

                this.formData.append('file', this.ticket.file)
                this.formData.append('title', this.ticket.title)
                this.formData.append('description', this.ticket.description)
                this.formData.append('department', this.ticket.department)
                this.$store.dispatch('tickets/postTicket', this.formData).then((res) => {
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
                for( let i = 0; i < this.$refs.file.files.length; i++ ){
                    this.formData.append('file', this.$refs.file.files[i]);
                }
            }
        }
    }
</script>

<style scoped>

</style>