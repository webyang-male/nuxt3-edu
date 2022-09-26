//查看电子书章节 /book/menus?id=32
export function useBookMenusApi(id) {
  return useHttpGet("bookMenus", `/book/menus?id=${id}`, {
    lazy: true,
  });
}

//查看电子书章节内容 /book/detail?book_id=32&id=61
export function useBookDetailApi(book_id, id) {
  return useHttpGet("bookDetail", `/book/detail?book_id=${book_id}&id=${id}`, {
    lazy: true,
  });
}
