// 运行时配置
import { RunTimeLayoutConfig } from '@umijs/max';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@Dang-admin' };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    layout: 'mix',
    // logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
      params: {
        // userId: initialState?.currentUser?.userid,
      },
      // request: async (params, defaultMenuData) => {
      //   // initialState.currentUser 中包含了所有用户信息
      //   const menuData = await fetchMenuData();
      //   return menuData;
      // },
    },
    // locale: false, // 默认开启，如无需菜单国际化可关闭
  };
};

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0, // silent
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9, // redirect
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

const BASEURL = ''; //'http://localhost:86';

export const request: RequestConfig = {
  timeout: 1000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
  errorConfig: {
    // 错误抛出
    errorThrower(res: ResponseStructure) {
      console.log('错误抛出:', res);
      const { data, errorCode, errorMessage, showType } = res;
      if (data.code !== 200) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      console.log('错误接收处理:', error);
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warn(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              //TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        console.log(error);
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },
  //添加请求阶段的拦截器。
  requestInterceptors: [
    (url: string, options) => {
      let baseUrl = BASEURL + url;

      return { url: baseUrl, options };
    },
  ],
  // 添加响应阶段的拦截器。
  responseInterceptors: [
    (response: any) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response;
      // console.log('请求成功', data);
      if (data.code !== 200) {
        message.error('请求失败！');
        message.error(data.msg);
      } /* else {
        message.success(data.msg);
      } */
      return response;
    },
  ],
};
