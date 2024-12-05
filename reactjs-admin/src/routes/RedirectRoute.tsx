import { Navigate, Outlet } from 'react-router-dom';

// Giả sử useAuth kiểm tra xem người dùng đã đăng nhập chưa
const useAuth = () => {
  return Boolean(localStorage.getItem('accessToken'));  // Hoặc từ Context/Redux
};

// Component để ngăn người dùng đã đăng nhập vào trang đăng nhập
const RedirectToHome = () => {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    // Nếu người dùng đã đăng nhập, chuyển hướng tới trang dashboard hoặc trang chính
    return <Navigate to="/" />;
  }

  return <Outlet /> // Nếu chưa đăng nhập, cho phép truy cập trang login
};

export default RedirectToHome;
