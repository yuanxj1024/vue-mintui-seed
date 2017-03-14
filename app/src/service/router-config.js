/**
 * 行情路由配置
 */

const createRouter = (VueRouter) => {
  const router = new VueRouter({
    routes: [{
      path: '/home',
      name: 'home',
      component: require('component/home-view'),
    }, {
      path: '/about',
      component: require('component/about'),
    }, {
      path: '/bar',
      component: {
        template: '<div>12312312</div>',
      },
    }, {
      path: '*',
      component: require('component/home-view'),
    }],
  });
  router.beforeEach((to, from, next) => {
    next();
  });
  return router;
};

module.exports = createRouter;
