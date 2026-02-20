const mongoose = require("mongoose")

const musicSchema = new mongoose.Schema({
    audioUrl : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    artist : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    duration:{
        type : Number,
        default : 0,
    }
})

const musicModel = mongoose.model("music", musicSchema)
module.exports = musicModel;