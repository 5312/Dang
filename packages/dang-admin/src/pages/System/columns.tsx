import type { ProColumns } from '@ant-design/pro-components';

const columns: ProColumns<Menus.MenuList>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '菜单名称',
    dataIndex: 'name',
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
    dataIndex: 'icon',
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: false,
  },
  {
    title: '组件',
    dataIndex: 'component',
    search: false,
  },
  {
    title: '路由',
    dataIndex: 'path',
    search: false,
  },
  {
    title: '类型',
    dataIndex: 'type',
    search: false,
  },
  {
    title: '是否可见',
    dataIndex: 'hide',
    search: false,
  },
  {
    title: '显示顺序',
    dataIndex: 'sort',
    search: false,
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

export default columns;
