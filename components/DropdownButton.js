import Link from "next/link";
import { useState } from "react";

const DropdownButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-black font-bold md:text-xl rounded-lg text-sm px-3 py-1 text-center inline-flex items-center hover:text-white border border-gray-300 hover:border-gray-900 transition-all hover:bg-gray-700 duration-300"
        type="button"
      >
        More{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="dropdown"
          className="z-10 absolute right-0 mt-4 w-44 bg-gradient-to-br from-white to-pink-200 divide-y divide-gray-100 rounded-lg shadow"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            <Link href={"/glasses"}>
              <li className=" block px-4 py-2 hover:bg-gray-100">Glasses</li>
            </Link>
            <Link href={"/bags"}>
              <li className=" block px-4 py-2 hover:bg-gray-100">Bags</li>
            </Link>
            <Link href={"/cufflinks"}>
              <li className=" block px-4 py-2 hover:bg-gray-100">Cufflinks</li>
            </Link>
            <Link href={"/earings"}>
              <li className=" block px-4 py-2 hover:bg-gray-100">Earings</li>
            </Link>
            <Link href={"/watches"}>
              <li className=" block px-4 py-2 hover:bg-gray-100">Watches</li>
            </Link>
            <Link href={"/hairclips"}>
              <li className=" block px-4 py-2 hover:bg-gray-100">Hairclips</li>
            </Link>
            <Link href={"/perfumes"}>
              <li className=" block px-4 py-2 hover:bg-gray-100">Perfumes</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
