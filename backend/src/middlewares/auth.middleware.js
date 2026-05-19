const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config/config")
const blacklistTokenModel = require("../models/blacklist.models")

async function authUser(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            messege:"Token not provided"
        })
    }

    //Check if the token is blacklisted
    const isBlackListed = await blacklistTokenModel.findOne({
        token
    })

    if(isBlackListed){
        return res.status(401).json({
            messege:"Invalid token!!"
        })
    }

    try{
        const decoded = jwt.verify(
            token,
            JWT_SECRET
        )

        req.user = decoded
        next()
    }catch(err){
        return res.status(401).json({
            messege:"Invalid token"
        })
    }
}

module.exports = {
    authUser
}