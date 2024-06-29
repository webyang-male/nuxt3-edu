<template>
    <li class="detail-menu-item" :class="{ 'active':active }">
        <n-tag v-if="item.type" type="info" :bordered="false" size="small" class="mr-3">
            {{ t[item.type] }}
        </n-tag>
        章节{{ index + 1 }}.{{ item.title }}

        <n-tag v-if="item.price == 0 || item.isfree == 1" type="success" :bordered="false" size="small" class="ml-auto">
            免费
        </n-tag>
    </li>
</template>
<script setup>
    import {
        NTag
    } from "naive-ui"
    defineProps({
        item:Object,
        index:Number,
        active:{
            type:Boolean,
            default:false
        }
    })

    const t = {
        media:"图文",
        audio:"音频",
        video:"视频"
    }

</script>
<style>
    .detail-menu-item {
        @apply flex p-5 border-b cursor-pointer text-sm hover:(!bg-gray-100) active:(!bg-gray-200);
    }
    .active {
        @apply bg-gray-200;
    }
</style>