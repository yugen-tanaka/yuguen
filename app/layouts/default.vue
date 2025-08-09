<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';



</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50 text-gray-800">
    <header class="bg-white shadow-md sticky top-0 z-10">
      <div class="container mx-auto px-4 py-2 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/images/yuguen.webp" alt="Yuguen Logo" class="w-10 h-10 rounded-full">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Yuguen</h1>
            <p class="text-xs text-gray-500">ゆうげん</p>
          </div>
        </NuxtLink>
        <nav>
          <ul class="flex items-center gap-6">
            <li><NuxtLink to="/" class="text-gray-600 hover:text-gray-900 transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/news" class="text-gray-600 hover:text-gray-900 transition-colors">News</NuxtLink></li>
            <li><NuxtLink to="/biography" class="text-gray-600 hover:text-gray-900 transition-colors">Biography</NuxtLink></li>
            <li><NuxtLink to="/discography" class="text-gray-600 hover:text-gray-900 transition-colors">Discography</NuxtLink></li>
            <li><NuxtLink to="/links" class="text-gray-600 hover:text-gray-900 transition-colors">Links</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-white mt-8 py-4 border-t">
      <div class="container mx-auto px-4 flex justify-between items-center text-sm">
        <p class="text-gray-500 text-center">&copy; 2025 Yuguen</p>
        
      </div>
    </footer>
    <SpeedInsights />
  </div>
</template>