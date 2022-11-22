const staticRoutes = [
  {
    path: '/threejs/*',
    microApp: 'threejs',
    microAppProps: {
      basename: '/threejs',
    },
  },
  {
    path: '/',
    name: '概览',
    routes: [
      // { path: '/', redirect: '/threejs/cesium' },
      { path: '/', redirect: '/access' },
      {
        name: 'home',
        path: '/home',
        component: './Home',
      },
      {
        name: '权限演示',
        path: '/access',
        component: './Access',
      },
    ],
  },
];
export default staticRoutes;
