import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
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

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 character"],
      select: false,
    },

    avatar: {
      type: String, // cloudinary url
      required: true,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    subscription: {
      id: String,
      status: String,
    },

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods = {
  generateJwtToken: function () {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },

  comparePassword: async function (plainTextPassword) {
    return await bcryptjs.compare(plainTextPassword, this.password);
  },
};

const User = mongoose.model("User", userSchema);
export default User;
