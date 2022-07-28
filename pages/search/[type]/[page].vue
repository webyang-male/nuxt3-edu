<!-- 搜索结果组件页 -->
<template>
    <div>
        <h4 class="text-lg my-3"><b class="text-orange-400">{{ title }}</b>的搜索结果:</h4>
        <UiTab>
            <UiTabItem active>
                课程
            </UiTabItem>
            <UiTabItem>
                专栏
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
useHead({ title });
</script>

