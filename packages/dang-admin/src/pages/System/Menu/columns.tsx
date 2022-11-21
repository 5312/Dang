import type { ProColumns } from '@ant-design/pro-components';
import { Tag } from 'antd';
import * as Icons from '@ant-design/icons';
import React from 'react';
const columns: ProColumns<Menus.MenuList>[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 200,
    // copyable: true,
    ellipsis: true,
    // tip: '标题过长会自动收缩',
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
    align: 'center',
    title: '图标',
    width: 150,
    dataIndex: 'icon',
    search: false,
    render: (_, record) => {
      let str: keyof typeof Icons = record.icon;
      if (str) {
        // @ts-ignore
        const dynamicIcon = React.createElement(Icons[str]);
        return <>{dynamicIcon}</>;
      } else {
        return;
      }
    },
  },
  {
    title: '类型',
    dataIndex: 'type',
    search: false,
    width: 80,
    editable: false,
    render: (_, record) => {
      const typeText = ['菜单', '按钮', '权限'];
      const typColor = ['blue', 'green', 'volcano'];
      return <Tag color={typColor[record.type]}>{typeText[record.type]}</Tag>;
    },

    // render: (_, record) => (
    //   <Space>
    //     <Tag key={record.type}>{record.type}</Tag>
    //   </Space>
    // ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: false,
    width: 80,
  },
  {
    title: '节点路由',
    dataIndex: 'path',
    width: 80,
    search: false,
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    search: false,
    width: 300,
  },

  {
    title: '权限',
    dataIndex: 'permission',
    search: false,
    width: 80,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    search: false,
    width: 50,
  },
  {
    title: '更新时间',
    dataIndex: 'UpdatedAt',
    valueType: 'date',
    sorter: true,
    width: 100,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'CreatedAt',
    valueType: 'date',
    sorter: true,
    width: 100,
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
    fixed: 'right',
    align: 'center',
    width: 150,
    title: '操作',
    valueType: 'option',
    // key: 'option', // 这个属性影响 固定列
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

export default columns;
