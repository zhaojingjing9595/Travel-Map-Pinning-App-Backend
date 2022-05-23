import { Router } from "express";
import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";

const userRouter = Router();

userRouter.route("/register").post(async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashPassword });
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.route("/login").post(async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName })
        if (!user) {
            res.status(404).send("Wrong username or password!");
        } else { 
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                res.status(404).send("Wrong username or password!");
            } else { 
                res.send({userId:user._id, userName:user.userName});
            }
        }
    

  } catch (error) {
    res.status(500).send(error);
  }
});



export default userRouter;
