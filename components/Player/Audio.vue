<!-- aplayer音频组件 -->
<template>
    <div id="aplayer"></div>
</template>
<script setup>
let ap = ref(null)
const props = defineProps({
    title: String,
    cover: String,
    url: String
})
onMounted(() => {
    ap.value = new APlayer({
        container: document.getElementById('aplayer'),
        audio: [{
            name: props.title,
            artist: '大赵编程',
            url: props.url,
            cover: props.cover
        }]
    });
})

//销毁播放器
onBeforeUnmount(() => ap.value.destroy())
</script>