<!-- 直播详情页时间状态组件 -->
<template>
    <n-alert :type="status == 'ing' ? 'success':'default'" :show-icon="false"  bordered="bordered" class="mt-1">
        <p class="text-xs text-gray-500">直播时间：{{start}} ~ {{end}}</p>
    </n-alert>
</template>


<script setup>
import { NAlert } from 'naive-ui';
const props = defineProps(["start", "end"])

const status = computed(() =>{
    let {start, end} = props;
    return useTimeStatus(start, end)
})
</script>
