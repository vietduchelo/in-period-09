var User = require('./../models/user.model');

module.exports = {
    create: create,
    findById: findById,
    findOne : findOne,
    findAll : findAll,
    updateByCondition: updateByCondition,
    deleteById : deleteById
}

function create(model) {
    var user = new User(model);
    return user.save();

}
function findById(id) {
    {
        return User.findById(id);
    }
}
function findAll(condition) {
    var where = condition ? condition : {};
    return User.findAll(condition);
}
function findOne(condition) {
    return User.findOne(condition,'name'); // projection : 'name ...'
}
function updateById(id, userModel) {
    return User.findByIdAndUpdate(id, userModel);
}
function updateByCondition(condition, userModel) {
    return User.findOneAndUpdate(condition, userModel);
}

function deleteById(id) {
    return User.findByIdAndRemove(id);
}
function count(condition) {
    if(condition){
        return count(condition);
    }
    return User.count({});
}
function groupByAndTotal(groupBy){
    return User.aggregate({$group: {_id: '$'+groupBy, total: {$sum: $age}}})
}
