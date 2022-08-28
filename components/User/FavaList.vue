<!-- 我的收藏组件 -->
<template>
    <div class="flex border p-3 mb-5 items-center">
        <n-tag :bordered="false" type="info" size="small" class="mr-2">{{ t[item.type] }}</n-tag>
        <n-image :src="item.goods.cover" class="w-[40px] rounded mr-3" />
        <span class="text-gray-500 text-sm">{{ item.goods.title }}</span>
        <n-button class="ml-auto mr-3" type="success" size="tiny" @click="">查看</n-button>
        <n-button type="error" size="tiny" @click="">删除</n-button>
    </div>
</template>

<script setup>
import { NTag, NImage, NButton } from "naive-ui";
const props = defineProps({
    item: Object
})

const t = {
    course: "课程",
    column: "专栏",
    book: "电子书",
    live: "直播",
}
</script>

<style>
</style>