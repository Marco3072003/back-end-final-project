const express = require('express');
const router = express.Router();
const Login = require('../Service/loginService');
const Register = require('../Service/registerService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/register',async(req,res)=>{
    try{
        let {username, password} = req.body;
        const saltRounds = 10;

        if(!username || !password) throw new Error('Insufficient Parameter')

        password = await bcrypt.hash(password, saltRounds);
        console.log(password)

        const registerUsername = await Register.register(username, password);
        res.status(200).json({success:registerUsername})

    }catch(e){
        e.code === 11000 ? res.status(400).json({error: "User has been used" }) :
                    res.status(400).json({error: e.message })
    }

});

router.post('/login',async (req,res)=>{
    try{
        let {username,password} = req.body;

        if(!username || !password) throw new Error('Insufficient Parameter')
        
        const login = await Login.login(username, password)

        if(!login) throw new Error('Failed to login');

        const user = {name : username}
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({accessToken: accessToken, username:username})

    }catch(e){
        res.status(400).json({error : e.message})
    
    }

})

module.exports = router