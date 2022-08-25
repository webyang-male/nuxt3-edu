<!-- 考试页面 -->
<template>
    <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
        <div class="p-3">
            <!-- {{ rows }} -->
            <UserTestList v-for="(item, index) in rows" :key="index" :item="item"/>
        </div>
        <!-- 分页组件 -->
        <div class="flex justify-center items-center mt-5  !pb-[1.5rem]">
            <n-pagination size="large" :item-count="total" :page="page" :page-size="limit"
                :on-update:page="handlePageChange" />
        </div>
    </LoadingGroup>
</template>

<script setup>
import { NPagination } from "naive-ui";

useHead({ title: "考试记录" });

const {
    page,
    limit,
    pending,
    error,
    rows,
    total,
    handlePageChange
} = await usePage(({ page, limit }) => useUserTestApi(page))

</script>
