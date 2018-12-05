<template>
  <div>
    <h2>ایجاد دامنه </h2>
    <div class="row">
      <div class="col-md-6 col-xs-12" >

        <div class="fandogh-form-group">
          <f-input v-model="name"  styles="input-white input-block input-dashboard input-disable" > </f-input>
        </div>
        <div class="fandogh-form-group">
          <f-textarea disabled ß placeholder="لطفا روی دامنه مورد نظر یک رکورد با مقدار TXT زیر ایجاد کنید و روی کلید بررسی دامنه کلیک کنید"></f-textarea>
        </div>
        <div class="fandogh-form-group">
          <f-lable :value="domain.verification_key" title="کد فعالسازی"></f-lable>
        </div>
        <div class="fandogh-form-group margin-top-100">
          <f-button @onClick="verify" styles="red block"  > بررسی دامنه </f-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FInput from '~/components/elements/input'
  import FButton from '~/components/elements/button'
  import FTextarea from '~/components/Dashboard/textarea'
  import FLable from '~/components/Dashboard/label'

  export default {
    async asyncData({store, dispatch}){
      await store.dispatch('getDomains')
    },
    data(){
      return {
        name: this.$route.params.name,
        test:''
      }
    },
    computed:{
      domain(){
        let domain = this.$store.state.domains.find(domain => {
          return domain.name === this.name
        })
        return domain ? domain : {}
      },
    },
    layout: 'dashboard',
    components:{
      FInput,
      FButton,
      FTextarea,
      FLable
    },
    methods:{
      verify(){
        this.$store.dispatch('verificationDomain', {name: this.name}).then(res => {
          if(res.verified){
            this.$notify({
                  title: 'دامنه شما با موفقیت به سرویس متصل شد.',
                  type: 'success'
          })
          this.$router.push('/dashboard/domains')
          } else {
            this.$notify({
                  title: 'رکورد TXT شما روی دامنه صحیح نیست',
                  type: 'error'
          })
          }
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .field-description
    font-size: 14px
    color: #b5b5b5
</style>