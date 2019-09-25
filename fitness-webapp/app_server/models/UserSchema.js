var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
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
    // });
    
};

UserSchema.methods.validPassword =function(password){
    bcrypt.compare(password, this.hash).then( function (res){
        if (res)
            return true;
        else
            return false;
    });
};

mongoose.model('User', UserSchema, 'Users');
