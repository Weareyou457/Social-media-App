const User = require("../models/user")

const router = require("express").Router()

const bcrypt = require("bcrypt")


//UPDATE USER 

router.put("/update/:id", async (req, res) => {
    try {

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        const update = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })

        if (update) {
            res.status(200).json({ status: true, message: "User data Update", json: update })
        }

    } catch (error) {
        res.status(500).json({ status: false, message: "User Not Update", json: error })
    }
})

//DELETE USER

router.delete("/delete/:id", async (req, res) => {

    try {
        const user = await User.findById({ _id: req.params.id });

        if (user) {
            User.findByIdAndDelete({ _id: req.params.id }).then(() => {
                res.status(200).json({ status: true, message: "User Delelted Found" })
            })
        } else {
            res.status(200).json({ status: false, message: "User Not Found" })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "error", errormessage: error })
    }
})

// GET ALL USER 

router.get("/get", (req, res) => {
    User.find().then(users => {
        res.status(200).json({ status: true, message: "User Fetch Sucesfullly", data: users })
    }).catch(error => {
        res.status(500).json({ status: false, message: "no Data", errormessage: error })
    })
})

// GET ONE USER

router.get("/get/:id", async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        if (user) {
            res.status(200).json({ status: true, message: "User Found Succesfully", data: user })
        }
        else {
            res.status(200).json({ status: false, message: "User Not Found" })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "error", errormessage: error })
    }
})


//FOLLOW UNFOLLOW 

router.put("/follow/:id", async (req, res) => {
    try {
        const samnewalasuer = await User.findOne({ _id: req.params.id })
        // const khudka = await User.findOne({ _id: req.body.userId })

        let isfollow = false
        samnewalasuer.following.map(item => {
            if (item == req.paramas.id) {
                isfollow = true;
            }
        })

        if (isfollow == true) {
            const res1 = await User.findByIdAndUpdate({ _id: req.params.id }, { $pull: { follower: req.body.userId } })
            const res2 = await User.findByIdAndUpdate({ _id: req.body.userId }, { $pull: { following: req.params.id } })

            res.status(200).json({ staus: true, message: "You UnFollow This User Now" })
        }
        if(isfollow == false) {
            const res1 = await User.findByIdAndUpdate({ _id: req.params.id }, { $push: { follower: req.body.userId } })
            const res2 = await User.findByIdAndUpdate({ _id: req.body.userId }, { $push: { following: req.params.id } })

            res.status(200).json({ staus: true, message: "You Follow This User Now" })
        }
    } catch (error) {
        res.status(200).json({ staus: false, message: "You Already Following This User", erroro: error })
    }
})



module.exports = router