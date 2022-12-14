import { defineConfig } from '@umijs/max';

import routes from './src/router/index';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@Dang-admin',
  },
  routes: routes,
  npmClient: 'pnpm',
  proxy: {
    '/v1': {
      target: 'http://localhost:87',
      changeOrigin: true,
    },
  },
});
