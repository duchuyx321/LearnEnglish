import Home from '~/pages/Home';
import LearnPath from '~/pages/LearnPath';
import Profile from '~/pages/Profile';
import Blog from '~/pages/Blog';
import Courses from '~/pages/Courses';
import Learning from '~/pages/learning';
import LearningLayout from '~/layouts/LearningLayout';

// Private router
const PrivateRouters = [];

// Public Router
const PublicRouters = [
    { path: '/', component: Home },
    { path: '/learning-paths', component: LearnPath },
    { path: '/learning/:slug', component: Learning, layout: LearningLayout },
    { path: '/blog', component: Blog },
    { path: '/courses/:slug', component: Courses },
    { path: '/:username', component: Profile },
];

export { PrivateRouters, PublicRouters };
