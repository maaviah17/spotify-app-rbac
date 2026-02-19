const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req,res){

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
        artist : req.user.id,
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
}


async function createAlbum(req,res){

        const {title, songs} = req.body;
        
        const album = await albumModel.create({
            title,
            songs,
            artist : req.user.id
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

}


async function getAllMusic(req,res){
    
    const musics = await musicModel.find().populate("artist", "username email")

    res.status(200).json({
        msg : "songs fetched successfully :)",
        songs : musics
    })

}

module.exports = {
    createMusic,
    createAlbum,
    getAllMusic
}