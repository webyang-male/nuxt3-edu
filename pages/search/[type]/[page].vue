<!-- 搜索结果组件页 -->
<template>
    <div>
        <h4 class="text-lg my-3">
            <b class="text-orange-400">{{ title }}</b>的搜索结果:
        </h4>
        <UiTab>
            <UiTabItem :active="type === item.value" v-for="(item, index) in tabs" :key="index"
                @click="handleClick(item.value)">{{ item.label }}</UiTabItem>
        </UiTab>
        <!-- 搜索渲染 -->
        <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
            <template #loading>
                <LoadingCourseSkeleton />
            </template>
            <n-grid :x-gap="20" :cols="4">
                <n-gi v-for="(item, index) in rows" :key="index">
                    <CourseList :item="item" />
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
import { NGrid, NGi, NPagination } from "naive-ui";
const route = useRoute();
const title = ref(route.query.keyword);
const type = ref(route.params.type);
useHead({ title });

const tabs = [
    {
        label: "课程",
        value: "course",
    },
    {
        label: "专栏",
        value: "column",
    },
];

//tab点击路由跳转
const handleClick = (t) => {
    navigateTo({
        params: {
            ...route.params,
            type: t,
        },
        query: {
            ...route.query,
        },
    });
};

// //搜索功能
// const page = ref(parseInt(route.params.page));
// const limit = ref(10);
// const { data, pending, error, refresh } = await useSearchListApi(() => {
//     return {
//         type: type.value,
//         page: page.value,
//         keyword: encodeURIComponent(title.value),
//     };
// });


// //搜索结果数据预处理
// const rows = computed(() => data.value?.rows ?? []);
// //搜索结果总数
// const total = computed(() => data.value?.count ?? 0);

// const handlePageChange = (p) => {
//     navigateTo({
//         params: {
//             ...route.params,
//             page: p,
//         },
//         query: {
//             ...route.query,
//         },
//     });
// };

const {
    page,
    limit,
    pending,
    error,
    refresh,
    rows,
    total,
    handlePageChange
} = await usePage(({ page, limit }) => useSearchListApi(() => {
    return {
        type: type.value,
        page,
        keyword: encodeURIComponent(title.value),
    };
})
)

//Query参数刷新页面实现
const stop = watch(() => route.query.keyword, (val) => {
    title.value = val;
    refresh();
});

//页面销毁时解除监听
onBeforeUnmount(() => {
    stop();
});

definePageMeta({
    middleware: ["search"],
});
</script>
