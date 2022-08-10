<!-- 手机号绑定页面 -->
<template>
    <n-form class="w-[340px]" ref="formRef" :model="form" :rules="rules" size="large">
        <n-form-item :show-label="false" path="phone">
            <n-input v-model:value="form.phone" placeholder="这里输入手机号" clearable />
        </n-form-item>
        <n-form-item :show-label="false" path="code">
            <n-input-group>
                <n-input :style="{ width: '75%' }" v-model:value="form.code" placeholder="输入6位验证码" />
                <SendCode :phone="form.phone" />
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
    NInput,
    NInputGroup,
    NFormItem,
    NButton,
    createDiscreteApi
} from "naive-ui"


useHead({ title: "绑定手机号" })
const route = useRoute()

const formRef = ref(null)
const form = reactive({
    phone: "",
    code: "",
})
const rules = {
    phone: [{
        required: true,
        message: "手机号需要填写",
        trigger: "blur"
    }],
    code: [{
        required: true,
        message: "请输入验证码",
        trigger: "blur"
    }],
}

const loading = ref(false)
//回车/提交事件
const onSubmit = () => {
    formRef.value.validate(async (errors) => {
        if (errors) return

        loading.value = true

        let {
            data,
            error
        } = await useBindPhoneApi(form)

        loading.value = false

        if (error.value) return

        const { message } = createDiscreteApi(["message"])
        message.success("绑定成功")

        navigateTo(route.query.from || '/', { replace: true })

    })
}
useEnterEvent(() => onSubmit())

definePageMeta({
    title: "手机绑定",
    layout: "login"
})
</script>

