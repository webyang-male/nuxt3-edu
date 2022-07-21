<template>
    <div>
        公共列表 {{ $route.params.type }} ~ {{ $route.params.page }}
    </div>
</template>
<script setup>
const route = useRoute()
console.log(route.params.type,route.params.page)
</script>