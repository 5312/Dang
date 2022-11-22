import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  routes: [
    { path: '/login', layout: false, component: './Login' },
    {
      path: '/',
      wrappers: ['@/wrappers/auth'], // 页面权限
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          name: '首页',
          path: '/home',
          component: './Home',
        },
      ],
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    // 页面
    '/xd': {
      target: 'http://snce.xidian.edu.cn/',
      changeOrigin: true,
      pathRewrite: { '^/xd': '' },
      onProxyRes: function (proxyRes, req, res) {
        const cookies = proxyRes.headers['set-cookie'];
        const cookiePathRegex = /Path=\/learning\/;/;
        let newCookie;
        // 修改cookie Path
        if (cookies) {
          newCookie = cookies.map((cookie) => {
            console.log(cookiePathRegex.test(cookie));
            if (cookiePathRegex.test(cookie)) {
              // 替换
              return cookie.replace(cookiePathRegex, 'path=/;');
            }
            return cookie;
          });
          // 替换set-cookie
          delete proxyRes.headers['set-cookie'];
          proxyRes.headers['set-cookie'] = newCookie;
          console.log(proxyRes.headers['set-cookie']);
        }
      },
    },
    '/xlCourses01': {
      target: 'http://s3.xiangshi.cc',
      changeOrigin: true,
    },
  },
});
