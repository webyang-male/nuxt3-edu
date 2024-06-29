// 登录
export function useLoginApi(body) {
  return useHttpPost("login", "/login", {
    body,
  });
}

// 注册
export function useRegApi(body) {
  return useHttpPost("reg", "/reg", {
    body,
  });
}

export function useGetinfoApi() {
  return useHttpGet("getinfo", "/getinfo", {
    $: true,
  });
}

// 退出登录
export function useLogoutApi() {
  return useHttpPost("logout", "/logout");
}

// 获取手机验证码
export function useGetCaptchaApi(phone) {
  return useHttpPost("GetCaptcha", "/get_captcha", {
    body: {
      phone,
    },
  });
}

// 绑定手机号
export function useBindPhoneApi(body) {
  return useHttpPost("bindphone", "/bind_mobile", {
    body,
  });
}

// 忘记密码
export function useForgetApi(body) {
  return useHttpPost("forget", "/forget", {
    body,
  });
}

// 获取学习记录
export function useUserHistoryApi(query) {
  return useHttpGet("userHistory", () => {
    let q = useQueryToString(query());
    return `/user_history/list${q}`;
  }, {
    lazy: true,
  });
}

// 获取购买记录
export function useOrderListApi(page) {
  return useHttpGet("OrderList", `/order/list?page=${page}`, {
    lazy: true,
  });
}

// 我的考试记录
export function useUserTestApi(page) {
  return useHttpGet("UserTest", `/user_test/list?page=${page}`, {
    lazy: true,
  });
}

// 我的帖子列表
export function useMypostListApi(page) {
  return useHttpGet("MypostList", `/mypost?page=${page}`, {
    lazy: true,
  });
}

// 获取优惠券记录
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

// 收藏
export function useCollectApi(body) {
  return useHttpPost("collect", "/collect", {
    body,
  });
}

// 修改资料
export function useUpdateUserInfoApi(body) {
  return useHttpPost("updateUserInfo", "/update_info", {
    body,
  });
}

// 上传图片
export function useUploadConfig() {
  const token = useCookie("token");
  return {
    action: fetchConfig.baseURL + "/upload",
    headers: {
      appid: fetchConfig.headers.appid,
      token: token.value,
    },
  };
}

// 修改密码
export function useupdatePasswordApi(body) {
  return useHttpPost("updatePassword", "/update_password", {
    body,
  });
}

// 领取优惠券
export function useReceiveUserCouponApi(body) {
  return useHttpPost("receiveUserCoupon", "/user_coupon/receive", {
    body,
  });
}
