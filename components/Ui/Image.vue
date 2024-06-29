<template>
    <img :src="src" v-bind="$attrs" @error="handleImageError" :style="{ 'object-fit':objectFit }"/>
</template>
<script setup>
defineProps({
    src:String,
    objectFit:{
        type:String,
        default:"cover"
    }
})

const handleImageError = (e)=>{
    e.target.src = "/fail.png"
}
</script>