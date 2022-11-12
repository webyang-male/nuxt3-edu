<!-- 课程详情页 -->
<template>
    <LoadingGroup :pending="pending" :error="error">
        <section class="py-4" v-if="data.isbuy && ((data.type != 'media' && type == 'course') || type == 'live')">
            <ClientOnly>
                <template #fallback>
                    <LoadingSkeleton />
                </template>
                <PlayerAudio v-if="data.type == 'audio'" :title="data.title" :url="data.content" :cover="data.cover" />
                <!-- 引入视频播放器 -->
                <PlayerVideo v-else-if="data.type == 'video'" :url="data.content" />
                <!-- 引入直播播放器 -->
                <PlayerLive v-else-if="type == 'live'" :url="data.playUrl" />
            </ClientOnly>
        </section>

        <section v-else class="detail-top">
            <n-image :src="data.cover" object-fit="cover" class="image" :class="{ 'book-image': type == 'book' }" />
            <div class="info">
                <div class="flex flex-col items-start">
                    <div class="flex items-center">
                        <span class="text-xl mr-2">{{ data.title }}</span>
                        <FavaBtn :isfava="data.isfava" :goods_id="data.id" :type="type" />
                    </div>
                    <p class="my-2 text-sm text-gray-400 ml-[0.1rem]">{{ subTitle }}</p>

                    <template v-if="!data.isbuy">
                        <DetailActiveBar :data="data" v-if="data.group || data.flashsale" />
                        <template v-else>
                            <div>
                                <Price :value="data.price" class="text-xl" />
                                <Price :value="data.t_price" through class="text-sm ml-1" />
                            </div>

                            <!-- 领取优惠券组件 -->
                            <CouponModal v-if="type != 'live'" />

                            <!-- 直播详情页时间状态组件 -->
                            <LiveStatusBar v-else :start="data.start_time" :end="data.end_time" />

                        </template>
                    </template>
                </div>
                <!-- 免费学习功能建议自行注册账号体验效果 -->
                <div class="mt-auto" v-if="!data.isbuy">
                    <template v-if="type == 'book'">
                        <template v-if="menus.length > 0">
                            <n-button @click="buy" type="primary" :loading="loading">光速学习</n-button>
                            <n-button v-if="freeID" @click="learn({ id: freeID })" strong secondary type="info"
                                class="ml-2">
                                免费试看
                            </n-button>
                        </template>
                        <n-button v-else type="error" disabled>敬请期待</n-button>
                    </template>

                    <n-button v-else type="primary" @click="buy" :loading="loading">{{ btn }}</n-button>
                </div>
            </div>
        </section>

        <n-grid :x-gap="20">
            <n-grid-item :span="18">
                <!-- 拼团组件 -->
                <DetailGroupworks v-if="!data.isbuy && data.group" :group_id="data.group.id"/>

                <section class="detail-bottom">
                    <UiTab class="border-b">
                        <UiTabItem :active="tabState == item.value" v-for="(item, index) in tabs" :key="index"
                            @click="changeTab(item.value)">{{ item.label }}
                        </UiTabItem>
                    </UiTab>
                    <!-- 课程是图文类型并且已经购买则显示课程内容，否则显示介绍 -->
                    <div v-if="tabState == 'content'" class="content"
                        v-html="(data.type == 'media' && data.isbuy) ? data.content : data.try">
                    </div>
                    <!-- 详情目录 -->
                    <DetailMenu v-else>
                        <DetailMenuItem v-for="(item, index) in menus" :key="index" :index="index" :item="item"
                            @click="learn(item)" />

                        <Empty v-if="menus.length == 0" desc="啊咧~暂无目录" />
                    </DetailMenu>
                </section>
            </n-grid-item>
            <n-grid-item :span="6">
                <HotCourseList />
            </n-grid-item>
        </n-grid>
    </LoadingGroup>
</template>

<script setup>
import {
    NImage,
    NButton, NGrid, NGridItem, createDiscreteApi
} from 'naive-ui';


const route = useRoute()
const { id, type } = route.params

useInitHead();

const {
    tabs, tabState, changeTab
} = useInitDeatailTabs(type)

//获取请求参数
const query = useRequestQuery()

const { data, error, pending, refresh } = await useReadDetailApi(type, query)

//懒加载数据获取修改页面title失败处理
const title = computed(() => !pending.value ? data.value?.title : "详情页")
useHead({ title });

