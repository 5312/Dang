/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

type Login = {
  ReturnURL: string;
  userName: number;
  password: number;
  orgId: string;
};
/* login  */
export async function queryLogin(body: Login) {
  return request(
    // 'http://snce.xidian.edu.cn/learning/loginController.do?checkuser',
    '/xd/learning/loginController.do?checkuser',
    {
      withCredentials: true,
      credentials: 'include', //是否包含cook
      method: 'POST',
      data: body,
    },
  );
}
/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function queryUserList(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/queryUserList', {
    method: 'GET',
    withCredentials: true,
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
