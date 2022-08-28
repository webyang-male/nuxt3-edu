<!-- 我的收藏页面 -->
<template>
    <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
        <div class="p-3">
            <UserFavaList v-for="(item, index) in rows" :key="index" :item="item" @delete="handleDeleteItem" />
        </div>
        <div class="flex justify-center items-center mt-5 pb-10">
            <n-pagination size="large" :page="page" :item-count="total" :page-size="limit"
                :on-update:page="handlePageChange" />
        </div>
    </LoadingGroup>
</template>
<script setup>
import {
    NPagination
} from "naive-ui"

useHead({ title: "我的收藏" })

//取消收藏接口调用

const {
    page,
    limit,
    total,
    handlePageChange,
    rows,
    pending,
    error,
    refresh
} = await usePage(({ page, limit }) => useMyFavaListApi(page))

async function handleDeleteItem({ goods_id, type, success, fail }) {
    let {
        error
    } = await useUncollectApi({
        goods_id,
        type
    })

    if (error.value) {
        fail()
    } else {
        success()
        refresh()
    }
}
</script>
