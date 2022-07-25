<!-- 首页公共课程列表组件 -->
<template>
    <n-card class="cursor-pointer mb-5 shadow-md !border-0" @click="$commonOpen(item)">
        <template #cover>
            <img :src="item.cover"
                class="w-[100%] h-[150px]">
        </template>
        <div class=" pt-2">
            <span class="font-bold w-full truncate font-semibold">{{item.title}}</span>
        </div>
        <div class="flex mt-2 items-end">
            <Price :value="item.price"/>
            <!-- 市场价（原价） -->
            <Price :value="item.t_price" through class="ml-2"/>
        </div>
    </n-card>
</template>
<script setup>
import {
    NCard,
} from "naive-ui"

defineProps({
    item: Object
})
</script>