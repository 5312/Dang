/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

const urlParam = {
  datagridStuStudy: '',
  sysType: 1,
  field:
    'id,createName,createBy,createDate,updateName,updateBy,updateDate,useTime,courseNo,courseName,courseForm,examForm,mainTeacherName,assistTeacherName,answerTeacherName,',
};
type Course = {
  state: string;
  id: string;
  ids: number;
  createName: string;
  createBy: string;
  createDate: string;
  updateName: string;
  updateBy: string;
  updateDate: string;
  useTime: string;
  courseNo: string;
  courseName: string;
  courseForm: string;
  examForm: string;
  mainTeacherName: string;
  assistTeacherName: string;
  answerTeacherName: string;
};

type TableList = {
  page: number;
  rows: number;
};
/* 课程 */
export async function queryCourse(body: TableList) {
  return request<{
    rows: Course[];
    total: number;
  }>('/xd/learning/yTeachOutlineController.do', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
    },
    params: { ...urlParam },
    data: body,
  });
}

const playload = {
  datagrid: '',
  sysType: 1,
  /*   courseName: '毛泽东思想和中国特色社会主义理论体系概论',
  courseNo: 0001002, */
  field:
    'id,createName,createBy,createDate,updateName,updateBy,updateDate,knowledgePointNo,courseName,knowledgePointContent,studyOrNot,lastAccessTime,courseNo,coursewarePath,accessAmount,coursePointNo,courseType,accessAmount,',
};
type ParamsType = {
  courseName: string;
  courseNo: string;
};
/* 课表 */
export async function queryCourseList(params: ParamsType, body: TableList) {
  return request<{
    rows: CourseList[];
    total: number;
  }>('/xd/learning/yCourseKnowledgeController.do', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
    },
    params: { ...params, ...playload },
    data: body,
  });
}

type LearnTime = {
  yCourseKnowledgeStudy: string;
  id: string;
  _: Date | number;
};
/* 读取时间 */
export async function knowledge(params: LearnTime) {
  return request('/xd/learning/yCourseKnowledgeController.do', {
    method: 'GET',
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    },
    params: { ...params },
  });
}
