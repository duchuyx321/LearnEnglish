const homeRouter = require('./home');
const authRouter = require('./auth');
const courseRouter = require('./course');
const userRouter = require('./User');

const router = (app) => {
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/course', courseRouter);
    app.use('/', homeRouter);
};

module.exports = router;
