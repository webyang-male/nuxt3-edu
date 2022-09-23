//获取课程列表 /course/list?page=1
export function usecourseListApi(page) {
  return useHttpGet("courseList", `/course/list?page=${page}`, {
    lazy: true,
  });
}

//查看课程详情
// /course/read?id=12&column_id=0
export function useReadCourseApi(query = {}) {
  let q = useQueryToString(query);
  return useHttpGet("readCourse", `/course/read${q}`, {
    lazy: true,
  });
}