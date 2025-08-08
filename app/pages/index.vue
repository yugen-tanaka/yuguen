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

    <section class="w-full max-w-md mb-6">
      <h2 class="text-xl font-semibold mb-3 pb-2 text-center text-white">
        Music
      </h2>
      <ul class="space-y-4">
        <li v-for="musicLink in musicLinks" :key="musicLink.name">
          <a :href="musicLink.url" target="_blank"
            class="flex items-center p-2 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105 bg-white bg-opacity-80">
            <div class="flex items-center justify-center w-14 min-w-[56px]">
              <img v-if="musicLink.img" :src="`/images/${musicLink.img}`" alt="" class="w-[45px] h-[45px] rounded-lg" />
              <div v-else class="w-[45px] h-[45px]"></div>
            </div>

            <div class="flex-1 min-w-0 text-center">
              <span class="font-bold text-lg">{{ musicLink.name }}</span>
            </div>

            <div class="w-14 min-w-[56px]"></div>
          </a>
        </li>
      </ul>
    </section>

    <!-- Socials Section -->
    <section class="w-full max-w-md mb-6">
      <h2 class="text-xl font-semibold mb-3 pb-2 text-center text-white">
        Socials
      </h2>
      <ul class="space-y-4">
        <li v-for="social in socials" :key="social.name">
          <a :href="social.url" target="_blank"
            class="flex items-center p-2 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105  bg-white bg-opacity-80">
            <div class="flex items-center justify-center w-14 min-w-[56px]">
              <img v-if="social.img" :src="`/images/${social.img}`" alt="" class="w-[45px] h-[45px] rounded-lg" />
              <div v-else class="w-[45px] h-[45px]"></div>
            </div>

            <div class="flex-1 min-w-0 text-center">
              <span class="font-bold text-lg">{{ social.name }}</span>
            </div>

            <div class="w-14 min-w-[56px]"></div>
          </a>
        </li>
      </ul>
    </section>
    <section class="w-full max-w-md mb-6">
      <h2 class="text-xl font-semibold mb-3 pb-2 text-center text-white">
        Other
      </h2>
      <ul class="space-y-4">
        <li v-for="item in other" :key="item.name">
          <a :href="item.url" target="_blank"
            class="flex items-center p-2 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105  bg-white bg-opacity-80">
            <div class="flex items-center justify-center w-14 min-w-[56px]">
              <img v-if="item.img" :src="`/images/${item.img}`" alt="" class="w-[45px] h-[45px] rounded-lg" />
              <div v-else class="w-[45px] h-[45px]"></div>
            </div>

            <div class="flex-1 min-w-0 text-center">
              <span class="font-bold text-lg">{{ item.name }}</span>
            </div>

            <div class="w-14 min-w-[56px]"></div>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import linksData from '../data/links.json';

const musicLinks = linksData.musicLinks;
const socials = linksData.socials;
const other = linksData.other;
</script>
