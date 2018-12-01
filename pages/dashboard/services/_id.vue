<template>
  <div>
    <h2>جزییات سرویس </h2>
    <div class="row">
      <div class="col-md-6 col-xs-12" >
        <div class="fandogh-form-group">
          <f-input v-model="service"  styles="input-white input-block input-dashboard input-disable" > </f-input>
        </div>
        <div class="fandogh-form-group">
          <f-input v-model="version"  styles="input-white input-block input-dashboard input-disable"> </f-input>
        </div>
        <div class="fandogh-form-group">
          <f-input v-model="date"  styles="input-white input-block input-dashboard input-disable" > </f-input>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="fandogh-form-group">
              <f-input v-model="port"  styles="input-white input-block input-dashboard input-disable" > </f-input>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="fandogh-form-group">
              <f-input v-model="internal"  styles="input-white input-block input-dashboard input-disable" > </f-input>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-xs-12" >
        <f-table :small="true" :header="header" :data="data"  title="env" />
      </div>
    </div>
    <h3>رپلیکاها :</h3>
    <div class="row">
      
    </div>
  </div>
</template>

<script>
  import FInput from '~/components/elements/input'
  import FButton from '~/components/elements/button'
  import File from '~/components/elements/file'
  import FTable from '~/components/Dashboard/table'

  export default {
    data(){
      return {
        image: this.$route.params.image,
        header: ['نام متغییر', 'مقدار متغیر'],
        data: [
          {
            rows: ['NODE_ENV', 'Production']
          }
        ]
      }
    },
    layout: 'dashboard',
    components:{
      FInput,
      FButton,
      File,
      FTable
    }
  }
</script>
