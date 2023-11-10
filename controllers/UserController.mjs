import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../models/UserModel.mjs";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

// @desc REGISTER A USER
// @route POST /api/user/register
// @acess public

const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are Required!");
  }
  const userAvailable = await UserModel.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already Exist!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("HASHED PASSWORD:", hashedPassword);

  const userCreated = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  if (userCreated) {
    res.status(201).json({ id: userCreated._id, email: userCreated.email });
  } else {
    res.status(400);
    throw new Error("User Data is not Valid!");
  }
});

// @desc LOGIN A USER
// @route POST /api/user/login
// @acess public

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are Required!");
  }
  const user = await UserModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jsonwebtoken.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password!");
  }
});

// @desc CHECK CURRENT USER
// @route GET /api/user/current-user
// @acess private

const currentUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

export { registerUser, loginUser, currentUser };
