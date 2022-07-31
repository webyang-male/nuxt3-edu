//将接收的对象数据转为请求url接口参数
export function useQueryToString(query = {}) {
  let q = "";
  for (const key in query) {
    if (q == "") {
      q = `?${key}=${query[key]}`;
    } else {
      q += `&${key}=${query[key]}`;
    }
  }
  return q;
}

//回车事件
export function useEnterEvent(event) {
  let handleEnterEvent = (e) => {
    if (e.key === "Enter") {
      event();
      e.preventDefault();
    }
  };
  onBeforeMount(() => {
    document.addEventListener("keydown", handleEnterEvent);
  });

  //移除事件
  onUnmounted(() => {
    document.removeEventListener("keydown", handleEnterEvent);
  });
}
