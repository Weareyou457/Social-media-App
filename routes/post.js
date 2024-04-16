const Post = require("../models/post")

const router = require("express").Router()


//add post 

const upload = require("../middleware/upload")

router.post("/add",upload.single("imageUrl"),async (req, res) => {
    try {
        const newpost = new Post(req.body)

        if(req.file){
            newpost.imageUrl =req.file.filename 
               }
        const postsave = await newpost.save();
        if (postsave) {
            res.status(200).json({
                status: true, message: "PoSt added Succesully"
            })
        }
        else {
            res.status(200).json({
                status: false, message: "PoSt not added Succesully"
            })
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// update post 

router.put("/update/:id", async (req, res) => {
    try {
        const userfind = await Post.findById({ _id: req.params.id });

        if (userfind) {
            const post = await Post.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
            res.status(200).json({ status: true, message: "Post Edit Success", data: post })
        }
        else {
            res.status(200).json({ status: false, message: "Post Not FOund" })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error })
    }
})

// delete post 

router.delete("/delete/:id", async (req, res) => {
    try {
        const userfind = await Post.findById({ _id: req.params.id });

        if (userfind) {
            const post = await Post.findByIdAndDelete({ _id: req.params.id })
            res.status(200).json({ status: true, message: "Post delete Success", data: post })
        }
        else {
            res.status(200).json({ status: false, message: "Post Not FOund" })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error })
    }
})

//get by id 

router.get("/get/:id", async (req, res) => {
    try {
        const user = await Post.findById({ _id: req.params.id })
        if (user) {
            res.status(200).json({ status: true, message: "Post Found Succesfully", data: user })
        }
        else {
            res.status(200).json({ status: false, message: "Post Not Found" })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "error", errormessage: error })
    }
})

//get all

router.get("/get", (req, res) => {
    Post.find().then(users => {
        res.status(200).json({ status: true, message: "Post Fetch Sucesfullly", data: users })
    }).catch(error => {
        res.status(500).json({ status: false, message: "no Data", errormessage: error })
    })
})


//get all post of any user

router.get("/getPostUser/:id", async (req, res) => {
    try {
        const user = await Post.find({ userId: req.params.id })
        if (user) {
            res.status(200).json({ status: true, message: "Post Found Succesfully", data: user })
        }
        else {
            res.status(200).json({ status: false, message: "Post Not Found" })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "error", errormessage: error })
    }
})


//LIKE POST 

router.put("/Like/:id",async(req,res)=>{
    try {
        const post = await Post.findOne({_id:req.params.id});

        let islike=false
        post.likes.map(item=>{
            if(item==req.body.userId){
                islike=true;
            }
        })
        if(islike){
            const res1 = await Post.findByIdAndUpdate({ _id: req.params.id }, { $pull: { likes: req.body.userId } })
            res.status(200).json({ staus: true, message: "Like Remove This Post Now" })
        }
        else{
            const res1 = await Post.findByIdAndUpdate({ _id: req.params.id }, { $push: { likes: req.body.userId } })
            res.status(200).json({ staus: true, message: "You Like This Post Now" })
        }
    } catch (error) {
        res.status(500).json({ staus: false, message: error })
    }
})





module.exports = router