import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [5, "Name must be at least 5 character"],
      maxLength: [50, "Name should be less than 50 character"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      minLength: [5, "Message must be at least 5 character"],
      maxLength: [250, "Name should be less than 50 character"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
