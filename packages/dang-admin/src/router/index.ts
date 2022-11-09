const routes = [
  // 注册子应用
  {
    path: '/threejs/*',
    microApp: 'threejs',
    microAppProps: {
      basename: '/threejs',
    },
  },
  {
    path: '/',
    wrappers: ['@/wrappers/auth'], // 页面权限
    routes: [
      // { path: '/', redirect: '/threejs/cesium' },
      { path: '/', redirect: '/sys/menu' },
      {
        name: '权限演示',
        path: '/access',
        component: './Access',
      },
      {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
      },
      {
        name: '菜单管理',
        path: '/sys/menu',
        component: './System/Menu',
      },
    ],
  },
];

export default routes;
