import React from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/Ai";
import Link from "next/Link";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({ cart, subtotal, addToCart, removeFromCart }) => {
  console.log({ subtotal });
  return (
    <div className="container px-5 py-24 mx-auto">
      <h1 className="font-bold text-center my-8 text-xl">checkout</h1>
      <h2 className="font-bold mx-6 my-4 text-xl">Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className=" mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            address
          </label>
          <textarea
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              city
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <h2 className="font-bold mx-6 my-4 text-xl">
        Review Cart items & Proceed to payment
      </h2>
      <div className=" sideCart px-8 py-10 bg-gradient-to-br to-black via-cyan-900 from-white text-black  m-3 rounded-lg">
        <ol className="font-semibold list-decimal">
          {Object.keys(cart).length === 0 ? (
            <div className="my-4 font-semibold ">
              There are no items in the cart
            </div>
          ) : (
            Object.keys(cart).map((k) => (
              <li key={k}>
                <div className="item flex my-3">
                  <div className="w-2/3">
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
        <span className="total font-bold">subtotal:${subtotal}</span>
      </div>
      <div className="mx-3">
        <Link href={"/checkout"}>
          <button className="flex bg-gradient-to-t from-black via-gray-700 to-black text-white border-0 py-2 px-2 mr-2 focus:outline-none hover:bg-slate-600 rounded text-sm">
            <BsFillBagCheckFill className="m-1" />
            Pay ${subtotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
