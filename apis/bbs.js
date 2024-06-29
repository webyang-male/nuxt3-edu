// 点赞/取消点赞
export function usePostSupportApi(post_id, type = "support") {
  return useHttpPost("postSupport", `/post/${type}`, {
    body: {
      post_id,
    },
  });
}

// 删除帖子
export function useDeletePostApi(id) {
  return useHttpPost("deletePost", `/post/delete`, {
    body: {
      id,
    },
  });
}

// 社区分类列表
export function useBbsListApi() {
  return useHttpGet("bbsList", "/bbs?page=1", {
    lazy: true,
  });
}

// 指定分类下的帖子列表
export function usePostListApi(query) {
  return useHttpGet("postList", () => {
    let q = useQueryToString(query());
    return `/post/list${q}`;
  }, {
    lazy: true,
  });
}

// 查看帖子
export function useReadPostApi(id) {
  return useHttpGet("readPost", "/post/read?id=" + id, {
    lazy: true,
  });
}

// 查看帖子评价列表
export function usePostCommentApi(query) {
  return useHttpGet("PostComment", () => {
    let q = useQueryToString(query());
    return `/post_comment${q}`;
  }, {
    lazy: true,
  });
}

// 评论帖子
export function useReplyPostApi(body) {
  return useHttpPost("ReplyPost", "/post/reply", {
    body,
  });
}

// 发布帖子
export function useAddPostApi(body) {
  return useHttpPost("addPost", "/post/save", {
    body,
  });
}
