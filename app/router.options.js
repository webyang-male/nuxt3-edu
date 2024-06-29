export default {
  scrollBehavior(to, from, savedPosition) {
    // 在按下 后退/前进 按钮时。就会像浏览器的原生表现那样
    if (savedPosition) {
      return savedPosition;
    }

    return {
      top: 0,
    };
  },
};
