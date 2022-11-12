<!-- 拼团组件 -->
<template>
    <div class="mb-4">
        <n-card>
            <template #header>
                <div class="text-gray-500 text-sm">
                    {{ data.count }}人在拼单，可直接参与
                </div>
            </template>
            <n-scrollbar style="height: 60px;">
                <div class="flex items-center h-[60px] px-4" v-for="(item, index) in rows" :key="index">
                    <n-avatar :size="45" :src="item.users[0].avator" round></n-avatar>
                    <span class="ml-2">{{ item.users[0].nickname ? item.users[0].nickname :
                            item.users[0].username
                    }}</span>
                    <div class="ml-auto">
                        <p>还差 <span class="text-rose-500">{{ item.total - item.num }}人</span>拼成</p>
                        <div class="text-xs text-gray-500 mt-1 flex items-center">剩余
                            <Seckill :time="item.end_time" @end="handleTimeUp(index)" />
                        </div>
                    </div>
                    <n-button type="primary" size="small" class="ml-2" @click="handleGroup(item)"
                        :loading="item.loading">去拼团</n-button>
                </div>
            </n-scrollbar>
        </n-card>

    </div>
</template>

<script setup>
import {
    NCard,
    NScrollbar,
    NButton,
    NAvatar,
    createDiscreteApi
} from "naive-ui"

const props = defineProps({
    group_id: {
        type: Number,
        default: 0
    }
})

let {
    data,
    error
} = await useGetGroupWorkListApi(props.group_id)

const rows = ref([])
if (!error.value) {
    rows.value = data.value.rows.map(o => {
        o.end_time = (new Date(o.created_time)).getTime() + 24 * 60 * 60 * 1000
        o.loading = false
        return o
    })
}

function handleTimeUp(index) {
    rows.value.splice(index, 1)
    data.value.count--
}

//拼团事件
//没有拼团展示就扫码支付一个最便宜的拼团就行了,注意新注册账号体验
function handleGroup(item) {
    useHasAuth(() => {
        const { dialog } = createDiscreteApi(["dialog"])
        dialog.success({
            title: "提示",
            content: "是否要参与此次拼单？",
            positiveText: "确定",
            negativeText: "取消",
            onPositiveClick() {
                item.loading = true
                useCreateOrderApi({
                    group_id: props.group_id,
                    group_work_id: item.id
                }, "group")
                    .then(res => {
                        if (!res.error.value) {
                            navigateTo(`/pay?no=${res.data.value.no}`)
                        }
                    })
                    .finally(() => {
                        item.loading = false
                    })
            }
        })
    })
}

</script>

<style>

</style>