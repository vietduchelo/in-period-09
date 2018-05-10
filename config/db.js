var mongoose = require('mongoose');
module.exports = {
    dbConnect: dbConnect
}
function dbConnect() {
    mongoose.connect('mongodb://nodejsbasic:123@ds119820.mlab.com:19820/nodejsbasic');
}