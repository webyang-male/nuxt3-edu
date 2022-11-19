<template>
    <div>
        <BbsTabs />
        <n-grid :x-gap="20" :y-gap="5">
            <n-grid-item :span="18">

            </n-grid-item>
            <n-grid-item :span="6">
                <n-button type="primary" class="w-full mb-5" @click="">发布帖子</n-button>
                <HotCourseList />
            </n-grid-item>
        </n-grid>

    </div>
</template>
<script setup>
import { NGrid, NGridItem, NButton } from 'naive-ui';
const route = useRoute()
// console.log(route.params.bbs_id,route.params.page)


definePageMeta({
    middleware(to, from) {
        const { bbs_id, page } = to.params
        if (!isNaN(+bbs_id) && !isNaN(+page)) {
            useHead({
                title: "社区问答页"
            })
            return true
        }
        return abortNavigation("页面走丢了~")
    }
})
</script>