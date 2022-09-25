//导出搜索接口方法获取搜索结果
export function useSearchListApi(query) {
  return useHttpGet(
    "searchList",
    () => {
      let q = useQueryToString(query());
      return `/search${q}`;
    },
    {
      lazy: true,
    }
  );
}

//获取可用优惠券列表  /coupon/list
export function useCouponListApi() {
  return useHttpGet("CouponList", "/coupon/list ");
}

//通用列表接口
export function useListApi(type, query={}) {
  let q = useQueryToString(query);
  return useHttpGet(type + "List", `/${type}/list${q}`, {
    lazy: true,
  });
}

//查看课程、专栏详情接口
export function useReadDetailApi(type,query = {}) {
  let q = useQueryToString(query);
  return useHttpGet("readDetail", `/${type}/read${q}`, {
    lazy: true,
  });
}


