<template>
    <n-form class="w-[22rem]" :model="form" ref="formRef" :rules="rules" size="large">
        <n-form-item :show-label="false" path="username">
            <n-input v-model:value="form.username" placeholder="用户名/手机/邮箱" />
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
            <n-button class="w-full" type="primary" @click="onSubmit">{{ type === 'login' ? '登 录' : '注 册' }}</n-button>
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
const rules = {}

const changeType = () => {
    type.value = type.value === "login" ? "register" : "login"
    title.value = type.value === "login" ? "登 录" : "注 册";
    route.meta.title = title.value;
    try {
        //表单数据重置
        form.username = ""
        form.password = ""
        form.repassword = ""
    } catch (error) {
        console.log(error);
    }
}

const onSubmit = () => {

}

definePageMeta({
    layout: "login"
})
</script>

<style lang="scss" scoped>
</style>