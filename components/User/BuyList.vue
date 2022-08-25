<!-- 购买记录数据展示组件 --> 
<template>
    <UiCard>
        <UiCardHeader class="flex justify-between">
            <span>订单时间: {{ item.created_time }}</span><span>订单号:{{ item.no }}</span>
        </UiCardHeader>
        <UiCardBody>
            {{ item.goods }}
        </UiCardBody>
        <UiCardFooter class="flex">
            <span v-if="item.type != 'default'">[{{ t[item.type] }}]</span>
            <Price :value="item.price" />
            <span class="ml-auto" :class="{ 'text-green-600': (item.status === 'success') }">状态 : {{ s[item.status]
            }}</span>
            <n-button strong secondary type="warning" size="small" v-if="item.status === 'pendding'" @click="pay">
                立即支付
            </n-button>
        </UiCardFooter>
    </UiCard>
</template>

<script setup>
import { NButton } from "naive-ui"
const props = defineProps({ item: Object })

//定义课程中文状态
const s = {
    closed: "课程结束",
    success: "支付成功",
    pendding: "等待支付",
    grouping: "拼团中",
}

const t = {
    group: "拼团",
    flashsale: "秒杀"
}

const pay = () => {
    navigateTo(`/pay?no=${props.item.no}`)
}
</script>

