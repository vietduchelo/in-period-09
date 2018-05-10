var express = require('express');
var app = express();
var fs = require("fs");
var User = require('./models/user.model');
var bodyParser = require('body-parser');
var router = express.Router();
var userRouter = require('./routes/user.route');
var authRouter = require('./routes/auth.route');
var errorHandler = require('./middle-ware/error-handler');
var db = require('./config/db').dbConnect();
var fileUpload = require('express-fileupload');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use('/users', userRouter());
app.use('/auth', authRouter());
app.use(errorHandler.errorHandler());
app.listen(process.env.PORT || 8081, function () {
    console.log("Ung dung Node.js dang lang nghe tai dia chi: http://localhost:8081");
})