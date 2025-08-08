// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
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
      meta: [{ name: 'description', content: 'Yuguen(ゆうげん)の音楽活動に関するリンクまとめサイトです。'}],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/favicon.png' } 
      ]
    }
  }
})