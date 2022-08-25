<!-- 学习记录数据展示组件 -->
<template>
    <UiCard>
        <UiCardHeader>
            <span class="mb-2 text-xs text-gray-400">
                学习进度
            </span>
            <n-progress type="line" :percentage="item.progress" :show-indicator="false" />
        </UiCardHeader>
        <UiCardBody class="flex">
            <n-tag size="small" v-if="route.query.tab != 'column'">{{ t[item.type] }}</n-tag>
            <span class="ml-3">{{ item.title }}</span>
            <n-button type="primary" size="tiny" class="ml-auto" @click="open">继续观看</n-button>
        </UiCardBody>
    </UiCard>
</template>

<script setup>
import { NButton, NProgress, NTag } from 'naive-ui'
const props = defineProps({
    item: Object
})

const route = useRoute()

//课程类型汉化
const t = {
    audio: "音频",
    video: "视频",
    media: "图文",
    course: "课程",
    column: "专栏",
    book: "电子书",
}


//点击跳转
const open = () => {
    navigateTo(`/detail/${route.query.tab}/${props.item.id}`)
}
</script>
