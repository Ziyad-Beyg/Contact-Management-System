import { json } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const ValidateToken = expressAsyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not Authorized");
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not Authorized or Token is missing!");
    }
  } else {
    res.status(404);
    throw new Error("Token is missing!");
  }
});

export default ValidateToken;
