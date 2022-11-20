<!-- 考试页面 -->
<!-- 注意:体验考试请自行注册新账号 -->
<template>
    <n-grid :x-gap="20">
        <n-grid-item :span="18">
            <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
                <!-- 考试列表组件 -->
                <TestPaperList v-for="(item, index) in rows" :key="index" :item="item" />
                <!-- 分页组件 -->
                <div class="flex justify-center items-center mt-5 mb-10">
                    <n-pagination size="large" :item-count="total" :page="page" :page-size="limit"
                        :on-update:page="handlePageChange" />
                </div>
            </LoadingGroup>
        </n-grid-item>
        <!-- 右侧热点课程 -->
        <n-grid-item :span="6">
            <HotCourseList />
        </n-grid-item>
    </n-grid>
</template>

<script setup>
import { NGrid, NGridItem, NPagination } from "naive-ui";

const route = useRoute()
// console.log(route.params.page)
useHead({
    title: "考试页面"
})

//分页
const {
    page,
    limit,
    pending,
    error,
    refresh,
    rows,
    total,
    handlePageChange
} = await usePage(({ page, limit }) => {
    return useListApi("testpaper", {
        page,
    })
})
</script>