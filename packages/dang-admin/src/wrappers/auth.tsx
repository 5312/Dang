import { Navigate, Outlet } from '@umijs/max';

export default (/* props */) => {
  const isLogin = sessionStorage.getItem('login') !== null;
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};
