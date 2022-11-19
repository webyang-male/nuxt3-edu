<!-- 社区分类tabs组件 -->
<template>
    <UiTab>
        <UiTabItem v-for="(item,index) in tabs" :key="index" :active="item.id == bbs_id" @click="handleClick(item.id)">{{ item.title }}</UiTabItem>
    </UiTab>
</template>
<script setup>
    const {
        data
    } = await useBbsListApi()

    const route = useRoute()

    // 当前社区分类ID
    const bbs_id = ref(parseInt(route.params.bbs_id))

    const tabs = computed(()=>{
        return [
            {
                id:0,
                title:"全部"
            },
            ...(data.value ? data.value.rows : [])
        ]
    })

    // 切换社区分类
    function handleClick(id){
        navigateTo({
            params:{
                ...route.params,
                bbs_id:id,
                page:1
            },
            query:{
                ...route.query
            }
        })
    }
</script>