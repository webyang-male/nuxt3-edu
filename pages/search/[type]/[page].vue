<template>
    <div>
        {{ $route.params.type }}~{{ $route.params.page }} ~ {{ $route.name }}
    </div>
</template>

<script setup>
    definePageMeta({
       middleware: ["search"],
    })
</script>

