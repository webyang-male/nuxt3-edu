<!-- 课程详情-精品推荐组件 -->
<template>
    <section class="bg-white shawdow rounded mb-5">
        <div class="p-3 border-b ">
            <h4>精品推荐</h4>
        </div>
        <div class="p-3">
            <CourseList v-for="(item,index) in data" :key="index" :item="item" />
        </div>
    </section>
</template>

<script setup>
let { data } = await useHotCourseListApi();
</script>
