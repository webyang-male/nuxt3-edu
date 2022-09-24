<!-- 课程购买--可用优惠券使用模态框 -->
<!-- 建议自行注册账号体验优惠券领取效果，该演示账号和自行注册账号效果不一致 -->
<template>
    <ClientOnly>
        <n-popover :width="450" trigger="click" placement="right">
            <template #trigger>
                <n-button strong secondary type="warning" size="tiny" class="mb-1">
                    领取优惠券
                </n-button>
            </template>
            <div class="p-2 ">
                <h4 class="text-lg font-bold mb-3">可用优惠券（{{data.length}}）</h4>
                <n-scrollbar style="height: 420px">
                    <CouponList v-for="(item,index) in data" :key="index" :item="item"/>
                </n-scrollbar>
            </div>
        </n-popover>
    </ClientOnly>
</template>


<script setup>
import { NPopover, NScrollbar, NButton } from "naive-ui"
const { data } = await useCouponListApi()
</script>

