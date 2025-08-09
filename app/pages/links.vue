<template>
    <div class="flex flex-col items-center p-4 bg-[rgb(0,154,183)]">

        <div class="flex items-center gap-4 pb-4">
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
                <p v-html="latestReleaseText"></p>
            </div>
        </div>

        <section v-for="section in sections" :key="section.title" class="w-full max-w-md mb-6">
            <h2 class="text-xl font-semibold mb-3 pb-2 text-center text-white">
                {{ section.title }}
            </h2>
            <ul class="space-y-4">
                <li v-for="link in section.links" :key="link.id">
                    <a :href="link.url" target="_blank"
                        class="flex items-center p-2 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105 bg-white bg-opacity-80">
                        <div class="flex items-center justify-center w-14 min-w-[56px]">
                            <img v-if="link.img" :src="`/images/services/${link.img}`" alt=""
                                class="w-[45px] h-[45px] rounded-lg" />
                            <div v-else class="w-[45px] h-[45px]"></div>
                        </div>

                        <div class="flex-1 min-w-0 text-center">
                            <span class="font-bold text-lg">{{ link.name_ja }}</span>
                        </div>

                        <div class="w-14 min-w-[56px]"></div>
                    </a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup>
import sectionsData from '../data/links.json';
import { platforms } from '../data/platforms.json';
import { getPlatformInfo, formatReleaseType, formatReleaseCategory } from '../utils/utils.js';
import discography from '../data/discography.json';

const sections = sectionsData.map((section) => {
    const updatedSection = { ...section };
    updatedSection.links = section.links.map((link) => {
        const platformInfo = getPlatformInfo(link.id, platforms);
        if (!platformInfo) {
            return { ...link, name_ja: link.id, name_en: link.id, img: '' };
        }
        return { ...link, name_ja: platformInfo.name_ja, name_en: platformInfo.name_en, img: platformInfo.img };
    });
    return updatedSection;
});

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

function formatMMDD(date) {
    if (!date) return '';
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

function generateReleaseText(lang = "ja") {
    const latest = findLatestRelease(discography);
    if (!latest) return '';

    const releaseDate = parseYMDToLocalDate(latest.release_date);
    if (!releaseDate) return '';

    const today = getTodayStart();
    const dateStr = formatMMDD(releaseDate);

    // 多言語テキスト辞書
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
            preSaveLinkText: "Pre-add here"
        }
    };
    const t = textMap[lang] || textMap.ja;

    // カテゴリとタイプのフォーマット
    const typeText = formatReleaseType(latest.type, lang);           // "シングル" / "アルバム" / "Single" / "Album"
    const categoryText = formatReleaseCategory(latest.category, lang); // "ピアノ" / "インスト" / "" / "Piano" etc.

    // タイトル部分の生成ルール
    let descriptor;
    if (lang === "ja") {
        if (latest.category === "vocal") {
            // カテゴリ名なし
            descriptor = (latest.type === "single") ? "新曲" : "新アルバム";
        } else {
            // カテゴリ名あり
            if (latest.type === "single") {
                descriptor = `新${categoryText}曲`;   // 例: 新ピアノ曲
            } else {
                descriptor = `新${categoryText}アルバム`; // 例: 新インストアルバム
            }
        }
    } else {
        if (latest.category === "vocal") {
            descriptor = (latest.type === "single")
                ? `New ${typeText}`    // New Single
                : `New ${typeText}`;   // New Album
        } else {
            descriptor = (latest.type === "single")
                ? `New ${categoryText} ${typeText}`  // New Piano Single
                : `New ${categoryText} ${typeText}`; // New Piano Album
        }
    }
    const releaseTitle = lang==='ja' ? `『${latest.title}』` : `"${latest.title_en}"`

    const baseText = `${dateStr} ${descriptor}${releaseTitle}`;

    // リリース済みかどうか
    const isReleased = releaseDate <= today;

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

const latestReleaseText = generateReleaseText();

definePageMeta({
    layout: false,
});
</script>