<template>
  <div>
    

    <h1 >
      Yuguen
    </h1>


    <section class="w-full max-w-sm mb-6">
      <h2 class="text-xl font-semibold mb-3 border-b-2 border-gray-700 pb-2">
        Music
      </h2>
      <ul class="space-y-4">
        <li v-for="musicLink in musicLinks" :key="musicLink.name">
          <a
            :href="musicLink.url"
            target="_blank"
            :class="`flex items-center justify-center p-4 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105`"
          >
            <span class="font-bold text-lg">{{ musicLink.name }}</span>
          </a>
        </li>
      </ul>
    </section>

    <!-- Socials Section -->
    <section class="w-full max-w-sm">
      <h2 class="text-xl font-semibold mb-3 border-b-2 border-gray-700 pb-2">
        Socials
      </h2>
      <ul class="space-y-4">
        <li>
          <a
            href="https://twitter.com/..."
            target="_blank"
            class="flex items-center justify-center p-4 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
          >
            <span class="font-bold text-lg">Twitter</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/..."
            target="_blank"
            class="flex items-center justify-center p-4 bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
          >
            <span class="font-bold text-lg">YouTube</span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import linksData from '../data/links.json';

const musicLinks = linksData.musicLinks;


</script>
