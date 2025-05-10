import { Navigate } from 'react-router-dom';
import { useAdminStore } from '../stores/useAdminStore';

const AdminRoute = ({ children }) => {
  const { token, admin } = useAdminStore();

  return token && admin?.role === 'Admin' ? children : <Navigate to="/admin-login" />;
};

export default AdminRoute;
