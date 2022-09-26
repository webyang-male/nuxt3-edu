<template>
    <LoadingGroup :pending="pending" :error="error">
        <div v-if="data" v-html="data.content"></div>
    </LoadingGroup>
</template>
<script setup>
const route = useRoute()
const { book_id, id } = route.params

const { data, error, pending } = await useBookDetailApi(book_id, id)

//修改页面标题
const title = computed(() => 
    data.value ? data.value.title : "电子书详情页"
)
useHead({ title });

definePageMeta({
    middleware(to, from) {
        const { id } = to.params
        if (isNaN(+id)) {
            return abortNavigation("页面不存在")
        }
        return true
    }
})
</script>