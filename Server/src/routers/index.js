const homeRouter = require('./home');
const authRouter = require('./auth');
const courseRouter = require('./course');
const lessonRouter = require('./lesson');
const vocabularyRouter = require('./vocabulary');
const userRouter = require('./User');
const progressRouter = require('./progress');
const learnPathRouter = require('./learnPath');
const blogRouter = require('./blog');
const profileRouter = require('./profile');
const apiRouter = require('./api');
const commentsRouter = require('./comments');
const AdminRouter = require('./admin');

const router = (app) => {
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/lesson', lessonRouter);
    app.use('/vocabulary', vocabularyRouter);
    app.use('/course', courseRouter);
    app.use('/progress', progressRouter);
    app.use('/learn-path', learnPathRouter);
    app.use('/profile', profileRouter);
    app.use('/blog', blogRouter);
    app.use('/api', apiRouter);
    app.use('/comments', commentsRouter);
    app.use('/admin', AdminRouter);
    app.use('/', homeRouter);
};

module.exports = router;
