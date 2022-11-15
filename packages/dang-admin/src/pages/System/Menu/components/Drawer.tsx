import {
  DrawerForm,
  ProForm,
  ProFormText,
  ProFormSelect,
  // ProFormSelectProps
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React, { PropsWithChildren } from 'react';

interface DrawerFormProps {
  open: boolean;
  onCancel: any;
}

const DraweropenForm: React.FC<PropsWithChildren<DrawerFormProps>> = (
  props,
) => {
  const { open, onCancel } = props;

  const [form] = Form.useForm<{ name: string; company: string }>();

  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      layout={'vertical'}
      /* horizontal */
      title="新建菜单"
      open={open}
      onOpenChange={onCancel}
      form={form}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        console.log(values);
        message.success('提交成功');
        // 不返回不会关闭弹框
        // return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          required
          name="name"
          width="md"
          label="菜单名称"
          // tooltip="最长为 24 位"
          placeholder="请输入菜单名称"
        />
        <ProFormText
          name="parent_id"
          width="md"
          label="上级节点"
          tooltip="最顶级可以为空"
          placeholder="请选择上级节点"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          required
          name="icon"
          width="md"
          label="图标"
          placeholder="请选择图标"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '菜单类型',
              type: 'time',
              options: [
                {
                  value: '0',
                  label: '菜单',
                },
                {
                  value: '1',
                  label: '按钮',
                },
                {
                  value: '2',
                  label: '权限',
                },
              ],
            },
          ]}
          name="type"
          label="菜单类型"
        />
      </ProForm.Group>
    </DrawerForm>
  );
};

export default DraweropenForm;
