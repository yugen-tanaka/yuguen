<template>
  <div class="flex flex-col items-center p-4 bg-[rgb(0,154,183)]">

    <div class="flex items-center gap-4  pb-4">
      <img src="/images/yuguen.webp" alt="Yuguen" class="w-12 h-12">
      <h1 class="text-4xl font-bold text-white">
        Yuguen
      </h1>
      <div class="flex items-center text-white">
        <Icon name="heroicons:map-pin-16-solid" class="mr-1" />
        Tokyo, Japan
      </div>
    </div>
    <div class="bg-white bg-opacity-80 p-4 rounded-xl shadow-none border-none w-full max-w-md mb-6">
      <div class="text-center font-bold text-sm uppercase text-black">
        NEWS
      </div>
      <div class="mt-4 text-black text-center">
        <p>5/10 新ピアノアルバム『風ぐるま』配信リリース</p>
        <p>New piano album "Kazaguruma" is out now!</p>
        <a href="https://linkco.re/80QAdCeQ" target="_blank" class="text-blue-500 underline">配信リンクはこちら</a>
      </div>
    </div>

    <section v-for="section in sections" :key="section.title" class="w-full max-w-md mb-6">
      <h2 class="text-xl font-semibold mb-3 pb-2 text-center text-white">
        Music
      </h2>
      <ul class="space-y-4">
        <li v-for="link in section.links" :key="link.name">
          <a :href="link.url" target="_blank"
            class="flex items-center p-2 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105 bg-white bg-opacity-80">
            <div class="flex items-center justify-center w-14 min-w-[56px]">
              <img v-if="link.img" :src="`/images/${link.img}`" alt="" class="w-[45px] h-[45px] rounded-lg" />
              <div v-else class="w-[45px] h-[45px]"></div>
            </div>

            <div class="flex-1 min-w-0 text-center">
              <span class="font-bold text-lg">{{ link.name }}</span>
            </div>

            <div class="w-14 min-w-[56px]"></div>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import sections from '../data/links.json';

definePageMeta({
  layout: false,
});
</script>
