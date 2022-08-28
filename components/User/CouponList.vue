<!-- 我的优惠券组件 -->
<template>
    <n-card>
        {{ item }}
    </n-card>
</template>

<script setup>
import { NCard, NButton } from "naive-ui"
defineProps({ item: Object })
</script>
