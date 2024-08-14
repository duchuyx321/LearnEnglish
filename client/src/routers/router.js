import Home from '~/pages/Home';
import Profile from '~/pages/Profile';

const PrivateRouters = [
    { path: '/', component: Home },
    { path: '/:username', component: Profile },
];

const PublicRouters = [];

export { PrivateRouters, PublicRouters };
