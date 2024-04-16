const mongoose = require("mongoose")



//schema defind mongoose se

const userSchema = new mongoose.Schema({
    //key value pair
    username: {
        type: String,
        max: 50,
        required: true,
    },
    emailId: {
        type: String,
        max: 50,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        max: 10,
        required: true,
        unique: true
    },
    password: {
        type: String,
        max: 50,
        required: true,
    },
    gender: {
        type: String,
        max: 50,
        required: true
    },
    address: {
        type: String,
        max: 50
    },
    profilePic: {
        type: String,
        defult: ""
    },
    coverPic: {
        type: String,
        defult: ""
    },
    follower: {
        type: Array,
        defult: []
    },
    following: {
        type: Array,
        defult: []
    }
}, { timestamps: true }
);



module.exports = mongoose.model("User", userSchema)