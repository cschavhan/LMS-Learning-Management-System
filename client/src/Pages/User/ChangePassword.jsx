import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import HomeLayouts from "../../Layouts/HomeLayouts";
import { useState } from "react";
import { changePassword } from "../../Redux/Slices/authSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setNewPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setNewPassword({
      ...password,
      [name]: value,
    });
  };

  const passwordChange = async (e) => {
    e.preventDefault();
    if (!password.oldPassword || !password.newPassword) {
      toast.error("Please fill all the details...");
      return;
    }

    const res = await dispatch(changePassword(password));
    if (res?.payload?.success) {
      navigate("/login");
    }

    setNewPassword({
      oldPassword: "",
      newPassword: "",
    });
  };

  return (
    <HomeLayouts>
      <div className="min-h-[90vh] flex items-center justify-center">
        <form
          noValidate
          onSubmit={passwordChange}
          className=" flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-2xl text-center font-bold">Change Password</h1>

          {/* new password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="oldPassword"
              className="cursor-pointer font-semibold"
            >
              Old Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter your old password..."
              className="border bg-transparent px-2 py-1"
              id="oldPassword"
              name="oldPassword"
              onChange={handleUserInput}
              value={password.oldPassword}
            />
          </div>

          {/* new password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="newPassword"
              className="cursor-pointer font-semibold"
            >
              New Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter your new password..."
              className="border bg-transparent px-2 py-1"
              id="newPassword"
              name="newPassword"
              onChange={handleUserInput}
              value={password.newPassword}
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-yellow-600 px-2 py-1 font-semibold hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm"
          >
            Change Password
          </button>
        </form>
      </div>
    </HomeLayouts>
  );
}

export default ChangePassword;
