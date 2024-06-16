import { useState } from "react";
import HomeLayouts from "../Layouts/HomeLayouts";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices/authSlice";

function Singup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  // for getting the image
  const getImage = (event) => {
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        console.log(this.result);
        setPreviewImage(this.result);
      });
    }
  };

  // create new account
  const createNewAccount = async (e) => {
    e.preventDefault();

    if (
      !signupData.fullName ||
      !signupData.email ||
      !signupData.password ||
      !signupData.avatar
    ) {
      toast.error("Please fill all the details...");
      return;
    }

    // checking the name
    if (signupData.fullName.length < 5) {
      toast.error("Name shound be atleast 5 character");
      return;
    }

    // for checking the email
    if (
      !signupData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Email is not valid");
      return;
    }

    // for checking the password
    if (
      !signupData.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      toast.error(
        "Password should be atleast 6 to 16 characters long with atleast a number and special character..."
      );
      return;
    }

    // form data
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // dispatch account
    const responce = await dispatch(createAccount(formData));
    console.log(responce);
    if (responce?.payload?.success) {
      navigate("/");
    }

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });

    setPreviewImage("");
  };

  return (
    <HomeLayouts>
      <div className="h-[90vh] flex justify-center items-center">
        <form
          noValidate
          onSubmit={createNewAccount}
          className=" flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-2xl text-center font-bold">Registration Page</h1>

          {/* image upload */}
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>

          <input
            onChange={getImage}
            type="file"
            name="image_uploads"
            id="image_uploads"
            className="hidden"
            accept=".jpg, .jpeg, .png, .svg"
          />

          {/* fullName */}
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="cursor-pointer font-semibold">
              fullName
            </label>
            <input
              type="text"
              required
              placeholder="Enter your fullName..."
              className="border bg-transparent px-2 py-1"
              id="fullName"
              name="fullName"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>

          {/* email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="cursor-pointer font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email..."
              className="border bg-transparent px-2 py-1"
              id="email"
              name="email"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="cursor-pointer font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter your password..."
              className="border bg-transparent px-2 py-1"
              id="password"
              name="password"
              onChange={handleUserInput}
              value={signupData.password}
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-yellow-600 px-2 py-1 font-semibold hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm"
          >
            Create account
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="link text-accent font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayouts>
  );
}

export default Singup;
