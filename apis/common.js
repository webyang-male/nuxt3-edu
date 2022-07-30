//导出搜索接口方法获取搜索结果
export function useSearchListApi(query) {
  let q = useQueryToString(query);
  return useHttpGet("searchList", `/search${q}`, {
    lazy: true,
  });
}
