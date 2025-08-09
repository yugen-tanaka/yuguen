<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const menuItems = [
  { to: '/', text: 'Home' },
  { to: '/news', text: 'News' },
  { to: '/profile', text: 'Profile' },
  { to: '/discography', text: 'Discography' },
  { to: '/links', text: 'Links', target: '_blank', icon: 'ion:open-outline' }];
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50 text-gray-800">
    <header class="bg-white shadow-md sticky top-0 z-20">
      <div class="container mx-auto px-4 py-2 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-3" @click="closeMenu">
          <img src="/images/yuguen.webp" alt="Yuguen Logo" class="w-10 h-10">
          <div>
            <h1 class="text-2xl font-bold text-[rgb(0,154,183)]">Yuguen</h1>
            <p class="text-xs text-gray-500">ゆうげん</p>
          </div>
        </NuxtLink>
        <nav class="hidden md:block">
          <ul class="flex items-center gap-6">
            <li v-for="menuItem in menuItems" :key="menuItem.to">
              <NuxtLink :to="menuItem.to" :target="menuItem.target"
                class="text-gray-600 hover:text-gray-900 transition-colors">
                {{ menuItem.text }}
                <Icon v-if="menuItem.icon" :name="menuItem.icon" class="ml-2 relative -translate-x-2 translate-y-0.5"></Icon>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-gray-600 hover:text-gray-900 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Slide Over Menu -->
    <div v-if="isMenuOpen" class="fixed inset-0 z-30">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/50" @click="closeMenu"></div>

      <!-- Menu Panel -->
      <div class="fixed top-0 right-0 h-full w-64 bg-white shadow-lg">
        <div class="p-4 flex justify-end">
          <button @click="closeMenu" class="text-gray-600 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav class="mt-2">
          <ul class="flex flex-col">
            <li v-for="link in menuItems" :key="link.to">
              <NuxtLink :to="link.to" :target="link.target" @click="closeMenu"
                class="block py-3 px-6 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">{{ link.text }}
                <Icon v-if="link.icon" :name="link.icon"></Icon>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

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