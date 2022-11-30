import { useEffect } from 'react';
import { threeInitRender } from '../../util/init';
import loader from './login';
// import { history } from '@umijs/max';
// import { Button } from 'antd';
// 样式
import style from './login.module.less';
import human from '@/assets/bg/login_human.png';

import Login from './index_login';

// const layout = () => {
//   localStorage.setItem('roles', '');
//   // 登录后跳转
//   history.push('/cesium');
// };

const DocsPage = () => {
  useEffect(() => {
    const [scene] = threeInitRender(true);
    loader(scene);
  }, []);

  return (
    <div className={style.login}>
      <canvas
        id="canvas"
        style={{
          width: '100%',
          height: '100vh',
        }}
      ></canvas>
      <div className="login-plane">
        <div className="login-plane-container">
          <img className="login-plane-human" src={human} alt="" />
          {/* <div></div> */}
          <div className="login-plane-form">
            <Login />
            {/* <Button type="primary" onClick={layout}>
              登录
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
