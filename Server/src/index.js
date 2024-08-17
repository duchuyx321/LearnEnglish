const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

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

// parse url - encoded data
app.use(express.urlencoded({ extended: true }));

// parse json data
app.use(express.json());

// router
router(app);

app.listen(port, () => {
    console.log('listening on url: ' + `http://localhost:${port}`);
});
