import { PageContainer } from '@ant-design/pro-components';

import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProCard } from '@ant-design/pro-components';
import { Button, Switch } from 'antd';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
// @ts-ignore
import styles from './index.less';

import { queryCourse, queryCourseList, knowledge } from '@/services/course';

const Left: React.FC<LeftProps> = ({ courseName, onChange }) => {
  /*  */
  const columns: ProColumns<Course>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '学期',
      dataIndex: 'useTime',
      width: 100,
      tip: '课程按学期学习',
    },
    {
      title: '课程号',
      width: 100,
      dataIndex: 'courseNo',
    },
    {
      title: '课程名',
      dataIndex: 'courseName',
      width: 100,
      colSize: 1,
      ellipsis: true,
    },
    {
      title: '课程类型',
      width: 60,
      dataIndex: 'courseForm',
    },
    {
      title: '考试类型',
      width: 100,
      dataIndex: 'examForm',
      ellipsis: true,
    },
    {
      title: '主讲教师',
      width: 100,
      dataIndex: 'mainTeacherName',
    },
  ];
  /*  */
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer
      header={{
        title: '',
      }}
    >
      <ProTable<Course>
        columns={columns}
        actionRef={actionRef}
        scroll={{
          x: '',
        }}
        cardBordered
        params={{
          current: 1,
          pageSize: 50,
        }}
        request={async (
          params = {
            pageSize: 1,
            current: 50,
          },
        ) => {
          const msg = await queryCourse({
            page: params.current || 1,
            rows: params.pageSize || 10,
          });
          return {
            data: msg.rows,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: msg.total,
          };
        }}
        rowKey="courseName"
        search={false}
        rowClassName={(record) => {
          return record.courseName === courseName
            ? styles['split-row-select-active']
            : '';
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              if (record.courseName) {
                onChange(record.courseName, record.courseNo);
              }
            },
          };
        }}
        options={{
          density: false,
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 50,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="课程表"
        toolBarRender={() => []}
      />
    </PageContainer>
  );
};
const Right: React.FC<RightProps> = ({ courseName, courseNo }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [checked, setchecked] = useState<boolean>(false);
  // uesState 表格数据
  const [tableListDataSource, setTableListDataSource] = useState<CourseList[]>(
    [],
  );

  /*  */
  // 请求左侧课表数据
  const getData = async () => {
    setLoading(true);
    const data = await queryCourseList(
      { courseName: courseName, courseNo: courseNo },
      {
        page: 1,
        rows: 2000,
      },
    );
    const array = data.rows;
    setTableListDataSource(array);

    setLoading(false);
  };
  /**
   *
   * @param data 课程信息 参数
   * @param lasttime 时间 -- > 点击已学为当前时间, 批量学习为 获取时间 为了把时间间隔错开 每一个跟前一个相差 1 小时
   * @returns
   */
  const learning = (data: CourseList, lasttime?: string) => {
    let t = dayjs().add(1, 'hour').valueOf();
    if (lasttime) {
      t = dayjs(lasttime).valueOf();
    }
    // return;
    knowledge({
      yCourseKnowledgeStudy: '',
      id: data.id,
      _: t,
    })
      .then(() => {
        console.log('刷新表');
        getData();
      })
      .catch((e) => {
        console.log('刷新表');
        getData();
        console.log(e);
      });
  };

  /* 表格 colums */
  const columns: ProColumns<CourseList>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      ellipsis: true,
      width: 150,
    },
    {
      title: '知识点',
      dataIndex: 'knowledgePointContent',
      ellipsis: true,
      width: 150,
    },
    {
      title: '是否已学',
      dataIndex: 'studyOrNot',
      align: 'center',
      width: 80,
      initialValue: 'all',
      valueEnum: {
        y: { text: '已学', status: 'Processing' },
      },
    },
    {
      title: '最后访问时间',
      width: 200,
      dataIndex: 'lastAccessTime',
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      width: 80,
      render: (text, record: CourseList) => {
        return (
          <a
            key="a"
            onClick={() => {
              learning(record);
            }}
          >
            学习
          </a>
        );
      },
    },
  ];

  // 左右联动
  useEffect(() => {
    getData();
  }, [courseName]);

  // 批量学习功能
  const batchLearning = () => {
    setLoading(true);
    // 判空
    if (tableListDataSource) {
      // 最后一个已学的时间 || 默认为当前时间
      let lastTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
      // console.log(lastTime);
      tableListDataSource.forEach(async (x, y) => {
        // 拿上一个的时间
        lastTime = dayjs(lastTime)
          .add(y + 1, 'hour')
          .format('YYYY-MM-DD HH:mm:ss');
        // 未学的才重新学习
        if (checked || (x.lastAccessTime === '' && x.studyOrNot !== 'y')) {
          await learning(x, lastTime);
        }
      });
      setLoading(false);
    }
  };
  return (
    <>
      <ProTable<CourseList>
        scroll={{
          x: '',
          y: 'calc(100vh - 300px)',
        }}
        columns={columns}
        // cardBordered
        search={false}
        rowKey="id"
        dataSource={tableListDataSource}
        loading={loading}
        pagination={{
          pageSize: 70,
          showSizeChanger: false,
        }}
        options={{
          density: false,
          setting: {
            listsHeight: 400,
          },
        }}
        toolbar={{
          actions: [
            <Switch
              key="select"
              checked={checked}
              onChange={(c) => {
                setchecked(c);
              }}
            />,
            <Button key="key" type="primary" onClick={batchLearning}>
              批量已学
            </Button>,
          ],
        }}
      ></ProTable>
    </>
  );
};

const DBtable: React.FC = () => {
  // 顶部卡片 名称
  const [courseName, setcourseName] = useState('');
  // 左右传值
  const [courseNo, setcourseNo] = useState('');
  return (
    <ProCard split="vertical">
      <ProCard colSpan={12} ghost>
        <Left
          onChange={(ccourseName, ccourseNo) => {
            setcourseName(ccourseName);
            setcourseNo(ccourseNo);
          }}
          courseName={courseName}
        />
      </ProCard>
      <ProCard colSpan={12} title={courseName}>
        <Right courseName={courseName} courseNo={courseNo} />
      </ProCard>
    </ProCard>
  );
};

export default DBtable;
