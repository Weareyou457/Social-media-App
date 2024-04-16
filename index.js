const express = require("express")
const app = express();
const serverless=require("serverless-http")


const morgan = require("morgan")
const helmet = require("helmet")
const bodyParser = require("body-parser");

const dotenv = require("dotenv")
const mongoose = require("mongoose")

const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const PostRouter = require("./routes/post")
const CommentRouter = require("./routes/comment")

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("mongodb Database Connect connected")
})

app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());  //for api Express.js, you need to include middleware like body-parser to parse incoming request bodies. 
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/SocialApp/api/user", userRouter)
app.use("/SocialApp/api/auth", authRouter)
app.use("/SocialApp/api/Post", PostRouter)
app.use("/SocialApp/api/Comment", CommentRouter)

app.listen(8200, () => {
    console.log("app is runnning on port " + 8200)
})

module.exports.handler= serverless(app);