const mongoose = require('mongoose')

const UserSchemma = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    // date:{
    //     type: Date,
    //     required: Date.now
    // },
});

const User = mongoose.model('User',UserSchemma)

module.exports = User;  

