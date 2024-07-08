import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../Redux/Slices/authSlice";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({
    email: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value,
    });
  };

  const getVerificationLink = async (e) => {
    e.preventDefault();

    if (!email.email) {
      toast.error("Email is required");
      return;
    }

    await dispatch(forgotPassword(email));

    setEmail({
      email: "",
    });
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center">
      <form
        noValidate
        onSubmit={getVerificationLink}
        className="w-96 flex flex-col items-center justify-center gap-5 shadow-[0_0_10px_black] h-96 px-8 rounded-xl text-white py-2"
      >
        <h1 className="text-center font-semibold text-xl">Forget Password</h1>

        <p className="text-start font-medium text-lg">
          Enter your registered email,we will send you a verification link on
          your registered email from which you can reset your password
        </p>

        <input
          className="border bg-transparent px-2 w-full py-1 rounded font-semibold text-lg"
          type="email"
          required
          placeholder="Enter your registered email here"
          name="email"
          id="email"
          value={email.email}
          onChange={handleUserInput}
        />

        <button
          type="submit"
          className=" bg-yellow-500 hover:bg-yellow-600 transition ease-in-out duration-300 w-full py-1 px-2 rounded font-semibold text-xl "
        >
          Get verification link
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="link text-accent font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
