const User = require('../repository/userRepository')
const bcrypt = require('bcrypt')

async function login(username, password){
    const getUser = await User.getUser(username);
    
    if(!getUser) throw new Error('Invalid Username');

    const checkPassword = await bcrypt.compare(password, getUser.password)

    if(!checkPassword) throw new Error('Invalid Password')

    return true;

}

module.exports = {login};