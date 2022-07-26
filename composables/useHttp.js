//请求和响应拦截器封装

const fetchConfig = {
  baseURL: "http://demonuxtapi.dishait.cn/pc",
  headers: {
    appid: "bd9d01ecc75dbbaaefce",
  },
};

function useGetFetchOptions(options = {}) {
  options.baseURL = options.baseURL ?? fetchConfig.baseURL;
  options.headers = options.headers ?? {
    appid: fetchConfig.appid,
  };
  options.initialCache = options.initialCache ?? false;
  options.lazy = options.lazy ?? false;

  //用户登录，获取token
  return options;
}

export async function useHttp(key, url, options = {}) {
  options = useGetFetchOptions(options);
  options.key = key;

  let res = await useFetch(url, {
    ...options,
    //响应拦截器
    transform: (res) => {
      return res.data;
    },
  });

  return res;
}

//get请求
export function useHttpGet(key, url, options) {
  options.method = "GET";
  return useHttp(key, url, options);
}

//post请求
export function useHttpPost(key, url, options) {
    options.method = "POST";
    return useHttp(key, url, options);
  }