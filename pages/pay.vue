<!-- 支付页面 -->
<template>
    <div class="flex justify-center">
        <n-card class="w-[450px] mb-10">
            <ClientOnly>
                <n-alert title="支付成功" type="success" class="mb-2" v-if="ispay">
                    正在跳转...
                </n-alert>
                <n-alert title="支付超时" type="error" class="mb-2" v-else-if="isTimeOut">
                    请刷新页面重新支付
                </n-alert>
                <h4 class="text-xl mb-2">微信支付</h4>
                <p class="flex  text-sm text-gray-500">
                    距离二维码过期还剩&nbsp;
                    <TimeBox :expire="5" class="text-rose-500" @end="handleTimeOut" />，过期后请刷新页面重新获取
                </p>
                <h5 class="flex justify-center py-5">
                    支付总额：
                    <Price :value="data.price" />
                </h5>
                <!-- 二维码组件 -->
                <QrCode :data="data.code_url" v-if="data.code_url" />
                <div class="flex justify-center items-center py-4 text-green-500">
                    <n-icon size="35">
                        <ScanCircleOutline />
                    </n-icon>
                    <div class="ml-3 text-gray-500 text-sm">
                        <P>请使用微信扫一扫</P>
                        <P>扫描二维码支付</P>
                    </div>
                </div>
            </ClientOnly>
        </n-card>

    </div>
</template>

<script setup>
import {
    NCard,
    NAlert,
    NIcon
} from "naive-ui"

import {
    ScanCircleOutline
} from "@vicons/ionicons5"

// // 模拟响应结果
// const data = {
//     "price": "10.00", 
//     "code_url": "weixin://wxpay/bizpayurl?pr=QdPmZtyzz" 
// }

const route = useRoute()
const { no } = route.query

// 发起微信PC支付
const {
    data,
    error
} = await useWxpayApi(no)

// 支付超时
const isTimeOut = ref(false)
function handleTimeOut() {
    isTimeOut.value = true
}

// 开始轮询订单状态
const ispay = ref(false)
const timer = ref(null)
function checkIspay() {
    if (timer.value) clearInterval(timer.value)
    timer.value = setInterval(() => {
        useGetWxpayStatusApi(no).then(res => {
            if (!res.error.value && res.data.value.trade_state == "SUCCESS") {
                handleSuccess()
            }
        })
    }, 2000);
}

if (!error.value) {
    checkIspay()
}

// 支付成功处理
function handleSuccess() {
    ispay.value = true
    if (timer.value) clearInterval(timer.value)
    setTimeout(() => {
        navigateTo("/user/buy/1", { replace: true })
    }, 2000);
}
</script>

