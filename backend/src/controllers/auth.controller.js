const userModel = require("../models/user.model")
const blacklistTokenModel = require("../models/blacklist.models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../config/config")

/**
 * @name registerUserController
 * @description Register a new user, expects username, email and password in the request body 
 * @access Public
 */

async function registerUserController(req, res){
    const {username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(400).messege({
            messege:"Please provide email, username nad password"
        })
    }

    const isAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })


    if(isAlreadyExists){
        return res.status(400).json({
            messege:"Account already exists"
        })
    }

    const saltrounds = 10
    const hashedPassword = await bcrypt.hash(password, saltrounds)

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    //Create a token
    const token = jwt.sign(
        {
            id:user.id,
            username:user.username
        },
        JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    //Save the token in the cookie
    res.cookie("token", token)

    res.status(201).json({
        messege:"User registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email:user.email
        }
    })
}

/**
 * @name loginUserController
 * @description logins a user, expects email and password and generates a token
 * @access Public
 */

async function loginUserController(req, res){
    const {email, password} =  req.body

    const user = await userModel.findOne({
        email
    })

    //Check if the user exists
    if(!user){
        return res.status(400).json({
            messege:"Invalid email and password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            messege:"Invalid credentials"
        })
    }

    //Create token
    const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        JWT_SECRET,
        {
            expiresIn:"1d"
        }
    )

    //Save the token into the cookies
    res.cookie("token", token)

    res.status(200).json({
        messege:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/**
 * @name logoutUserController
 * @description Clears the token from the cookies and blacklists the token
 * @access Public
 */

async function logoutUserController(req, res){
    const token = req.cookies.token

    if(token){
        await blacklistTokenModel.create({
            token
        })
    }

    res.clearCookie("token")
    res.status(200).json({
        messege:"User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description Fetches the user data from the database
 * @access Private
 */

async function getMeController(req, res){
    const user = await userModel.findById(req.user.id)
    return res.status(200).json({
        messege:"User details fetched successfully",
        user:{
            id:user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}