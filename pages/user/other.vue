<!-- 其他设置页面 -->
<template>
    <div class="p-5">
        <p class="text-sm text-gray-500">其他设置</p>
        <div class="flex py-5 border-b">
            手机号：<span class="text-blue-500">{{user.phone}}</span>
            <n-button type="primary" dashed size="small" class="ml-auto" @click="gotoBindPhone">
                修改
            </n-button>
        </div>
    </div>
</template>

<script setup>
import { NButton } from 'naive-ui'
useHead({ title: "其他设置" })

const user = useUser()

let gotoBindPhone = () => navigateTo("/bindphone")
</script>

