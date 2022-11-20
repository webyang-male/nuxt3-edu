<!-- 评论列表组件 -->
<template>
    <div>
        <div class="px-5 pb-5">
            <h4>精彩评论</h4>
        </div>

        <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
            {{ rows }}
            <div class="flex justify-center items-center mt-5 mb-10">
                <n-pagination size="large" :item-count="total" :page="page" :page-size="limit"
                    :on-update:page="handlePageChange" />
            </div>
        </LoadingGroup>
    </div>
</template>

<script setup>
import { NPagination } from "naive-ui";
const props = defineProps(["post_id"])
const page = ref(1)
let limit = ref(5)

const {
    pending,
    error,
    rows,
    total,
    refresh
} = await usePage(() => {
    return usePostCommentApi(() => {
        return {
            limit: limit.value,
            page: page?.value || 1,
            post_id: props?.post_id
        }
    })
})

//分页
function handlePageChange(p) {
    page.value = p
    refresh()
}
</script>

