//获取课程列表 /course/list?page=1
export function usecourseListApi(page) {
  return useHttpGet("courseList", `/course/list?page=${page}`, {
    lazy: true,
  });
}
