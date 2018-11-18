<template>
    <div>
        <h2> راه اندازی سرویس </h2>
        <div class="row">
            <div class="col-md-6 col-xs-12" >
               <wizard btn_title="مرحله بعد">
                   <div class="fandogh-form-group">
                       <f-input v-model="mount_path"  styles="input-white input-block input-dashboard" placeholder="Mount Path"> </f-input>
                   </div>
                   <div class="fandogh-form-group">
                       <f-input v-model="sub_path"  styles="input-white input-block input-dashboard" placeholder="Sub Path"> </f-input>
                   </div>

                   <div class="fandogh-form-group">
                       <f-button @onClick="addPath" styles="transparent border black" > افزودن به جدول</f-button>
                   </div>

                   <div class="fandogh-form-group margin-top-100">
                       <f-table :small="true" :header="header" :data="envsData"  title="env"
                                :actions="[{title:`<img src='/icons/ic-delete.svg' /> `, action:'delete'}]" @delete="deleteItem" />
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
  import ErrorReporter from '~/utils/ErrorReporter'
  import Wizard from '~/components/Dashboard/wizard'

  export default {
    layout: 'dashboard',
    data(){
      return {
        image: this.$route.params.image,
        header: ['نام متغییر', 'مقدار متغیر'],
        mount_path: '',
        sub_path: '',
        loading: false,
        volume_mounts: [
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
        return this.$dataTable({rows: this.volume_mounts, length: 2, props: ['mount_path', 'sub_path' ], id: 'mount_path'})
      }
    },
    methods:{
      deleteItem(name){
        this.volume_mounts = this.volume_mounts.filter(item => item.mount_path !== name)
      },
      addPath(){
        this.volume_mounts.push(
          {mount_path: this.mount_path, sub_path: this.sub_path}
        )
      },
    },
    watch:{
      volume_mounts(value, oldValue){
        this.$store.dispatch('manifestGenerator', {value, path: 'spec.volume_mounts'})
      },
    }
  }
</script>
