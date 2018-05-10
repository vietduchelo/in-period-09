var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: 1
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        require: false
        
    },
    sex: {
        type: String,
        require: true
    }

});
// chong trung username
// userSchema.index({username: 1}, {unique: 1});
var User = mongoose.model('users', userSchema);

module.exports = User;