<template>
    <div class="container mx-auto px-4 py-12">
        <article v-if="news" class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <!-- Title -->
            <h1 class="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{{ news.title }}</h1>

            <!-- Publication Date -->
            <p class="text-base text-gray-500 mb-8 border-b pb-4">{{ formatDate(news.publishedAt) }}</p>

            <!-- Optional Image -->
            <img v-if="news.img" :src="news.img" :alt="news.title" class="w-full h-auto rounded-lg shadow-lg mb-8">

            <!-- Content -->
            <div v-if="news.content" class="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap" v-html="news.content"></div>
            <p v-else class="text-gray-500 italic mt-8">本文なし</p>

            <!-- Back Link -->
            <div class="mt-12 pt-8 border-t">
                <NuxtLink to="/news" class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <Icon name="heroicons:arrow-left-16-solid" class="w-5 h-5" />
                    <span>ニュース一覧に戻る</span>
                </NuxtLink>
            </div>
        </article>
    </div>
</template>
<script setup>
import { newsData } from '../data/news.json';
import { formatDate } from '../utils/utils.js';
import { computed } from 'vue';

const route = useRoute();
const news = newsData.find(n => n.id === route.params.id);

if (!news) {
    throw createError({ statusCode: 404, statusMessage: 'News not found' });
}


</script>