import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import wizard from './wizard'
import plan from './plan'
const createStore = () => {
  return new Vuex.Store({
    state: () => {
      return {
        sidebar: 0,
        modals: {
          login: false,
          register: false,
          forgot_password: false,
          message: false,
          recovery:false
        },
        message: '',
        progress: 0,
        services: null,
        user:{
          token: null
        },
        images: null,
        versions: null,
        builds: null,
        domains: null,
        manifest: {},
        
      }
    },
    actions: actions,
    mutations: mutations,
    modules:{
      wizard,
      plan
    }
  })
}

export default createStore