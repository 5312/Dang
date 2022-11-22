import { defineConfig } from '@umijs/max';

export default defineConfig({
  request: {},
  layout: {},
  model: {},
  antd: {},
  routes: [
    {
      path: '/',
      layout: false,
      redirect: '/login',
    },
    { path: '/login', layout: false, component: './login' },
  ],
  npmClient: 'pnpm',
});
