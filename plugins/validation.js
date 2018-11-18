import Vue from 'vue'
const EventBus = new Vue()

let validations = {}

Vue.directive('required', {
  update: function (el, binding, vnode) {
    let value = vnode.data.model.value
    let name = vnode.data.model.expression
    validations[name] = Boolean(value) ? value : false
  }
})

Vue.directive('form', {
  update: function (el, binding, vnode) {
    Vue.nextTick(() => {
      // check form is valid
      let isValid = Object.values(validations).find(value => value)
      let keys = []
      if(!isValid){
        // iterate in input models
        for(let key in validations){
          if(validations.hasOwnProperty(key)) {
            if (!validations[key]) keys.push(key)
          }
        }

      }
      // emit form validation
      EventBus.$emit('validation', {isValid, keys})
    })
  }
})

export {EventBus as Validation}