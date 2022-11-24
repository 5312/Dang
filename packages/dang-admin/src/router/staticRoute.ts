const staticRoutes = [
  { path: '/login', layout: false, component: './Login' },
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
    name: '概览',
    routes: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        name: '概览',
        component: './Home',
      },
      {
        name: '权限演示',
        path: '/access',
        component: './Access',
      },
      {
        name: '菜单2',
        path: 'access2',
        component: './Access',
        routes: [
          {
            path: 'access3/:id',
            name: '菜单3',
            component: './Access',
          },
        ],
      },
    ],
  },
];
export default staticRoutes;
