<template>
    <div>
        <h1>Profile</h1>
        <img src="/images/yuguen.webp" alt="">
        <h2>Yuguen(ゆうげん)</h2>
        <p v-for="text in bodyText">{{ text }}</p>
    </div>
</template>

<script setup>
const bodyText = [
    "2003年生まれ。東京都出身。",
    "ピアノソロやインストゥルメンタルの楽曲のほか、歌もの楽曲もリリースしその表現の幅を広げている。","　",
    "2021年、YouTubeチャンネル「Green Woodpecker / 作曲」を開設し、オリジナル楽曲の動画投稿を始める。",
    "2022年、ピアノアルバム『FLOW』、『Karuizawa』をリリース。",
    "2023年3月、活動名義をYuguen(ゆうげん)へと改める。",
    "2024年1月、『Alpaca』をリリース。YouTubeで800回以上再生されたり、Instagramで200件以上の動画投稿に使用されるなど、人気を集める。"

];

</script>