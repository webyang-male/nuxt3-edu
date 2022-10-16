<!-- 课程列表页 -->
<template>
    <div>
        <n-breadcrumb class="mb-5">
            <n-breadcrumb-item>
                <nuxt-link to="/">首页</nuxt-link>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
                {{title}}
            </n-breadcrumb-item>
        </n-breadcrumb>
        <!-- 课程渲染 -->
        <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
            <template #loading>
                <LoadingBookSkeletion v-if="type == 'book'" />
                <LoadingCourseSkeleton v-else />
            </template>
            <n-grid :x-gap="20" :cols="type == 'book'?2:4">
                <n-gi v-for="(item, index) in rows" :key="index">
                    <BookList v-if="type == 'book'" :item="item" />
                    <CourseList v-else :item="item" />
                </n-gi>
            </n-grid>
            <!-- 分页组件 -->
            <div class="flex justify-center items-center mt-5 mb-10">
                <n-pagination size="large" :item-count="total" :page="page" :page-size="limit"
                    :on-update:page="handlePageChange" />
            </div>
        </LoadingGroup>
    </div>
</template>

<script setup>
import { NGrid, NGi, NPagination, NBreadcrumb, NBreadcrumbItem } from "naive-ui";
const route = useRoute();
const { type } = route.params;
const title = route.meta.title;

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

    let query = {
        page,
    }
    if(type == "group" || type == "flashsale"){
        query.usable = 1;
    }
    return useListApi(type,query)
})

definePageMeta({
    middleware: ["list"]
})
</script>
