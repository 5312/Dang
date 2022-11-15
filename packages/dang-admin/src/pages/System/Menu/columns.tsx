import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
const columns: ProColumns<Menus.MenuList>[] = [
  // {
  //   dataIndex: 'index',
  //   valueType: 'indexBorder',
  //   width: 48,
  // },

  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 200,
    copyable: true,
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
    title: '图标',
    width: 80,
    dataIndex: 'icon',
    search: false,
  },
  {
    title: '类型',
    dataIndex: 'type',
    search: false,
    width: 80,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        <Tag key={record.type}>{record.type}</Tag>
      </Space>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: false,
    width: 80,
  },
  {
    title: '文件路径',
    dataIndex: 'component',
    search: false,
    width: 300,
  },
  {
    title: '节点路由',
    dataIndex: 'path',
    width: 80,
    search: false,
  },
  {
    title: '权限',
    dataIndex: 'permission',
    search: false,
    width: 80,
  },
  {
    title: '是否可见',
    dataIndex: 'hide',
    search: false,
    width: 80,
    align: 'center',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    search: false,
    width: 50,
  },
  {
    title: '更新时间',
    dataIndex: 'UpdateAt',
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
