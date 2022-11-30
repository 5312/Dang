import { defineConfig } from '@umijs/max';

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const path = require('path');

export default defineConfig({
  request: {},
  layout: {},
  antd: {},
  routes: [
    { path: '/login', layout: false, component: './login' },
    {
      path: '/',
      layout: false,
      redirect: '/login',
    },
    { path: '/home', layout: false, component: './Home' },
  ],
  npmClient: 'pnpm',
  define: {
    CESIUM_BASE_URL: JSON.stringify(''),
  },
  publicPath: '/',
  base: '',
  copy: [
    { from: path.join(cesiumSource, cesiumWorkers), to: 'Cesium/Workers' },
    { from: path.join(cesiumSource, 'Assets'), to: 'Cesium/Assets' },
    { from: path.join(cesiumSource, 'Widgets'), to: 'Cesium/Widgets' },
  ],
});
