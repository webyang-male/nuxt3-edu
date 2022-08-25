<!-- 学习记录页面 -->
<template>
    <div>
        <UiTab>
            <UiTabItem :active="type === item.value" v-for="(item, index) in tabs" :key="index"
                @click="handleClick(item.value)">{{ item.label }}</UiTabItem>
        </UiTab>
        <!-- 搜索渲染 -->
        <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
            <div class="px-3">
                <UserHistoryList v-for="(item, index) in rows" :key="index" :item="item" />
            </div>
            <!-- 分页组件 -->
            <div class="flex justify-center items-center mt-5  !pb-[1.5rem]">
                <n-pagination size="large" :item-count="total" :page="page" :page-size="limit"
                    :on-update:page="handlePageChange" />
            </div>
        </LoadingGroup>
    </div>
</template>

<script setup>
import { NPagination } from "naive-ui";
const route = useRoute();

const type = ref(route.query.tab || "course");
useHead({ title: "学习记录" });

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
            page: 1,
        },
        query: {
            ...route.query,
            tab: t,
        },
    });
};


const {
    page,
    limit,
    pending,
    error,
    refresh,
    rows,
    total,
    handlePageChange
} = await usePage(({ page, limit }) => useUserHistoryApi(() => {
    return {
        type: type.value,
        page,
    };
})
)

</script>
