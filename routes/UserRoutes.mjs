import { Router } from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controllers/UserController.mjs";
import ValidateToken from "../middleware/ValidateTokenHandler.mjs";

export const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current-user", ValidateToken, currentUser);
