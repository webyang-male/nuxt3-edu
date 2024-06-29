<template>
    <n-form class="w-[340px]" ref="formRef" :model="form" :rules="rules" size="large">
        <n-form-item :show-label="false" path="phone">
            <n-input v-model:value="form.phone" placeholder="手机号"/>
        </n-form-item>
        <n-form-item :show-label="false" path="code">
            <n-input-group>
                <n-input :style="{ width: '75%' }" v-model:value="form.code" placeholder="验证码"/>
                <SendCode :phone="form.phone"/>
            </n-input-group>
        </n-form-item>
        <div>
            <n-button class="w-full" type="primary" @click="onSubmit" :loading="loading">
                绑 定
            </n-button>
        </div>
    </n-form>
</template>
<script setup>
import {
    NForm,
    NFormItem,
    NInput,
    NInputGroup,
    NButton,
    createDiscreteApi
} from "naive-ui"

useHead({ title:"绑定手机号" })
const route = useRoute()
const formRef = ref(null)
const form = reactive({
    phone:"",
    code:""
})

const rules = {
    phone:[{
        required: true,
        message: '手机号必填'
    }],
    code:[{
        required: true,
        message:"验证码必填"
    }]
}

const loading = ref(false)
const onSubmit = ()=>{
    formRef.value.validate(async (errors)=>{
        if(errors) return
        
        loading.value = true

        let {
            data,
            error
        } = await useBindPhoneApi(form)

        loading.value = false

        if(error.value) return

        const { message } = createDiscreteApi(["message"])
        message.success("绑定成功")

        navigateTo(route.query.from || '/',{ replace:true })

    })
}

useEnterEvent(()=>onSubmit())

definePageMeta({
    title:"绑定手机号",
    layout:"login"
})

</script>