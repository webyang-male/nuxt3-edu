<template>
    <div class="border-b p-5">
        <div class="cursor-pointer">
            <n-tag v-if="item.is_top" :bordered="false" type="success" size="small">
                置顶
            </n-tag>
            {{ item.desc.text }}
        </div>
        <div class="mt-3 cursor-pointer max-w-[500px]">
            <n-image v-for="(img, imgI) in item.desc.images" :key="imgI" :src="img"
                :width="item.desc.images.length == 1 ? 300 : 150" :height="item.desc.images.length == 1 ? 200 : 100"
                class="mr-3 mb-2 rounded" />
        </div>
        <div class="flex mt-5">
            <n-button secondary strong size="tiny" class="mr-3" :type="item.issupport ? 'primary' : 'tertiary'"
                @click.stop="handleSupport(item)" :loading="supportLoading">
                <template #icon>
                    <n-icon>
                        <ThumbsUpSharp />
                    </n-icon>
                </template>
                点赞 {{ item.support_count || 0 }}
            </n-button>

            <n-button secondary strong size="tiny" class="mr-3">
                <template #icon>
                    <n-icon>
                        <ChatboxEllipsesOutline />
                    </n-icon>
                </template>
                评论 {{ item.comment_count || 0 }}
            </n-button>
            <n-button text size="tiny" class="mr-3">作者：{{ item.user.name }}</n-button>
            <n-button type="error" size="tiny">
                删除
            </n-button>
        </div>
    </div>
</template>

<script setup>
import { NTag, NImage, NButton, NIcon, createDiscreteApi } from 'naive-ui'
import { ThumbsUpSharp, ChatboxEllipsesOutline } from "@vicons/ionicons5"
defineProps({ item: Object })

//点赞点击事件
const supportLoading = ref(false)
const handleSupport = (item) => {
    //用户登录才能操作
    useHasAuth(async () => {
        //行为判断
        let type = item.issupport ? 'unsupport' : 'support'
        let msg = item.issupport ? '取消点赞' : '点赞'

        supportLoading.value = true;
        const { error } = await usePostSupportApi(item.id, type)
        supportLoading.value = false;

        //操作失败
        if (error.value) return;

        //操作成功
        if (type === 'unsupport') {
            item.support_count--
        } else {
            item.support_count++;
        }

        item.issupport = !item.issupport;

        const { message } = createDiscreteApi(["message"])
        message.success(msg + "成功！")
    })
}
</script>
