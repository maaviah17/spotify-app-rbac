const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req,res){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            msg : "Unauthorized ho aap"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({
                msg : "You don't have access to create music."
            })
        }

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        audioUrl : result.url,
        title,
        artist : decoded.id,
    })

    res.status(201).json({
        msg : "Music created successfully",
        music : {
            id : music._id,
            audioUrl : music.audioUrl,
            title : music.title,
            artist : music.artist
        }
    })
}catch(err){
        console.error("ERROR : " , err)
        return res.status(401).json({
            msg : "Unauthorized"
        })
    }
}

module.exports = {
    createMusic
}