<template>
  <NConfigProvider inline-theme-disabled>
    <nuxtLayout>
      <NuxtPage />
    </nuxtLayout>
  </NConfigProvider>
</template>


<script setup>
import { NConfigProvider } from 'naive-ui'

console.log('\n' + ' %c 别光Clone,留个Star' + ' ' + ' %c https://github.com/webyang-male/nuxt3-edu' + '\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');
</script>