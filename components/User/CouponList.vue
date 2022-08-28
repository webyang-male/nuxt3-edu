<!-- 我的优惠券组件 -->
<template>
    <n-card class="coupon" :class="{ 'coupon-disabled': (btn != '立即使用') }">
        <h4>CNY {{ item.price }}</h4>
        <p>适用{{ o[item.type] }}：{{ item.title }}</p>
        <p class="!text-xs mt-3">有效期: {{ item.start_time }} - {{ item.end_time }}</p>
        <template #footer>
            <div class="flex justify-end">
                <n-button :type="btn != '立即使用' ? 'tertiary' : 'warning'" 
                :disabled="btn != '立即使用'"
                @click="open"
                >
                    {{ btn }}
                </n-button>
            </div>
        </template>
    </n-card>
</template>

<script setup>
import { NCard, NButton } from "naive-ui"
const props = defineProps({ item: Object })

const o = {
    course: "课程",
    column: "专栏"
}

const btn = computed(() => {
    const v = props.item
    v.expires = (new Date(v.end_time)).getTime() < (new Date()).getTime()
    return v.used ? "已使用" : (v.expires ? "已过期" : "立即使用")
})

const open = () => {
    const {item} = props
    navigateTo(`/createorder?id=${item.goods_id}&type=${item.type}`)
}
</script>

<style>
.coupon {
    @apply mb-5 bg-orange-500 !border-0;
}

.coupon h4 {
    @apply text-2xl mb-2 font-bold text-white;
}

.coupon p {
    @apply text-sm text-light-300;
}

.coupon-disabled {
    @apply  !bg-gray-300;
}
</style>