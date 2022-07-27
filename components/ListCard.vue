<!-- 公共课程列表组件 -->
<template>
    <div>
        <div class="flex mb-3">
            <span>{{ title }}</span>
            <n-button quaternary class="ml-auto">查看更多</n-button>
        </div>
        <n-grid x-gap="12" :cols="4" class="mb-6">
            <n-gi v-for="(item, index) in pdata" :key="index">
                <CourseList :item="item" />
            </n-gi>
        </n-grid>
    </div>
</template>
<script setup>
import {
    NButton, NGrid,
    NGi,
} from "naive-ui"

const props = defineProps({
    title: {
        type: String,
        default: "展示区标题"
    },
    data: Array,
    type: {
        type: String,
        default: "course"
    }
})

const pdata = ref(props.data || [])
if (props.type === "group") {
    const {
        data,
    } = await useGroupDataApi({
        page: 1,
        usable: 1,
        limit: 8
    })
    // console.log(data.value);
    pdata.value = ((data.value?.rows).reverse()).slice(0,4) ?? []
}

// if (props.type === 'group') {
//     const {
//         data
//     } = await useFetch("/group/list?page=1&usable=1&limit=8", {
//         key: "groupData",
//         baseURL: "http://demonuxtapi.dishait.cn/pc",
//         headers: {
//             appid: "bd9d01ecc75dbbaaefce"
//         },
//         // 响应之前数据处理
//         transform: (res) => {
//             return res.data
//         },
//         // 是否开启缓存
//         initialCache: false,
//     })
//     // console.log(data.value?.rows);
//     pdata.value = (data.value?.rows).reverse() || []
//     // console.log(pdata.value);
// }
</script>