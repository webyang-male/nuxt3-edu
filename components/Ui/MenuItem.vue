<template>
    <div>
        <div class="menu-item" :class="{ 'menu-item-active': active }">
            <slot />
        </div>
    </div>
</template>
<script setup>
defineProps({
    active: {
        type: Boolean,
        default: false,
    },
})
</script>

<style>
.menu-item {
    transition: all .3s;
    @apply px-2 py-1 mx-1 rounded cursor-pointer hover: (bg-blue-50 text-blue-500) !active:(bg-blue-100);
}

.menu-item-active {
    @apply  !bg-blue-100 !text-blue-500;
}
</style>