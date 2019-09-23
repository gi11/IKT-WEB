var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 12;

//User Schema definition
const UserSchema = new Schema({
    username : {
        type: String,
        unique: true,
        required: true
    },
    hash : String,
});

UserSchema.methods.setPassword = async function(password){
    let hash = await bcrypt.hash(password, saltRounds);
    this.hash = hash
};

UserSchema.methods.validatePassword =function(password){
    bcrypt.compare(password, this.hash).then( function (res){
        if (res)
            return true;
        else
            return false;
    });
};

mongoose.model('User', UserSchema, 'Users');
