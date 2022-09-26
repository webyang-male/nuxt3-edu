<template>
    <LoadingGroup :pending="pending" :error="error">
        <n-grid :x-gap="20">
            <!-- 目录区 -->
            <n-grid-item :span="6">
                <n-scrollbar style="max-height:450px" class="bg-white rounded shadow mb-5">
                    <div class="flex flex-col items-center justify-center">
                        <n-image :src="data.detail.cover" width="60" height="80" class="rounded shadow my-4" />
                        <span class="text-sm font-bold">{{data.detail.title}}</span>
                    </div>
                    <!-- 详情目录 -->
                    <DetailMenu>
                        <DetailMenuItem v-for="(item,index) in data.menus" :key="index" :item="item" :index="index"
                            @click="open(item.id)" :active="activeId == item.id" />

                        <Empty v-if="data.menus.length == 0" desc="啊咧~暂无目录" />
                    </DetailMenu>
                </n-scrollbar>
            </n-grid-item>
            <!-- 内容区 -->
            <n-grid-item :span="18">
                <n-card>
                    <NuxtPage :page-key="pageKey" />
                </n-card>
            </n-grid-item>
        </n-grid>
    </LoadingGroup>
</template>

<script setup>
import {
    NGrid,
    NGridItem,
    NCard,
    NScrollbar,
    NImage
} from "naive-ui"
const route = useRoute()
const pageKey = computed(() => route.fullPath)
const { book_id, id } = route.params
const activeId = ref(id)

const {
    data,
    error,
    pending
} = await useBookMenusApi(book_id)

//路由跳转
const open = (d) => {
    activeId.value = d
    navigateTo({
        params: {
            ...route.params,
            id: d
        }
    })
}

definePageMeta({
    middleware(to, from) {
        const { book_id } = to.params
        if (isNaN(+book_id)) {
            return abortNavigation("页面不存在")
        }
        return true
    }
})
</script>

