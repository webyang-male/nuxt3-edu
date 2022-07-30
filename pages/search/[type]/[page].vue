<!-- 搜索结果组件页 -->
<template>
    <div>
        <h4 class="text-lg my-3"><b class="text-orange-400">{{ title }}</b>的搜索结果:</h4>
        <UiTab>
            <UiTabItem :active="type === item.value" v-for="(item, index) in tabs" :key="index"
                @click="handleClick(item.value)">{{ item.label }}</UiTabItem>
        </UiTab>
        <!-- 搜索渲染 -->
        <LoadingGroup :pending="pending" :error="error">
            <n-grid :x-gap="20" :cols="4">
                <n-gi v-for="(item, index) in rows" :key="index">
                    <CourseList :item="item" />
                </n-gi>
            </n-grid>
        </LoadingGroup>
    </div>
</template>

<script setup>
import {
    NGrid,
    NGi
} from "naive-ui"
const route = useRoute()
const title = ref(route.query.keyword)
const type = ref(route.params.type)
useHead({ title })

const tabs = [{
    label: "课程",
    value: "course"
}, {
    label: "专栏",
    value: "column"
}]

//tab点击路由跳转
const handleClick = (t) => {
    navigateTo({
        params: {
            ...route.params,
            type: t
        },
        query: {
            ...route.query,
        }
    })
}

//搜索功能
const page = ref(parseInt(route.params.page))
const {
    data,
    pending,
    error,
} = await useSearchListApi({
    page: page.value,
    keyword: encodeURIComponent(title.value),
    type: type.value
})

//搜索结果数据预处理
const rows = computed(() => data.value?.rows ?? [])

definePageMeta({
    middleware: ["search"]
})
</script>

