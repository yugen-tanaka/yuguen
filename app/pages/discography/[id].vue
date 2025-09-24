<template>
  <div v-if="release">
    <!-- 背景 -->
    <NuxtImg
      :src="`/images/artworks/${release.id}.webp`"
      :alt="`${release.title} background`"
      class="fixed inset-0 w-full h-full object-cover bg-center blur-xl scale-110 -z-10"
      aria-hidden="true"
      preload
      fetchpriority="high"
      format="avif"
    />
    <div class="fixed inset-0 bg-black bg-opacity-50"></div>

    <!-- コンテンツ -->
    <div class="relative min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <div class="w-full max-w-md text-center">
        <!-- アートワーク -->
        <NuxtImg :src="`/images/artworks/${release.id}.webp`" :alt="release.title"
          width="256" height="256"
          class="w-64 h-64 mx-auto rounded-lg shadow-lg mb-4" />

        <!-- タイトルとアーティスト -->
        <h1 class="text-4xl font-bold">{{ release.title }}</h1>
        <p class="text-xl mb-1">Yuguen</p>
        <p class="text-sm mb-8">{{formatDate(release.release_date)}}・{{formatReleaseType(release.type,'ja')}}</p>
        <!-- 配信リンク一覧 -->
        <div v-if="release.platformUrls && release.platformUrls.length > 0" class="space-y-4">
          <a v-for="platformLink in release.platformUrls" :key="platformLink.id" :href="platformLink.url" target="_blank"
            class="flex items-center p-3 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 bg-white bg-opacity-90 text-black font-bold text-lg">

            <div class="flex items-center justify-center w-14 min-w-[56px]">
              <NuxtImg v-if="getPlatformInfo(platformLink.id, platforms)?.img"
                :src="`/images/services/${getPlatformInfo(platformLink.id, platforms).img}`"
                :alt="getPlatformInfo(platformLink.id, platforms)?.name"                
                :placeholder="20"
                class="w-8 h-8" />
            </div>

            <div class="flex-1 text-center">
              <span>{{ getPlatformInfo(platformLink.id, platforms)?.name_ja || platformLink.id }}</span>
            </div>

            <div class="w-14 min-w-[56px]"></div>
          </a>
        </div>
        <div v-else class="mt-8">
          <p>No streaming links available for this release.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import discographyData from '../data/discography.json';
import { platforms } from '../data/platforms.json';
import { getPlatformInfo, formatDate, formatReleaseType} from '../utils/utils.js';

definePageMeta({
  layout: false,
});

const route = useRoute();
const release = discographyData.find(r => r.id === route.params.id);

if (!release) {
  throw createError({ statusCode: 404, statusMessage: 'Release not found' });
}


</script>