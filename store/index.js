import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
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
      plan: null,
      manifest: {}
    },
    actions: actions,
    mutations: mutations
  })
}

export default createStore