import React from "react";
import {Link,  useNavigate} from 'react-router-dom'
import {ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, HomeIcon, PencilSquareIcon, UserIcon} from '@heroicons/react/24/outline'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Footer from "./Footer";

const Sidebar = ({ active, setActive, showSideBar }) => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <>
      {/* desktop */}
      <div className="h-screen bg-color-gray-400 w-full font-Josefin relative lg:block hidden">
        {/* logo */}
        <Link to="/">
          <h1 className="font-Unbounded font-bold mt-6 mb-5 px-6 text-color-gray-100 xl:text-4xl lg:text-3xl md:text-2xl text-xl">
            MyBlog
          </h1>
        </Link>

        {/* links */}
        <ul className="mt-8 flex flex-col gap-2 ">
          <li
            className={`px-6 py-3 text-color-gray-100 flex items-center gap-2 hover:bg-color-gray-100 hover:text-color-gray-400 hover:border-l-4 hover:border-l-color-gray-300 duration-300 ease-in cursor-pointer ${
              active === "home"
                ? "bg-color-gray-100 text-color-gray-400 border-l-4 border-l-color-gray-300"
                : ""
            }`}
            onClick={() => setActive("home")}
          >
            <HomeIcon
              className="w-6"
              style={{ color: active === "home" ? "#34382c" : "" }}
            />
            <Link
              to="/"
              className={`lg:text-lg text-base tracking-wide ${
                active === "home" ? "text-color-gray-400" : ""
              }`}
            >
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li className="px-6 py-3 text-color-gray-100 flex items-center gap-2 hover:bg-color-gray-100 hover:text-color-gray-400 hover:border-l-4 hover:border-l-color-gray-300 duration-300 ease-in cursor-pointer">
                <UserIcon className="w-6" />
                <span>Hi, {user.displayName}</span>
              </li>
              <li
                className={`px-6 py-3 text-color-gray-100 flex items-center gap-2 hover:bg-color-gray-100 hover:text-color-gray-400 hover:border-l-4 hover:border-l-color-gray-300 duration-300 ease-in cursor-pointer ${
                  active === "create"
                    ? "bg-color-gray-100  border-l-4 border-l-color-gray-300"
                    : ""
                }`}
                onClick={() => setActive("create")}
              >
                <PencilSquareIcon
                  className="w-6"
                  style={{ color: active === "create" ? "#34382c" : "" }}
                />
                <Link
                  to="/createPage"
                  className={`lg:text-lg text-base tracking-wide ${
                    active === "create" ? "text-color-gray-400" : ""
                  }`}
                >
                  Create
                </Link>
              </li>
              <li
                className={`px-6 py-3 text-color-gray-100 flex items-center  gap-2 hover:bg-color-gray-100 hover:text-color-gray-400 hover:border-l-4 hover:border-l-color-gray-300 duration-300 ease-in cursor-pointer ${
                  active === "logout"
                    ? "bg-color-gray-100  border-l-4 border-l-color-gray-300"
                    : ""
                }`}
                onClick={() => setActive("logout")}
              >
                <ArrowLeftOnRectangleIcon
                  className="w-6"
                  style={{ color: active === "logout" ? "#34382c" : "" }}
                />
                <span
                  className={`lg:text-lg text-base tracking-wide ${
                    active === "logout" ? "text-color-gray-400" : ""
                  }`}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </li>
            </>
          ) : (
            <li
              className={`px-6 py-3 text-color-gray-100 flex items-center gap-2 hover:bg-color-gray-100 hover:text-color-gray-400 hover:border-l-4 hover:border-l-color-gray-300 duration-300 ease-in cursor-pointer ${
                active === "login"
                  ? "bg-color-gray-100  border-l-4 border-l-color-gray-300"
                  : ""
              }`}
              onClick={() => setActive("login")}
            >
              <ArrowRightOnRectangleIcon
                className="w-6"
                style={{ color: active === "login" ? "#34382c" : "" }}
              />
              <Link
                to="/login"
                className={`lg:text-lg text-base tracking-wide ${
                  active === "login" ? "text-color-gray-400" : ""
                }`}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
        <Footer />
      </div>

      {/* mobile */}
      <div
        className={`hide-scroll ${showSideBar ? "sidebar active" : "sidebar"}`}
      >
        {/* logo */}
        <Link to="/">
          <h1 className="font-Unbounded font-bold mt-6 mb-5 px-6 text-color-gray-100 xl:text-4xl lg:text-3xl md:text-2xl text-xl">
            MyBlog
          </h1>
        </Link>

        {/* links */}
        <ul className="mt-8 flex flex-col gap-2 ">
          <li
            className={`px-6 py-3 text-color-gray-100 flex items-center gap-2 hover:bg-color-gray-100 hover:text-color-gray-400 hover:border-l-4 hover:border-l-color-gray-300 duration-300 ease-in cursor-pointer ${
              active === "home"
                ? "bg-color-gray-100 text-color-gray-400 border-l-4 border-l-color-gray-300"
                : ""
            }`}
            onClick={() => setActive("home")}
          >
            <HomeIcon
              className="w-6"
              style={{ color: active === "home" ? "#34382c" : "" }}
            />
            <Link
              to="/"
              className={`lg:text-lg text-base tracking-wide ${
                active === "home" ? "text-color-gray-400" : ""
              }`}
            >
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li className="px-6 py-3 text-color-gray-100 flex items-center gap-2 hover:bg-color-gray-100 hover:text-color-gray-400 hover:border-l-4 hover:border-l-color-gray-300 duration-300 ease-in cursor-pointer">
                <UserIcon className="w-6" />
                <span>Hi, {user.displayName}</span>
              </li>
              <li
                className={`px-6 py-3 text-color-gray-100 flex items-center gap-2 hover:bg-color-gray-100 hover:text-color-gray-400 hover:border-l-4 hover:border-l-color-gray-300 duration-300 ease-in cursor-pointer ${
                  active === "create"
                    ? "bg-color-gray-100  border-l-4 border-l-color-gray-300"
                    : ""
                }`}
                onClick={() => setActive("create")}
              >
                <PencilSquareIcon
                  className="w-6"
                  style={{ color: active === "create" ? "#34382c" : "" }}
                />
                <Link
                  to="/createPage"
                  className={`lg:text-lg text-base tracking-wide ${
                    active === "create" ? "text-color-gray-400" : ""
                  }`}
                >
                  Create
                </Link>
              </li>
              <li
                className={`px-6 py-3 text-color-gray-100 flex items-center  gap-2 hover:bg-color-gray-100 hover:text-color-gray-400 hover:border-l-4 hover:border-l-color-gray-300 duration-300 ease-in cursor-pointer ${
                  active === "logout"
                    ? "bg-color-gray-100  border-l-4 border-l-color-gray-300"
                    : ""
                }`}
                onClick={() => setActive("logout")}
              >
                <ArrowLeftOnRectangleIcon
                  className="w-6"
                  style={{ color: active === "logout" ? "#34382c" : "" }}
                />
                <span
                  className={`lg:text-lg text-base tracking-wide ${
                    active === "logout" ? "text-color-gray-400" : ""
                  }`}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </li>
            </>
          ) : (
            <li
              className={`px-6 py-3 text-color-gray-100 flex items-center gap-2 hover:bg-color-gray-100 hover:text-color-gray-400 hover:border-l-4 hover:border-l-color-gray-300 duration-300 ease-in cursor-pointer ${
                active === "login"
                  ? "bg-color-gray-100  border-l-4 border-l-color-gray-300"
                  : ""
              }`}
              onClick={() => setActive("login")}
            >
              <ArrowRightOnRectangleIcon
                className="w-6"
                style={{ color: active === "login" ? "#34382c" : "" }}
              />
              <Link
                to="/login"
                className={`lg:text-lg text-base tracking-wide ${
                  active === "login" ? "text-color-gray-400" : ""
                }`}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default Sidebar;
