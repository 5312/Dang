import {
  DrawerForm,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormTreeSelect,
  ProFormRadio,
  ProFormDigit,
} from '@ant-design/pro-components';
import { Form, TreeSelect } from 'antd';
import React, { useState, PropsWithChildren, useEffect } from 'react';
import services from '@/services/menus';

interface DrawerFormProps {
  open: boolean;
  onCancel: any;
}

const DraweropenForm: React.FC<PropsWithChildren<DrawerFormProps>> = (
  props,
) => {
  const { open, onCancel } = props;

  const [form] = Form.useForm<{ name: string; company: string }>();

  // const [value, setValue] = useState<number | undefined>(0);

  /* tree */
  const [treeData, setTreeData] = useState<Menus.MenuList[]>();
  const getTreeData = async () => {
    const result = await services.queryMenuList({});
    setTreeData(result.data);
  };
  useEffect(() => {
    getTreeData();
  }, []);

  return (
    <DrawerForm<Menus.MenuList>
      /* horizontal */
      layout={'vertical'}
      title="新建菜单"
      open={open}
      onOpenChange={onCancel}
      form={form}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        // 不返回不会关闭弹框
        if (!values.parent_id) values.parent_id = 0;
        let typeOption: any = values.type;
        values.type = typeOption.value;
        const data = await services.addMenus(values);
        console.log(data);
        if (data.code === 200) {
          return true;
        }
        return false;
      }}
    >
      <ProForm.Group>
        <ProFormText
          required
          name="name"
          width="md"
          label="菜单名称"
          placeholder="请输入菜单名称"
          rules={[{ required: true }]}
        />
        <ProFormTreeSelect
          label="上级菜单"
          width="md"
          name="parent_id"
          fieldProps={{
            fieldNames: {
              label: 'name',
              value: 'ID',
            },
            treeCheckable: false,
            // onChange: () => onChange,
            treeData: treeData,
            showCheckedStrategy: TreeSelect.SHOW_PARENT,
          }}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          required
          name="icon"
          width="md"
          label="图标"
          placeholder="请选择图标"
          rules={[{ required: true }]}
        />
        <ProFormSelect
          required
          initialValue={{
            value: 0,
            label: '菜单',
          }}
          width="md"
          options={[
            {
              value: 'time',
              label: '菜单类型',
              type: 'time',
              options: [
                {
                  value: 0,
                  label: '菜单',
                },
                {
                  value: 1,
                  label: '按钮',
                },
                {
                  value: 2,
                  label: '权限',
                },
              ],
            },
          ]}
          name="type"
          label="菜单类型"
          rules={[{ required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          required
          name="path"
          width="md"
          label="节点路由"
          placeholder="请输入节点路由"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="component"
          width="md"
          label="组件"
          placeholder="请输入组件路径"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit width="xs" name="sort" label="排序" initialValue={0} />
        <ProFormRadio.Group
          label="菜单状态"
          name="status"
          initialValue={1}
          options={[
            { label: '正常', value: 1 },
            { label: '禁用', value: 2 },
          ]}
        ></ProFormRadio.Group>
      </ProForm.Group>
    </DrawerForm>
  );
};

export default DraweropenForm;
