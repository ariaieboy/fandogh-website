<template>
    <div>
        <h2> راه اندازی سرویس </h2>
        <div class="row">
            <div class="col-md-6 col-xs-12" >
                <wizard btn_title="مرحله بعد">
                    <div class="fandogh-form-group">
                        <f-input v-model="port"  styles="input-white input-block input-dashboard" placeholder="Inside Port"> </f-input>
                    </div>
                    <div class="fandogh-form-group">
                        <f-input v-model="target_port"  styles="input-white input-block input-dashboard" placeholder="Outside Port"> </f-input>
                    </div>
                    <div class="fandogh-form-group">
                        <f-select v-model="protocol" :options="protocols"  placeholder="Protocol"> </f-select>
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
  import FSelect from '~/components/elements/select'
  import ErrorReporter from '~/utils/ErrorReporter'
  import Wizard from '~/components/Dashboard/wizard'

  export default {
    layout: 'dashboard',
    data(){
      return {
        image: this.$route.params.image,
        header: ['Inside Port', 'Outside Port', 'Protocol'],
        port: '',
        target_port: '',
        protocol:'',
        protocols:[
          {
            title: 'TCP'
          },
          {
            title: 'UDP'
          }
        ],
        port_mapping: [
        ]
      }
    },
    components:{
      FInput,
      FButton,
      FCheckbox,
      FTable,
      FSelect,
      Wizard
    },
    computed:{
      envsData(){
        return this.$dataTable({rows: this.port_mapping, length: 3, props: ['port', 'target_port', 'protocol' ], id: 'port'})
      }
    },
    methods:{
      deleteItem(name){
        this.volume_mounts = this.port_mapping.filter(item => item.mount_path !== name)
      },
      addPath(){
        this.port_mapping.push(
          {port: this.port, target_port: this.target_port, protocol: this.protocol}
        )
      },
    },
    watch:{
      port_mapping(value, oldValue){
        this.$store.dispatch('manifestGenerator', {value, path: 'spec.port_mapping'})
      },
    }
  }
</script>
