<template>
    <img v-for="(item,index) in data" :src="item.src" :key="index" class="w-[100%] h-[100px] rounded mb-6 cursor-pointer" @click="$commonOpen(item)"/>
</template>
<script setup>
defineProps({
    data:Array
})
</script>