

const User = require('./models/user.js');

function populateDatabase() {
    const me = new User({
        firstName: 'Jialong',
        lastName: 'Lu',
        age: 22,
        skillLevel: 'Beginner',
        height: 177,
        email: 'claudejlu@gmail.com',
        password: '12345',
        bio: 'Beginner hooper looking to play more and learn more about the game',
        phoneNumber: '587-123-523',
        gender: 'Male'
    })
    const mike = new User({
        firstName: 'Mike',
        lastName: 'Smith',
        age: 26,
        skillLevel: 'Advanced',
        height: 190,
        email: 'mike.smith@gmail.com',
        password: 'lebronJames',
        bio: 'Looking to find a team for pickup next Sunday',
        phoneNumber: '123-456-789',
        gender: 'Male'
    });
    const john = new User({
        firstName: 'John',
        lastName: 'Doe',
        age: 18,
        skillLevel: 'Beginner',
        height: 180,
        email: 'john.doe@gmail.com',
        password: '12345',
        bio: 'Looking for hoopers in the downtown area',
        phoneNumber: '354-242-1234',
        gender: 'Male'
    });

    me.save();
    mike.save();
    john.save();
}

module.exports = populateDatabase;