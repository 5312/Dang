import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess, Outlet, useParams } from '@umijs/max';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  const params = useParams();
  console.log(params);
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
        <Outlet />
        <div></div>
      </Access>
    </PageContainer>
  );
};

export default AccessPage;
