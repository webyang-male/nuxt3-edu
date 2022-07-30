<!-- 搜索结果组件页 -->
<template>
    <div>
        <h4 class="text-lg my-3"><b class="text-orange-400">{{ title }}</b>的搜索结果:</h4>
        <UiTab>
            <UiTabItem :active="type === item.value" v-for="(item, index) in tabs" :key="index"
                @click="handleClick(item.value)">
                {{ item.lable }}
            </UiTabItem>
        </UiTab>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ["search"],
})

//动态标题-搜索
const route = useRoute();
const title = ref(route.query.keyword || "");
const type = ref(route.params.type)
useHead({ title });

let tabs = [{
    lable: "课程",
    value: "course"
}, {
    lable: "专栏",
    value: "column"
}];

//点击跳转事件
let handleClick = (t) => {
    navigateTo({
        params: {
            ...route.params,
            type: t
        },
        query: {
            ...route.query
        }
    })
}
</script>

