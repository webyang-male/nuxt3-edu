<!-- 考试列表组件 -->
<template>
    <section class="bg-white shadow p-5 mb-5 rounded">
        <div class="flex justify-between">
            <h4>标题</h4>
            <small class="text-xs text-rose-500">时长:60分钟</small>
        </div>
        <p class="py-5 text-sm text-gray-500">
            题目总数：0 总分数：100 及格分：62
        </p>
        <div class="flex justify-end">
            <n-button type="primary" @click="">进入考试</n-button>
        </div>
    </section>
</template>

<script setup>
import { NButton} from "naive-ui";
</script>

