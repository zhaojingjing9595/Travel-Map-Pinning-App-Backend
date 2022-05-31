import { Router } from "express";
import usersController from "../controllers/usersController.js";

const userRouter = Router();

userRouter.route("/register").post(usersController.signUp);

userRouter.route("/login").post(usersController.login);



export default userRouter;
