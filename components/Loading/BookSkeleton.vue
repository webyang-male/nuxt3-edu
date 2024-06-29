<template>
    <n-grid :x-gap="20" :cols="2">
        <n-grid-item v-for="i in 2" :key="i">
            <section class="bg-white shadow rounded p-5 flex items-stretch mb-5">
                <n-skeleton height="138px" width="108px" class="rounded flex-shrink-0"/>
                <div class="flex flex-col pl-5 flex-1">
                    <n-skeleton height="30px" width="50%" class="my-2" /> 
                    <div class="mt-auto flex items-center">
                        <div class="flex items-end">
                            <n-skeleton width="30px" text /> 
                            <n-skeleton width="30px" class="ml-2" /> 
                        </div>
                        <n-skeleton width="100px" round size="medium" class="ml-auto"/> 
                    </div>
                </div>
            </section>
        </n-grid-item>
    </n-grid>
</template>
<script setup>
import {
    NSkeleton,
    NGrid,
    NGridItem
} from "naive-ui"
</script>
