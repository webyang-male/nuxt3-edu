<template>
    <div style="width:100%;">
        <!-- 不在客户端渲染会有不能上传图片的bug -->
        <ClientOnly>
            <template #fallback>
                <!-- 加载中 -->
                <div class="border rounded bg-gray-50 flex items-center justify-center"
                style="width:94px;height:94px;">
                    <n-spin show />
                </div>
            </template>
            <n-upload
                accept="image/*"
                :action="action"
                :headers="headers"
                v-model:file-list="fileList"
                name="file"
                :data="data"
                list-type="image-card"
                :max="1"
                :on-error="handleError"
                :on-finish="handleSuccess"
                :multiple="false"
            />
        </ClientOnly>
    </div>
</template>
<script setup>
import {
    NSpin,
    NUpload,
    createDiscreteApi
} from "naive-ui"
const {
    action,
    headers
} = useUploadConfig()

const props = defineProps({
    modelValue:String,
    data:{
        type:Object
    }
})

const fileList = ref([])

initFileList()

// 上传成功
const handleSuccess = (...e)=>{
    console.log(e);
    const { file,event } = e[0]
    const response = JSON.parse(event.target.response)
    file.url = response.data
    return file
}

// 上传失败
const handleError = (e)=>{
    const { message } = createDiscreteApi(["message"])
    message.error("上传失败")
}

// 初始化filelist
function initFileList(){
    fileList.value = props.modelValue ? [{
        id: props.modelValue,
        name: props.modelValue,
        status: 'finished',
        url: props.modelValue
    }] : []
}

// 监听fileList变化
const stopWatch = watch(()=>fileList,(newVal)=>{
    updateModelValue()
},{
    deep:true
})

onBeforeUnmount(()=>stopWatch())

const emit = defineEmits(["update:modelValue"])
function updateModelValue(){
    let urls = []
    fileList.value.forEach(o=>{
        if(o.status === "finished" && o.url){
            urls.push(o.url)
        }
    })
    emit("update:modelValue",urls[0] || "")
}

</script>
