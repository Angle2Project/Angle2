const pkg = require('./package')
module.exports = {
  mode: 'universal',  
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,minimum-scale=1.0,maximum-scale=1.0' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [      
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,800,900'},
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicons/apple-icon-57x57.png'},
      { rel: 'apple-touch-icon', sizes: '60x60',  href: '/favicons/apple-icon-60x60.png'},
      { rel: 'apple-touch-icon', sizes: '72x72',  href: '/favicons/apple-icon-72x72.png'},
      { rel: 'apple-touch-icon', sizes: '76x76',  href: '/favicons/apple-icon-76x76.png'},
      { rel: 'apple-touch-icon', sizes: '114x114',  href: '/favicons/apple-icon-114x114.png'},
      { rel: 'apple-touch-icon', sizes: '120x120',  href: '/favicons/apple-icon-120x120.png'},
      { rel: 'apple-touch-icon', sizes: '144x144',  href: '/favicons/apple-icon-144x144.png'},
      { rel: 'apple-touch-icon', sizes: '152x152',  href: '/favicons/apple-icon-152x152.png'},
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-icon-180x180.png'},
      { rel: 'icon', type: 'image/png', sizes: '192x192',  href: '/favicons/android-icon-192x192.png'},
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png'},
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicons/favicon-96x96.png'},
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png'}
    ],
    script: [      
      // { src: '/js/TweenMax.min.js' },
      // { src: '/js/MorphSVGPlugin.min.js'},
      // { src: '/js/SplitText.min.js' },
      // { src: '/js/ModifiersPlugin.min.js'}
      
      
      { src: '/angle2-nuxt/js/TweenMax.min.js' },      
      { src: '/angle2-nuxt/js/MorphSVGPlugin.min.js'},
      { src: '/angle2-nuxt/js/SplitText.min.js' },
      { src: '/angle2-nuxt/js/ModifiersPlugin.min.js' }
      
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'red' },

  /*
  ** Global CSS
  */
  css: [
    '@assets/css/normalize.css',
    '@assets/css/vue2-scrollbar.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  router: {
    base: '/angle2-nuxt/'
  },
  

  /*
  ** Build configuration
  */
  build: {    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
