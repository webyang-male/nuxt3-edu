<template>
    <n-card class="cursor-pointer mb-5 shadow-md !border-0" footer-style="padding:0;" @click="open">
        <template #cover>
            <!-- nuxt3特性：服务端渲染会导致404图片资源加载失败，可实验性尝试ClientOnly API -->
            <UiImage v-if="item?.cover" :src="item.cover" class="w-[100%] h-[150px]" />
            <!-- <UiImage v-if="item?.cover" :src="reg.test(item.cover) ? item.cover : img_404" class="w-[100%] h-[150px]"/> -->
        </template>
        <div class="pt-2">
            <span class="font-bold w-full truncate font-semibold">{{ item.title }}</span>
        </div>
        <div class="mt-2 flex items-end">
            <Price :value="item.price" />
            <Price :value="item.t_price" through class="ml-2" />
        </div>
        <!-- 如果有折扣，则渲染折扣组件内容 -->
        <template #footer v-if="item.group_id || item.flashsale_id">
            <ClientOnly>
                <div class=" bg-yellow-500 text-white p-3 text-xs flex items-center rounded-b">
                    {{ item.group_id ? '拼团中' : '秒杀中' }}
                    <div class="ml-auto flex items-center">
                        倒计时
                        <Seckill :time="item.end_time" />
                    </div>
                </div>
            </ClientOnly>
        </template>
    </n-card>
</template>
<script setup>
import {
    NCard
} from "naive-ui"

const props = defineProps({
    item: Object
})

//偷懒404处理
// let reg = /^(http|https):\/\//;
// let img_404 = "https://unpkg.com/hassan-assets@1.0.22/img/404.png";

let open = () => {
    let path = ""
    //课程详情
    if (["course", "media", "video", "audio"].includes(props.item.type)) {
        path = `/detail/course/${props.item.id}`
    }
    //专栏详情
    else if (props.item.type == "column") {
        path = `/detail/column/${props.item.id}`
    }
    //直播详情
    else if (props.item.type == "live") {
        path = `/detail/live/${props.item.id}`
    }

    //秒杀和拼团
    if (props.item.group_id) {
        path = `${path}?group_id=${props.item.group_id}`
    }

    if (props.item.flashsale_id) {
        path = `${path}?flashsale_id=${props.item.flashsale_id}`
    }

    navigateTo(path);
}

</script>
