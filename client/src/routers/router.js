import Home from '~/pages/Home';
import Profile from '~/pages/Profile';

// Private router
const PrivateRouters = [];

// Public Router
const PublicRouters = [
    { path: '/', component: Home },
    { path: '/:username', component: Profile },
];

export { PrivateRouters, PublicRouters };
