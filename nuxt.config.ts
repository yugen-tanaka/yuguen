// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxt/image'],
  image: {
    // AVIFとWebPをサポートし、モダンブラウザでの表示を高速化します
    format: ['avif', 'webp'],
    // 画質とファイルサイズのバランスを取るための品質設定
    quality: 70,
    // レスポンシブイメージを生成するためのブレークポイント
    screens: {
      xs: 360, sm: 640, md: 768, lg: 1024, xl: 1280
    },
    // OGP画像などで使用しているドメインを許可します
    domains: ['www.yuguen.net'],
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  nitro: {
    // Vercelのエッジランタイムで動作するようにプリセットを変更します
    preset: 'vercel-edge',
  },
  routeRules: {
    // トップページを5分間 (300秒) キャッシュし、バックグラウンドで再生成します
    '/': { isr: 300 },
    // 個別の楽曲ページも同様にキャッシュします
    '/discography/**': { isr: 300 },
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