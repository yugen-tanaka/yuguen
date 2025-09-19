// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
      title: 'Yuguen',
      meta: [
        { name: 'description', content: 'Yuguen(ゆうげん)の公式アーティストページです。'},
        
        { property: 'og:title', content: 'Yuguen' },
        { property: 'og:description', content: 'Yuguen(ゆうげん)の公式アーティストページです。'},
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.yuguen.net/' }, 
        { property: 'og:image', content: 'https://www.yuguen.net/ogp.png' }, 
        
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@YuguenNotes' }, 
        { name: 'twitter:creator', content: '@YuguenNotes' }, 
        { name: 'twitter:title', content: 'Yuguen' },
        { name: 'twitter:description', content: 'Yuguen(ゆうげん)の公式アーティストページです。'},
        { name: 'twitter:image', content: 'https://www.yuguen.net/ogp.png' }, 
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/favicon.png' } 
      ]
    }
  }
})