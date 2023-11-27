import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { HiShoppingCart } from "react-icons/hi";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/Ai";
import { TfiClose } from "react-icons/tfi";
import { BsFillBagCheckFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { useState } from "react";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subtotal,
}) => {
  const [dropdown, setDropdown] = useState(false);
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
    <div className=" flex flex-col md:flex-row md:justify-normal justify-center items-center py-2 shadow-xl sticky top-0 bg-white z-10">
      <div className="logo mr-auto md:mx-5">
        <Link href={"/"}>
          <Image width={200} height={25} src="/textlogo.png" alt=" "></Image>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex  items-center space-x-4 font-bold md:text-xl ">
          <Link href={"/necklace"}>
            <li className="hover:text-indigo-300">Necklace</li>
          </Link>
          <Link href={"/rings"}>
            <li className="hover:text-indigo-300">Rings</li>
          </Link>
          <Link href={"/bangles"}>
            <li className="hover:text-indigo-300">Bangles</li>
          </Link>
        </ul>
      </div>
      <div className=" cursor-pointer items-center cart absolute right-0 top-9 mx-5 flex ">
        <span
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
          {dropdown && (
            <div className="rounded-md w-36 px-5 bg-gradient-to-t from-black via-gray-600 to-black text-white absolute right-20 top-3">
              <ul className="text-gradient bg-gradient-to-l from-emerald-300 to-white text-transparent bg-clip-text font-mono py-4">
                <Link href={"/myaccount"}>
                  <li className="hover:text-gray-100 border border-pink-300 rounded p-2 py-3 mb-2 hover:border-pink-500">
                    Account
                  </li>
                </Link>
                <Link href={"/orders"}>
                  <li className="hover:text-gray-100 border border-blue-300 rounded p-2 py-3 mb-2 hover:border-blue-500">
                    Orders
                  </li>
                </Link>
                <li
                  onClick={logout}
                  className="hover:text-gray-100 border border-gray-300 rounded p-2 py-3 hover:border-gray-500"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          {user.value && (
            <VscAccount className="text-xl md:text-4xl mx-2"></VscAccount>
          )}
        </span>
        {!user.value && (
          <Link href="/login">
            <button className="bg-gradient-to-t from-black via-gray-700 to-black text-white mx-2 px-4 py-2 rounded sm:px-2 sm:py-1">
              Login
            </button>
          </Link>
        )}
        <HiShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-4xl "
        ></HiShoppingCart>
      </div>

      <div
        ref={ref}
        className=" w-72 h-[100vh] overflow-y-scroll sideCart absolute top-0 right-0 px-8 py-10 bg-gradient-to-t from-black via-gray-600 to-black text-white transform transition-transform translate-x-full"
      >
        <h1 className="font-bold text-xl  text-gradient bg-gradient-to-r to-black from-white text-transparent bg-clip-text">
          Shopping cart
        </h1>
        <span
          onClick={toggleCart}
          className="absolute top-4 right-3 cursor-pointer text-2xl "
        >
          <TfiClose className="bg-gradient-to-r from-black via-gray-400 to-black text-white" />
        </span>
        <ol className="font-semibold text-white list-decimal">
          {Object.keys(cart).length === 0 ? (
            <div className="my-4 font-semibold text-gradient bg-gradient-to-r to-black from-white text-transparent bg-clip-text">
              There are no items in the cart
            </div>
          ) : (
            Object.keys(cart).map((k) => (
              <li key={k}>
                <div className="item flex my-3">
                  <div className="w-2/3 text-gradient bg-gradient-to-r to-black from-white text-transparent bg-clip-text">
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="w-1/3 flex items-center justify-center">
                    <AiOutlineMinusCircle
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
                      className="mx-1 cursor-pointer"
                    />
                    <div className="text-gradient bg-gradient-to-tl to-black from-white text-transparent bg-clip-text">
                      {cart[k].qty}
                    </div>
                    <AiOutlinePlusCircle
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
                      className="mx-1 cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            ))
          )}
        </ol>
        <div className="total font-bold my-2">
          <p className="text-gradient bg-gradient-to-r to-black from-white text-transparent bg-clip-text">
            subtotal: ${subtotal}
          </p>
        </div>

        <div className="flex">
          <Link href={"/checkout"}>
            <button
              disabled={Object.keys(cart).length === 0}
              className="flex  disabled:bg-gray-300 bg-gradient-to-t from-black via-transparent to-black text-white border-0 py-2 px-2 mr-2 focus:outline-none  rounded text-sm"
            >
              <BsFillBagCheckFill className="m-1" />
              checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            disabled={Object.keys(cart).length === 0}
            className="disabled:bg-gray-300 flex bg-gradient-to-t from-black via-transparent to-black text-white border-0 py-2 px-2 mr-2 focus:outline-none  rounded text-sm"
          >
            clearCart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
