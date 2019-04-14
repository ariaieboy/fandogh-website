import * as actions from './actions'
import * as mutations from './mutations'

const wizardModule = () => {
  return {
    state: () => {
      return {
        steps: [
          {
            title: 'Service setup',
            path: '/dashboard/services/setup'
          },
          {
            title: 'Image Setup',
            path: '/dashboard/services/image'
          },
          {
            title: 'Environment variables',
            path:'/dashboard/services/environment_variables'
          },
          {
            title: 'Volume',
            path:'/dashboard/services/volume'
          },
          {
            title: 'Port Mapping',
            path:'/dashboard/services/port_mapping'
          },
          {
            title: 'Health Check',
            path:'/dashboard/services/health_check'
          }
        ]
      }
    },
    actions: actions,
    mutations: mutations
  }
}

export default wizardModule()