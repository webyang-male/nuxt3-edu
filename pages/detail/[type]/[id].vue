<template>
    <div>
        课程详情
    </div>
</template>

<script setup>
const route = useRoute()
const { id } = route.params

const { data, error, pending, refresh } = await useReadCourseApi({
    id
})

//懒加载数据获取修改页面title失败处理
const title = computed(() => !pending.value ? data.value?.title : "详情页面")

useHead({ title });
</script>

