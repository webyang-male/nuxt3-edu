<!-- 忘记密码页面 -->
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
        <n-form-item :show-label="false" path="password">
            <n-input clearable v-model:value="form.password" placeholder="密码" type="password" />
        </n-form-item>
        <n-form-item :show-label="false" path="repassword">
            <n-input clearable v-model:value="form.repassword" placeholder="确认密码" type="password"
                :disabled="!form.password" />
        </n-form-item>
        <div class="flex justify-between w-full mb-2">
            <n-button quaternary type="primary" size="tiny" @click="$router.go(-1)">
                登录
            </n-button>
        </div>
        <div>
            <n-button class="w-full" type="primary" @click="onSubmit" :loading="loading">
                重 置 密 码
            </n-button>
        </div>
    </n-form>
</template>



<script setup>
import {
    NForm,
    NInput,
    NFormItem,
    NButton,
    NInputGroup,
    createDiscreteApi
} from "naive-ui"

const route = useRoute()
const type = ref("login")


useHead({
    title: "忘记密码页"
})

//表单验证
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
        message: "手机号必填",
        trigger: "blur"
    }],
    code: [{
        required: true,
        message: "验证码必填",
        trigger: "blur"
    }],
    password: [{
        required: true,
        message: "密码必填",
        trigger: "blur"
    }],
    repassword: [{
        required: true,
        message: "请不要忘记再次输入密码",
    }, {
        validator: (rule, value, callback) => {
            if (value !== form.password) {
                callback(new Error("两次输入的密码不一致QAQ"))
            } else {
                callback()
            }
        },
        trigger: ["blur", "input"]
    }]

}




//加载效果
const loading = ref(false)

//回车事件
const onSubmit = () => {
    formRef.value.validate(async (errors) => {
        if (errors) return;

    })
}

useEnterEvent(() => onSubmit())

//ui布局
definePageMeta({
    title: "忘记密码",
    layout: "login"
})
</script>

