<!-- 帖子组件 -->
<template>
    <div class="border-b p-5">
        <div class="cursor-pointer text-gray-600" @click="open">
            <n-tag v-if="item.is_top" :bordered="false" type="success" size="small">
                置顶
            </n-tag>
            {{ item.desc.text }}
        </div>
        <div class="mt-3 cursor-pointer max-w-[500px]" @click="open">
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
            <n-button v-if="showDel" type="error" size="tiny" @click="deleteItem" :loading="loading">
                删除
            </n-button>
        </div>
    </div>
</template>

<script setup>
import { NTag, NImage, NButton, NIcon, createDiscreteApi } from 'naive-ui'
import { ThumbsUpSharp, ChatboxEllipsesOutline } from "@vicons/ionicons5"
const props = defineProps({
    item: Object,
    showDel: {
        type: Boolean,
        default: true
    }
})

//点赞点击事件
const {
    supportLoading,
    handleSupport
} = useHandleSupportPost()

//删除帖子
const loading = ref(false)
const emit = defineEmits(['delete'])

const deleteItem = () => {
    const { dialog, message } = createDiscreteApi(["dialog", "message"])
    dialog.warning({
        content: "是否要删除该贴？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            loading.value = true
            emit('delete', {
                id: props.item.id,
                success() {
                    message.success('删除成功')
                    loading.value = false
                },
                fail() {
                    loading.value = false
                }
            });
        },
    });
}

const open = () => {
    navigateTo("/post_detail/" + props.item.id)
}
</script>
