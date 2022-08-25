<!-- 考试内容组件 --> 
<template>
    <UiCard>
        <UiCardHeader class="flex justify-between">
            <span>{{ item.testpaper.title }}</span>
            <span :class="item.answer_status ? 'text-green-600' : 'text-rose-500'">{{ item.answer_status ? '考试完成' :
                    "考试中"
            }}</span>
        </UiCardHeader>
        <UiCardBody>
            <small class="mr-3">题目总数:{{ item.testpaper.question_count }}</small>
            <small class="mr-3">总分数:{{ item.testpaper.total_score }}</small>
            <small class="mr-3">及格分:{{ item.testpaper.pass_score }}</small>
        </UiCardBody>
        <UiCardFooter class="flex justify-between">
            <span>{{ item.created_time }}</span>
            <span :class="item.read_status ? 'text-green-600':'text-rose-500'">
                最终得分: <span>{{ item.read_status ? item.score : "正在阅卷" }}</span>
            </span>
        </UiCardFooter>
    </UiCard>
</template>

<script setup>
import { NButton } from "naive-ui"
const props = defineProps({ item: Object })


</script>

