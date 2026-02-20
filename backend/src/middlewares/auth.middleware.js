const jwt = require("jsonwebtoken")

async function authArtist(req,res,next){
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            msg : "Unauthorized ho aap !!"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== "artist"){
            return res.status(403).json({
                msg : "You do not have the permissions !"
            })
        }

        req.user = decoded
        next();

    }catch(err){
        console.error("ERROR : ", err);
    }
}

async function authUser(req,res,next){
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            msg : "Unauthorized"
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== "user" && decoded.role !== "artist"){
            return res.status(403).json({
                msg : "You Don't Have The Access"
            })
        }

        req.user = decoded;
        next();

    }catch(err){
        console.error("ERROR : ", err)
    }

}

module.exports = {
    authArtist,
    authUser
}