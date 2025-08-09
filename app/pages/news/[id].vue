<template>
    <div v-if="news">
    <h1>{{ news.title }}</h1>
    <p>{{ formatDate(news.publishedAt) }}</p>
    <p>{{ news.content }}</p>
</div>
</template>
<script setup>
import { newsData } from '../data/news.json';
import { formatDate } from '../utils/utils.js';
const route = useRoute();
const news = newsData.find(n => n.id === route.params.id);

if (!news) {
    throw createError({ statusCode: 404, statusMessage: 'News not found' });
}
</script>