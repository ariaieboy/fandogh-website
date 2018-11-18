<template>
    <div>
        <h2> راه اندازی سرویس </h2>
        <div class="row">
            <div class="col-md-6 col-xs-12" >
                <wizard @onFinish="finish">
                    <h2>
                        Liveness
                    </h2>
                    <div class="fandogh-form-group">
                        <f-input v-model="initial_delay_seconds[0]"  styles="input-white input-block input-dashboard"
                                 placeholder="Initial Delay Seconds"> </f-input>
                    </div>
                    <div class="fandogh-form-group">
                        <f-input v-model="period_seconds[0]"  styles="input-white input-block input-dashboard"
                                 placeholder="Period Seconds"> </f-input>
                    </div>
                    <div class="fandogh-form-group">
                        <f-input v-model="http_get_path[0]"  styles="input-white input-block input-dashboard"
                                 placeholder="Http get path"> </f-input>
                    </div>
                    <div class="fandogh-form-group">
                        <f-input v-model="http_get_port[0]"  styles="input-white input-block input-dashboard"
                                 placeholder="Http get port"> </f-input>
                    </div>
                    <h2>
                        Readiness
                    </h2>
                    <div class="fandogh-form-group">
                        <f-input v-model="initial_delay_seconds[1]"  styles="input-white input-block input-dashboard"
                                 placeholder="Initial Delay Seconds"> </f-input>
                    </div>
                    <div class="fandogh-form-group">
                        <f-input v-model="period_seconds[1]"  styles="input-white input-block input-dashboard"
                                 placeholder="Period Seconds"> </f-input>
                    </div>
                    <div class="fandogh-form-group">
                        <f-input v-model="http_get_path[1]"  styles="input-white input-block input-dashboard"
                                 placeholder="Http get path"> </f-input>
                    </div>
                    <div class="fandogh-form-group">
                        <f-input v-model="http_get_port[1]"  styles="input-white input-block input-dashboard"
                                 placeholder="Http get port"> </f-input>
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
        initial_delay_seconds: [],
        period_seconds: [],
        http_get_path: [],
        http_get_port: []
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
    methods:{
      finish(e){
        console.log(e)
      },
      updateManifest(value, prop){
        if(value[0]) {
          this.$store.dispatch('manifestGenerator', {value: value[0], path: 'liveness_prop.'+prop})
        }
        if(value[1]) {
          this.$store.dispatch('manifestGenerator', {value: value[1], path: 'readiness_prop.'+prop})
        }
      }
    },
    watch:{
      initial_delay_seconds(value, oldValue){
        this.updateManifest(value, 'initial_delay_seconds')
      },
      period_seconds(value, oldValue){
        this.updateManifest(value, 'period_seconds')
      },
      http_get_path(value, oldValue){
        this.updateManifest(value, 'http_get_path')
      },
      http_get_port(value, oldValue){
        this.updateManifest(value, 'http_get_port')
      },
    }
  }
</script>
