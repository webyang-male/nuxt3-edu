// 点击分页返回顶部
export default {
  scrollBehavior(to, from, savedPosition) {
    //在按下前进/后退按钮，就会触发这个方法实现前进后退功能
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
};
