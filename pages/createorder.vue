<!-- 创建订单页面 -->
<!-- 建议自行注册账号体验更佳 -->
<template>
    <LoadingGroup :pending="pending" :error="error">
        <n-card class="createorder" size="medium">
            <h4>产品信息</h4>
            <div class="flex mb-5">
                <n-image :src="data.cover" class="flex flex-shrink-0 w-[180px] h-[100px]  rounded" />
                <div class="flex flex-1 ml-4 flex-col">
                    <h5 class="flex text-xl text-gray-600 ">
                        {{data.title}}
                        <Price :value="data.price" class="ml-auto" />
                    </h5>
                    <div class="mt-auto">
                        <n-tag size="small" :bordered="false">
                            {{t[data.type]}}
                        </n-tag>
                    </div>
                </div>
            </div>
            <h4>优惠券</h4>
            <div class="mb-5 text-gray-400 text-sm">
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
                <small class="text-red-400">请在30分钟内完成支付</small>
                <Price class="ml-auto" :value="price" />
            </div>

            <div class="flex justify-end">
                <n-button type="primary" @click="">确认支付</n-button>
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

//最终价格
const price = computed(() =>(data.value.price * 1000/1000).toFixed(2))

definePageMeta({
    middleware:["auth","createorder"]
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