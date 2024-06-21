import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";
import Singup from "./Pages/Singup";
import Login from "./Pages/Login";
import Denied from "./Pages/Denied";
import RequireAuth from "./Componenats/Auth/RequireAuth";
import Profile from "./Pages/User/Profile";
import EditProfile from "./Pages/User/EditProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/denied" element={<Denied />} />

        <Route path="/signup" element={<Singup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
