import { defineConfig } from '@umijs/max';

export default defineConfig({
  request: {},
  layout: {},
  model: {},
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    { path: '/login', layout: false, component: './login' },
  ],
  npmClient: 'pnpm',
});
