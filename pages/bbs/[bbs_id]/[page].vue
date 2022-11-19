<template>
    <div>
        <BbsTabs/>
        问答社区 {{ $route.params.bbs_id }} ~ {{ $route.params.page }} ~ {{ $route.name }}
    </div>
</template>
<script setup>
const route = useRoute()
// console.log(route.params.bbs_id,route.params.page)

useHead({
    title:"社区问答页"
})
</script>