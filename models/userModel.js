const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userID: { type: String, required: true },
    userEmail: { type: String, required: true }, 
    userName: { type: String, required: true }, 
    userHashedPassword: { type: String, required: true },
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;


