<!-- 创建订单页面 -->
<!-- 建议自行注册账号体验完善功能 -->
<template>
    <LoadingGroup :pending="pending" :error="error">
        <n-card class="createorder" size="medium">
            <h4>产品信息</h4>
            <div class="flex mb-5">
                <n-image :src="data.cover" class="flex flex-shrink-0   rounded"
                    :class="type == 'book' ? 'w-[100px] h-[140px]' : 'w-[180px] h-[100px]'" />
                <div class="flex flex-1 ml-4 flex-col">
                    <h5 class="flex text-xl text-gray-600 ">
                        {{ data.title }}
                        <Price :value="data.price" class="ml-auto" />
                    </h5>
                    <div class="mt-auto" v-if="type == 'course'">
                        <n-tag size="small" :bordered="false">
                            {{ t[data.type] }}
                        </n-tag>
                    </div>
                </div>
            </div>
            <h4>优惠券</h4>
            <n-grid :x-gap="20" :cols="4" class="mb-3">
                <n-grid-item v-for="(item, index) in couponData.rows" :key="index">
                    <n-button strong secondary :type="user_coupon_id == item.id ? 'success' : 'tertiary'"
                        @click="chooseCoupon(item)">
                        ￥{{ item.price }} 优惠券
                    </n-button>
                </n-grid-item>
            </n-grid>

            <div v-if="couponData.count == 0" class="mb-5 text-gray-400 text-sm">
                暂无优惠券
            </div>
            <h4>支付方式</h4>
            <div class="flex mb-5">
                <span class="wxpay">
                    <n-icon>
                        <LogoWechat />
                    </n-icon>
                    <b>微信支付</b>
                </span>
            </div>

            <div class="flex items-center mb-5">
                <small class="text-red-400 mr-auto">请在30分钟内完成支付</small>
                <span v-if="user_coupon_id">优惠券已抵扣<b class="text-red-500">{{ coupon_price }}</b>元，</span>
                需支付
                <Price :value="price" />
            </div>

            <div class="flex justify-end">
                <n-button type="primary" @click="submit" :loading="loading">确认支付</n-button>
            </div>
        </n-card>
    </LoadingGroup>
</template>

<script setup>
import { NCard, NTag, NButton, NImage, NIcon, NGrid, NGridItem } from "naive-ui"
import { LogoWechat } from "@vicons/ionicons5"

const route = useRoute()
const { id, type } = route.query

//获取产品信息
const { data, pending, error } = await useGetGoodsInfoApi(id, type)

const t = {
    media: "图文",
    audio: "音频",
    column: "专栏",
    book: "电子书",
    video: "视频",
    course: "课程"
}

//获取可用优惠券
const { data: couponData } = await useGetUseableUserCouponApi(id, type)

//选择订单优惠券
const user_coupon_id = ref(0)
const chooseCoupon = (item) => {
    user_coupon_id.value = user_coupon_id.value == item.id ? 0 : item.id
}

//优惠券价格
const coupon_price = computed(() => {
    if (user_coupon_id.value == 0) return 0
    let c = couponData.value.rows.find(o => o.id == user_coupon_id.value)
    return c ? c.price : 0
})

//最终价格
const price = computed(() => {
    let p = ((data.value.price * 1000 - coupon_price.value * 1000) / 1000).toFixed(2)
    return p <= 0 ? 0 : p
})

//创建订单并发起支付
const loading = ref(false)
async function submit() {
    loading.value = true

    let d = {}

    if (type == "course" || type == "book" || type == "column") {
        d = {
            goods_id: data.value.id,
            type
        }
        if (user_coupon_id.value) {
            d.user_coupon_id = user_coupon_id.value
        }
    } else if (type == "flashsale") {
        d = {
            flashsale_id: id
        }
    }

    let { data: createOrderResult, error: createOrderError } = await useCreateOrderApi(d,type)

    loading.value = false

    if (createOrderError.value) return
    navigateTo(`/pay?no=${createOrderResult.value.no}`, {
        replace: true,
    })
}

definePageMeta({
    middleware: ["auth", "createorder"]
})
</script>


<style>
.createorder h4 {
    @apply font-semibold mb-3 text-gray-500
}

.createorder .wxpay {
    @apply w-[120px] flex py-2 items-center justify-center border border-green-500 rounded text-sm text-green-600
}
</style>