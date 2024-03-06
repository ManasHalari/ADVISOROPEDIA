import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const userRouter=Router()

userRouter.route("/register")
    .post(
        upload.fields([
            {
                name: "avatar",
                maxCount: 1
            }, 
        ]),
    registerUser
    )

userRouter.route("/login").post(loginUser)

export default userRouter;