import express from "express";
import dotenv from "dotenv";
import { router as ContactRouter } from "./routes/ContactsRoutes.mjs";
import { router as UserRouter } from "./routes/UserRoutes.mjs";
import ErrorHandler from "./middleware/ErrorHandler.mjs";
import ConnectDB from "./config/DbConnection.mjs";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
// DB CONNECTION
ConnectDB();

// JSON BODY PARSER
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/contacts", ContactRouter); // CONTACT ROUTES
app.use("/api/user", UserRouter); // USER ROUTES

// ERROR HANDLER MIDDLEWARE
app.use(ErrorHandler);

// SERVER STARTING
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});
