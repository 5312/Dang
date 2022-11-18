/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';
export declare type RecordKey = React.Key | React.Key[];
/** 此处后端没有提供注释 GET /api/v1/queryUserList */
async function queryMenuList(params: any, options?: { [key: string]: any }) {
  return request<API.Results>('/v1/sys/menus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/user */
async function addMenus(
  body?: Menus.MenuList,
  options?: { [key: string]: any },
) {
  return request<API.Results>('/v1/sys/addmenus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/user/${param0} */
async function deleteMenu(
  params: {
    menusId: RecordKey;
  },
  options?: { [key: string]: any },
) {
  const { menusId: param0 } = params;
  return request<API.Results>(`/v1/sys/menus/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}

export default {
  queryMenuList,
  addMenus,
  deleteMenu,
};
