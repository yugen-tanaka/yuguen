<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center text-black">Discography</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="release in discography" :key="release.id" class="p-2">
        <NuxtLink :to="release.url || `/discography/${release.id}`" target="_blank" class="block">
          <img
            :src="`/images/artworks/${release.id}.webp`"
            :alt="release.title"
            class="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow"
          />
          <h2 class="mt-2 text-lg font-semibold text-left text-black">{{ release.title }}</h2>
          <p>{{ formatDate(release.release_date) }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import discographyData from '../data/discography.json';

const discography = [...discographyData].sort((a, b) => {
  return new Date(b.release_date) - new Date(a.release_date);
});

function formatDate(date) {
    return date.replaceAll('-', '.')
};
</script>