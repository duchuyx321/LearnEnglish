import Home from '~/pages/Home';
import LearnPath from '~/pages/LearnPath';
import Profile from '~/pages/Profile';
import Blog from '~/pages/Blog';

// Private router
const PrivateRouters = [];

// Public Router
const PublicRouters = [
    { path: '/', component: Home },
    { path: '/learning-paths', component: LearnPath },
    { path: '/blog', component: Blog },
    { path: '/:username', component: Profile },
];

export { PrivateRouters, PublicRouters };
