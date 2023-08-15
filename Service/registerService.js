const User = require('../repository/userRepository')

async function register(username, password){
    const getUsers = await User.getAllUser();

    const checkUsername = getUsers.some((user)=>{user.username === username});

    if(checkUsername) throw new Error('Username has been used')

    const savedUser = User.createUser(username, password);

    return savedUser;
}

module.exports = {register}