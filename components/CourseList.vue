<!-- 首页公共课程列表组件 -->
<template>
    <n-card class="cursor-pointer mb-5 shadow-md !border-0" @click="$commonOpen(item)" footer-style="padding:0;">
        <template #cover>
            <img :src="item.cover" class="w-[100%] h-[150px]">
        </template>
        <div class=" pt-2">
            <span class="font-bold w-full truncate font-semibold">{{ item.title }}</span>
        </div>
        <div class="flex mt-2 items-end">
            <Price :value="item.price" />
            <!-- 市场价（原价） -->
            <Price :value="item.t_price" through class="ml-2" />
        </div>
        <!-- 如果有接口数据，则渲染该组件 -->
        <template #footer v-if="item.group_id || item.flashsale_id">
            <div class="flex items-center p-3 bg-yellow-400 text-white text-xs rounded-b">
                {{ item.group_id ? '拼团中' : '秒杀中' }}
                <div class="ml-auto flex items-center">
                    倒计时
                    <Seckill :time="item?.end_time"/>
                </div>
            </div>
        </template>
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