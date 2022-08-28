<!-- 优惠券页面 -->
<template>
    <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
        <div class="p-3">
            <!-- <UserBuyList v-for="(item, index) in rows" :key="index" :item="item"/> -->
            <n-grid :x-gap="20" :y-gap="5" :cols="2">
                <n-grid-item v-for="(item, index) in rows" :key="index">
                    <UserCouponList :item="item"/>
                </n-grid-item>
            </n-grid>
        </div>
        <!-- 分页组件 -->
        <div class="flex justify-center items-center mt-5  !pb-[1.5rem]">
            <n-pagination size="large" :item-count="total" :page="page" :page-size="limit"
                :on-update:page="handlePageChange" />
        </div>
    </LoadingGroup>
</template>

<script setup>
import { NPagination, NGridItem, NGrid } from "naive-ui";

useHead({ title: "优惠券" });

const {
    page,
    limit,
    pending,
    error,
    rows,
    total,
    handlePageChange
} = await usePage(({ page, limit }) => useUserCouponApi(page))

</script>
