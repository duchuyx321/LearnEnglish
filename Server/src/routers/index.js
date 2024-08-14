const homeRouter = require('./home');
const authRouter = require('./auth');
const courseRouter = require('./course');
const lessonRouter = require('./lesson');
const vocabularyRouter = require('./vocabulary');
const userRouter = require('./User');
const progressRouter = require('./progress');

const router = (app) => {
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/lesson', lessonRouter);
    app.use('/vocabulary', vocabularyRouter);
    app.use('/course', courseRouter);
    app.use('/progress', progressRouter);
    app.use('/', homeRouter);
};

module.exports = router;
