const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
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
    if (!req.body.title) {
        return res.status(400).json({
             msg: "Title required" 
        })
    }
 
    console.log(req.cookies)

    console.log(title);
    const file = req.file;
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)

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


async function createAlbum(req,res){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            msg : "Unauthorized you're !"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== "artist"){
            return res.status(403).json({
                msg : "You Cannot create an album !!"
            })
        }

        const {title, songs} = req.body;
        
        const album = await albumModel.create({
            title,
            songs,
            artist : decoded.id
        })

        res.status(201).json({
            msg : "Album created successfully",
            album : {
                id : album._id,
                title : album.title,
                songs : album.songs,
                artist : album.artist,
            }
        })

    }catch(error){
        console.error("ERROR : ", error);
        return res.status(401).json({
            msg : "there has been an error, please check."
        })
    }

}

module.exports = {
    createMusic,
    createAlbum
}