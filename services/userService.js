const User = require("../models/user.js");

async function getUsers() {
  const users = await User.find({});
  return users;
}

async function getUserProfile(id) {
  const user = await User.find({ _id: id });
  return user;
}

async function checkPassword({ email, password }) {
  const user = await User.find({ email: email });

  if (user[0].password !== password) {
    return new Error("Wrong Password");
  }

  return user[0];
}

async function createUser(userData) {
  const {
    firstName,
    lastName,
    age,
    skillLevel,
    height,
    email,
    password,
    bio,
    phoneNumber,
    gender,
    image,
  } = userData;
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
    gender,
    image,
  });

  newUser.save();
  return newUser;
}

async function editUserProfile({ id, updatedFields }) {
  const users = await User.find({ _id: id });
  const user = users[0];

  Object.keys(updatedFields).forEach((name) => {
    const value = updatedFields[name];
    user[name] = value;
  });

  user.save();
  return user;
}

module.exports = {
  getUsers: getUsers,
  editUserProfile: editUserProfile,
  getUserProfile: getUserProfile,
  createUser: createUser,
  checkPassword: checkPassword,
};
