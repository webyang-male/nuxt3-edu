<template>
    <n-grid :x-gap="20">
        <n-grid-item :span="18">
            <n-card>
                <template #header>
                    <h3 class="text-center font-bold">{{ data.title }}</h3>
                    <n-divider />
                    <p class=" space-x-5 text-sm text-center">
                        <span>题目总数：{{ data.testpaper_questions.length }}</span>
                        <span>总分数：{{ data.total_score }}</span>
                        <span>时间：{{ data.expire }}分钟</span>
                    </p>
                </template>

                <!-- 题目组件 -->
                <PaperTestItems v-for="(item, index) in testpaper_questions" :id="'question_' + index" :key="index"
                    :item="item" :index="index" @change="handleUserValueChange(item, $event)" />

            </n-card>
        </n-grid-item>
        <!-- 右侧试卷状态窗格导航 -->
        <n-grid-item :span="6">
            <n-card>
                <template #header>
                    <div class="flex flex-col items-center justify-center">
                        <small class="text-gray-500 mb-1">剩余时间</small>
                        <TimeBox :expire="data.expire" class="text-3xl text-light-blue-600" />
                    </div>
                </template>
                <n-grid :x-gap="12" :cols="4">
                    <n-grid-item v-for="(item, index) in testpaper_questions" :key="index">
                        <n-tag @click="jumpToQuestion(index)"
                            class="mb-2 w-full cursor-pointer flex items-center justify-center"
                            :type="item.isTest ? 'success' : ''">{{ index + 1 }}</n-tag>
                    </n-grid-item>
                </n-grid>
                <n-divider />
                <div>
                    <n-button type="primary" class="w-full" @click="submit()" :loading="loading">交 卷</n-button>
                </div>
            </n-card>
        </n-grid-item>
    </n-grid>
</template>
<script setup>
import { onBeforeRouteLeave } from "vue-router"
import {
    NGrid,
    NGridItem,
    NButton,
    NTag,
    NCard,
    NDivider,
    createDiscreteApi
} from "naive-ui"

const route = useRoute()

let { data } = useReadDetailApi(route.params.id)



// 题目列表
const testpaper_questions = computed(() => {
    return data.value ? data.value.testpaper_questions.map(o => {
        o.isTest = false
        return o
    }) : []
})

// 监听题目值变化
function handleUserValueChange(item, val) {
    item.user_value = val
    updateIsTest()
}

// 检查题目是否填写
function updateIsTest() {
    testpaper_questions.value.forEach(item => {
        let flag = false
        // 问答和填空
        if (item.type == 'answer' || item.type == 'completion') {
            flag = !!item.user_value[0]
        }
        // 单选
        else if (item.type == 'radio' || item.type == 'trueOrfalse') {
            flag = item.user_value != -1
        }
        // 多选
        else {
            flag = item.user_value.length > 0
        }

        item.isTest = flag
    })
}


//题目跳转
function jumpToQuestion(index) {
    let questionDom = document.getElementById("question_" + index)
    window.scrollTo(0, questionDom.offsetTop)
}

/* 考试拦截切换其他页面
需考生确认放弃考试 */
const disabled_PageBack = ref(true)
onBeforeRouteLeave((to, from, next) => {
    if (!disabled_PageBack.value) {
        next()
    } else {
        const { dialog } = createDiscreteApi(["dialog"])
        dialog.warning({
            content: "是否要放弃考试？",
            positiveText: "确定",
            negativeText: "取消",
            onPositiveClick: () => {
                disabled_PageBack.value = false
                navigateTo(to.fullPath || "/", { replace: true })
            },
        });
        next(false)
    }

})


//交卷
const loading = ref(false)
async function submit() {
    const { message } = createDiscreteApi(["message"])
    let l = (testpaper_questions.value.fliter(v => !v.isTest)).length
    if (l > 0) {
        return message.warning("还有题目没完成,请检查~")
    }
    loading.value = true
    const {
        data: submitData,
        error: submitError,
    } = await useSubmitTestApi({
        user_test_id: data.user_test_id,
        value: testpaper_questions.value.map(o => o.value)
    })
    loading.value = false

    if(submitError.value) return

    //跳转前先把disabled_PageBack设置为false
    disabled_PageBack.value = false;
    message.success("交卷成功(＾－＾)V")
    navigateTo(`/paper/1`,{
        replace:true
    })
}

//自动交卷

</script>
