<!-- 领取优惠券--优惠券展示列 -->
<template>
    <n-card class="coupon" :class="{ 'coupon-disabled': isgetcoupon }">
        <h4>￥{{ item.price }}</h4>
        <p>适用{{ o[item.type] }}：{{ item.value.title }}</p>
        <p class="!text-xs mt-3">
            有效期：
            <n-time :time="new Date(item.start_time)" />
            ~
            <n-time :time="new Date(item.end_time)" />
        </p>
        <template #footer>
            <div class="flex justify-end">
                <n-button size="small" :type="isgetcoupon ? '' : 'warning'" :disabled="isgetcoupon" :loading="loading"
                    @click="submit">
                    {{ isgetcoupon ? "已领取" : "立即领取" }}
                </n-button>
            </div>
        </template>
    </n-card>
</template>
<script setup>
import {
    NCard,
    NButton,
    NTime,
    createDiscreteApi
} from "naive-ui"

const o = {
    course: "课程",
    column: "专栏"
}

const props = defineProps({
    item: Object
})

const isgetcoupon = ref(props.item.isgetcoupon)

const loading = ref(false)
const submit = () => {
    const { message } = createDiscreteApi(["message"])
    if (isgetcoupon.value) {
        return message.error("你已经领取过了")
    }
    useHasAuth(async () => {
        loading.value = true
        const {
            data,
            error
        } = await useReceiveUserCouponApi({
            coupon_id: props.item.id
        })

        loading.value = false

        if (error.value) return

        message.success("领取成功")

        isgetcoupon.value = true

    })
}

</script>
<style>
.coupon {
    @apply mb-5 !bg-orange-500 !border-0;
}

.coupon h4 {
    @apply text-2xl mb-2 font-bold text-white;
}

.coupon p {
    @apply text-sm text-light-300;
}

.coupon-disabled {
    @apply !bg-gray-300;
}
</style>