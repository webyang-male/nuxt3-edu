<!-- 学习记录组件 -->
<template>
    <div class="rounded border mb-5">
        <div class="bg-gray-50 p-3">
            <span class="mb-2 text-xs text-gray-400">
                学习进度
            </span>
            <n-progress type="line" :percentage="item.progress" :show-indicator="false" />
        </div>
        <div class="flex p-3">
            <n-tag size="small" v-if="route.query.tab != 'column'">{{t[item.type]}}</n-tag>
            <span class="ml-3">{{item.title}}</span>
            <n-button type="primary" size="tiny" class="ml-auto">继续观看</n-button>
            
        </div>
    </div>
</template>

<script setup>
import {NButton,NProgress,NTag} from 'naive-ui'
const props = defineProps({
    item:Object
})

const route = useRoute()

//课程类型汉化
const t= {
    audio:"音频",
    video:"视频",
    media:"图文",
    course:"课程",
    column:"专栏",
    book:"电子书",
}

</script>
