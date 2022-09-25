//获取课程列表--废弃，抽离至common.js 
// /course/list?page=1
// /column/list?page=1
// /book/list?page=1
export function usecourseListApi(page) {
  return useHttpGet("courseList", `/course/list?page=${page}`, {
    lazy: true,
  });
}

//查看课程详情--废弃,抽离至common.js 
// /course/read?id=12&column_id=0
// /column/read?id=3
export function useReadCourseApi(query = {}) {
  let q = useQueryToString(query);
  return useHttpGet("readCourse", `/course/read${q}`, {
    lazy: true,
  });
}

//课程详情-推荐列表
export function useHotCourseListApi() {
  return useHttpGet("HotCourseList", `/hot`);
}

// /order/learn 针对免费课
export function useLearnApi(body) {
  return useHttpPost("learn", "/order/learn", { body });
}
