<!-- 价格组件 -->
<template>
    <span :class="through ? 'text-gray-500 text-xs line-through' : 'text-rose-500 font-bold'">
        {{ parseFloat(value) == 0 ? "免费" : "¥" + value }}
    </span>
</template>
<script setup>
defineProps({
    value: {
        type: [String, Number],
        default: 0
    },
    through: {
        type: Boolean,
        default: false
    }
});
</script>