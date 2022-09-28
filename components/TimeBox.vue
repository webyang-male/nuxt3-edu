<!-- 二维码支付页面倒计时 -->
<template>
    <div class="text-center">
        {{ toHHmmss(time_out) }}
    </div>
</template>
<script setup>
// 秒 => 时分秒
const toHHmmss = (data) => {
    let s;
    let hours = parseInt((data % (60 * 60 * 24)) / (60 * 60));
    let minutes = parseInt((data % (60 * 60)) / 60);
    let seconds = data % 60;
    s = (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
    return s;
}

const props = defineProps({
    expire: {
        type: Number,
        default: 120 // 分钟
    }
})

onBeforeUnmount(() => clearInterval(timer))
onMounted(() => initTimeBox())

//接受定时器
let timer = null
//接收秒
const time_out = ref(0)
// 初始化倒计时
function initTimeBox() {
    if (timer) {
        clearInterval(timer)
    }
    time_out.value = props.expire * 60
    if (time_out.value > 0) {
        timer = setInterval(handleTimeOut, 1000);
    }
}

const emit = defineEmits(["end"])
function handleTimeOut() {
    // 时间结束
    if (time_out.value == 0) {
        emit("end")
        return clearInterval(timer)
    }
    time_out.value--
}
</script>