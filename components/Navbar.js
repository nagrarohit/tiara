import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCartPlus, BsCartPlusFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { TfiClose } from "react-icons/tfi";
import { BsFillBagCheckFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { useState } from "react";
import DropdownButton from "./DropdownButton";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subtotal,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className=" flex flex-col md:flex-row md:justify-normal justify-center items-center py-2 shadow-xl sticky top-0  bg-transparent backdrop-blur-md z-10 ">
      <div className="logo mr-auto md:mx-5">
        <Link href={"/"}>
          <Image
            className="bg-transparent"
            width={150}
            height={10}
            src="/Tiara1.png"
            alt=" "
          ></Image>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex  items-center space-x-4 font-bold md:text-xl ">
          <Link href={"/necklace"}>
            <li className=" nav-link">Necklace</li>
          </Link>
          <Link href={"/rings"}>
            <li className="nav-link">Rings</li>
          </Link>
          <Link href={"/bangles"}>
            <li className="nav-link">Bangles</li>
          </Link>
          <DropdownButton />
        </ul>
      </div>
      <div className=" cursor-pointer items-center cart absolute right-0 top-9 mx-5 flex">
        {user.value && (
          <div className="relative inline-block text-left">
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="text-black px-2 py-1 text-4xl"
              type="button"
            >
              <VscAccount />
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
                  <Link href={"/myaccount"}>
                    <li className=" block px-4 py-2 hover:bg-gray-100">
                      My Account
                    </li>
                  </Link>
                  <Link href={"/orders"}>
                    <li className=" block px-4 py-2 hover:bg-gray-100">
                      My Orders
                    </li>
                  </Link>

                  <li
                    onClick={logout}
                    className=" block px-4 py-2 hover:bg-gray-100"
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        {!user.value && (
          <Link href="/login">
            <button className="bg-black hover:bg-indigo-300 hover:text-black text-white mx-2 px-4 py-2 rounded sm:px-2 sm:py-1">
              Login
            </button>
          </Link>
        )}
        {Object.keys(cart).length == 0 && (
          <BsCartPlus
            onClick={toggleCart}
            className="text-xl md:text-4xl hover:text-indigo-300 "
          ></BsCartPlus>
        )}
        {Object.keys(cart).length > 0 && (
          <BsCartPlusFill
            onClick={toggleCart}
            className="text-xl md:text-4xl text-sky-700 "
          ></BsCartPlusFill>
        )}
      </div>

      <div
        ref={ref}
        className=" w-72 h-[100vh] overflow-y-scroll sideCart absolute top-0 right-0 px-8 py-10 bg-gradient-to-r from-gray-100 to-pink-200 text-white transform transition-transform translate-x-full"
      >
        <h1 className="font-bold text-xl  text-black  bg-clip-text">
          Shopping cart
        </h1>
        <span
          onClick={toggleCart}
          className="absolute top-4 right-3 cursor-pointer text-2xl "
        >
          <TfiClose className="text-black" />
        </span>
        <ol className="font-semibold text-black list-decimal">
          {Object.keys(cart).length === 0 ? (
            <div className="my-4 font-semibold text-black bg-clip-text">
              There are no items in the cart
            </div>
          ) : (
            Object.keys(cart).map((k) => (
              <li key={k}>
                <div className="item flex my-3">
                  <div className="w-2/3 text-black bg-clip-text">
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="w-1/3 flex items-center justify-center">
                    <TiMinus
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="mx-1 cursor-pointer "
                    />
                    <div className="text-black bg-clip-text">{cart[k].qty}</div>
                    <FaPlus
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="mx-1 cursor-pointer "
                    />
                  </div>
                </div>
              </li>
            ))
          )}
        </ol>
        <div className="total font-bold my-2">
          <p className="text-black bg-clip-text">subtotal: ${subtotal}</p>
        </div>

        <div className="flex">
          <Link href={"/checkout"}>
            <button
              disabled={Object.keys(cart).length === 0}
              className="flex py-2 px-2 mr-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-gray-600 focus:outline-none hover:text-white border-2 border-gray-500  hover:border-gray-900  my-awesome-button rounded-md"
            >
              <BsFillBagCheckFill className="m-1" />
              checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            disabled={Object.keys(cart).length === 0}
            className="disabled:bg-gray-400 disabled:cursor-not-allowed flex py-2 px-2 mr-2  text-gray-600 focus:outline-none hover:text-white border-2 border-gray-500  hover:border-gray-900  my-awesome-button rounded-md"
          >
            clearCart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
