const router = require("express").Router()

const User = require("../models/user")


//register


//bcrypt passowrd for hide and genrate hash # password 
const bcrypt= require("bcrypt")


router.post("/register", async (req, res) => {
    
    try {
        const Salt = await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(req.body.password,Salt)

        const newUser = new User({
            username: req.body.username,
            emailId: req.body.emailId,
            mobile: req.body.mobile,
            password: hashpassword,
            gender: req.body.gender
        })

        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//login 

router.post("/login",async (req,res)=>{
    try {
        const user = await User.findOne({emailId:req.body.emailId})
        if(!user){
            res.status(200).json({status:false,message:"User Not FOund"})
        }
        else{
            const validPassword = await bcrypt.compare(req.body.password,user.password)  //dcrypt
            
            if(validPassword){
            res.status(200).json({status:true,message:"User FOund",json:user})
        }
        else{
            res.status(200).json({status:false,message:"Wrong Password"})
        }
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router