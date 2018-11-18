<template>
    <div>
        <h2>مرحله سوم </h2>
        <div class="row">
            <div class="col-md-6 col-xs-12" >
                <wizard btn_title="مرحله بعد">

                    <div class="fandogh-form-group">
                        <f-input v-model="name"  styles="input-white input-block input-dashboard" placeholder="نام متغیر"> </f-input>
                    </div>
                    <div class="fandogh-form-group">
                        <f-input v-model="value"  styles="input-white input-block input-dashboard" placeholder="مقدار متغییر"> </f-input>
                    </div>
                    <div class="flex-space">
                        <div class="flex margin-40">
                            <f-checkbox v-model="hidden" id="checkbox3"  styles="input-light" title="متغییر مخفی"  /> <span class="field-description"> </span>
                        </div>

                        <div class="fandogh-form-group">
                            <f-button @onClick="addEnv" styles="transparent black border" > افزودن به جدول</f-button>
                        </div>
                    </div>
                    <div class="fandogh-form-group margin-top-100">
                        <f-table :small="true" :header="header" :data="envsData"
                                @delete="deleteRow" title="env" :actions="[{title:`<img src='/icons/ic-delete.svg' /> `, action:'delete'}]" />
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
  import MultiSelect from '~/components/Dashboard/multiselect'
  import Wizard from '~/components/Dashboard/wizard'
  export default {
    layout: 'dashboard',
    data(){
      return {
        image: this.$route.params.image,
        header: ['نام متغییر', 'مقدار متغیر', 'مخفی'],
        name: '',
        value: '',
        hidden: false,
        env: [
        ]
      }
    },
    components:{
      FInput,
      FButton,
      FCheckbox,
      FTable,
      MultiSelect,
      Wizard
    },
    computed:{
      envsData(){
        return this.$dataTable({rows: this.env, length: 3, props: ['name', 'value','hidden' ], id: 'name'})
      }
    },
    methods:{
      deleteRow(name){
        this.env = this.env.filter(item => item.name !== name)
      },
      addEnv(){
        let name = this.name
        let value = this.value
        let hidden = this.hidden ? `<img src="/icons/success.svg" />` : `<img src="/icons/fail.svg" />`
        this.env.push(
          {name, value, hidden}
        )
      },
      nextStep(){
        this.$router.push('/dashboard/services/create/step4')
      }
    },
    watch:{
      env(value, oldValue){
        this.$store.dispatch('manifestGenerator', {value, path: 'spec.env'})
      },
    }
  }
</script>

<style scoped lang="stylus">
    .field-description
        font-size: 14px
        color: #b5b5b5
</style>