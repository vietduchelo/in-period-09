
var fs = require('fs');
var path = require('path');
var userDao = require('./../dao/user.dao');
var User = require('../models/user.model');

module.exports = {
    getUsers: getUsers,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getUserLimit: getUserLimit,
    phanTrang: phanTrang,
    groupBy: groupBy
}

function getUsers() {
    return User.find({}, {
            password: 0
        })
        .then(function (users) {
            return Promise.resolve(users);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function deleteUser(id) {
    return User.findByIdAndRemove(id)
        .then(function (data) {

            return Promise.resolve(data);
        })
        .catch(function (err) {})
}

function updateUser(user) {
    return User.findByIdAndUpdate(user._id, user)
        .then(function (user) {
            return Promise.resolve(user);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function getUserLimit() {
    return User.find({}, {password: 0}).limit(2)
        .then(function (users) {
            return Promise.resolve(users);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}
function phanTrang(query1){
    var query = query1;
        return User.find({},{password: 0},query).
        then( function(data){
            return Promise.resolve(data);
        }).catch(function (err){
            return Promise.reject(err);
        })
}
function groupBy(groupBy){
    var groupBy = groupBy;
    console.log("aâ"+groupBy);
    return User.aggregate([{$group: {_id: '$'+groupBy, total: {$sum: '$age'}}}])
    .then(function (data){
        return Promise.resolve(data);
    }).catch(function (err){
        return Promise.resolve(data);
    })
}