import { useState } from "react";
import HomeLayouts from "../Layouts/HomeLayouts";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../Redux/Slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // login the user
  const onLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details...");
      return;
    }

    // get the login api
    const res = await dispatch(login(loginData));
    if (res?.payload?.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <HomeLayouts>
      <div className="h-[90vh] flex justify-center items-center">
        <form
          noValidate
          onSubmit={onLogin}
          className=" flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-2xl text-center font-bold">Login Page</h1>

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
              value={loginData.email}
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
              value={loginData.password}
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-yellow-600 px-2 py-1 font-semibold hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm"
          >
            Login
          </button>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="link text-accent font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayouts>
  );
}

export default Login;
