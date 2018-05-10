var router = require('express').Router();
var fs = require("fs");
var path = require('path');
var jwt = require('./../utils/jwt');
var authController = require('./../controller/auth.controller');

module.exports = function () {
    router.post('/login', login);
    router.post('/register', register);
    return router;
};

// function login(req, res, next) {
    // var name = req.body.name;
    // var password = req.body.password;


    // fs.readFile(path.join(__dirname, "../" + "users.json"), 'utf8', function (err, data) {
    //     if (err) {
    //         res.status(400);
    //         res.json({
    //             message: 'Password or Email Incorrect'
    //         });
    //     } else {
    //         var listUser = JSON.parse(data);
    //         var user;
    //         for (var i = 0; i < listUser.length; i++) {
    //             if (listUser[i]["name"] == name && listUser[i]["password"] == password) {
    //                 user = listUser[i];
    //             }
    //         }
    //         if (user) {
    //             jwt.sign({ name: name }, function (err, token) {
    //                 if (err) {
    //                     res.status(400);
    //                     res.json({
    //                         message: 'Password or Email Incorrect'
    //                     });
    //                 } else {
    //                     res.json({
    //                         token: token
    //                     });
    //                 }
    //             })
    //         } else {
    //             res.status(400);
    //             res.json({
    //                 message: 'Password or Email Incorrect'
    //             });
    //         }
    //     }
    // });
    //
    function login(req, res, next) {
        var name = req.body.name;
        var password = req.body.password;
    
        if (!name) {
            next({
                statusCode: 400,
                message: "name is required"
            })
        } else if (!password) {
            next({
                statusCode: 400,
                message: "Password is required"
            })
        } else {
            authController.login(name, password)
                .then(function (token) {
                    res.send(token)
                })
                .catch(function (err) {
                    next(err);
                })
        }
    }
    function register(req, res, next) {
        var newUser = req.body;
        if (!newUser.name) {
            next({
                statusCode: 400,
                message: "name is required"
            })
        } else if (!newUser.password) {
            next({
                statusCode: 400,
                message: "Password is required"
            })
        } else {
            authController.register(newUser)
                .then(function (user) {
                    res.send(user);
                })
                .catch(function (err) {
                    next(err);
                })
        }
    }