const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

require("dotenv").config();

const router = require("./routers")

const app = express();
const port = process.env.PORT_SERVER || 5050;

// morgan
app.use(morgan("combined"))

// Cors
app.use(cors({
    origin: process.env.URL_CLIENT,
    credentials : true,
}))

// cookies parser
app.use(cookieParser());

// parse url - encoded data
app.use(express.urlencoded({extended: true}));

// parse json data
app.use(express.json());

// router
router(app)

app.listen(port, ( )=> {
    console.log("listening on url: " + `http://localhost:${port}`);

})