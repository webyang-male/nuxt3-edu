<template>
    <n-alert title="" type="info" class="mb-6">
        演示账号为：
        <n-tag :bordered="false" type="success">
            133 333 333 3
        </n-tag>
    </n-alert>
    <n-form class="w-[340px]" ref="formRef" :model="form" :rules="rules" size="large">
        <n-form-item :show-label="false" path="phone">
            <n-input v-model:value="form.phone" placeholder="手机号" />
        </n-form-item>
        <n-form-item :show-label="false" path="code">
            <n-input-group>
                <n-input :style="{ width: '75%' }" v-model:value="form.code" placeholder="验证码" />
                <SendCode :phone="form.phone" />
            </n-input-group>
        </n-form-item>
        <n-form-item :show-label="false" path="password">
            <n-input v-model:value="form.password" placeholder="密码" type="password" />
        </n-form-item>
        <n-form-item :show-label="false" path="repassword">
            <n-input v-model:value="form.repassword" placeholder="确认密码" type="password" :disabled="!form.password" />
        </n-form-item>
        <div class="flex justify-between w-full mb-2">
            <n-button quaternary type="primary" size="tiny" @click="$router.go(-1)">
                登录
            </n-button>
        </div>
        <div>
            <n-button class="w-full" type="primary" @click="onSubmit" :loading="loading">
                重置密码
            </n-button>
        </div>
    </n-form>
</template>
<script setup>
import {
    NAlert,
    NTag,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NInputGroup,
    createDiscreteApi
} from "naive-ui"
const router = useRouter()
useHead({ title: "忘记密码" })

const formRef = ref(null)
const form = reactive({
    phone: "",
    code: "",
    password: "",
    repassword: ""
})

const rules = {
    phone: [{
        required: true,
        message: '手机号必填'
    }],
    code: [{
        required: true,
        message: '验证码必填'
    }],
    password: [{
        required: true,
        message: "密码必填"
    }],
    repassword: [{
        required: true,
        message: "确认密码必填"
    }, {
        validator(rule, value) {
            return value === form.password
        },
        message: "两次密码输入不一致",
        trigger: ["input", "blur"]
    }]
}

const loading = ref(false)
const onSubmit = () => {
    formRef.value.validate(async (errors) => {
        if (errors) return

        loading.value = true

        let {
            data,
            error
        } = await useForgetApi(form)

        loading.value = false

        if (error.value) return

        const { message } = createDiscreteApi(["message"])

        message.success("重置密码成功")

        router.go(-1)
    })
}

useEnterEvent(() => onSubmit())

definePageMeta({
    title: "忘记密码",
    layout: "login",
    middleware: ["only-visitor"]
})

</script>