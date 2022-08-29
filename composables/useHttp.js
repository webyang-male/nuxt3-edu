import {
    createDiscreteApi
} from "naive-ui"
export const fetchConfig = {
    baseURL:"http://demonuxtapi.dishait.cn/pc",
    headers:{
        appid:"bd9d01ecc75dbbaaefce"
    },
}

//请求体封装
function useGetFetchOptions(options = {}){
    options.baseURL = options.baseURL ?? fetchConfig.baseURL
    options.headers = options.headers ?? {
        appid:fetchConfig.headers.appid
    }
    options.initialCache = options.initialCache ?? false
    options.lazy = options.lazy ?? false

    // 用户登录，默认传token
    const token = useCookie("token")
   
    if(token.value){ 
        options.headers.token = token.value
    }

    return options
}

//http请求封装
export async function useHttp(key,url,options = {}){
    options = useGetFetchOptions(options)
    options.key = key

    if(options.$){
        const data = ref(null)
        const error = ref(null)
        return await $fetch(url,options).then(res=>{
            data.value = res.data
            return {
                data,
                error
            }
        }).catch(err=>{
            const msg = err?.data?.data
            if(process.client){
                const { message } = createDiscreteApi(["message"])
                message.error(msg || '服务端错误')
            }
            error.value = msg
            return {
                data,
                error
            }
        })
    }

    let res = await useFetch(url,{
        ...options,
        // 相当于响应拦截器
        transform:(res)=>{
            return res.data
        },
    })

    // 客户端错误处理
    if(process.client && res.error.value){
        const msg = res.error.value?.data?.data
        if(!options.lazy){
            const { message } = createDiscreteApi(["message"])
            message.error(msg || '服务端错误')
        }
    }

    return res
}

// GET请求
export function useHttpGet(key,url,options = {}){
    options.method = "GET"
    return useHttp(key,url,options)
}

// POST请求
export function useHttpPost(key,url,options = {}){
    options.method = "POST"
    return useHttp(key,url,options)
}