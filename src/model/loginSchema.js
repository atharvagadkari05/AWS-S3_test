const mongoose = require('mongoose')
const { Schema } = mongoose;

var loginSchema = new mongoose.Schema({
     email: {type:String},
     first_name: {type:String},
     last_name: {type:String},
     password: {type:String},
     age: {type:Number},
     city: {type:String}

});

var Login_model = mongoose.model('user_data',loginSchema);
module.exports = Login_model;