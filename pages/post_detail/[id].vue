<!-- 帖子详情页 -->
<template>
    <div>
        <n-breadcrumb>
            <n-breadcrumb-item>
                <NuxtLink to="/">首页</NuxtLink>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
                <NuxtLink to="/bbs/0/1">社区列表</NuxtLink>
            </n-breadcrumb-item>
            <n-breadcrumb-item>{{ title }}</n-breadcrumb-item>
        </n-breadcrumb>

        <n-grid :x-gap="20">
            <n-grid-item :span="18">
                <LoadingGroup :pending="pending" :error="error">
                    <section class="bg-white mb-6 rounded">
                        <div class="flex p-5 pb-0">
                            <n-avatar :size="40" :src="data.user.avatar"></n-avatar>
                            <div class="ml-2 flex-1">
                                <h4 class="!text-orange-300">
                                    {{ data.user.name }}
                                    <n-tag class="ml-1" size="small" type="success" :bordered="false"
                                        v-if="data.is_top">
                                        置顶
                                    </n-tag>
                                </h4>
                                <small class="text-gray-500">发布时间：{{ data.created_time }}</small>
                            </div>
                        </div>

                        <NDivider />

                        <!-- 帖子内容 -->
                        <section class="p-5 pt-0">
                            <div v-for="(item, index) in data.content" :key="index">
                                <p class="postText">{{ item.text }}</p>
                                <div class="flex flex-col items-center">
                                    <n-image-group>
                                        <n-space>
                                            <n-image class="mb-2 rounded shadow" v-for="(img, imgi) in item.images"
                                                :key="imgi" :src="img" object-fit="cover" />
                                        </n-space>
                                    </n-image-group>
                                </div>
                            </div>

                            <div class="flex justify-center items-center">
                                <n-button secondary strong size="tiny" class="mr-3"
                                    :type="data.issupport ? 'primary' : 'tertiary'" @click.stop="handleSupport(data)"
                                    :loading="supportLoading">
                                    <template #icon>
                                        <n-icon>
                                            <ThumbsUpSharp />
                                        </n-icon>
                                    </template>
                                    点赞 {{ data.support_count || 0 }}
                                </n-button>
                            </div>
                        </section>

                    </section>
                </LoadingGroup>

                <!-- 评论区 -->
                <NDivider />
                <Comment :post_id="id"/>
            </n-grid-item>

            <n-grid-item :span="6">
                <n-button type="primary" class="mb-5 w-full">发布帖子</n-button>
                <HotCourseList />
            </n-grid-item>

        </n-grid>
    </div>
</template>

<script setup>
import { NIcon, NImage, NTag, NButton, NBreadcrumb, NBreadcrumbItem, NGrid, NGridItem, NDivider, NAvatar } from 'naive-ui';
import { ThumbsUpSharp } from "@vicons/ionicons5"

const route = useRoute();
const id = route.params.id

const { data, error, pending } = await useReadPostApi(id)
// console.log(data);


const title = computed(() => {
    if (pending.value) {
        return "帖子详情"
    }
    let t = data.value?.desc?.text
    //标题长度处理
    if (t && t.length > 6) {
        t = t.slice(0, 6) + "..."
    }
    return t
})

useHead({ title })

//点赞点击事件
const {
    supportLoading,
    handleSupport
} = useHandleSupportPost()


//用户权限验证
definePageMeta({
    middleware: ["auth"]
})

</script>
<style>
.postText {
    text-indent: 2em !important;
}
</style>
