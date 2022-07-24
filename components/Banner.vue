<!-- 首页轮播图 -->
<template>
    <n-carousel show-arrow class="mb-6">
        <img v-for="(item,index) in data" :key="item"
        class="carousel-img rounded cursor-pointer"
        :src="item.src"
        @click="$commonOpen(item)"
        >
    </n-carousel>
</template>
<script setup>
import {
    NCarousel
} from "naive-ui"

defineProps({
    data:Array
})
const open = (item)=>{
    if(item.type == "webview"){
        window.open(item.url)
    }
}
</script>
<style scoped>
.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>