const populateDatabase = require('./generate-data');
const mongoose = require('mongoose');
const queries = require('./queries');
const User = require('./models/user.js');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb+srv://Pickup:A81tDdYoW2TOTRRs@pickup.2qdtldr.mongodb.net/?retryWrites=true&w=majority`);
    // await populateDatabase();
}

async function getUsers() {
    const users = await queries.getUsers();
    return users;
}

async function getUserProfile(id) {
    const user = await queries.getUser({_id: id});
    return user;
}

async function checkPassword({email, password}) {
    const user = await queries.getUser({email});
    
    if (user[0].password !== password) {
        return new Error('Wrong Password')
    }

    return user[0];
}

async function createUser(userData) {
    const {firstName, lastName, age, skillLevel, height, email, password, bio, phoneNumber, gender} = userData;
    const newUser = new User({
        firstName,
        lastName,
        age: parseInt(age),
        skillLevel,
        height: parseInt(height),
        email,
        password,
        bio,
        phoneNumber,
        gender
    })

    newUser.save()
    return newUser;
}

async function editUserProfile({ id, updatedFields }) {
    const users = await queries.getUser({_id: id});
    const user = users[0];

    Object.keys(updatedFields).forEach((name) => {
        const value = updatedFields[name];
        user[name] = value
    })

    user.save();
    return user;
}


module.exports = {
    getUsers: getUsers,
    editUserProfile: editUserProfile,
    getUserProfile: getUserProfile,
    createUser: createUser,
    checkPassword: checkPassword
}
