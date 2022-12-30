import React from "react";
import { Link } from "react-router-dom";
import notFound from '../assets/images/not-found.png'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-6">
      <img src={notFound} alt="not found" />
      <div className="text-center">
        <p className="text-color-gray-400 font-medium">Oops page not found</p>
        <Link to="/" className="lg:hidden block text-color-gray-400 hover:underline underline-offset-4 duration-200">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
