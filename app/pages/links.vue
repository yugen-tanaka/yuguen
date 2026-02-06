<template>
  <div class="flex flex-col items-center p-4 bg-[rgb(0,154,183)]">

    <div class="flex items-center gap-4 pb-4">
      <NuxtImg src="/images/yuguen.webp" alt="Yuguen" width="48" height="48" class="w-12 h-12" />
      <h1 class="text-4xl font-bold text-white">Yuguen</h1>
      <div class="flex items-center text-white">
        <Icon name="heroicons:map-pin-16-solid" class="mr-1" />
        Tokyo, Japan
      </div>
    </div>

    <div class="bg-white bg-opacity-80 p-4 rounded-xl shadow-none border-none w-full max-w-md mb-6">
      <div class="text-center font-bold text-sm uppercase text-black">NEWS</div>
      <div class="mt-4 text-black text-center">
        <p v-html="latestReleaseText"></p>
      </div>
    </div>

    <section v-for="section in sections" :key="section.title" class="w-full max-w-md mb-6">
      <h2 class="text-xl font-semibold  pb-2 text-center text-white">{{ section.title }}</h2>
      <ul class="space-y-4">
        <li v-for="link in (section.isOpen ? section.links : section.links.slice(0, 3))" :key="link.id">
          <a :href="link.url" target="_blank"
             class="flex items-center p-2 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105 bg-white bg-opacity-80 text-black">
            <div class="flex items-center justify-center w-14 min-w-[56px]">
              <NuxtImg v-if="link.img" :src="`/images/services/${link.img}`" alt="" width="45" height="45" class="w-[45px] h-[45px] rounded-lg" />
              <div v-else class="w-[45px] h-[45px]"></div>
            </div>

            <div class="flex-1 min-w-0 text-center">
              <span class="font-bold text-lg">
                <!-- userLangに応じて表示切替 -->
                {{ userLang === 'ja' ? link.name_ja : (link.name_en || link.name_ja) }}
              </span>
            </div>

            <div class="w-14 min-w-[56px]"></div>
          </a>
        </li>
      </ul>
      <div v-if="section.links.length > 3" class="mt-4 flex justify-center">
        <button @click="section.isOpen = !section.isOpen"
                class="flex items-center gap-2 px-6 py-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold transition-all duration-300 backdrop-blur-sm">
          <span>{{ userLang === 'ja' ? (section.isOpen ? '折りたたむ' : 'さらに表示') : (section.isOpen ? 'Show Less' : 'Show More') }}</span>
          <Icon :name="section.isOpen ? 'heroicons:chevron-up-20-solid' : 'heroicons:chevron-down-20-solid'" class="w-5 h-5" />
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import sectionsData from '../data/links.json';
import { platforms } from '../data/platforms.json';
import { getPlatformInfo, formatReleaseType, formatReleaseCategory, isFuture } from '../utils/utils.js';
import discography from '../data/discography.json';

const userLang = ref('ja');
const sections = ref(sectionsData.map((section) => {
    const updatedSection = { ...section };
    updatedSection.links = section.links.map((link) => {
        const platformInfo = getPlatformInfo(link.id, platforms);
        if (!platformInfo) {
            return { ...link, name_ja: link.id, name_en: link.id, img: '' };
        }
        return { ...link, name_ja: platformInfo.name_ja, name_en: platformInfo.name_en, img: platformInfo.img };
    });
    updatedSection.isOpen = false;
    return updatedSection;
}));

// --- 日付処理系 ---
function parseYMDToLocalDate(ymd) {
    if (!ymd) return null;
    const parts = ymd.split('-').map((p) => parseInt(p, 10));
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    const [y, m, d] = parts;
    return new Date(y, m - 1, d);
}

function getTodayStart() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatMMDD(date, lang = 'ja') {
    if (!date) return '';
    if (lang === 'ja') {
        return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${mm}/${dd}`;
}

function findLatestRelease(discoArray) {
    if (!Array.isArray(discoArray) || discoArray.length === 0) return null;
    let latest = null;
    let latestDate = null;
    for (const item of discoArray) {
        const dt = parseYMDToLocalDate(item.release_date);
        if (!dt) continue;
        if (latestDate === null || dt > latestDate) {
            latestDate = dt;
            latest = item;
        }
    }
    return latest;
}

// --- テキスト生成 ---
function generateReleaseText(lang = "ja") {
    const latest = findLatestRelease(discography);
    if (!latest) return '';

    const releaseDate = parseYMDToLocalDate(latest.release_date);
    if (!releaseDate) return '';

    const today = getTodayStart();
    const dateStr = formatMMDD(releaseDate, lang);

    const textMap = {
        ja: {
            release: "配信リリース!",
            releasePlan: "配信リリース予定",
            preSave: "事前追加(Pre-add・Pre-save)してお待ちください!",
            linkText: "配信リンクはこちら",
            preSaveLinkText: "事前追加はこちら"
        },
        en: {
            release: "Available Now!",
            releasePlan: "Coming Soon",
            preSave: "Pre-add/Pre-save to your library!",
            linkText: "Listen here",
            preSaveLinkText: "Pre-add/Pre-save here"
        }
    };
    const t = textMap[lang] || textMap.ja;

    const typeText = formatReleaseType(latest.type, lang);
    const categoryText = formatReleaseCategory(latest.category, lang);

    let descriptor;
    if (lang === "ja") {
        if (latest.category === "vocal") {
            descriptor = (latest.type === "single") ? "新曲" : "新アルバム";
        } else {
            descriptor = (latest.type === "single")
                ? `新${categoryText}曲`
                : `新${categoryText}アルバム`;
        }
    } else {
        if (latest.category === "vocal") {
            descriptor = (latest.type === "single")
                ? `New ${typeText}`
                : `New ${typeText}`;
        } else {
            descriptor = (latest.type === "single")
                ? `New ${categoryText} ${typeText}`
                : `New ${categoryText} ${typeText}`;
        }
    }
    const releaseTitle = lang === 'ja' ? `『${latest.title}』` : `"${latest.title_en}"`;
    const baseText = `${dateStr} ${descriptor}${releaseTitle}`;

    const isReleased =  !isFuture(releaseDate);

    if (isReleased) {
        const linkPart = latest.url
            ? `<br><a href="${latest.url}" target="_blank" class="text-blue-500 underline">${t.linkText}</a>`
            : '';
        return `${baseText} ${t.release}${linkPart}`;
    } else {
        const linkPart = latest.url
            ? `<br><a href="${latest.url}" target="_blank" class="text-blue-500 underline">${t.preSaveLinkText}</a>`
            : '';
        return `${baseText} ${t.releasePlan}<br>${t.preSave}${linkPart}`;
    }
}

// --- デフォルトは日本語 ---
const latestReleaseText = ref(generateReleaseText('ja'));

// --- マウント後に英語環境なら差し替え ---
onMounted(() => {
    if (navigator.language && !navigator.language.startsWith('ja')) {
        latestReleaseText.value = generateReleaseText('en');
        userLang.value = 'en';
    }
});

definePageMeta({
    layout: false,
});
</script>