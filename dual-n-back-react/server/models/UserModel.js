
const jwt = require('jsonwebtoken');
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const saltRounds = 12;

//User Schema definition
let UserSchema = new Schema({
    username : {
        type: String,
        unique: true,
        required: true
    },
    hash : String,
});

UserSchema.methods.setPassword = function(password){
    
    this.hash = bcrypt.hashSync(password, saltRounds);
    // .then(function (hash) {
    //     this.hash = hash;
    // });=
    
};

UserSchema.methods.validPassword =function(password){
    result = bcrypt.compareSync(password, this.hash);
    if (result)
        return true;
    else
        return false;
};

UserSchema.methods.generateJwt = function () {
    let expire = new Date();
    expire.setDate(expire.getDate() + 7000);

    const token = jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expire.getTime() / 1000),
    }, process.env.JWT_SECRET);

    console.log(`token is ='${token}'`);
    return token;
};

mongoose.model('User', UserSchema, 'Users');
