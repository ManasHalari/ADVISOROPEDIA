import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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
userRouter.route("/logout").post(verifyJWT,  logoutUser)
userRouter.route("/refresh-token").post(refreshAccessToken)

export default userRouter;