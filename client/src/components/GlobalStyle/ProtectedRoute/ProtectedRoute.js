/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
    const accessToken = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        if (accessToken) {
            const token = accessToken.split(' ')[1];
            const decode = jwtDecode(token);
            if (decode?.role !== 'admin') {
                navigate('/');
                return;
            }
        }
    }, [accessToken]);
    return children;
}

export default ProtectedRoute;
