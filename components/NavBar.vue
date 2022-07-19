<template>
    <div class="navbar">
        <div class="container flex items-center h-[4rem]">
            <n-button text class="!ml-[3rem] !text-xl !font-bold ">追梦教育</n-button>
            <div class="menu">
                <div class="menu-item menu-item-active">推荐课</div>
                <div class="menu-item" v-for="i in 8" :key="i">分类{{i}}</div>
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

const userOptions = [{
    label: "用户中心",
    key: "center",
}, {
    label: "账号退出",
    key: "logout",
}]
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
    @apply px-2 py-1 mx-1 rounded hover:(bg-blue-50 text-blue-500) !active:(bg-blue-100);
}
.menu-item-active{
    @apply !bg-blue-100 !text-blue-500;
}
</style>