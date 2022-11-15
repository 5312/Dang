import { Navigate, Outlet } from '@umijs/max';

export default (/* props */) => {
  const isLogin = true; //  localStorage.getItem('roles') !== null;
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/threejs/login"></Navigate>;
  }
};
