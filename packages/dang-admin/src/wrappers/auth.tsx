import { Navigate, Outlet } from '@umijs/max';

export default (/* props */) => {
  const isLogin = localStorage.getItem('roles') !== null;
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/threejs/login"></Navigate>;
  }
};
