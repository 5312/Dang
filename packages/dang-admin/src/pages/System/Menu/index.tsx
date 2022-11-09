import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { request } from '@umijs/max';

import DrawerForm from './components/Drawer';
const columns: ProColumns<Menus.MenuList>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '图标',
    dataIndex: 'icon',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '路由',
    dataIndex: 'path',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '是否可见',
    dataIndex: 'hide',
  },
  {
    title: '显示顺序',
    dataIndex: 'sort',
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'CreatedAt',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'CreatedAt',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.ID);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  console.log(createModalVisible);
  const actionRef = useRef<ActionType>();
  return (
    <>
      <ProTable<Menus.MenuList>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {} /* , sort, filter */) => {
          return request<{
            data: Menus.MenuList[];
          }>('/v1/sys/menus', {
            params,
          });
        }}
        editable={{
          type: 'multiple',
        }}
        /*    columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }} */
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          density: false,
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="菜单列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
      />
      <DrawerForm></DrawerForm>
      {/*  <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      ></CreateForm> */}
    </>
  );
};
