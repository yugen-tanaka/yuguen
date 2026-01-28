<template>
  <div v-if="release">
    <!-- 背景 -->
    <NuxtImg :src="`/images/artworks/${release.id}.webp`" :alt="`${release.title} background`"
      class="fixed inset-0 w-full h-full object-cover bg-center blur-xl scale-110 -z-10" aria-hidden="true" preload
      fetchpriority="high" format="avif" />
    <div class="fixed inset-0 bg-black bg-opacity-50"></div>

    <!-- コンテンツ -->
    <div class="relative min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <div class="w-full max-w-md text-center">
        <!-- アートワーク -->
        <NuxtImg :src="`/images/artworks/${release.id}.webp`" :alt="release.title" width="256" height="256"
          class="w-64 h-64 mx-auto rounded-lg shadow-lg mb-4" />

        <!-- タイトルとアーティスト -->
        <h1 class="text-4xl font-bold">{{ release.title }}</h1>
        <p class="text-xl mb-1">Yuguen</p>
        <p class="text-sm mb-8">{{ formatDate(release.release_date) }}・{{ formatReleaseType(release.type, 'ja') }}</p>
        <p v-if="release.description" class="p-2">{{ release.description }}</p>
        <!-- 配信リンク一覧 -->
        <div v-if="release.platformUrls && release.platformUrls.length > 0" class="space-y-4">
          <a v-for="platformLink in release.platformUrls" :key="platformLink.id" :href="platformLink.url"
            target="_blank"
            class="flex items-center p-3 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 bg-white bg-opacity-90 text-black font-bold text-lg">

            <div class="flex items-center justify-center w-14 min-w-[56px]">
              <NuxtImg v-if="getPlatformInfo(platformLink.id, platforms)?.img"
                :src="`/images/services/${getPlatformInfo(platformLink.id, platforms).img}`"
                :alt="getPlatformInfo(platformLink.id, platforms)?.name" :placeholder="20" class="w-8 h-8" />
            </div>

            <div class="flex-1 text-center">
              <span>{{ getPlatformInfo(platformLink.id, platforms)?.name_ja || platformLink.id }}</span>
            </div>

            <div class="w-14 min-w-[56px]"></div>
          </a>
        </div>
        <!-- urlあり -->
        <div v-else-if="release.url" class="mt-4">
          <a :href="release.url" target="_blank" rel="noopener"
            class="inline-flex items-center text-white-600 hover:text-gray-400 transition-colors hover:underline text-xl">
            配信リンク
            <Icon name="mdi:open-in-new" class="ml-1" size="1.1em" />
          </a>
        </div>
        <!-- 子リリース -->
        <div v-else-if="release.sub_releases" class="space-y-4">
          <a v-for="release in release.sub_releases" :key="release.title" :href="release.ulr" target="_blank"
            class="flex items-center p-3 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 bg-white bg-opacity-77">
            <div class="flex-1 text-center">
              <p class="text-black font-bold text-xl">{{ release.title }}</p>
              <p class="text-gray-500 text-sm">{{ release.note }}</p>
            </div>
          </a>
        </div>
        <!-- アーカイブされたリリース -->
        <div v-else-if="release.archive_info" class="space-y-4">
          <div v-if="release.archive_info.alternate_release_id">
            <div class="p-2">
              <p>{{ release.archive_info.note || "収録された以下のリリースにてお聴きいただけます。" }}</p>
            </div>
            <a :href="getReleaseInfo(release.archive_info.alternate_release_id)?.url || `/discography/${release.archive_info.alternate_release_id}`"
              target="_blank"
              class="flex items-center p-2 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 bg-white bg-opacity-80 text-black font-bold text-lg">
              <div class="flex items-center justify-center w-14 min-w-[56px]">
                <NuxtImg v-if="getReleaseInfo(release.archive_info.alternate_release_id)"
                  :src="`/images/artworks/${release.archive_info.alternate_release_id}.webp`"
                  :alt="getReleaseInfo(release.archive_info.alternate_release_id)?.title" :placeholder="20"
                  class="w-12 h-12" />
              </div>
              <div class="flex-1 text-center">
                <span>{{ getReleaseInfo(release.archive_info.alternate_release_id)?.title ||
                  release.archive_info.alternate_release_id }}</span>
              </div>
            </a>
          </div>
          <div v-else>
            <div>{{ release.archive_info.note }}</div>
          </div>

        </div>
        <div v-else class="mt-8">
          <p>No streaming links available for this release.<br>配信リンクが存在しません。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import discographyData from '../data/discography.json';
import { platforms } from '../data/platforms.json';
import { getPlatformInfo, formatDate, formatReleaseType } from '../utils/utils.js';

definePageMeta({
  layout: false,
});

const route = useRoute();
const release = discographyData.find(r => r.id === route.params.id);

if (!release) {
  throw createError({ statusCode: 404, statusMessage: 'Release not found' });
}

const getReleaseInfo = (id) => {
  if (!id) { return undefined; }
  return discographyData.find(r => r.id === id);
}


</script>