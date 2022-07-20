<template>
    <div>
        问答社区{{ $route.params.bbs_id }}~{{ $route.params.page }}
        <p>{{ $route.name}}</p>
    </div>
</template>
<script setup>
const route = useRoute();
console.log(route.params.bbs_id, route.params.page);
</script>