<template>
    <div v-if="btnShow" class="to-top">
        <img class="to-top-img scaleBig" :src="BackTop" fit="cover" @click="backTop">
    </div>
</template>
  
<script setup>
import { onMounted, ref } from "vue";
import BackTop from "../assets/icons/top.png";
const btnShow = ref(false)
onMounted(() => {
    window.addEventListener('scroll', scrollToTop)
})
let timer = null;
function backTop() {
    timer = setInterval(function () {
        let backTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let speedTop = backTop / 15;
        document.documentElement.scrollTop = backTop - speedTop;
        if (backTop === 0) {
            clearInterval(timer)
        }
    }, 10);
}
function scrollToTop() {
    let pageLookHeight = document.documentElement.clientHeight || document.body.clientHeight
    let scroll = document.documentElement.scrollTop
    btnShow.value = scroll >= pageLookHeight * 0.618;
}
</script>
  
<style lang="scss" scoped>
.to-top {
    position: fixed;
    right: 20px;
    bottom: 150px;
    z-index: 2;
    border: 1px solid #333333;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease-in-out .5s;
    overflow: hidden;
    background-color: rgb(255, 255, 255);

    &-img {
        width: 25px;
        height: 25px;
    }
}

/*鼠标经过放大*/
.scaleBig {
    transition: transform 0.5s ease;
}

.scaleBig:hover {
    animation: hover_scale 1.5s ease-in-out infinite;
}

@keyframes hover_scale {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}
</style>
  