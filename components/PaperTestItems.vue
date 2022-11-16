<!-- 考试题目列表组件 -->
<template>
    <div class="test-item">
        <div class="title">
            第{{ index + 1 }}题 <span class="text-orange-400">{{ typeOptions[item.type] }}</span>
        </div>
        <div class="p-4">
            <p class="mb-5" v-html="item.title"></p>
            <!-- 题目选项 -->
            <div v-if="item.type == 'radio' || item.type == 'trueOrfalse' || item.type == 'checkbox'">
                <p class="tips">答案:</p>
                <ul>
                    <li class="options" v-for="(q, qI) in item.options" :key="qI">
                        <span class="mr-2">{{ en[Number(qI + 1)] }}</span>
                        <div v-html="q"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    item: Object,
    index: Number
})

//题目类型
const typeOptions = {
    answer: "问答题",
    completion: '填空题',
    trueOrfalse: "判断题",
    checkbox: "多选题",
    radio: "单选题"
}

const en = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
}
</script>

<style>
.test-item {
    @apply shadow mb-5 rounded;
}

.test-item .title {
    @apply p-4 bg-gray-100 border-b text-sm
}

.test-item .tip {
    @apply text-xs mb-3 text-gray-500
}

.test-item .options {
    transition: all .2s;
    @apply flex border rounded p-2 mb-2 cursor-pointer text-sm hover: ( !border-blue-500 !bg-light-blue-50 !text-light-blue-600) active:( !bg-light-blue-100 !text-black)
}

.test-item .active {
    @apply !border-blue-500 !bg-light-blue-50 !text-light-blue-600
}
</style>