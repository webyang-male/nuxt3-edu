<!-- 支付页面 -->
<template>
    <div class="flex justify-center">
        <n-card class="w-[450px] mb-10">
            <ClientOnly>
                <n-alert title="支付超时" type="error" class="mb-2" v-if="isTimeOut">
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
                <QrCode :data="data.code_url" v-if="data.code_url"/>
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
import { NCard, NIcon, NAlert } from 'naive-ui';
import { ScanCircleOutline } from "@vicons/ionicons5"

const data = {
    "price": "10.00",
    "code_url": "weixin://wxpay/bizpayurl?pr=QdPmZtyzz"
}

// 支付超时
const isTimeOut = ref(false)
function handleTimeOut() {
    isTimeOut.value = true
}
</script>

