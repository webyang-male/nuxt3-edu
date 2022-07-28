<template>
    <span class="tab-item" :class="{ 'tab-item-active': active }">
        <slot></slot>
    </span>
</template>

<script setup>
defineProps({
    active: {
        type: Boolean,
        default: false,
    },
})
</script>

<style>
.tab-item {
    @apply py-3 px-4 text-gray-700 text-sm cursor-pointer flex-shrink-0;
}

.tab-item:hover {
    @apply text-blue-400;
}

.tab-item-active {
    border-bottom: 2px solid dodgerblue;
    @apply text-blue-400 border-blue-500;
}
</style>