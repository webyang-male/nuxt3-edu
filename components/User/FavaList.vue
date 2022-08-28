<!-- 我的收藏组件 -->
<template>
    <div class="flex border p-3 mb-5 items-center">
        <n-tag :bordered="false" type="info" size="small" class="mr-2">{{ t[item.type] }}</n-tag>
        <n-image :src="item.goods.cover" class="w-[40px] rounded mr-3" />
        <span class="text-gray-500 text-sm">{{ item.goods.title }}</span>
        <n-button class="ml-auto mr-3" type="success" size="tiny" @click="open">查看</n-button>
        <n-button type="error" size="tiny" @click="deleteItem">删除</n-button>
    </div>
</template>

<script setup>
import { NTag, NImage, NButton, createDiscreteApi } from "naive-ui";
const props = defineProps({
    item: Object
})

const t = {
    course: "课程",
    column: "专栏",
    book: "电子书",
    live: "直播",
}

const open = ()=>{
    navigateTo(`/detail/${props.item.type}/${props.item.goods.id}`)
}

const loading = ref(false)
const emit = defineEmits(['delete'])
const deleteItem = () => {
    const { dialog, message } = createDiscreteApi(["dialog", "message"])
    dialog.warning({
        content: "是否取消该收藏？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            const { item } = props;
            loading.value = true
            emit('delete', {
                goods_id: item.goods_id,
                type: item.type,
                success() {
                    message.success('取消收藏成功')
                    loading.value = false
                },
                fail() {
                    loading.value = false
                }
            });
        },
    });
}
</script>

