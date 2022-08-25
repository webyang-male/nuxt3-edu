<!-- 全局加载组件  -->
<template>
    <div>
        <template v-if="loading">
            <slot name="loading">
                <LoadingSkeleton />
            </slot>
        </template>
        <template v-else-if="error">
            <n-result class="mt-10" status="500" title="500 错误提示"
                :description="error?.data?.data || '服务器出错可能说明该雇更多程序员了'">
                <template #footer>
                    <n-button @click="$router.go(-1)">返回上页</n-button>
                </template>
            </n-result>
        </template>
        <template v-else-if="isEmpty">
        <!-- 空数据组件 -->
            <Empty />
        </template>
        <template v-else>
            <slot />
        </template>
    </div>
</template>
<script setup>
import { onBeforeUnmount } from "vue";
import { NButton, NResult } from "naive-ui"

const props = defineProps({
    pending: {
        type: Boolean,
        default: false
    },
    error: {
        type: [String, Boolean, Symbol],
        default: false
    },
    isEmpty: {
        type: Boolean,
        default: false
    }
})

//解决骨架屏加载过快抖动
const loading = ref(false)
const stop = watchEffect(() => {
    if (props.pending && !loading.value) {
        loading.value = true
    } else {
        setTimeout(() => {
            loading.value = false
        }, 300);
    }
})
onBeforeUnmount(() => {
    stop()
})
</script>