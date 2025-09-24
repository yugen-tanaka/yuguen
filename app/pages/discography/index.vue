<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-left text-black">Discography</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="release in discography" :key="release.id" class="p-2">
        <NuxtLink :to="release.url || `/discography/${release.id}`" target="_blank" class="block">
          <NuxtImg :src="`/images/artworks/${release.id}.webp`" :alt="release.title" width="600" height="600"
            class="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow" />

          <h2 class="mt-2 text-lg font-semibold text-left text-black">{{ release.title }}</h2>


          <p class=" text-sm text-left text-neutral-500">{{ formatDate(release.release_date) }}・{{
            formatReleaseType(release.type) }}</p>

        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import discographyData from '../data/discography.json';
import { formatDate, formatReleaseType } from '../utils/utils.js';

const discography = [...discographyData].sort((a, b) => {
  return new Date(b.release_date) - new Date(a.release_date);
});


</script>