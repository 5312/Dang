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

type LeftProps = {
  courseName: string;
  onChange: (name: string, id: string) => void;
};
type RightProps = {
  courseName: string;
  courseNo: string;
};

type CourseList = {
  state: string;
  id: string;
  createName: string;
  createBy: string;
  createDate: string;
  updateName: string;
  updateBy: string;
  updateDate: string;
  knowledgePointNo: string;
  courseName: string;
  knowledgePointContent: string;
  studyOrNot: string;
  lastAccessTime: string;
  courseNo: string;
  coursewarePath: string;
  accessAmount: string;
  coursePointNo: string;
  courseType: string;
};
