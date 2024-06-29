<template>
    <div class="flex p-5">
        <n-avatar :size="40" :src="item.user.avatar"></n-avatar>
        <div class="ml-2 flex-1">
            <h4>{{ item.user.name }}</h4>
            <small class="text-gray-500">
                <n-time :time="new Date(item.created_time)" type="datetime" />
            </small>
            <p class="my-3">
                <n-tag size="small" :bordered="false" v-if="item.reply_user" style="opacity: 0.5;">
                    @{{ item.reply_user.username }}
                </n-tag>
                {{ item.content }}
            </p>
            <n-button strong secondary size="small" @click="openInput">
                回复
            </n-button>

            <CommentInput v-if="showInput" showCancel 
            @cancel="showInput = false"
            :reply_id="item.reply_id ? item.reply_id : item.id"
            :reply_user="reply_user"
            :post_id="item.post_id"
            @success="emit('commentSuccess')"/>

            <n-divider/>

            <slot/>

        </div>
    </div>
</template>
<script setup>
    import {
        NAvatar,
        NButton,
        NDivider,
        NTime,
        NTag
    } from "naive-ui"

    const props = defineProps({
        item:Object
    })

    const showInput = ref(false)
    function openInput(){
        showInput.value = true
    }

    const reply_user = computed(()=>{
        return {
            id:props.item.user.id,
            username:props.item.user.name,
            avatar:props.item.user.avatar,
        }
    })

    const emit = defineEmits(["commentSuccess"])
</script>