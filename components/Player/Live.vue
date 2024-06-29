<template>
    <div id="video" class="rounded"></div>
</template>
<script setup>
    const props = defineProps({
        url:String
    })

    const player = ref(null)

    onMounted(()=>{
        player.value = new FlvPlayer({
            id: 'video',
            url: props.url,
            isLive: true,
            width: null,
            height: 450,
            playsinline:true,
        });
    })

    onBeforeUnmount(()=>player.value.destroy())
</script>