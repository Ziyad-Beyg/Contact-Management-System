// jab me apnay project me mondoDB use karunga tu har operation par mongoDB mujhe 1 promise return karega, jisko me async await se handle karunga. Isiliye mene saray functions ko async function me convrt kar diya he aur me ye baat janta hun k jab me async await use karta hun tu error handling k liye mujhe "try/catch()" use karna padega. tu bajaye iske k me har 1 function pe jaakar try/catch() likhun mene use kia he "expressAsyncHandler". Iski khaas baat ye he k aap isko jis bhi async function k upar wrap kardogay tu ye us function ki exception ko khud crater karega. Matlab apko extensively sab pe try/catch() nae lagana he, agar kahin error ata he tu ye khud usko apkay "errorHandler" middleware pe throw kardega
import expressAsyncHandler from "express-async-handler";
import { ContactModel } from "../models/ContactModel.mjs";

// @desc Get ALL CONTACTS
// @route GET /api/contacts
// @access private

const getAllContacts = expressAsyncHandler(async (req, res) => {
  const allContacts = await ContactModel.find({ user_id: req.user.id });
  res.json(allContacts);
});

// @desc Create One Contact
// @route POST /api/contacts
// @access private

const createNewContacts = expressAsyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    console.log("No Data Found In Body");
    res.status(400);
    throw new Error("ALL FIELDS ARE REQUIRED");
  }
  const newContact = await ContactModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  console.log("The Data From Request Body:", req.body);
  res.status(201).json(newContact);
});

// @desc Get One Contact
// @route GET /api/contacts/:id
// @access private

const getOneContact = expressAsyncHandler(async (req, res) => {
  const getOneContact = await ContactModel.findById(req.params.id);
  if (!getOneContact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(getOneContact);
});

// @desc Update One Contact
// @route PUT /api/contacts/:id
// @access private

const updateOneContact = expressAsyncHandler(async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Users can not update other users contacts");
  }

  const updatedContact = await ContactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc Delete One Contact
// @route DELETE /api/contacts/:id
// @access private

const deleteOneContact = expressAsyncHandler(async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Users can not delete other users contacts");
  }

  const deletedContact = await ContactModel.deleteOne({ _id: req.params.id });
  res.status(200).json(`DELETE ONE CONTACT`);
});

export {
  getAllContacts,
  createNewContacts,
  getOneContact,
  updateOneContact,
  deleteOneContact,
};
