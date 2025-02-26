// page public
import Home from '~/pages/Home';
import LearnPath from '~/pages/LearnPath';
import Profile from '~/pages/Profile';
import Blog from '~/pages/Blog';
import Courses from '~/pages/Courses';
import Learning from '~/pages/Learning';
import NewPost from '~/pages/NewPost';
import Success from '~/pages/Success';
import Setting from '~/pages/Setting';
import Personal from '~/pages/Setting/components/Personal';
import Security from '~/pages/Setting/components/Security';
// page private
import {
    Admin,
    AdminCourses,
    AdminUsers,
    AdminSetting,
    AdminLessons,
} from '~/pages/Admins';

// layout
import LearningLayout from '~/layouts/LearningLayout';
import HomeLayout from '~/layouts/HomeLayout';

// Private router
const PrivateRouters = [
    { path: '/admin', component: Admin },
    { path: '/admin/users', component: AdminUsers },
    { path: '/admin/courses', component: AdminCourses },
    { path: '/admin/lessons', component: AdminLessons },
    { path: '/admin/setting', component: AdminSetting },
];

// Public Router
const PublicRouters = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/learning-paths', component: LearnPath, layout: HomeLayout },
    { path: '/learning/:slug', component: Learning, layout: LearningLayout },
    { path: '/blog', component: Blog, layout: HomeLayout },
    { path: '/new-post', component: NewPost, layout: HomeLayout },
    { path: '/courses/:slug', component: Courses, layout: HomeLayout },
    { path: '/success/:id', component: Success },
    // { path: '/setting', component:  },
    { path: '/setting/personal', component: Personal, layout: Setting },
    { path: '/setting/security', component: Security, layout: Setting },
    { path: '/:username', component: Profile, layout: HomeLayout },
];

export { PrivateRouters, PublicRouters };
