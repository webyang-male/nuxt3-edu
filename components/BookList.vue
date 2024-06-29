<template>
    <section class="bg-white shadow rounded p-5 flex items-stretch mb-5">
        <UiImage :src="item.cover" class="w-[108px] h-[138px] rounded flex-shrink-0 bg-gray-50"/>
        <div class="flex flex-col pl-5 flex-1">
            <h4>{{ item.title }}</h4>
            <div class="mt-auto flex items-center">
                <div class="flex items-end">
                    <Price :value="item.price"/>
                    <Price :value="item.t_price" through class="ml-2"/>
                </div>
                <n-button strong secondary round type="primary" class="ml-auto"
                @click="open">
                    {{ item.sub_count == 0 ? '立即订阅' : (item.sub_count + '人订阅') }}
                </n-button>
            </div>
        </div>
    </section>
</template>
<script setup>
    import {
        NButton
    } from "naive-ui"
    const props = defineProps({
        item:Object
    })
    const open = ()=>{
        navigateTo(`/detail/book/${props.item.id}`)
    }
</script>