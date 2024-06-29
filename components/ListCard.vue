<template>
    <div>
        <div class="flex mb-3">
            <span class="text-lg">{{ title }}</span>
            <n-button quaternary class="ml-auto">查看更多</n-button>
        </div>
        <n-grid x-gap="12" :cols="4" class="mb-6">
            <n-gi v-for="(item,index) in pdata" :key="index">
                <CourseList :item="item"/>
            </n-gi>
        </n-grid>
    </div>
</template>
<script setup>
import {
    NButton,
    NGrid,
    NGi,
} from "naive-ui"

const props = defineProps({
    title:String,
    data:Array,
    type:{
        type:String,
        default:"course"
    }
})

const pdata = ref(props.data || [])
if(props.type === "group"){
    const { 
        data,
    } = await useGroupDataApi({
        page:1,
        usable:1,
        limit:8
    })

    pdata.value = data.value?.rows ?? []
}
</script>
