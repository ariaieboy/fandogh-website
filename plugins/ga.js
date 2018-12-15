/* eslint-disable */

export default ({ app }) => {
    if (process.env.NODE_ENV !== 'production') return
    app.router.afterEach((to, from) => {
 
      ga('set', 'page', 'fandogh.cloud '+ to.fullPath)
      ga('send', 'pageview')
    })
  }