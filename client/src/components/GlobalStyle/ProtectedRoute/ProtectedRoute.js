import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
    const navigate = Navigate();
    if (role !== 'admin') {
        return navigate('/');
    }
    return children;
}

export default ProtectedRoute;
