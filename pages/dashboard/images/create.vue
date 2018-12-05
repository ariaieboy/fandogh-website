<template>
  <div class="row">
    <div class="col-md-6 col-xs-12" >
      <h2>ساخت ایمیج</h2>
      <div class="fandogh-form-group">
        <label>نام ایمیج</label>
        <f-input name="name" v-model="name" styles="input-white input-block input-dashboard" placeholder="نام ایمیج را در این قسمت بنویسید"> </f-input>
      </div>
      <div class="fandogh-form-group">
        <label>ورژن ایمیج</label>
        <f-input name="version" v-model="version" class="version" styles="input-white input-block input-dashboard" placeholder="ورژن ایمیج را در این قسمت بنویسید"> </f-input>
      </div>
      <div class="fandogh-form-group margin-40">
        <file class="file" id="source" />
      </div>
      <div class="fandogh-form-group margin-top-100">
        <f-button v-if="!loading" @onClick="createImage" styles="red block"  > اتمام ساخت </f-button>
        <f-button  v-if="loading && !loadingProgress"  styles="red block"  > در حال ساخت </f-button>
        <progress-bar v-if="loadingProgress" :progress="progress"> </progress-bar>
      </div>

    </div>
  </div>
</template>

<script>
  import FInput from '~/components/elements/input'
  import FButton from '~/components/elements/button'
  import File from '~/components/elements/file'
  import {formData} from "~/utils/formData";
  import ProgressBar from '~/components/Dashboard/progress-bar'
  import ErrorReporter from '~/utils/ErrorReporter'
  import FormValidator from '~/utils/formValidator'

  export default {
    layout: 'dashboard',
    data(){
      return {
        name: '',
        version: '',
        loading: false,
        loadingProgress: false
      }
    },
    computed:{
      progress(){
        return this.$store.state.progress
      }
    },
    components:{
      FInput,
      FButton,
      File,
      ProgressBar
    },
    methods:{
      createImage(){

        if(!FormValidator(this.$data, {name: {required: true, pattern: '^[A-Za-z0-9-_]+$', name: 'نام ایمیج'}})) return

        this.loading = true
        this.$store.dispatch('createImage', {name: this.name}).then(res => {

            this.$notify({
              title: res.message,
              time: 3000,
              type: 'success'
            })

          if(this.version.length){
            this.loadingProgress = true

            let fd = formData([
              {
                name: 'version',
                value: this.version
              },
              {
                type: 'image',
                name: 'source'
              }
            ])

            this.$store.dispatch('createImageVersion', {name: this.name, formData: fd}).then(res => {
              this.$notify({
                title: res.message,
                time: 4000,
                type: 'success'
              })
              this.loading = false
              this.loadingProgress = false
              this.$router.push(`/dashboard/images/${this.name}/versions/${this.version}/logs`)
            }).catch(e => {
              this.loading = false
              this.loadingProgress = false
              ErrorReporter(e, this.$data, true).forEach(error => {
                this.$notify({
                  title: error,
                  time: 4000,
                  type: 'error'
                })
              })
            })
          } else {
            this.loading = false
            this.$router.push('/dashboard/images')
          }
        }).catch(e => {
          this.loading = false
          ErrorReporter(e, this.$data, true).forEach(error => {
            this.$notify({
              title: error,
              time: 4000,
              type: 'error'
            })
          })
        })
      }
    }
  }
</script>