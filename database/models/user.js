const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    skillLevel: String,
    height: Number,
    email: String,
    password: String,
    bio: String,
    phoneNumber: String,
    gender: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;