<!-- 搜索弹窗 -->
<template>
   <n-drawer v-model:show="drawer" placement="top" :on-after-enter="addKeydown" :on-after-leave="removeKeydown">
      <n-drawer-content class="h-full flex justify-center items-center">
         <n-input-group class="h-full flex justify-center !items-center">
            <n-button type="primary" size="large">
               想要寻找什么？
            </n-button>
            <!-- v-model:value大意了，ui组件用法坑 -->
            <n-input size="large" v-model:value="keyword" placeholder="write some here" :style="{ width: '500px' }" />
            <n-button size="large" type="primary" ghost :disabled="!keyword" @click="handleSearch">
               搜索
            </n-button>
         </n-input-group>
      </n-drawer-content>
   </n-drawer>

</template>

<script setup>
import { ref } from 'vue'
import { NDrawer, NInputGroup, NButton, NInput,NDrawerContent } from "naive-ui"

//搜索输入框
const keyword = ref("")
let handleSearch = () => {
   navigateTo({
      name: "search-type-page",
      params: {
         type: "course",
         page: 1,
      },
      query: {
         keyword: keyword.value,
      },
   })
   setTimeout(() => {
      close()
   }, 200);
}

const drawer = ref(false)
const close = () => {
   drawer.value = false
}

let open = () => {
   keyword.value = ""
   drawer.value = true
}

//导出方法让父组件调用
defineExpose({
   open
})

//键盘事件处理
let handleEnterEvent = (e) => {
   // if (e.keyCode === 13) {
   //    handleSearch()
   // }
   // console.log(e);
   if (e.key === "Enter" && keyword.value) {
      handleSearch()
   }

}
//定义回车键监听事件
let addKeydown = (e) => {
   document.addEventListener("keydown", handleEnterEvent)
}
//移除事件
let removeKeydown = () => {
   document.removeEventListener("keydown", handleEnterEvent)
}
</script>

