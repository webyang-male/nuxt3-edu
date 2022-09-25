<template>
    <div class="mt-auto bg-dark-400 text-light-500">
        <div class="flex  items-center justify-center py-4">
            <a :href="item.url" v-for="item in footerLinkArrays" :key="item.name" class="p-3">{{item.name}}</a>
        </div>
        <div class="container mx-auto border-t border-gray-600 flex  items-center justify-center !py-4">
            <small>
                Copyright© 2022 大赵同学 鄂ICP备 1000000号-1
            </small>
        </div>
    </div>
</template>

<script setup>
let footerLinkArrays = [
    {
        name: "项目源码",
        url: "https://github.com/webyang-male/nuxt3-edu"
    },
    {
        name: "其他项目",
        url: "https://github.com/webyang-male/vue3-mallManage",
    },
    {
        name: "站长博客",
        url: "//www.bugjs.cn"
    },
    {
        name: "烂笔头",
        url: "https://doc.zzychaser.top/#/"
    },
]
</script>