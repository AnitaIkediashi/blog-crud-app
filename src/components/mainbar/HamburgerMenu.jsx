import { Bars3Icon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import React from "react";

const HamburgerMenu = ({ setShowSideBar, showSideBar }) => {
  return (
    <motion.div
      className={showSideBar ? "menu-btn active" : "menu-btn"}
      whileHover={{scale: 1.1}}
      onClick={() => {
        setShowSideBar(!showSideBar);
      }}
    >
      <Bars3Icon className="sm:w-6 w-5" />
    </motion.div>
  );
};

export default HamburgerMenu;
