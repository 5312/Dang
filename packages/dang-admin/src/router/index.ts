import staticRoutes from './staticRoute';

const routes = [
  ...staticRoutes,
  // 注册子应用
  {
    path: '/sys',
    name: '系统管理',
    wrappers: ['@/wrappers/auth'], // 页面权限
    routes: [
      {
        name: '菜单管理',
        path: 'menu',
        component: './System/Menu',
      },
    ],
  },
];

export default routes;
