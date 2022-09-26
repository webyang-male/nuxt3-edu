<!-- 西瓜视频组件 -->
<template>
    <div id="mse"  class="video"></div>
</template>

<script setup>
const player = ref(null)

const props = defineProps({
    url: String
})

onMounted(() => {
    player.value = new Player({
        id: 'mse',
        url: props.url,
        with: null,
        height: 450,
        playsinline: true
    });
})
//销毁播放器
onBeforeUnmount(() => player.value.destroy())
</script>
<style>
    .video{
        @apply !w-[1110px]
    }
</style>