<template>
  <div>
    <div class="bg-[rgb(0,154,183)]">
      <section class="container mx-auto px-4 py-12 text-center">
        <h1 class="text-6xl md:text-8xl font-bold mb-4 text-white">Yuguen</h1>
        <p class="text-2xl text-gray-100">ゆうげん</p>
        <p class="mt-4 text-lg text-white">ピアノ、インスト、歌もの楽曲を制作しています。</p>
      </section>
    </div>

    <div class="container mx-auto px-4 py-12">
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Latest Release</h2>
        <div class="text-center">
          <NuxtLink :to="latestRelease.url || `/discography/${latestRelease.id}`" target="_blank"
            class="inline-block max-w-sm">
            <img :src="`/images/artworks/${latestRelease.id}.webp`" :alt="latestRelease.title"
              class="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow" />
            <h2 class="mt-2 text-lg font-semibold text-center text-black">{{ latestRelease.title }}</h2>
            <p class="text-sm text-center text-neutral-500">{{ formatDate(latestRelease.release_date) }}・{{
              formatReleaseType(latestRelease.type) }}</p>
          </NuxtLink>
        </div>
        <div class="text-center mt-8">
          <NuxtLink to="/discography"
            class="inline-block text-gray-600 border border-gray-400 py-2 px-6 rounded-full hover:bg-gray-100 transition">
            <div class="flex item-center">
              View More
              <Icon name="formkit:arrowright" class="ml-2 relative translate-y-1"></Icon>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">News</h2>
        <ul class="divide-y divide-gray-200 max-w-2xl mx-auto">
          <li v-for="newsItem in sortedNews.slice(0, 3)" :key="newsItem.id">
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
        <div class="text-center mt-8">
          <NuxtLink to="/news"
            class="inline-block text-gray-600 border border-gray-400 py-2 px-6 rounded-full hover:bg-gray-100 transition">
            <div class="flex item-center">
              View More
            <Icon name="formkit:arrowright" class="ml-2 relative translate-y-1"></Icon>
            </div>

          </NuxtLink>
        </div>
      </section>

      <section class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Follow Me</h2>
        <div class="flex justify-center items-center gap-6">
          <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank"
            class="text-gray-600 hover:text-gray-900 transition-colors">
            <Icon :name="`simple-icons:${link.id.toLowerCase()}`" class="w-8 h-8" />
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import discographyData from '../data/discography.json';
import { platforms } from '../data/platforms.json';
import { newsData } from '../data/news.json';
import linksData from '../data/links.json';
import { formatDate, formatReleaseType, getPlatformInfo } from '../utils/utils.js';

const sortedNews = [...newsData].sort((a, b) => {
  return new Date(b.publishedAt) - new Date(a.publishedAt);
});

const sortedReleases = [...discographyData].sort((a, b) => {
  return new Date(b.release_date) - new Date(a.release_date);
});
const latestRelease = sortedReleases[0];

const socialLinks = linksData.find(section => section.title === 'Socials')?.links || [];
</script>