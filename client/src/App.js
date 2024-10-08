import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import DefaultLayout from '~/layouts/DefaultLayout';
import { PrivateRouters, PublicRouters } from '~/routers';

function App() {
    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        const token = accessToken.split(' ')[1];
        if (token) {
            const decode = jwtDecode(token);
            const currentTime = new Date();
            const expTime = new Date(decode.exp * 1000);
            // Trừ đi 1 tiếng (3600 giây = 1 giờ)
            const timeBeforeExpiration = new Date(
                expTime.getTime() - 3600 * 1000,
            );

            const interval = setInterval(async () => {
                if (currentTime > timeBeforeExpiration) {
                }
            }, 1000 * 60 * 30);
        }
    }, []);
    // fetch api
    const refreshToken = async () => {
        // const result = await
    };
    return (
        <Router>
            <div className="App">
                <Routes>
                    {PublicRouters.map((item, index) => {
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
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
