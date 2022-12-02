import { defineConfig } from '@umijs/max';

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const path = require('path');

const BASE =
  process.env.NODE_ENV !== 'development' ? '/child/threejs/' : '/threejs';
const PUBLIC = process.env.NODE_ENV !== 'development' ? '/child/threejs/' : `/`;

export default defineConfig({
  request: {},
  layout: {},
  antd: {},
  routes: [
    { path: '/login', layout: false, component: './login' },
    {
      path: '/',
      name: '概览',
      layout: false,
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', name: '首页', component: './Home' },
      ],
    },
  ],
  npmClient: 'pnpm',
  define: {
    CESIUM_BASE_URL: './Cesium',
  },
  // 资源从 public加载
  publicPath: '/',
  // base: BASE, // 启动报错 redirect 不到
  runtimePublicPath: {},
  copy: [
    {
      from: path.join(cesiumSource, cesiumWorkers),
      to: 'public/Cesium/Workers',
    },
    { from: path.join(cesiumSource, 'Assets'), to: 'public/Cesium/Assets' },
    { from: path.join(cesiumSource, 'Widgets'), to: 'public/Cesium/Widgets' },
    {
      from: path.join(cesiumSource, 'ThirdParty'),
      to: 'public/Cesium/ThirdParty',
    },
  ],
});
