<template>
    <li class="detail-menu-item" :class="{'active':active}">
        <n-tag v-if="item.type" :bordered="false" type="info" size="small" class="mr-3">
            {{t[item.type] }}
        </n-tag>
        章节{{index+1}}&ensp;{{item.title}}
        <n-tag v-if="item.price == 0 || item.isfree == 1" :bordered="false" type="success" size="small"
            class="ml-auto watch">
            免费观看
        </n-tag>
    </li>
</template>

<script setup>
import { NTag } from 'naive-ui'
defineProps({
    item: Object,
    index: Number,
    active: {
        type: Boolean,
        default: false
    }
});

const t = {
    media: "图文",
    audio: "音频",
    video: "视频"
}
</script>

<style>
.detail-menu-item {
    @apply flex p-5 border-b cursor-pointer text-sm hover: ( !bg-gray-100) active:( !bg-gray-200)
}

.watch {
    @apply cursor-pointer
}

.active {
    @apply bg-gray-200
}
</style>

