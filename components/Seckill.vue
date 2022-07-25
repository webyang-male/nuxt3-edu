<!-- 秒杀组件 -->
<template>
    <div class="count-down">
        <small>{{ data.days }}</small>
        天
        <small>{{ data.hours }}</small>
        :
        <small>{{ data.minutes }}</small>
        :
        <small>{{ data.seconds }}</small>
    </div>
</template>
<script setup>
//定义倒计时事件
const emit = defineEmits(["start", 'end']);
const data = useSeckill(props.time);

const props = defineProps({
    time: {
        type: [String, Number],
        default: ''
    },
})

function useSeckill(end_time) {
    //时间暂存
    const timeOut = ref(0)
    //定时器
    const timer = ref(null)

    if (typeof end_time === 'string') {
        end_time = (new Date(end_time)).getTime()
    }

    //结束时间戳-当前时间戳，毫秒转为秒
    timeOut.value = (end_time - Date.now()) / 1000;


    if (timeOut.value <= 0) {
        return emit('end');
    }

    //防止重复启动定时器
    closeTimer();
    //开启倒计时
    timer.value = setInterval(() => {
        timeOut.value--;
        if (timeOut.value <= 0) {
            // clearInterval(timer.value);
            closeTimer();
            emit('end');
        }
    }, 1000);

    //关闭定时器
    function closeTimer() {
        if (timer.value) clearInterval(timer.value);
    }

    //将秒转为 天：时：分：秒
    // return formatTime(timeOut.value);
    //计算属性保持更新
    const d = computed(()=>formatTime(timeOut.value))
    return d;
}
// 写死不容易更改样式
// function formatTime(time) {
//     let day = Math.floor(time / (60 * 60 * 24));
//     let hour = Math.floor((time - day * 60 * 60 * 24) / (60 * 60));
//     let minute = Math.floor((time - day * 60 * 60 * 24 - hour * 60 * 60) / 60);
//     let second = Math.floor(time - day * 60 * 60 * 24 - hour * 60 * 60 - minute * 60);
//     return `${day}天${hour}时${minute}分${second}秒`;
// }
function formatTime(seconds) {
    let time = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    if (seconds > 0) {
        time.days = Math.floor(seconds / (60 * 60 * 24));
        time.hours = Math.floor(seconds / (60 * 60)) - time.days * 24;
        time.minutes = Math.floor(seconds / 60) - time.days * 24 * 60 - time.hours * 60;
        time.seconds = Math.floor(seconds) - time.days * 24 * 60 * 60 - time.hours * 60 * 60 - time.minutes * 60;
    }

    //三元补零
    time.days = time.days < 10 ? "0" + time.days : time.days;
    time.hours = time.hours < 10 ? "0" + time.hours : time.hours;
    time.minutes = time.minutes < 10 ? "0" + time.minutes : time.minutes;
    time.seconds = time.seconds < 10 ? "0" + time.seconds : time.seconds;

    return time
}
</script>

<style>
.count-down small{
   background-color: #fff;
   border-radius: 2px;
   padding: 2px 3px;
   margin:0 3px;
   @apply text-rose-500;
}
</style>