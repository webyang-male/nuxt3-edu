<template>
    <ClientOnly>
        <n-popover :width="450" trigger="click" placement="right">
            <template #trigger>
                <n-button strong secondary type="warning" size="tiny">
                    领取优惠券
                </n-button>
            </template>
            <div class="p-2">
                <h4 class="text-lg font-bold mb-3">可用优惠券({{ data.length }})</h4>
                <n-scrollbar style="height: 300px;">
                    <CouponList v-for="(item,index) in data" :key="index" :item="item"/>
                </n-scrollbar>
            </div>
        </n-popover>
    </ClientOnly>
</template>
<script setup>
    import {
        NPopover,
        NButton,
        NScrollbar
    } from "naive-ui"
    const {
        data
    } = await useCouponListApi()
</script>