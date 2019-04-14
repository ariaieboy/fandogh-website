<template>
    <f-modal ref="modal" v-show="show"  :message="error" >
        <h2>فراموشی رمز عبور</h2>
        <div class="fandogh-form-group center margin-10">
            <f-input v-model="identifier" styles="input-color-blue" type="text" placeholder="ایمیل یا نام کاربری خود را وارد کنید" />
        </div>
        <div class="fandogh-form-group center margin-20 ">
            <f-button @onClick="recovery" styles="red block 80">{{title}}</f-button>
        </div>
    </f-modal>
</template>

<script>

  import FModal from '~/components/elements/modal'
  import FInput from '~/components/elements/input'
  import FButton from '~/components/elements/button'
  import FCheckbox from '~/components/elements/checkbox'
  import ErrorReporter from "~/utils/ErrorReporter";



  export default {
    components:{
      FModal,
      FInput,
      FButton,
      FCheckbox
    },
    data(){
      return {
        identifier: '',
        loading: false,
        error: null,
        message: null
      }
    },
    mounted(){
      this.$refs.modal.$on('onOverlay', function () {
        this.$store.dispatch('showModal', false)
      })
    },
    methods:{
      recovery(){
        if(this.loading) return
        this.loading = true
        this.error = null
        this.$store.dispatch('recoveryAccount', this.$data).then( response => {
          this.loading = false
          this.$store.dispatch('showModal')
          this.message = response
          this.$store.dispatch('showModal', 'message')
          this.$store.dispatch('setMessage', response.message)
        }).catch(e => {
          this.loading = false
          this.error = ErrorReporter(e, this.$data)
        })
      }
    },
    computed:{
      show(){
        return this.$store.state.modals.forgot_password
      },
      title(){
        return this.loading ? '...' : 'ارسال ایمیل '
      }
    }
  }
</script>
