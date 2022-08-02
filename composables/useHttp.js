//请求和响应拦截器封装
import { createDiscreteApi } from "naive-ui";
const fetchConfig = {
  baseURL: "http://demonuxtapi.dishait.cn/pc",
  headers: {
    appid: "bd9d01ecc75dbbaaefce",
  },
};

function useGetFetchOptions(options = {}) {
  options.baseURL = options.baseURL ?? fetchConfig.baseURL;
  options.headers = options.headers ?? {
    appid: fetchConfig.headers.appid,
  };
  options.initialCache = options.initialCache ?? false;
  options.lazy = options.lazy ?? false;

  // 用户登录，默认传token
  const token = useCookie("token");
  if (token.value) {
    options.headers.token = token.value;
  }
  return options;
}

export async function useHttp(key, url, options = {}) {
  options = useGetFetchOptions(options);
  options.key = key;

  let res = await useFetch(url, {
    ...options,
    // 相当于响应拦截器
    transform: (res) => {
      return res.data;
    },
  });

  // 客户端错误处理
  if (process.client && res.error.value) {
    const msg = res.error.value?.data?.data;
    if (!options.lazy) {
      const { message } = createDiscreteApi(["message"]);
      message.error(msg || "服务端错误");
    }
  }

  return res;
}

// GET请求
export function useHttpGet(key, url, options = {}) {
  options.method = "GET";
  return useHttp(key, url, options);
}

// POST请求
export function useHttpPost(key, url, options = {}) {
  options.method = "POST";
  return useHttp(key, url, options);
}

