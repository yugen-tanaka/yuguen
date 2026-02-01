<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8 text-left text-black">Profile</h1>
        <div class="flex flex-col md:flex-row items-start gap-8">
            <div class="flex-shrink-0">
                <NuxtImg src="/images/yuguen.webp" alt="Yuguen" preload width="192" height="192" class="w-48 h-48" />
            </div>
            <div class="flex-grow">
                <div>
                    <h2 class="text-3xl font-bold text-gray-900">Yuguen</h2>
                    <p class="text-lg text-gray-500">ゆうげん</p>
                </div>
                <div class="mt-4 space-y-4 text-gray-700 leading-relaxed">
                    <p v-for="text in bodyText" :key="text">{{ text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const bodyText = [
    "東京都出身の学生ソングライター。",
    "ピアノソロやインストゥルメンタルの楽曲のほか、歌もの楽曲もリリースしその表現の幅を広げている。",
    "2021年、YouTubeチャンネル「Green Woodpecker / 作曲」を開設し、オリジナル楽曲の動画投稿を始める。",
    "2022年、ピアノアルバム『Karuizawa』を配信リリース。",
    "2023年3月、活動名義をYuguen(ゆうげん)へと改める。",
    "2024年1月、『Alpaca』を配信リリース。InstagramやTikTokで計380件以上の動画投稿に使用され、SNSを中心に親しまれている。",
    "2025年5月、3rdピアノアルバム『風ぐるま』を配信リリース。"
];
</script>