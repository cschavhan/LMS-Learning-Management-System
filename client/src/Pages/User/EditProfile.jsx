import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/Slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import HomeLayouts from "../../Layouts/HomeLayouts";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setdata] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setdata({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!data.fullName || !data.avatar) {
      toast.error("All fields are required");
    }

    if (data.fullName.length < 5) {
      toast.error("Name can not be less than 5 character");
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile(formData));
    await dispatch(getUserData());
    navigate("/user/profile");
  };

  return (
    <HomeLayouts>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-72 min-h-[15rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>

          <label htmlFor="image_uploads" className="cursor-pointer">
            {data.previewImage ? (
              <img
                src={data.previewImage}
                className="w-28 h-28 rounded-full m-auto"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            className="hidden"
            id="image_uploads"
            name="image_uploads"
            onChange={handleImageUpload}
            accept=".jpg, .jpeg, .png, .svg, "
          />

          <div className="flex flex-col gap-1">
            <label
              htmlFor="fullName"
              className="text-lg font-semibold cursor-pointer"
            >
              Full name:
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              id="fullName"
              value={data.fullName}
              name="fullName"
              onChange={handleInputChange}
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 px-2 py-1 font-semibold rounded "
          >
            Update Profile
          </button>

          <Link to="/user/profile">
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayouts>
  );
}

export default EditProfile;
