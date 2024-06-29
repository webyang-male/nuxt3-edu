<template>
    <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
        <div class="p-3">
            <UserTestList v-for="(item,index) in rows" :key="index" :item="item"/>
        </div>
        <div class="flex justify-center items-center mt-5 pb-10">
            <n-pagination size="large" :page="page" :item-count="total" :page-size="limit" :on-update:page="handlePageChange"/>
        </div>
    </LoadingGroup>
</template>
<script setup>
import {
    NPagination
} from "naive-ui"

useHead({ title:"考试记录" })

const {
    page,
    limit,
    total,
    handlePageChange,
    rows,
    pending,
    error,
} = await usePage(({ page,limit })=>useUserTestApi(page))
</script>