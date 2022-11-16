<!-- 考试内容 -->
<template>
    <n-grid :x-gap="20">
        <n-grid-item :span="18">
            <n-card>
                <template #header>
                    <h3 class="text-center font-bold">{{ data.title }}</h3>
                    <n-divider />
                    <p class="space-x-5 text-center text-sm">
                        <span>题目总数：{{data.testpaper_questions.length}}</span>
                        <span>总分数：{{data.total_score}}</span>
                        <span>时间：{{data.expire}}分钟</span>
                    </p>
                </template>
                <!-- 题目组件 -->
                <PaperTestItems v-for="(item, index) in data.testpaper_questions" :key="index"
                :item="item" :index="index"/>
            </n-card>
        </n-grid-item>
        <!-- 右侧试卷情况预览 -->
        <n-grid-item :span="6">
            <n-card>
                <template #header>
                    <div class="flex flex-col items-center justify-center">
                        <small class="mb-1 text-gray-500">剩余时间</small>
                        <TimeBox :expire="data.expire" class="text-3xl text-light-blue-500" />
                    </div>
                </template>
                <n-grid :x-gap="12" :cols="4">
                    <n-grid-item v-for="(item, index) in data.testpaper_questions" :key="index">
                        <n-tag class="mb-2 w-full cursor-pointer flex items-center justify-center">{{ index + 1 }}
                        </n-tag>
                    </n-grid-item>
                </n-grid>
                <n-divider />
                <div>
                    <n-button type="primary" class="w-full">交&nbsp;卷</n-button>
                </div>
            </n-card>
        </n-grid-item>
    </n-grid>
</template>

<script setup>
import { NButton, NGrid, NGridItem, NCard, NTag, NDivider } from "naive-ui";
import PaperTestItems from "~~/components/PaperTestItems.vue";

const data = ref({
    "id": 12,

    "title": "测试试卷111",

    "total_score": 100,

    "pass_score": 60,

    "expire": 60,

    "testpaper_questions": [
        {
            "id": 42,

            "score": 25,

            "question_id": 73,

            "title": "说说你的看法",

            "remark": "问题解析",

            "type": "answer",

            "user_value": [
                ""
            ]

        },
        {
            "id": 43,

            "score": 25,

            "question_id": 72,

            "title": "请问我年龄多大",

            "remark": "问题解析",

            "type": "completion",

            "user_value": [
                ""
            ]

        },
        {
            "id": 44,

            "score": 0,

            "question_id": 71,

            "title": "请问我是男生还是女生",

            "remark": "问题解析",

            "type": "trueOrfalse",

            "options": [
                "正确",
                "错误"
            ],

            "user_value": -1

        },
        {
            "id": 45,

            "score": 25,

            "question_id": 70,

            "title": "你的名字叫什么",

            "remark": "问题解析",

            "type": "checkbox",

            "options": [
                "张三",
                "李四",
                "王五",
                "王五哈"
            ],

            "user_value": []

        },
        {
            "id": 46,

            "score": 25,

            "question_id": 65,

            "title": "你的名字叫什么",

            "remark": "问题解析",

            "type": "checkbox",

            "options": [
                "张三",
                "李四",
                "王五",
                "王五哈"
            ],

            "user_value": []

        }
    ],

    "user_test_id": 7

})
</script>
