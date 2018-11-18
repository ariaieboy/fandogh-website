<template>
    <div>
        <h2>راه اندازی سرویس</h2>
        <div class="row">
            <div class="col-md-6 col-xs-12" >
                <wizard btn_title="مرحله بعد">
                    <div class="fandogh-form-group">
                        <f-radio v-model="image_type" :options="image_types" title="نوع ایمیج" />

                    </div>
                    <a v-if="!images.length" href="https://docs.fandogh.cloud/docs/getting-started.html" target="_blank">
                        <f-label value="شما هیچ تصویری پابلیش نکرده اید٬ برای آپلود کردن تصویر می توانید از این لینک  استفاده کنید.
"   />
                    </a>
                    <div v-if="internal" class="row">
                        <div class="col-sm-8">
                            <div  class="fandogh-form-group">
                                <f-select v-model="image" title="نام ایمیج را انتخاب کنید" :options="images"  styles="input-white input-block input-dashboard" placeholder="نام ایمیج را انتخاب کنید"> </f-select>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="fandogh-form-group"  >
                                <f-select v-model="version" title="ورژن " :options="versions"  styles="input-white input-block input-dashboard" placeholder="ورژن ایمیج را انتخاب کنید"> </f-select>
                            </div>
                        </div>
                    </div>

                    <div v-else class="row">
                        <div class="col-sm-8">
                            <div  class="fandogh-form-group">
                                <f-input v-model="image_external"  styles="input-white input-block input-dashboard"  placeholder="نام ایمیج خارجی بنویسید"> </f-input>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div  class="fandogh-form-group">
                                <f-input v-model="version_external"  styles="input-white input-block input-dashboard"   placeholder="آخرین ورژن"> </f-input>
                            </div>
                        </div>
                    </div>

                    <div class="fandogh-form-group">
                        <f-input v-model="replicas"  styles="input-white input-block input-dashboard" type="number" placeholder="تعداد رپلیکاها را در این قسمت بنویسید"> </f-input>
                    </div>

                    <div  class="fandogh-form-group">
                        <f-input v-model="image_pull_policy"  styles="input-white input-block input-dashboard"  placeholder="Image Pull Policy"> </f-input>
                    </div>

                    <div  class="fandogh-form-group">
                        <f-input v-model="image_pull_secret"  styles="input-white input-block input-dashboard"  placeholder="Image Pull Secret"> </f-input>
                    </div>
                </wizard>
            </div>
        </div>
    </div>
</template>

<script>
  import FInput from '~/components/elements/input'
  import FButton from '~/components/elements/button'
  import FTable from '~/components/Dashboard/table'
  import FCheckbox from '~/components/elements/checkbox'
  import FSelect from '~/components/elements/select'
  import FLabel from '~/components/Dashboard/label'
  import Wizard from '~/components/Dashboard/wizard'
  import FRadio from '~/components/elements/radio'

  // yaml generator
  import jsyaml from 'js-yaml'

  export default {
    async asyncData({store, route, redirect}){
      try {
        await store.dispatch('getImages')
      } catch (e) {
        if(e.status === 401){
          redirect('/user/login')
        }
      }
    },
    data(){
      return {
        replicas: '',
        image: '',
        image_external: '',
        version_external: 'latest',
        version_loaded: false,
        version: false,
        image_type: '',
        image_pull_policy:'',
        image_pull_secret: '',
        image_types: [
          'داخلی فندق',
          'خارجی'
        ]
      }
    },
    computed:{
      internal(){
        return this.image_types[0] === this.image_type
      },
      images(){
        return this.$store.state.images.map(item => {
          return {
            title: item.name,
            value: item.name
          }
        })
      },
      versions(){
        if(!this.$store.state.versions) return []
        return this.$store.state.versions.map(item => {
          return {
            title: item.version,
            value: item.version
          }
        })
      },
      imageVersion(){
        if((!this.image.length || !this.version.length) && (!this.image_external.length || !this.version_external.length) ) return
        return (this.image+':'+this.version) || (this.image_external+':'+this.version_external)
      },
    },
    layout: 'dashboard',
    watch:{
      image(value, oldValue){
        this.version_loaded = false
        //this.version = ''
        let imageAndVersion = value.split(':');
        if(imageAndVersion.length > 1){
          this.image = imageAndVersion[0];
          this.$store.dispatch('getImageVersions', this.image).then(res => {
            this.version_loaded = true
            this.version = imageAndVersion[1];
          })
        } else {
          this.$store.dispatch('getImageVersions', value).then(res => {
            this.version_loaded = true
          })
        }

      },
      imageVersion(value) {
        this.$store.dispatch('manifestGenerator', {value, path: 'spec.image'})
      },
      replicas(value, oldValue){
        this.$store.dispatch('manifestGenerator', {value, path: 'spec.replicas'})
      },
      image_pull_policy(value, oldValue){
        this.$store.dispatch('manifestGenerator', {value, path: 'spec.image_pull_policy'})
      },
      image_pull_secret(value, oldValue){
        this.$store.dispatch('manifestGenerator', {value, path: 'spec.image_pull_secret'})
      },

    },
    methods:{
      nextStep(){
        this.$router.push('/dashboard/services/create/step3')
      }
    },
    components:{
      FInput,
      FButton,
      FCheckbox,
      FTable,
      FSelect,
      FLabel,
      Wizard,
      FRadio
    }
  }
</script>

<style scoped lang="stylus">
    .field-description
        font-size: 14px
        color: #b5b5b5
</style>