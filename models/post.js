const mongoose = require("mongoose")


const PostSchema = new mongoose.Schema({
    caption: {
        type: String,
        max: 200
    },
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        defult:""
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
}, { timestamps: true })

module.exports = mongoose.model("Post", PostSchema)