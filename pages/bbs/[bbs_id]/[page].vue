<!-- 社区页面 -->
<template>
    <div>
        <BbsTabs />
        <n-grid :x-gap="20">
            <n-grid-item :span="18">
                <LoadingGroup :pending="pending" :error="error" :is-empty="rows.length === 0">
                    <div class="bg-white rounded">
                        <UiTab>
                            <UiTabItem v-for="(t, i) in ts" :key="i" :active="is_top == i" @click="handleIsTop(i)">{{ t
                            }}</UiTabItem>
                        </UiTab>
                    </div>
                    <PostList class="bg-white rounded" v-for="(item, index) in rows" :key="index" :item="item" :showDel="false" />

                    <div class="flex justify-center items-center mt-5 mb-10">
                        <n-pagination size="large" :page="page" :item-count="total" :page-size="limit"
                            :on-update:page="handlePageChange" />
                    </div>
                </LoadingGroup>
            </n-grid-item>
            <n-grid-item :span="6">
                <n-button type="primary" class="mb-5 w-full">发布帖子</n-button>
                <HotCourseList />
            </n-grid-item>
        </n-grid>
    </div>
</template>
<script setup>
import {
    NGrid,
    NGridItem,
    NButton,
    NPagination,
} from "naive-ui"
const route = useRoute()

const bbs_id = ref(route.params.bbs_id)
const is_top = ref(route.query.is_top)
const ts = ref(["最新", "置顶"])

const {
    page,
    limit,
    total,
    handlePageChange,
    rows,
    pending,
    error,
    refresh
} = await usePage(({ page, limit }) => {
    return usePostListApi(() => {
        return {
            page,
            bbs_id: bbs_id.value,
            is_top: is_top.value
        }
    })
})

const handleIsTop = (i) => {
    navigateTo({
        params: {
            ...route.params,
            page: 1
        },
        query: {
            is_top: i
        }
    })

    is_top.value = i

    refresh()
}

definePageMeta({
    middleware(to, from) {
        const {
            bbs_id,
            page
        } = to.params
        if (!isNaN(+bbs_id) && !isNaN(+page)) {
            useHead({
                title: "社区问答列表"
            })
            return true
        }
        return abortNavigation("页面不存在")
    }
})
</script>