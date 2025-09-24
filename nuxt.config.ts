// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // 開発中は有効にし、本番ビルドでは無効にする
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image'
  ],
  icon: {
    // アイコンデータをクライアントバンドルに含めることで、サーバーAPIを不要にします
    clientBundle: {
      // プロジェクト内のアイコンを自動的にスキャンしてバンドルに含めます
      scan: true,
    },
  },
  image: {
    format: ['avif', 'webp'],
    // VercelのImage Optimizationを利用するように設定します
    provider: 'vercel',
    quality: 70,
    screens: {
      xs: 360, sm: 384, md: 640, lg: 768, xl: 1024, '2xl': 1280
    },
    domains: ['www.yuguen.net'],
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  nitro: {
    // Edge Functionとしてデプロイするために 'vercel-edge' を指定します
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