<template>
    <div>
        <h1>News</h1>
        <li v-for="news in newsData" :key="news.id">
            <div>
                <NuxtLink :to="news.url || `/news/${news.id}`">
            {{ news.title }}
            {{ formatDate(news.publishedAt) }}
            </NuxtLink>
            </div>
        </li>
    </div>
</template>

<script setup>
import { newsData } from '../data/news.json';
import { formatDate } from '../utils/utils.js';
</script>