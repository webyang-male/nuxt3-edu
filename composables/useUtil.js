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

//时间状态判断
export function useTimeStatus(start, end) {
  start = new Date(start).getTime();
  end = new Date(end).getTime();
  const now = Date.now();

  let status = "";
  if (start < now && now < end) {
    status = "ing";
  } else if (start >= now) {
    status = "pending";
  } else {
    status = "end";
  }

  return status;
}
