<template>
    <div>
        <nuxt-link to="/test">goto测试页</nuxt-link>
       <p>index</p> 
    </div>
    <n-icon size="40">
        <search />
    </n-icon>
</template>

<script setup>
//引入naive-ui图标
import { NIcon } from 'naive-ui'
import {Search } from '@vicons/ionicons5'
</script>