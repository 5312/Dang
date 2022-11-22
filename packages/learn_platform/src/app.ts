// 运行时配置
import { RequestConfig } from '@umijs/max';
import qs from 'qs';
import { message } from 'antd';
import { history } from '@umijs/max';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    title: '西电网课平台',
    menuDataRender: () => [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: '课件点播',
        path: '/home',
        component: './Home',
      },
    ],
  };
};

// 运行时配置
export const request: RequestConfig = {
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Access-Control-Allow-Credentials': true,
  },
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      console.log(res);
    },
    errorHandler: (error: any) => {
      if (error.config.url === '/xd/learning/yTeachOutlineController.do') {
        localStorage.removeItem('xd_login');
        message.error('请重新登录');
        history.push('/login');
      }
    },
  },
  requestInterceptors: [
    (url, options) => {
      // do something 序列化 参数
      let qsData = options.data;

      options.data = qs.stringify(qsData);
      return { url, options };
    },
  ],
  responseInterceptors: [
    (response) => {
      // do something
      return response;
    },
  ],
};
