<template>
    <n-carousel show-arrow class="mb-6" autoplay>
        <img v-for="(item,index) in data" :key="index"
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
</script>
<style scoped>
.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>