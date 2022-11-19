<!-- 社区分类tabs组件 -->
<template>
    <UiTab>
        <UiTabItem>标题</UiTabItem>
    </UiTab>
</template>

<script setup>
const { data } = await useBbsListApi()
console.log(data)
</script>

<style>

</style>