import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [8, "Title must be atleast 8 character"],
      maxLength: [59, "Title should be less than 60 character"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [8, "Description must be atleast 8 character"],
      maxLength: [200, "Description should be less than 200 character"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    thumbnail: {
      type: String, // cloudinary url
      required: true,
    },

    lectures: [
      {
        title: String,
        description: String,

        lectureThumbnail: {
          type: String, // cloudinary url-individual image for all lecture
          required: true,
        },
      },
    ],

    numberOfLectures: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
