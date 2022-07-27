<template>
    <LoadingGroup :pending="pending" :error="error">
        <template v-for="(item, index) in data" :key="index">
            <Banner :data="item.data" v-if="item.type == 'swiper'" />
            <ImageNav :data="item.data" v-else-if="item.type == 'icons'" />
            <ImageAd :data="item.data" v-else-if="item.type == 'imageAd'" />
            <ListCard :data="item.data" :title="item.title" v-else-if="item.type == 'list'" />
            <ListCard :data="item.data" :type="item.listType" :title="item.title"
                v-else-if="item.type == 'promotion'" />
        </template>
    </LoadingGroup>
</template>

<script setup>
import { useHttp } from '~~/composables/useHttp';

//设置首页标题,举个例子，这里的title就是首页的标题
useHead({
    title: '首页',
    meta: [
        { name: "keywords", content: "vue3,nuxt3,ssr,大赵同学,zain" },
        { name: "description", content: "基于vue3的nuxt框架SSR教育站点首页" },
    ],
})

const {
    pending,
    data,
    error
} = await useIndexDataApi()

// const {
//     pending,
//     data,
//     error
// } = await useFetch("/index", {
//     key: "IndexData",
//     baseURL: "http://demonuxtapi.dishait.cn/pc",
//     headers: {
//         appid: "bd9d01ecc75dbbaaefce"
//     },
//     // 响应之前数据处理
//     transform: (res) => {
//         return res.data
//     },
//     // 是否开启缓存
//     initialCache: false,
//     // 懒加载
//     lazy: true
// })

// 服务端时直接报错
if (process.server && error.value) {
    throwError(error.value?.data?.data)
}

</script>