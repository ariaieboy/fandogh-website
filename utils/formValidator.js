import Vue from 'vue'
export default (fields, requiredFields) => {
  let pass = true
  Object.keys(fields).forEach(key => {
    if(Object.keys(requiredFields).includes(key)){
      let field = fields[key]
      let name = ` "${requiredFields[key].name || key}" `
      let msg = ` "${requiredFields[key].msg || key}" `
      if(requiredFields[key].required && (!field || !field.length)) {
        pass = false
        Vue.prototype.$notify({
          title: `فیلد ${name} اجباری است`,
          type: 'error'
        })
      } else {
        if(requiredFields[key].pattern) {
          let pattern = new RegExp(requiredFields[key].pattern)
          if(!pattern.test(field)) {
            pass = false
            Vue.prototype.$notify({
              title: msg || `از کارکترهای مجاز برای فیلد ${name} استفاده کنید`,
              type: 'error'
            })
          }
        }
      }

    }
  })
  return pass
}