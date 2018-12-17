/* eslint-disable */

export default ({ app }) => {
    if (process.env.NODE_ENV !== 'production') return
    app.router.afterEach((to, from) => {
 
      app.ga('set', 'page', 'fandogh.cloud '+ to.fullPath)
      app.ga('send', 'pageview')
    })
  }