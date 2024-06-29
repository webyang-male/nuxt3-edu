// 获取课程列表
export function useCourseListApi(page) {
  return useHttpGet("CourseList", `/course/list?page=${page}`, {
    lazy: true,
  });
}

// 查看课程详情
export function useReadCourseApi(query = {}) {
  let q = useQueryToString(query);
  return useHttpGet("readCourse", `/course/read${q}`, {
    lazy: true,
  });
}

// 精品推荐
export function useHotCourseListApi() {
  return useHttpGet("HotCourseList", `/hot`);
}

// 免费学习
export function useLearnApi(body) {
  return useHttpPost("learn", "/order/learn", {
    body,
  });
}
