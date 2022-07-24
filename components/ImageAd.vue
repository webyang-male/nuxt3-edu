<!-- 广告位组件 -->
<template>
    <img v-for="(item, index) in data" :src="item.src" :key="index" alt="图片广告"
        class="w-[100%] h-[120px] rounded mb-6 cursor-pointer" 
        @click="$commonOpen(item)"
        />
</template>
<script setup>
defineProps({
    data: Array
})
</script>