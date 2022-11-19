<!-- 自定义图片组件 -->
<template>
    <img :src="src" v-bind="$attrs" @error="handelImageError" :style="{ 'object-fit': objectFit }" alt="课程图片">
</template>

<script setup>
defineProps({
    src: {
        type: String,
        default: "",
    },
    objectFit: {
        type: String,
        default: "cover",
    },
})

//图片404处理
//nuxt3特性服务端渲染会导致404图片资源加载失败，可实验性尝试ClientOnly API
const handelImageError = (e) => {
    const fail_ImagPath = "/err.png"
    const fail_ImagUrl = "https://unpkg.com/hassan-assets@1.0.22/img/404.png"
    e.target.src = fail_ImagPath ? fail_ImagUrl : fail_ImagPath
}
</script>

