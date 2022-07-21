<template>
    <div>
        <template v-if="pending">
            <div>
                加载中...
            </div>
        </template>
        <template v-else-if="error">
            <div>
                错误提示：<br> {{ error?.data?.data }}
            </div>
        </template>
        <template v-else>
            <div>
                {{ data }}
            </div>
        </template>
        <p>{{ data }}</p>
    </div>
</template>

<script setup>
const { data, pending, refresh, error } = await useFetch('/index', {
    key: 'IndexData',
    //域名抽离
    baseUrl: 'http://demonuxtapi.dishait.cn/pc',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        appid: 'bd9d01ecc75dbbaaefce1'
    },
    //响应之前的数据处理函数
    transform: (data) => {
        return data.data
    },
    //是否开启缓存
    initialCache: false,
    //懒加载
    lazy: true,

})
//服务端时直接报错
if (process.server && error.value) {
    throwError(error.value?.data.data)
}
</script>