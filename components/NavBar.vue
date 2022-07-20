<template>
    <div class="navbar">
        <div class="container flex items-center h-[4rem]">
            <n-button text class="!ml-[3rem] !text-xl !font-bold ">追梦教育</n-button>

            <UiMenu>
                <ui-menu-item v-for="(item, index) in menus" :key="item.name" :active="isMenuItemActive(item)"
                    @click="handleOpen(item.path)">
                    {{ item.name }}
                </ui-menu-item>
            </UiMenu>

            <n-button circle class="ml-auto mr-[2rem]">
                <template #icon>
                    <n-icon>
                        <Search />
                    </n-icon>
                </template>
            </n-button>
            <!-- <n-button class="ml-3" @click="" secondary strong>登录</n-button> -->
            <n-dropdown :options="userOptions">
                <n-avatar round size="medium" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
            </n-dropdown>

        </div>
    </div>
    <div class="w-[100%] h-[5rem]"></div>
</template>

<script setup>
//引入naive-ui组件
import { NButton, NIcon, NDropdown, NAvatar } from 'naive-ui'
import { Search } from '@vicons/ionicons5'


const route = useRoute();

const userOptions = [{
    label: "用户中心",
    key: "center",
}, {
    label: "账号退出",
    key: "logout",
}]

//定义导航菜单数据
const menus = [{
    name: "首页",
    path: "/"
}, {
    name: "考试",
    path: "/paper/1",
    match: [{ name: 'paper-page' }]
}, {
    name: "拼团",
    path: "/list/group/1",
    match: [{ name: 'list-type-page', params: { type: 'group' } }]
}, {
    name: "秒杀",
    path: "/list/flashsale/1",
    match: [{ name: 'list-type-page', params: { type: 'flashsale' } }]
}, {
    name: "直播",
    path: "/list/live/1",
    match: [{ name: 'list-type-page', params: { type: 'live' } }]
}, {
    name: "专栏",
    path: "/list/column/1",
    match: [{ name: 'list-type-page', params: { type: 'column' } }]
}, {
    name: "电子书",
    path: "/list/book/1",
    match: [{ name: 'list-type-page', params: { type: 'book' } }]
}, {
    name: "社区",
    path: "/bbs/0/1",
    match: [{ name: 'bbs-bbs_id-page' }]
}, {
    name: "课程",
    path: "/list/course/1",
    match: [{ name: 'list-type-page', params: { type: 'course' } }]
}]

function handleOpen(path) {
    navigateTo(path)
}

let isMenuItemActive = (item) => {
    if (item.match) {
        let i = item.match.findIndex(o => {
            let res = true;
            if (o.params && typeof (o.params === 'object')) {
                res =  Object.keys(o.params).every(key => {
                    return o.params[key] === route.params[key]
                })
            }
           return o.name == route.name && res
        })
        return i != -1;
    }
    return route.path == item.path;
}
</script>

<style>
.navbar {
    z-index: 999;
    @apply bg-white fixed top-0 left-0 right-0 shadow-sm;
}
</style>