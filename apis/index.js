export function useIndexDataApi(options) {
  return useHttpGet("IndexData", "/index", {
    // 懒加载
    lazy: true,
  });
}
