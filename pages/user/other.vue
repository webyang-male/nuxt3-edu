<template>
    <div class="p-5">
        <p class="text-sm text-gray-500">其他设置</p>
        <div class="flex py-5 border-b">
            手机号：{{ user.phone }}
            <n-button quaternary type="primary" size="small" class="ml-auto" @click="goToBindPhone">
                修改
            </n-button>
        </div>
    </div>
</template>
<script setup>
    import {
        NButton
    } from "naive-ui"
    const user = useUser()
    const goToBindPhone = ()=>navigateTo("/bindphone")
</script>
