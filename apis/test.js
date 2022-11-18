//交卷 /pc/user_test/save
export function useSubmitTestApi(body) {
  return useHttpPost("SubmitTest", "user_test/save", {
    body,
  });
}

//开始考试 /pc/testpaper/read?id=12
export function useReadTestPaperApi(id) {
    return useHttpPost("ReadTestPaper", "/testpaper/read?id="+id);
  }