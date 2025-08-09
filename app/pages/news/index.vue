<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-left text-black">News</h1>
    <ul class="divide-y divide-gray-200">
      <li v-for="newsItem in sortedNews" :key="newsItem.id">
        <NuxtLink :to="newsItem.url || `/news/${newsItem.id}`" :target="newsItem.url ? '_blank' : undefined"
          class="flex items-center py-4 hover:bg-gray-50 transition-colors group">
          <div class="w-32 flex-shrink-0 text-gray-500 group-hover:text-gray-700">
            {{ formatDate(newsItem.publishedAt) }}
          </div>
          <p class="flex-1 text-gray-800 group-hover:text-gray-900">
            {{ newsItem.title }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { newsData } from '../data/news.json';
import { formatDate } from '../utils/utils.js';

const sortedNews = [...newsData].sort((a, b) => {
  return new Date(b.publishedAt) - new Date(a.publishedAt);
});
</script>