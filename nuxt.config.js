module.exports = {
  /*
  ** Headers of the page
  */
  loading:{
    color: '#ff628f',
    height: '5px'
  },
  env: {
    API: process.env.API || 'https://api.fandogh.cloud/fa'
  },
  router: {
    middleware: ['authentication']
  },
  css: [
    'flexboxgrid/css/flexboxgrid.css',
    '@/assets/css/main.styl'
  ],
  head: {
    title: 'سرویس های ابری فندق',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'سرویس های ابری فندق، همه چیز با داکر فایل شروع میشه' }
    ],
    link: [
      { rel: 'iScon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  modules: [
    '@nuxtjs/pwa'
  ],
  manifest: {
    name: 'فندق',
    description: 'سرویس های ابری فندق'
  },
  /*
  ** Global CSS
  */
  //css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    extractCSS: true,
    vendor: ['axios']
  },
  plugins: ['~/plugins/progress-hover', {src: '~/plugins/google-map', ssr: false},'~/plugins/mixins', '~/plugins/validation']
}
