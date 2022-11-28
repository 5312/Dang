import { useModel } from '@umijs/max';
import styles from './index.less';

import type { MenuProps } from 'antd';
import { Dropdown, Space, message } from 'antd';

const onClick: MenuProps['onClick'] = ({ key }) => {
  console.log(key);
  message.info(`退出`);
};

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '退出',
  },
];
// 脚手架示例组件
const Guide: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <>
      <Dropdown menu={{ items, onClick }} className={styles.right}>
        <Space>{initialState?.name} </Space>
      </Dropdown>
    </>
  );
};

export default Guide;
