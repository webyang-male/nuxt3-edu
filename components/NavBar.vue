<template>
    <div class="navbar">
        <div class="container flex items-center h-[4rem]">
            <n-button text class="!ml-[3rem] !text-xl !font-bold ">追梦教育</n-button>
            <div class="menu">
                <div class="menu-item" v-for="(item,index) in menus" :key="item.name"
                :class="{'menu-item-active':(route.path==item.path)}"
                @click="handleOpen(item.path)"            
                >{{item.name}}</div>
            </div>

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
const menus=[{
    name: "首页",
    path: "/"
},{
    name: "考试",
    path: "/paper/1"
},{
    name: "拼团",
    path: "/list/group/1"
},{
    name: "秒杀",
    path: "/list/flashsale/1"
},{
    name: "直播",
    path: "/list/live/1"
},{
    name: "专栏",
    path: "/list/column/1"
},{
    name: "电子书",
    path: "/list/book/1"
},{
    name: "社区",
    path: "/bbs/0/1"
},{
    name: "课程",
    path: "/list/course/1"
}]

function handleOpen(path){
    navigateTo(path)
} 
</script>

<style>
.navbar {
    z-index: 999;
    @apply bg-white fixed top-0 left-0 right-0 shadow-sm;
}
.menu{
    @apply flex items-center px-4;
}
.menu-item{
    transition: all .3s;
    @apply px-2 py-1 mx-1 rounded cursor-pointer hover:(bg-blue-50 text-blue-500) !active:(bg-blue-100);
}
.menu-item-active{
    @apply !bg-blue-100 !text-blue-500;
}
</style>