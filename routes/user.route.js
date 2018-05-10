var router = require('express').Router();
var fs = require('fs');
var path = require('path');
var User = require('./../models/user.model');
var auth = require('../middle-ware/auth');
var userController = require('../controller/user.controller');
module.exports = function () {
    router.get('/', getUsers); // auth.auth()
    router.post('/:id', deleteUser);
    router.put('/:id', updateUser);
    router.get('/userlimit', getUserLimit)
    router.get('/page', phanTrang)
    router.get('/groupBy', groupBy)
    return router;
};

function getUsers(req, res, next) {

    userController.getUsers()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            next(err);
        })
}

function deleteUser(req, res, next) {
    var id = req.params.id;
    userController.deleteUser(id)
        .then(function () {
            res.send("xoa thah cong");
        })
        .catch(function (err) {
            console.log("dm");
            next(err);
        })
}

function updateUser(req, res, next) {
    var id = req.params.id;
    var user = req.body;
    user._id = id;
    userController.updateUser(user)
        .then(function (user) {
            res.send(user);
        })
        .catch(function (err) {
            next(err);
        })

}

function getUserLimit(req, res, next) {
    userController.getUserLimit().
    then(function (user) {
            res.send(user);
        })
        .catch(function (err) {
            next(err);
        })
}

function phanTrang(req, res, next) {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
          response = {"error" : true,"message" : "page khong co san nha ban"};
          return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
  userController.phanTrang(query).then
  (function (user){
      res.send(user);
  }).catch(function(user){
      res.send(err);
  })
}
function groupBy(req, res, next){
    var query = req.query;
    console.log(query);
    var groupBy = query ? query.groupBy : "_id";
    // var match = query ? query.match: "_id";
 
    userController.groupBy(groupBy)
    .then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    })
}