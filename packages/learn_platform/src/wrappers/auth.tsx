import { Navigate, Outlet } from '@umijs/max';
export default (/* props */) => {
  const isLogin = localStorage.getItem('xd_login') !== null;
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};
