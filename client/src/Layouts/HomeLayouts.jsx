import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Componenats/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/authSlice";

function HomeLayouts({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // check user islogged in or not
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  };

  // handle logout
  const handleLogout = async (e) => {
    e.preventDefault();
    //logout the user
    const responce = await dispatch(logout());
    if (responce?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input type="checkbox" className="drawer-toggle" id="my-drawer" />

        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>

          <ul className="menu p-4 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li>
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}

            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/course/create">Create Course</Link>
              </li>
            )}

            <li>
              <Link to="/courses">All Courses</Link>
            </li>

            <li>
              <Link to="/contact">Contact Us</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center gap-1">
                  <button className=" bg-pink-500 px-4 py-1 font-semibold rounded-md w-full text-black">
                    <Link to="/login">Login</Link>
                  </button>

                  <button className="bg-yellow-500 px-4 py-1 font-semibold rounded-md w-full text-black">
                    <Link to="/signup">Sign Up</Link>
                  </button>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center gap-1">
                  <button className="bg-pink-500 px-4 py-1 font-semibold rounded-md w-full text-black">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button className="bg-yellow-500 px-4 py-1 font-semibold rounded-md w-full text-black ">
                    <Link onClick={handleLogout}> Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}

export default HomeLayouts;
