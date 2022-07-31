<!-- 登录页面布局 -->
<template>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
        <div class="shadow-lg bg-white rounded-lg p-5">
            <h4 class="pb-4 text-xl text-blue-500">{{ $route.meta.title || '登录' }}</h4>
            <slot />
        </div>
    </div>
</template>