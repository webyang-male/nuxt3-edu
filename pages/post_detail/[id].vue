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
                        {{ data }}
                    </section>
                </LoadingGroup>

                <!-- 评论区 -->
                <NDivider/>
                
            </n-grid-item>
            <n-grid-item :span="6">
                <n-button type="primary" class="mb-5 w-full">发布帖子</n-button>
                <HotCourseList />
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script setup>
import { NButton, NBreadcrumb, NBreadcrumbItem, NGrid, NGridItem, NDivider } from 'naive-ui';

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

//用户权限验证
definePageMeta({
    middleware: ["auth"]
})

</script>

