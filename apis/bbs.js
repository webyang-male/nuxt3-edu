//点赞/取消点赞
export function usePostSupportApi(post_id, type = "support") {
  return useHttpPost("postSupport", `/post/${type}`, {
    body: {
      post_id,
    },
  });
}

//删除帖子
export function useDeletePostApi(id) {
  return useHttpPost("deletePost", `/post/delete`, {
    body: {
      id,
    },
  });
}

//社区分类列表
export function useBbsListApi() {
  return useHttpGet("bbsList", "/bbs?page=1", {
    lazy: true,
  });
}

//分类下帖子列表
///pc/post/list?page=1&bbs_id=1&is_top=0
export function usePostListApi(query) {
  return useHttpGet(
    "postList",
    () => {
      let q = useQueryToString(query());
      return `/post/list${q}`;
    },
    {
      lazy: true,
    }
  );
}
