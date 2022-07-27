<!-- 骨架屏加载组件 -->
<template>
    <n-card v-for="i in 4" :key="i" class="mb-5">
        <n-skeleton text style="width:30%" />
        <n-skeleton text :repeat="2" />
        <n-skeleton text style="width: 45%" />
        <n-skeleton text style="width: 60%" />
    </n-card>

</template>
<script setup>
import { NCard, NSkeleton } from 'naive-ui'
</script>