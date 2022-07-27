<template>
    <div>
        <template v-if="pending">
            加载中...
        </template>
        <template v-else-if="error">
            <n-result class="mt-10" status="500" title="500 错误提示" :description="error?.data?.data || '服务器出错可能说明该雇更多程序员了'">
                <template #footer>
                    <n-button @click="$router.go(-1)">返回上页</n-button>
                </template>
            </n-result>
        </template>
        <template v-else>
            <slot />
        </template>
    </div>
</template>
<script setup>
import {NButton,NResult} from "naive-ui"
defineProps({
    pending: {
        type: Boolean,
        default: false
    },
    error: {
        type: [String, Boolean, Symbol],
        default: false
    },
})
</script>