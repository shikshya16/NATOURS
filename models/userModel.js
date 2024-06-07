const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    name : {
        type : String ,
        required : [true , 'Please tell us your Name!']
    } ,

    email : {
        type : String ,
        required : [true , 'Please provide your email!'],
        unique : true,
        lowercase : true,
        validate : [validator.isEmail, 'Please provide a valid email']
    } ,

    photo : String ,

    password : {
        type : String ,
        required : [ true , 'Please provide a password'] ,
        minlength : 8 ,
        select : false
    } ,

    confirmPassword : {
        type : String ,
        required : [ true , 'Please confirm your password!'],
        validate : {
            validator : function(el) {
                return el === this.password ;
            },
            message : 'Passwords are not same!'
        }
    },
    passwordChangedAt : Date
});

userSchema.pre('save', async function(next) {
    //Only run this function if password was actually modified
    if(!this.isModified('password')) return next ();

    //Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 8);

    //Delete the confirm Password field
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.correctPassword = async function(
    candidatePassword, 
    userPassword
) {
    return await bcrypt.compare(candidatePassword , userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(!this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000 , 
            10
);

        return JWTTimestamp < changedTimestamp;
    }
    // false means not changed
   return false ; 
}

const User = mongoose.model('User', userSchema);

module.exports = User ;