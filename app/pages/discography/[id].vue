<template>
    <div class="relative min-h-screen bg-cover bg-center blur-xl" :style="{ backgroundImage: `url(/images/artworks/${release.id}.webp)` }">
  <div class="absolute inset-0 bg-black bg-opacity-60 ">
    
    
  </div>
  
  </div>

</template>

<script setup>
import discographyData from '../data/discography.json';
const route = useRoute();
const router = useRouter();

// URLのidパラメータから該当するリリースを検索
const release = discographyData.find(r => r.id === route.params.id);

// SmartLinkUrlがある場合はリダイレクトする
if (release && release.url) {
  router.replace(release.url);
}
</script>