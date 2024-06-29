<template>
    <div class="p-5">
        <n-form :model="form" ref="formRef" :rules="rules" label-width="80"  label-placement="left">
            <n-form-item label="用户名">
                <n-input v-model:value="user.username" disabled/>
            </n-form-item>
            <n-form-item label="头像" path="avatar">
                <uploader v-model="form.avatar"/>
            </n-form-item>
            <n-form-item label="昵称" path="nickname">
                <n-input v-model:value="form.nickname" placeholder="请输入昵称"/>
            </n-form-item>
            <n-form-item label="性别" path="sex">
                <n-radio-group v-model:value="form.sex" name="sex">
                    <n-space>
                    <n-radio v-for="song in options" :key="song.value" :value="song.value">
                        {{ song.value }}
                    </n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <div class="flex justify-end">
                <n-button type="primary" @click="onSubmit" :loading="loading">提交修改</n-button>
            </div>
        </n-form>
    </div>
</template>
<script setup>
import {
    NForm,
    NFormItem,
    NInput,
    NRadio,
    NRadioGroup,
    NButton,
    NSpace,
    createDiscreteApi
} from "naive-ui"
const user = useUser()
const formRef = ref(null)
const form = reactive({
    avatar:"",
    nickname:"",
    sex:""
})

// 初始化form
if(user.value){
    form.avatar = user.value.avatar
    form.nickname = user.value.nickname
    form.sex = user.value.sex
}

const rules = {
    nickname:[{
        required: true,
        message: "昵称不能为空"
    }],
    sex:[{
        required: true,
        message:"性别不能为空"
    }]
}

const options = [{
    value:"未知"
},{
    value:"男"
},{
    value:"女"
}]

const loading = ref(false)
const onSubmit = ()=>{
    formRef.value.validate(async (errors)=>{
        if(errors){
            return
        }

        loading.value = true

        const {
            data,
            error
        } = await useUpdateUserInfoApi(form)
        loading.value = false

        if(error.value){
            return
        }

        const { message } = createDiscreteApi(["message"])
        message.success("修改成功")

        // 刷新用户信息
        useRefreshUserInfo()

    })
}
</script>