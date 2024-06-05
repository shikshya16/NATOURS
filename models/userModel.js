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
        minlength : 8 
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
    } 
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

const User = mongoose.model('User', userSchema);

module.exports = User ;