<template>
    <div>
        <template v-if="pending">
            加载中...
        </template>
        <template v-else-if="error">
           错误提示： {{ error?.data?.data }}
        </template>
        <template v-else>
            <template v-for="(item,index) in data" :key="index">
                <Banner :data="item.data" v-if="item.type == 'swiper'"/>
            </template>
        </template>
        
    </div>
</template>
<script setup> 
const { 
    pending,
    data,
    refresh,
    error
} = await useFetch("/index",{
    key:"IndexData",
    baseURL:"http://demonuxtapi.dishait.cn/pc",
    headers:{
        appid:"bd9d01ecc75dbbaaefce"
    },
    // 响应之前数据处理
    transform:(res)=>{
        return res.data
    },
    // 是否开启缓存
    initialCache:false,
    // 懒加载
    lazy:true
})

// 服务端时直接报错
if(process.server && error.value){
    throwError(error.value?.data?.data)
}

</script>