const o = {
    media: "图文",
    video: "视频",
    audio: "音频"
}
const subTitle = computed(() => {
    let pre = "";
    if (type == "course") {
        pre = `【${o[data.value.type]}】`
    }
    return `${pre}${data.value.sub_count}人学过`
})

//购买课程
const loading = ref(false)
let buy = () => {
    useHasAuth(async () => {
        // 免费学习
        if (data.value.price == 0) {
            loading.value = true
            let {
                error: learnError
            } = await useLearnApi({
                goods_id: data.value.id,
                type: type || data.value.type,
            })

            loading.value = false
            if (!learnError.value) {
                refresh()
            }

            return
        }

        //发起拼团
        if (data.value.group) {
            loading.value = true;
            useCreateOrderApi({
                group_id: data.value.group.id
            }, "group")
                .then(res => {
                    if (!res.error.value) {
                        navigateTo(`/pay?no=${res.data.value.no}`)
                    }
                })
                .finally(() => {
                    loading.value = false;
                })
            return
        }

        //付费学习
        let ty = "course"
        let id = data.value.id

        if (type == "book") {
            ty = "book"
        } else if (type == "live") {
            ty = "live"
        } else if (type == "column") {
            ty = "column"
        }

        //秒杀
        if (data.value.flashsale) {
            ty = "flashsale"
            id = data.value.flashsale.id
        }

        navigateTo(`/createorder?id=${id}&type=${ty}`)
    })
}

//购买按钮文字展示
const btn = computed(() => {
    if (data.value.group) {
        return "立即拼团"
    } else if (data.value.flashsale) {
        return "立即秒杀"
    }
    return "即刻学习"
})



//初始化详情页tab
function useInitDeatailTabs(t) {
    const tabs = computed(() => {
        let ts = [{
            label: "详情",
            value: "content"
        }]
        if (t == "column" || t == "book") {
            ts.push({
                label: "目录",
                value: "menu"
            })
        }
        return ts
    })

    //tab选中状态
    const tabState = ref("content")

    let changeTab = (e) => {
        tabState.value = e;
    }

    return {
        tabs, tabState, changeTab
    }
}

//电子书第一个免费ID
const freeID = computed(() => {
    let fid = 0
    if (type == "book" && data.value) {
        let item = data.value.book_details.find(o => o.isfree == 1)
        if (item) {
            fid = item.id
        }
    }
    return fid
})

//点击学习
let learn = (item) => {
    useHasAuth(() => {
        const { message } = createDiscreteApi(["message"])
        //专栏
        if (type == "column" && item.price != 0 && !data.value.isbuy) {
            return message.error("请先购买")
        }
        //跳转详情
        let url = "";
        if (type == "column") {
            url = `/detail/course/${item.id}?column_id=${data.value.id}`
        } else if (type == 'book') {
            url = `/book/${data.value.id}/${item.id}`
        }
        navigateTo(url)
    })
}

//获取query参数
function useRequestQuery() {
    const { column_id, group_id, flashsale_id } = route.query;
    let query = { id }
    if (column_id) {
        query.column_id = column_id;
    }

    if (flashsale_id) {
        query.flashsale_id = flashsale_id;
    } else if (group_id) {
        query.group_id = group_id;
    }

    return query
}

//电子书目录
const menus = computed(() => (type == "book" ? data.value.book_details : data.value.column_courses) || [])

//初始化head音频引入
//出于nuxt3环境兼容考虑，直接将aplayer资源放置public目录
function useInitHead() {
    if (type === "course") {
        useHead({
            link: [{
                rel: "stylesheet",
                href: "/aplayer/APlayer.min.css"
            }],
            script: [{
                src: "/aplayer/APlayer.min.js",
            }, {
                src: "//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js"
            }]
        })
    }

    if (type === "live") {
        useHead({
            script: [{
                src: "//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js",
            }, {
                src: "//unpkg.byted-static.com/xgplayer-flv/2.5.1/dist/index.min.js"
            }]
        })
    }
}
</script>

<style>
.detail-top {
    @apply rounded bg-white flex p-5 my-2
}

.detail-top .image {
    @apply rounded w-[340px] h-[210px] mr-5
}

.detail-top .book-image {
    @apply rounded w-[130px] h-[180px] mr-8 ml-3
}

.detail-top .info {
    @apply flex flex-1 flex-col py-2
}

.detail-bottom {
    @apply bg-white shadow-white mb-5 rounded
}

.content {
    @apply p-4
}

.content img {
    max-width: 100% !important;
}
</style>