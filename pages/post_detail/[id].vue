<template>
    <div>
        <n-breadcrumb class="mb-3">
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
                <section class="bg-white rounded mb-5">
                    <LoadingGroup :pending="pending" :error="error">
                        <div class="flex p-5 pb-0">
                            <n-avatar :size="40" :src="data.user.avatar"></n-avatar>
                            <div class="ml-2 flex-1">
                                <h4>{{ data.user.name }}</h4>
                                <small class="text-gray-500">发布时间：{{ data.created_time }}</small>
                            </div>
                            <n-tag size="small" type="success" :bordered="false" v-if="data.is_top">置顶</n-tag>
                        </div>

                        <n-divider/>

                        <div class="p-5 pt-0">
                            <div v-for="(item,index) in data.content" :key="index">
                                <p class="mb-3">{{ item.text }}</p>
                                <div class="flex flex-col items-center">
                                    <n-image-group>
                                        <n-image v-for="(img,imgI) in item.images" :key="imgI" :src="img" object-fit="cover"
                                        class="mb-3 rounded shadow"/>
                                    </n-image-group>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-center">
                            <n-button secondary strong size="tiny" class="mr-3"
                            :type="data.issupport ? 'primary' : 'tertiary'"
                            @click.stop="handleSupport(data)" :loading="supportLoading">
                                <template #icon>
                                    <n-icon><ThumbsUpSharp /></n-icon>
                                </template>
                                点赞 {{ data.support_count || '' }}
                            </n-button>
                        </div>

                    </LoadingGroup>

                    <n-divider />
                    
                    <CommentInput :post_id="id" @success="handleCommentSuccess" />

                    <Comment :post_id="id" ref="CommentRef"/>

                </section>
            </n-grid-item>
            <n-grid-item :span="6">
                <NuxtLink to="/post/add">
                    <n-button type="primary" class="mb-5 w-full">发布帖子</n-button>
                </NuxtLink>
                <HotCourseList/>
            </n-grid-item>
        </n-grid>
        

    </div>
</template>
<script setup>
    import {
        NBreadcrumb,
        NBreadcrumbItem,
        NGrid,
        NGridItem,
        NDivider,
        NButton,
        NAvatar,
        NTag,
        NImage,
        NImageGroup,
        NIcon
    } from "naive-ui"

    import {
        ThumbsUpSharp
    } from "@vicons/ionicons5"

    const route = useRoute()
    const id = route.params.id

    const {
        data,
        error,
        pending
    } = await useReadPostApi(id)
    
    const title = computed(()=>{
        if(pending.value){
            return "帖子详情"
        }
        let t = data.value?.desc?.text
        if(t && t.length >= 10){
            t = t.slice(0,10) + "..."
        }
        return t
    })

    useHead({ title })


    const {
        supportLoading,
        handleSupport
    } = useHandleSupportPost()

    // 评论成功
    const CommentRef = ref(null)
    function handleCommentSuccess(){
        CommentRef.value.handlePageChange(1)
    }

</script>