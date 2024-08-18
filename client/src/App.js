import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRouters, PublicRouters } from '~/routers';
import DefaultLayout from '~/layouts/DefaultLayout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {PublicRouters.map((item, index) => {
                        let Layout = DefaultLayout;
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
