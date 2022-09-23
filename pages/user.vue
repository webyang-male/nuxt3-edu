<!-- 用户：个人中心页面 -->
<template>
    <n-grid :x-gap="20">
        <n-grid-item :span="5">
            <ul class="center-menu">
                <li :class="{ 'active': (item.name == activeName) }" v-for="(item, index) in menus" :key="index"
                    @click="navigate(item)">
                    {{ item.title }}</li>
            </ul>
        </n-grid-item>
        <n-grid-item :span="19">
            <div class="bg-white rounded mb-5 min-h-[66vh]">
                <NuxtPage :page-key="pageKey" />
            </div>
        </n-grid-item>
    </n-grid>
</template>

<script setup>
import { NGrid, NGridItem } from 'naive-ui'
const route = useRoute()
const pageKey = computed(() => route.fullPath)

const menus = [{
    title: "学习记录",
    name: "user-history-page",
}, {
    title: "购买记录",
    name: "user-buy-page",
}, {
    title: "我的考试",
    name: "user-test-page",
}, {
    title: "我的帖子",
    name: "user-post-page",
}, {
    title: "优惠券记录",
    name: "user-coupon-page",
}, {
    title: "我的收藏",
    name: "user-fava-page",
}, {
    title: "修改资料",
    name: "user-edit",
}, {
    title: "修改密码",
    name: "user-password",
}, {
    title: "其他设置",
    name: "user-other",
}]

const activeName = computed(() => route.name)
const navigate = (item) => {
    if (item) {
        navigateTo({
            name: item.name,
            params: {
                page: 1
            }
        })
    }
}

//用户权限验证
definePageMeta({
    middleware: ["auth"]
})

</script>

<style>
.center-menu {
    @apply list-none bg-white rounded;
}

.center-menu li {
    @apply px-5 py-3 text-sm cursor-pointer hover: (bg-blue-50);
}

.center-menu .active {
    @apply font-bold text-blue-400 bg-gray-200;
}
</style>