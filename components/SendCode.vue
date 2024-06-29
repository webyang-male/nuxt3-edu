<template>
    <n-button type="primary" ghost :disabled="time > 0 || !phone" :loading="loading" @click="send">
        {{ text }}
    </n-button>
</template>
<script setup>
import {
    NButton,
    createDiscreteApi
} from "naive-ui"

const props = defineProps(["phone"])
const time = ref(0)
const timer = ref(null)
const loading = ref(false)

const text = computed(()=>{
    if(loading.value){
        return "发送中..."
    }
    if(time.value > 0){
        return `${time.value} s`
    }
    return "发送验证码"
})

// 发送验证码
const send = async ()=>{
    loading.value = true

    let {
        data,
        error
    } = await useGetCaptchaApi(props.phone)

    loading.value = false

    if(error.value) return

    time.value = 60
    if(timer.value) clearInterval(timer.value)
    timer.value = setInterval(() => {
        time.value--
        if(time.value <= 0){
            clearInterval(timer.value)
        }
    }, 1000);

    const msg = data.value == "ok" ? "发送成功" : `当前是演示模式，你的验证码是:${data.value}`
    const { message } = createDiscreteApi(["message"])
    message.success(msg)
}
</script>