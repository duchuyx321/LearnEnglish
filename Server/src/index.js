const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');

require('dotenv').config();

const router = require('./routers');
const Connect = require('./config/db/connectDB');

const app = express();
const port = process.env.PORT_SERVER || 5050;

// Connect Database
Connect();

// morgan
app.use(morgan('combined'));

// Cors
app.use(
    cors({
        origin: process.env.URL_CLIENT,
        credentials: true,
    }),
);

// methodOverride
app.use(methodOverride('_method'));

// cookies parser
app.use(cookieParser());

// Cấu hình kích thước tối đa của payload
app.use(express.json({ limit: '250mb' })); // Tăng giới hạn kích thước của JSON payload lên 250MB
app.use(express.urlencoded({ limit: '250mb', extended: true })); // Tăng giới hạn kích thước của URL-encoded payload lên 250MB

// parse url - encoded data
// app.use(express.urlencoded({ extended: true }));

// parse json data
// app.use(express.json());

// truy cập vào public
app.use(express.static(path.join(__dirname, 'public')));

// router
router(app);

app.listen(port, () => {
    console.log('listening on url: ' + `http://localhost:${port}`);
});
