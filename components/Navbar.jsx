import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-8 max-sm:px-2 border-2 border-indigo-500 bg-indigo-500 bg-opacity-5 rounded-lg">
      <Link
        className="text-white text-3xl max-sm:text-xl font-montserrat font-semibold cursor-pointer "
        href={"/"}
      >
        Movie List
      </Link>

      <Link
        className=" text-white transition drop-shadow-lg rounded-lg px-4 py-2  font-montserrat font-semibold cursor-pointer button-hover"
        href={"/add"}
      >
        Add To List
      </Link>
    </nav>
  );
}

export default Navbar;
