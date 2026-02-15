const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

async function registerUser(req,res){

    const {username, email , password,role} = req.body;

    const existingUser = await userModel.findOne({
        $or : [
            { email },
            { username }
        ]
    })

    if(existingUser){
        return res.status(409).json({
            msg : "User Already Exists !!"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password : hashedPassword,
        role
    })

    const token = jwt.sign(
        {
            id : user._id,
            role : user.role 
        },
        process.env.JWT_SECRET,
        {
            expiresIn : '7d'
        }
    )
    
    res.cookie("token", token)

    return res.status(201).json({
        msg : "User Registered Successfully",
        token : token,
        user : {
            id : user._id,
            email : user.email,
            username : user.username,
            role : user.role
        }
    })
}

module.exports = {
    registerUser
}