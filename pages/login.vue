<template>
    <n-alert title="" type="info" class="mb-6">
        演示账号和密码为：
        <n-tag :bordered="false" type="success">
            ceshi1
        </n-tag>
    </n-alert>
    <n-form class="w-[340px]" ref="formRef" :model="form" :rules="rules" size="large">
        <n-form-item :show-label="false" path="username">
            <n-input clearable v-model:value="form.username" :placeholder="type === 'login' ? '用户名/手机/邮箱' : '用户名'" />
        </n-form-item>
        <n-form-item :show-label="false" path="password">
            <n-input clearable v-model:value="form.password" placeholder="密码" type="password" />
        </n-form-item>
        <n-form-item v-if="type != 'login'" :show-label="false" path="repassword">
            <n-input clearable v-model:value="form.repassword" placeholder="确认密码" type="password" />
        </n-form-item>
        <div class="flex justify-between w-full mb-2">
            <n-button quaternary type="primary" size="tiny" @click="changeType">
                {{ type === 'login' ? '注册' : '登录' }}
            </n-button>
            <nuxt-link to="/forget" class="text-primary" >
                <n-button quaternary type="primary" size="tiny" >忘记密码</n-button>
            </nuxt-link>
        </div>
        <div>
            <n-button class="w-full" type="primary" @click="onSubmit" :loading="loading">
                {{ type === 'login' ? '登 录' : '注 册' }}
            </n-button>
        </div>
        <div class="flex justify-center items-center w-full text-xs mt-5 text-gray-600">
            注册即同意
            <n-button quaternary type="primary" size="tiny">《服务协议》</n-button>
            和
            <n-button quaternary type="primary" size="tiny">《隐私政策》</n-button>
        </div>
    </n-form>
</template>


<script setup>
import {
    NForm,
    NInput,
    NFormItem,
    NButton,
    NAlert,
    NTag,
    createDiscreteApi
} from "naive-ui"

const route = useRoute()
const type = ref("login")
const title = ref("登录")

useHead({
    title
})

//表单验证
const formRef = ref(null)
const form = reactive({
    name: "",
    password: "",
    repassword: ""
})

const rules = computed(() => {
    let r = {
        username: [{
            required: true,
            message: type.value === "login" ? "请输入用户名/手机/邮箱" : "请输入用户名",
            trigger: "blur"
        }],
        password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
        }],

    }
    if (type.value != "login") {
        r.repassword = [{
            required: true,
            message: "请再次输入密码",
        }, {
            validator: (rule, value, callback) => {
                if (value !== form.password) {
                    callback(new Error("两次输入的密码不一致"))
                } else {
                    callback()
                }
            },
            trigger: ["blur", "input"]
        }]
    }
    return r
})

const changeType = () => {
    type.value = type.value === 'login' ? 'reg' : 'login'
    title.value = type.value == 'login' ? '登录' : '注册'
    route.meta.title = title.value
    form.username = ""
    form.password = ""
    form.repassword = ""
    formRef.value.restoreValidation()
}

//加载效果
const loading = ref(false)

//回车事件
const onSubmit = () => {
    formRef.value.validate(async (errors) => {
        if (errors) return;

        loading.value = true

        let {
            data,
            error
        } = type.value === 'login' ? await useLoginApi(form) : await useRegApi(form)

        loading.value = false

        if (error.value) return;

        const { message } = createDiscreteApi(["message"])
        message.success(type.value === 'login' ? "登录成功" : "注册成功")

        if (type.value === 'login') {
            // 将用户登录成功返回的token存储在cookie当中，用户登录成功的标识
            const token = useCookie("token")
            token.value = data.value.token
            // console.log(data.value);
            const user = useUser()

            user.value = data.value

            // 跳转
            navigateTo(route.query.from || "/", { replace: true })
        } else {
            //切换回登录页
            changeType()
        }
    })
}

useEnterEvent(() => onSubmit())



//ui布局
definePageMeta({
    layout: "login",
    middleware: ["only-visitor"]
})


</script>

