<!-- 全局错误页 -->
<template>
    <div class="pt-[14rem]">
        <n-result status="500" title="500 服务器错误" :description="error.message">
            <template #footer>
                <n-button @click="handleError">回到首页</n-button>
            </template>
        </n-result>
    </div>
</template>

<script setup>
import { NButton, NResult } from 'naive-ui'
const props = defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>