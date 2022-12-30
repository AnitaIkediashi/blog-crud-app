import { AnimatePresence } from "framer-motion";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  CreatePage,
  Home,
  NotFound,
  SignIn,
  SignUp,
  SinglePage,
} from "../pages";
import HamburgerMenu from "./mainbar/HamburgerMenu";

const MainBar = ({ setActive, showSideBar, setShowSideBar }) => {
  const location = useLocation();

  return (
    <div className="overflow-y-scroll hide-scroll w-full overflow-x-hidden bg-color-gray-100 px-6 font-Josefin h-screen ">
      <AnimatePresence>
        <HamburgerMenu setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />} />
          <Route
            path="/createPage"
            element={<CreatePage setActive={setActive} />}
          />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn setActive={setActive} />} />
          <Route path="/blog/:id" element={<SinglePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default MainBar;
