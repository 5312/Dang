import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';

import services from '@/services/menus';
import DrawerForm from './components/Drawer';
import columns from '../columns';

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
          return await services.queryMenuList(params);
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          /* onChange(value) {
            console.log('value: ', value);
          }, */
        }}
        rowKey="ID"
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
                CreatedAt: [values.startTime, values.endTime],
              };
            } else if (type === 'set') {
              values.name = undefined;
              values.endTime = undefined;
              values.startTime = undefined;
              return values;
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
      <DrawerForm
        open={createModalVisible}
        onCancel={handleModalVisible}
      ></DrawerForm>
    </>
  );
};
