import { Navigate, Outlet } from 'react-router-dom';

// Giả sử bạn có một hook hoặc một cách nào đó để kiểm tra đăng nhập
const useAuth = () => {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  const isAuthenticated = Boolean(localStorage.getItem('accessToken')); // Hoặc kiểm tra từ state/context
  return isAuthenticated;
};

const PrivateRoute = () => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/auth/signin" />;
  }

  return <Outlet />; // Hiển thị các component con nếu đã đăng nhập
};

export default PrivateRoute;
