<template>
  <NConfigProvider inline-theme-disabled>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </NConfigProvider>
</template>
<script setup>
import {
  NConfigProvider
} from "naive-ui"
</script>