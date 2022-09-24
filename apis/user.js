//用户模块
export function useLoginApi(body) {
  return useHttpPost("login", "/login", {
    body,
  });
}

export function useGetinfoApi() {
  return useHttpGet("getinfo", "/getinfo", {
    $: true,
  });
}
//注册
export function useRegApi(body) {
  return useHttpPost("reg", "/reg", {
    body,
  });
}

//用户退出
export function useLogoutApi() {
  return useHttpPost("logout", "/logout");
}

//获取手机验证码
export function useGetCaptchaApi(phone) {
  return useHttpPost("GetCaptcha", "/get_captcha", {
    body: {
      phone,
    },
  });
}

//绑定手机号
export function useBindPhoneApi(body) {
  return useHttpPost("bindPhone", "/bind_mobile", {
    body,
  });
}

//忘记密码
export function useForgetApi(body) {
  return useHttpPost("forget", "/forget", {
    body,
  });
}

//获取学习记录
export function useUserHistoryApi(query) {
  return useHttpGet(
    "userHistory",
    () => {
      let q = useQueryToString(query());
      return `/user_history/list${q}`;
    },
    {
      lazy: true,
    }
  );
}

//获取购买记录
export function useOrderListApi(page) {
  return useHttpGet("OrderList", `/order/list?page=${page}`, {
    lazy: true,
  });
}

//考试记录 /user_test/list?page=1
export function useUserTestApi(page) {
  return useHttpGet("UserTest", `/user_test/list?page=${page}`, {
    lazy: true,
  });
}

//我的帖子列表 /mypost?page=1
export function useMypostListApi(page) {
  return useHttpGet("MypostList", `/mypost?page=${page}`, {
    lazy: true,
  });
}

//获取优惠券记录 /user_coupon?page=1
export function useUserCouponApi(page) {
  return useHttpGet("UserCoupon", `/user_coupon?page=${page}`, {
    lazy: true,
  });
}

// 我的收藏列表
export function useMyFavaListApi(page) {
  return useHttpGet("MyFavaList", `/user_fava?page=${page}`, {
    lazy: true,
  });
}

// 取消收藏
export function useUncollectApi(body) {
  return useHttpPost("Uncollect", "/uncollect", {
    body,
  });
}

//修改用户资料 /update_info
export function useUpdateUserInfoApi(body) {
  return useHttpPost("updateUserInfo", "/update_info", {
    body,
  });
}

// 上传图片
export function useUploadConfig(){
  const token = useCookie("token")
  return {
      action: fetchConfig.baseURL + "/upload",
      headers:{
          appid:fetchConfig.headers.appid,
          token:token.value
      }
  }
}

//修改用户密码 /update_password
export function useUpdatePasswordApi(body) {
  return useHttpPost("updatePassword", "/update_password", {
    body,
  });
}

//课程详情/专栏页--收藏
export function useCollectApi(body) {
  return useHttpPost("Collect", "/collect", {
    body,
  });
}

// 领取优惠券
export function useReceiveUserCouponApi(body){
  return useHttpPost("receiveUserCoupon","/user_coupon/receive",{
      body
  })
}