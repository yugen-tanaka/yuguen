<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
</script>
<template>
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <Analytics />
      <NuxtPage />
    </NuxtLayout>
</template>
