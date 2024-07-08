import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../Redux/Slices/authSlice";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [password, setNewPassword] = useState({
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setNewPassword({
      ...password,
      [name]: value,
    });
  };

  const passwordReset = async (e) => {
    e.preventDefault();
    if (!password.password) {
      toast.error("Password is required");
      return;
    }

    if (
      !password.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      toast.error(
        "Password should be atleast 6 to 16 characters long with atleast a number and special character..."
      );
      return;
    }

    const res = await dispatch(
      resetPassword({ resetToken, password: password.password })
    );
    if (res?.payload?.success) {
      navigate("/login");
    }

    setNewPassword({
      password: "",
    });
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center">
      <form
        noValidate
        onSubmit={passwordReset}
        className="h-[50%] shadow-[0_0_10px_black] w-[20%] text-white flex flex-col items-center justify-center gap-5 px-2 py-3"
      >
        <h1 className="text-center font-semibold text-xl">Set new password</h1>

        <input
          type="password"
          placeholder="Enter your new password"
          className="border bg-transparent w-full rounded py-1 px-2 cursor-pointer font-medium text-lg"
          name="password"
          id="password"
          value={password.password}
          onChange={handleUserInput}
        />

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 w-full rounded py-1 font-medium text-xl"
        >
          Set Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
