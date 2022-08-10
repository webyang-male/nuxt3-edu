<!-- 验证码封装组件 -->
<template>
    <n-button type="primary" ghost :disabled="time > 0 || !phone" :loading="loading" @click="sendCode">
        {{ text }}
    </n-button>

</template>
<script setup>
import {
    NButton,
    createDiscreteApi
} from "naive-ui"

const loading = ref(false)
const props = defineProps(["phone"])

const text = computed(() => {
    if (loading.value) {
        return `发送中...`
    }
    if (time.value > 0) {
        return `${time.value} s`
    }

    return `发送验证码`

})

//设置初始验证码时间
const time = ref(0)
const timer = ref(null)

//发送验证码
const sendCode = async () => {
    loading.value = true
    let { data, error } = await useGetCaptchaApi(props.phone)
    loading.value = false
    if (error.value) {
        return;
    }

    time.value = 60;
    //预防报错
    if (timer.value) {
        clearInterval(timer.value)
    }
    timer.value = setInterval(() => {
        time.value--
        if (time.value <= 0) {
            clearInterval(timer.value)
        }
    }, 1000)

    // console.log(data);
    const msg = data.value == "ok" ? "验证码发送成功" : `当前演示验证码为:${data.value}`
    const { message } = createDiscreteApi(["message"])
    message.success(msg)
    console.log("验证码：" + data.value);
}
</script>