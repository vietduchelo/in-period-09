
var fs = require('fs');
var path = require('path');
var userDao = require('./../dao/user.dao');
var User = require('../models/user.model');
var crypto = require('crypto');
var jwt = require('../utils/jwt');
var secret = 'meomeomeo'
module.exports = {
    register: register,
    login: login,
    checkAuth: checkAuth
}

function login(name, password) {
    var hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
    console.log(hash);
    return User.findOne({
        name: name,
        password: hash
    }).then(function (user) {
        if (user) {
            return new Promise(function (resolve, reject) {
                jwt.sign({  
                    name: user.name
                }, function (err, token) {
                    if (err) {
                        reject({
                            statusCode: 400,
                            message: err.message
                        });
                    } else {
                        resolve(token);
                    }
                });
            });
        }else{
            return Promise.reject({
                statusCode: 400,
                message: "Name or pass is incorect"
            })
        }
    }).catch(function(err){
        return Promise.reject(err);
    })
}
function register(newUser) {
    return User.find({ name: newUser.name })
        .then(function (foundUsers) {
            if (foundUsers.length > 0) {
                return Promise.reject({
                    statusCode: 400,
                    message: 'name is existed'
                });
            } else {
                var hash = crypto.createHmac('sha256', secret)
                    .update(newUser.password)
                    .digest('hex');

                newUser.password = hash;
                var user = new User(newUser);

                return user.save()
                    .then(function (user) {
                        return Promise.resolve(user);
                    })
                    .catch(function (err) {
                        return Promise.reject(err);
                    })
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}
function checkAuth(user) {
    return User.findOne(user)
        .then(function (foundUser) {
            if (foundUser) {
                return Promise.resolve(foundUser);
            } else {
                return Promise.reject({
                    message: 'Not Found'
                });
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}


