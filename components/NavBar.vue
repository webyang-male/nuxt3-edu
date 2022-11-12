<template>
    <div class="navbar">
        <div class="container flex items-center h-[60px]">
            <n-button text class="!text-xl !font-bold" @click="goHome">IT编程</n-button>

            <ui-menu>
                <ui-menu-item v-for="(item, index) in menus" :key="index" :active="isMenuItemActive(item)"
                    @click="handleOpen(item.path)">
                    {{ item.name }}
                </ui-menu-item>
            </ui-menu>

            <n-button circle class="ml-auto mr-3" @click="openSearch">
                <template #icon>
                    <n-icon>
                        <Search />
                    </n-icon>
                </template>
            </n-button>
            <nuxt-link to="/login" v-if="!user">
                <n-button secondary strong>登录</n-button>
            </nuxt-link>

            <n-dropdown v-else :options="userOptions" @select="handleSelect">
                <n-avatar round size="small"
                    :src="user.avatar ? user.avatar : 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'" />
            </n-dropdown>
        </div>
    </div>
    <div class="w-[100%] h-[80px]"></div>
    <SearchBar ref="SearchBarRef" />
</template>
<script setup>
import {
    NButton,
    NIcon,
    NDropdown,
    NAvatar,
    createDiscreteApi
} from "naive-ui"
import {
    Search
} from "@vicons/ionicons5"


const user = useUser()

const route = useRoute()
const menus = [{
    name: "首页",
    path: "/"
}, {
    name: "考试",
    path: "/paper/1",
    match: [{
        name: "paper-page"
    }]
}, {
    name: "拼团",
    path: "/list/group/1",
    match: [{
        name: "list-type-page",
        params: {
            type: "group"
        }
    }]
}, {
    name: "秒杀",
    path: "/list/flashsale/1",
    match: [{
        name: "list-type-page",
        params: {
            type: "flashsale"
        }
    }]
}, {
    name: "直播",
    path: "/list/live/1",
    match: [{
        name: "list-type-page",
        params: {
            type: "live"
        }
    }]
}, {
    name: "专栏",
    path: "/list/column/1",
    match: [{
        name: "list-type-page",
        params: {
            type: "column"
        }
    }]
}, {
    name: "电子书",
    path: "/list/book/1",
    match: [{
        name: "list-type-page",
        params: {
            type: "book"
        }
    }]
}, {
    name: "社区",
    path: "/bbs/0/1",
    match: [{
        name: "bbs-bbs_id-page"
    }]
}, {
    name: "课程",
    path: "/list/course/1",
    match: [{
        name: "list-type-page",
        params: {
            type: "course"
        }
    }]
}]
function handleOpen(path) {
    navigateTo(path)
}
const isMenuItemActive = (item) => {
    if (item.match) {
        let i = item.match.findIndex(o => {
            let res = true
            if (o.params && typeof o.params === "object") {
                res = (Object.keys(o.params).findIndex(k => route.params[k] == o.params[k])) != -1
            }
            return o.name == route.name && res
        })
        return i != -1
    }
    return route.path == item.path
}

const userOptions = [{
    label: "用户中心",
    key: "center",
}, {
    label: "退出",
    key: "logout",
}]


const SearchBarRef = ref(null)
const openSearch = () => SearchBarRef.value.open()

const handleSelect = (k) => {
    switch (k) {
        case "logout":
            const { dialog } = createDiscreteApi(["dialog"])
            dialog.warning({
                content: "是否要退出登录？",
                positiveText: "退出",
                negativeText: "取消",
                onPositiveClick: async () => {
                    await useLogout()
                },
            });
            break;
        case "center":
            navigateTo({
                path: "/user/history/1"
            })
            break;
    }
}


let goHome = () => {
    navigateTo({
        path: "/"
    })
}
</script>
<style>
.navbar {
    z-index: 1000;
    @apply bg-white fixed top-0 left-0 right-0 shadow-sm;
}

.darkmode-toggle {
    z-index: 1001;
}
</style>
