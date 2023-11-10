import express from "express";
import {
  getAllContacts,
  createNewContacts,
  getOneContact,
  updateOneContact,
  deleteOneContact,
} from "../controllers/ContactController.mjs";
import ValidateToken from "../middleware/ValidateTokenHandler.mjs";

export const router = express.Router();

router.use(ValidateToken);
router.route("/").get(getAllContacts).post(createNewContacts);

router
  .route("/:id")
  .get(getOneContact)
  .put(updateOneContact)
  .delete(deleteOneContact);
