import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors())

import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts",postRouter)


export default app;