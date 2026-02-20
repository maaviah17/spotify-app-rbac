const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

async function registerUser(req,res){
    try{
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
    
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

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
    }catch (error){
    console.error("Registration error:", error);
    return res.status(500).json({
      msg: "Server error during registration"
    });
    }
}

async function loginUser(req,res){

    const {username,email,password} = req.body;

    // the user will either login with (username & pass) OR (email & pass), So : 

    const user = await userModel.findOne({
        $or : [
            {email},
            {username}
        ]
    })

    if(!user){
        return res.status(401).json({
            msg : "Invalid User Credentials !!"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            msg : "Invalid Creds"
        })
    }

    const token = jwt.sign({
        id : user._id,
        role : user.role
    }, process.env.JWT_SECRET,{
        expiresIn : '7d'
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({
        msg : "User Logged in successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        }
    })
}

async function logoutUser(req,res){

    res.clearCookie("token");
    res.status(200).json({
        msg : "User logged out successfully"
    })

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser 
}