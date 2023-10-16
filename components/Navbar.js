import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { HiShoppingCart } from "react-icons/hi";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/Ai";
import { TfiClose } from "react-icons/tfi";
import { BsFillBagCheckFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subtotal }) => {
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
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image width={200} height={25} src="/textlogo.png" alt=" "></Image>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex  items-center space-x-4 font-bold md:text-xl ">
          <Link href={"/necklace"}>
            <li className="hover:text-gray-500">Necklace</li>
          </Link>
          <Link href={"/rings"}>
            <li className="hover:text-gray-500">Rings</li>
          </Link>
          <Link href={"/bangles"}>
            <li className="hover:text-gray-500">Bangles</li>
          </Link>
        </ul>
      </div>
      <div className=" cursor-pointer cart absolute right-0 top-9 mx-5 flex ">
        <Link href={"/login"}>
          <VscAccount className="text-xl md:text-4xl mx-2"></VscAccount>
        </Link>
        <HiShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-4xl "
        ></HiShoppingCart>
      </div>
      <div
        ref={ref}
        className=" w-72 h-[100vh] sideCart absolute top-0 right-0 px-8 py-10 bg-purple-200  transform transition-transform translate-x-full"
      >
        <h1 className="font-bold text-xl">Shopping cart</h1>
        <span
          onClick={toggleCart}
          className="absolute top-4 right-3 cursor-pointer text-2xl "
        >
          <TfiClose />
        </span>
        <ol className="font-semibold list-decimal">
          {Object.keys(cart).length === 0 ? (
            <div className="my-4 font-semibold">
              There are no items in the cart
            </div>
          ) : (
            Object.keys(cart).map((k) => (
              <li key={k}>
                <div className="item flex my-3">
                  <div className="w-2/3">
                    {cart[k].name}
                    {/* ({cart[k].size}/{cart[k].variant}) */}
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
                    {cart[k].qty}
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
        <div className="total font-bold my-2">subtotal:${subtotal}</div>

        <div className="flex">
          <Link href={"/checkout"}>
            <button className="flex  text-white bg-slate-400 border-0 py-2 px-2 mr-2 focus:outline-none hover:bg-slate-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" />
              checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex  text-white bg-slate-400 border-0 py-2 px-2 mr-2 focus:outline-none hover:bg-slate-600 rounded text-sm"
          >
            clearCart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
