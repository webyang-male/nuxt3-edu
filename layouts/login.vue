<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center">
        <div class="shadow-lg rounded-lg p-5 bg-white">
            <h4 class="pb-4 text-xl text-gray-500">{{ $route.meta.title || '登录' }}</h4>
            <slot/>
        </div>
    </div>
</template>