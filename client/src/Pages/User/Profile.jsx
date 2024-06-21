import { useDispatch, useSelector } from "react-redux";
import HomeLayouts from "../../Layouts/HomeLayouts";
import { Link } from "react-router-dom";

function Profile() {
  const userData = useSelector((state) => state?.auth?.data);

  return (
    <HomeLayouts>
      <div className="min-h-[90vh] flex justify-center items-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white shadow-[0_0_10px_black] w-[350px]">
          <img
            src={userData?.avatar}
            className="w-40 m-auto rounded-full border border-black"
          />

          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>

          <div className="grid grid-cols-2">
            <p>Email: </p>
            <p>{userData?.email}</p>
            <p>Role: </p>
            <p>{userData?.role}</p>
            <p>Subscription: </p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link
              to="/changepassword"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-1 px-2 cursor-pointer text-center"
            >
              <button>Change Password</button>
            </Link>

            <Link
              to="/user/editprofile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-1 px-2 cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button className="w-full bg-red-600 hover:bg-red-500 py-1 px-1 rounded font-semibold transition-all ease-in-out duration-300">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayouts>
  );
}

export default Profile;
