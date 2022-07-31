<template>
    <n-form class="w-[22rem]" :model="form" ref="formRef" :rules="rules" size="large">
        <n-form-item :show-label="false" path="username">
            <n-input v-model:value="form.username" :placeholder="type === 'login' ? '用户名/手机/邮箱' : '用户名'" />
        </n-form-item>
        <n-form-item :show-label="false" path="password">
            <n-input type="password" v-model:value="form.password" placeholder="输入密码" />
        </n-form-item>
        <n-form-item v-if="type != 'login'" :show-label="false" path="repassword">
            <n-input type="password" v-model:value="form.repassword" placeholder="确认密码" />
        </n-form-item>

        <div>
            <div class="w-full flex justify-between mb-2">
                <n-button quaternary type="primary" size="tiny" @click="changeType">
                    {{ type === 'login' ? '注 册' : '登 录' }}
                </n-button>
                <n-button quaternary type="primary" size="tiny">
                    忘记密码
                </n-button>
            </div>

            <n-button class="w-full" type="primary" @click="onSubmit">{{ type === 'login' ? '登 录' : '注 册' }}
            </n-button>
            <div class="flex text-xs w-full justify-center items-center mt-3 text-warm-gray-600">
                注册即同意
                <n-button quaternary type="primary" size="tiny">
                    《服务协议》
                </n-button>
                和
                <n-button quaternary type="primary" size="tiny">
                    《隐私政策》
                </n-button>
            </div>

        </div>
    </n-form>
</template>


<script setup>
import {
    NForm,
    NInput,
    NFormItem,
    NButton,
} from "naive-ui"

const route = useRoute()
const type = ref("login")
const title = ref("登录")
useHead({
    title
})

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
    type.value = type.value === "login" ? "register" : "login"
    title.value = type.value === "login" ? "登 录" : "注 册";
    route.meta.title = title.value;
    try {
        //表单数据重置
        form.username = ""
        form.password = ""
        form.repassword = ""
        formRef.value.restoreValidation()
    } catch (error) {
        console.log(error);
    }
}



const onSubmit = () => {
    formRef.value.validate((error) => {
        if (error) {
            return false
        } else {
            console.log('suc');
        }
    });
}

definePageMeta({
    layout: "login"
})
</script>

<style lang="scss" scoped>
</style>