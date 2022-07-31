<!-- 骨架屏加载组件 -->
<template>
    <n-grid :x-gap="20" :y-gap="5" :cols="4">
        <n-grid-item v-for="i in 8" :key="i">
            <n-card class="mb-5">
                <template #cover>
                    <n-skeleton height="150px" width="100%" />
                </template>
                <n-skeleton width="50%" height="15px" class="my-2" />
                <n-skeleton text style="width: 60%" />
            </n-card>
        </n-grid-item>
    </n-grid>
</template>


<script setup>
import { NGrid, NGridItem, NCard, NSkeleton } from 'naive-ui'
</script>