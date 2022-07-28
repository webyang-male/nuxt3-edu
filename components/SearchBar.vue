<!-- 搜索弹窗 -->
<template>
   <n-drawer v-model:show="drawer" placement="top">
      <n-drawer-content class="h-full flex justify-center items-center">
         <n-input-group class="flex justify-center items-center">
            <n-button type="primary" size="large">
               想要寻找什么？
            </n-button>
            <n-input size="large" v-model="keyword" placeholder="write some here" :style="{ width: '500px' }" />
            <n-button size="large" type="primary" ghost :disabled="!keyword" @click="handleSearch">
               搜索
            </n-button>
         </n-input-group>
      </n-drawer-content>
   </n-drawer>

</template>

<script setup>
import { ref } from 'vue'
import { NDrawer, NInputGroup, NButton, NInput } from "naive-ui"

//搜索输入框
const keyword = ref("")
let handleSearch = () => {
   console.log(keyword.value)
}

const drawer = ref(false)
let open = () => {
   drawer.value = true
}

//导出方法让父组件调用
defineExpose({
   open
})
</script>

