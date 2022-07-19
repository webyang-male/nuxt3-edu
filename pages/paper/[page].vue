<template>
    <div>
        考试列表{{ $route.params.page }}
    </div>
</template>
<script setup>
const route = useRoute();
console.log(route.params.page);
</script>