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
