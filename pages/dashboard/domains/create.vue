<template>
  <div class="row">
    <div class="col-md-6 col-xs-12" >
      <h2>افزودن دامنه</h2>
      <div class="fandogh-form-group">
        <label>نام دامنه</label>
        <f-input v-model="name"  styles="input-white input-block input-dashboard" placeholder="نام دامنه را در این قسمت بنویسید"> </f-input>
      </div>
      <div class="fandogh-form-group margin-top-100">
        <f-button v-if="!loading" @onClick="createDomain" styles="red block"   > مرحله بعد </f-button>
        <f-button v-if="loading" styles="red block" > در حال ساخت... </f-button>
      </div>
    </div>
  </div>
</template>

<script>
  import FInput from '~/components/elements/input'
  import FButton from '~/components/elements/button'
  import ErrorReporter from '~/utils/ErrorReporter'
  import FormValidator from '~/utils/formValidator'
  export default {
    layout: 'dashboard',
    components:{
      FInput,
      FButton
    },
    data(){
      return {
        name:'',
        loading: false
      }
    },
    mounted() {
       this.$ga.event({
            eventCategory: 'domain',
            eventAction: 'click btn create domain',
       
      })
    },
    methods:{
      createDomain(){
        let pattern = '^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$'
        if( !FormValidator(this.$data, {name: {required: true, pattern, name: 'نام دامنه'}} )) return false
        this.loading = true
        this.$store.dispatch('createDomain', this.$data).then(res => {
          this.$notify({
            title: 'دامنه با موفقیت ساخته شد',
            time: 4000,
            type: 'success'
          })
          this.$router.push(`/dashboard/domains/verification/${this.name}`)
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