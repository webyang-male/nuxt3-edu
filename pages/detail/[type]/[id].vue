<template>
    <LoadingGroup :pending="pending" :error="error">
        <section class="detail-top">
            <n-image :src="data.cover" object-fit="cover" class="image" />
            <div class="info">
                <div class="flex flex-col items-start">
                    <div class="flex items-center">
                        <span class="text-xl mr-2">{{data.title}}</span>
                    </div>
                    <p class="my-2 text-sm text-gray-400">{{subTitle}}</p>
                    <div v-if="!data.isbuy">
                        <Price :value="data.price" class="text-xl" />
                        <Price :value="data.t_price" through class="text-sm ml-1" />
                    </div>
                </div>

                <div class="mt-auto" v-if="!data.isbuy">
                    <n-button type="primary" @click="">光速学习</n-button>
                </div>
            </div>
        </section>

        <n-grid :x-gap="20">
            <n-grid-item :span="18">
                <section class="detail-bottom">
                    <UiTab>
                        <UiTabItem active>详情</UiTabItem>
                    </UiTab>
                    <!-- 课程是图文类型并且已经购买则显示课程内容，否则显示介绍 -->
                    <div class="content" v-html="(data.type == 'media' && data.isbuy) ? data.content: data.try">
                    </div>
                </section>
            </n-grid-item>
            <n-grid-item :span="6">
                <HotCourseList />
            </n-grid-item>
        </n-grid>

    </LoadingGroup>
</template>

<script setup>
import {
    NImage,
    NButton, NGrid, NGridItem
} from 'naive-ui';

const route = useRoute()
const { id, type } = route.params

const { data, error, pending, refresh } = await useReadCourseApi({
    id
})

//懒加载数据获取修改页面title失败处理
const title = computed(() => !pending.value ? data.value?.title : "详情页面")

useHead({ title });

const o = {
    media: "图文",
    video: "视频",
    audio: "音频"
}
const subTitle = computed(() => {
    let pre = "";
    if (type == "course") {
        pre = `【${o[data.value.type]}】`
    }
    return `${pre}${data.value.sub_count}人学过`
})
</script>

<style>
.detail-top {
    @apply rounded bg-white flex p-5 my-2
}

.detail-top .image {
    @apply rounded w-[340px] h-[210px] mr-5
}

.detail-top .info {
    @apply flex flex-1 flex-col py-2
}

.detail-bottom {
    @apply bg-white shadow-white mb-5 rounded
}

.content {
    @apply p-4
}

.content img {
    max-width: 100% !important;
}
</style>