const User = require('../model/user');

async function createUser(username, password){

    const newUser = new User({
        username: username,
        password:password
    })

    const savedUser = await newUser.save();
    return savedUser;
}

async function getAllUser(){
    const users = await User.find()
    return users;
}

async function getUser(username){
    const user = await User.findOne({username});
    return user;
}



module.exports = {createUser, getAllUser, getUser}