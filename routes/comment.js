const router = require("express").Router()
const Comment = require("../models/comment")

//add comment 

router.post("/add", async (req, res) => {
    try {
        const newcomment = await new Comment({
            commment: req.body.comment,
            userId: req.body.userId,
            username: req.body.username,
            postId: req.body.postId
        })

        await newcomment.save();
        res.status(200).json({ status: true, message: "Comment Added SuccesFuly", post: newcomment })

    } catch (error) {
        res.status(500).json({ status: false, message: error })
    }
})

//delete comment 

router.delete("/delete/:id", async (req, res) => {

    try {
        const user = await Comment.findById({ _id: req.params.id });

        if (user) {
            Comment.findByIdAndDelete({ _id: req.params.id }).then(() => {
                res.status(200).json({ status: true, message: "comment Delelted Found" })
            })
        } else {
            res.status(200).json({ status: false, message: "comment Not Found" })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "error", errormessage: error })
    }
})

//get all Comment 

router.get("/get/:id", async (req, res) => {
    try {
        const user = await Comment.find({ userId: req.params.id })
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

//update comment 

router.put("/update/:id", async (req, res) => {
    try {
        const update = await Comment.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })

        if (update) {
            res.status(200).json({ status: true, message: "Comment Update Succesfully", json: update })
        }

    } catch (error) {
        res.status(500).json({ status: false, message: "Comment Not Update ", json: error })
    }
})

module.exports = router