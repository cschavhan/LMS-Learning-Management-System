import Contact from "../models/contact.model.js";
import AppError from "../utils/error.utils.js";

export const createContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return next(new AppError("All fields are required", 400));
    }

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    if (!contact) {
      return next(
        new AppError("Failed to create contact, please try again.", 400)
      );
    }

    await contact.save();
    res.status(201).json({
      success: true,
      message: "Contact create successfully",
      contact,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
