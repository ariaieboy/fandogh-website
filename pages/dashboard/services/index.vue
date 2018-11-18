<template>
  <div class="images" >
    <div class="row-block">
      <f-button styles="red" path="/dashboard/services/setup" > اجرای سرویس جدید </f-button>
    </div>
    <f-table :header="header" title="سرویس‌ های شما" :data="_services" :actions="[{title:`<img src='/icons/ic-delete.svg' /><span> حذف </span>`, action:'delete'}, {title:`<img src='/icons/ic-logs.svg' /> <span>مشاهده جزییات</span> `, action:'logs'}]"></f-table>
  </div>
</template>

<script>
  import FTable from '~/components/Dashboard/table'
  import FButton from '~/components/elements/button'
  import FDate from '~/utils/date'
  export default {
    layout: 'dashboard',
    async asyncData({store, route}){
      await store.dispatch('getServices')
    },
    data(){
      return {
        header: ['تاریخ ساخت سرویس', 'ورژن ایمیج', 'ایمیج سرویس', 'نام سرویس'],
      }
    },
    computed:{
      services(){
        let services = this.$store.state.services
        if(services) {
          return services.map(({start_date, name, service_type, state}) => {
            return {
              name,
              //version: last_version.version,
              version: '',
              image_service: '',
              start_date: FDate({date: start_date}),
            }
          })
        }
      },
      _services(){
        if(this.services){
          return this.$dataTable({rows: this.services, length: 4, props: ['name', 'version', 'image_service', 'start_date'], id: 'name'})
        }
      }
    },
    components:{
      FTable,
      FButton
    },
    methods:{
      delete(id){
        this.$alertify({
          title: `سرویس ${id} حذف شود؟`,
          description: ' آیا از حذف شدن سرویس خود مطمئن هستید؟'
        }, (status) =>{
          if(status){
            this.$store.dispatch('deleteService', id).then(res =>{
              this.$store.dispatch('getServices')
              this.$notify({
                title: res.message,
                type: 'success'
              })
            }).catch(e => {
              this.$notify({
                title: e.message,
                type: 'error'
              })
            })
          }
        })
      },
      logs(){
        this.$router.push(`/dashboard/services/${value}/logs`)
      }
    }
  }
</script>

