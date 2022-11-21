import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

import services from '@/services/menus';
import DrawerForm from './components/Drawer';
import columns from './columns';

export default () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  // console.log(createModalVisible);
  const actionRef = useRef<ActionType>();
  // 弹窗
  useEffect(() => {
    if (!createModalVisible) {
      // 刷新
      actionRef?.current?.reload();
    }
  }, [createModalVisible]);
  return (
    <>
      <ProTable<Menus.MenuList>
        columns={columns}
        actionRef={actionRef}
        style={{ height: 'calc(100vh)' }}
        scroll={{ x: 'calc(100vw - 300px)' }}
        bordered
        cardBordered
        pagination={false}
        request={async (params = {} /* , sort, filter */) => {
          console.log(params);
          const res = await services.queryMenuList(params);
          return {
            ...res,
            success: true,
          };
        }}
        editable={{
          type: 'multiple',
          actionRender: (row, config, defaultDoms) => {
            //
            if (row.children && row.children.length !== 0) {
              return [defaultDoms.save, defaultDoms.cancel];
            }
            return [defaultDoms.save, defaultDoms.delete, defaultDoms.cancel];
          },
          onDelete: async (e) => {
            const data = await services.deleteMenu({
              menusId: e,
            });
            if (data.code === 200) {
              message.success(data.msg);
            } else {
              message.error(data.msg);
            }
            actionRef?.current?.reload();
          },
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            const result = await services.modifyMenu({ menusId: rowKey }, data);
            console.log(result);
          },
        }}
        /*    columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
            onChange(value) {
            console.log('value: ', value);
          },  
        }} */
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
