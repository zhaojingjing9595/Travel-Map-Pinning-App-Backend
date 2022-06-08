import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
async function signUp(req, res, next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body });
    console.log(newUser);
    newUser.password = hashPassword;
    // const newUser = new User({ ...req.body, password: hashPassword });
    const savedUser = await newUser.save();
    res
      .status(200)
      .send({ userId: savedUser._id, username: savedUser.username });
    next();
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send("Wrong username or password!");
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).send("Wrong username or password!");
      } else {
        res.send({ userId: user._id, username: user.username });
      }
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export default { signUp, login };
