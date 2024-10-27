import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import DefaultLayout from '~/layouts/DefaultLayout';
import AdminLayout from '~/layouts/Admin';
import { PrivateRouters, PublicRouters } from '~/routers';
import { logout, refresh } from '~/service/AuthService';
import ProtectedRoute from '~/components/GlobalStyle/ProtectedRoute';

function App() {
    const accessToken = localStorage.getItem('token');
    const [role, setRole] = useState('student');
    useEffect(() => {
        if (accessToken) {
            const token = accessToken.split(' ')[1];
            const decode = jwtDecode(token);
            setRole(decode.role);
            const expTime = new Date(decode.exp * 1000);
            // gọi trước 10p
            const timeBeforeExpiration = new Date(
                expTime.getTime() - 600 * 1000,
            );

            // Kiểm tra ngay lập tức khi trang được mở
            const currentTime = new Date();
            if (currentTime > timeBeforeExpiration) {
                refreshToken();
                window.location.reload();
            }
            const interval = setInterval(async () => {
                const currentTime = new Date();
                if (currentTime > timeBeforeExpiration) {
                    console.log(
                        '---------- tiến hành cập nhật token ----------',
                    );
                    refreshToken();
                } else {
                    console.log('---------- token chưa hết hạn ----------');
                }
            }, 1000 * 60 * 5); // 5p kiểm tra 1 lần
            return () => clearInterval(interval);
        }
    }, [accessToken]);
    // fetch api
    const refreshToken = async () => {
        const result = await refresh();
        console.log(result);
        localStorage.setItem('token', result.meta.token);
        if (result.meta.existenceTime || result.error === 'jwtExpired') {
            const result = await logout();
            if (result.data.message === 'logout successful') {
                localStorage.removeItem('token');
                window.location.reload();
            }
        }
    };
    return (
        <Router>
            <div className="App">
                <Routes>
                    {
                        // router public
                        PublicRouters.map((item, index) => {
                            const Layout = item.layout || DefaultLayout;
                            const Page = item.component;
                            return (
                                <Route
                                    key={index}
                                    s
                                    path={item.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })
                    }
                    {
                        // router private
                        PrivateRouters.map((item, index) => {
                            const Layout = item.layout || AdminLayout;
                            const Page = item.component;
                            return (
                                <Route
                                    key={index}
                                    path={item.path}
                                    element={
                                        <ProtectedRoute role={role}>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </ProtectedRoute>
                                    }
                                />
                            );
                        })
                    }
                </Routes>
            </div>
        </Router>
    );
}

export default App;
