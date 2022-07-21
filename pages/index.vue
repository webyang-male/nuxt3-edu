<template>
    <div>
        <p>index</p>
        <p>{{ data }}</p>
    </div>
</template>

<script setup>
const { data } = await useFetch('/index', {
    key: 'IndexData',
    //域名抽离
    baseUrl: 'http://demonuxtapi.dishait.cn/pc',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        appid: 'bd9d01ecc75dbbaaefce'
    },
    //响应之前的数据处理函数
    transform: (data) => {
        return data.data
    }

})
</script>