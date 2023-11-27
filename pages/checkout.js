import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/Ai";
import Link from "next/link";
import { BsFillBagCheckFill } from "react-icons/bs";
import Head from "next/head";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = ({ cart, clearCart, subtotal, addToCart, removeFromCart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  /** Pending Work;-state and city must be populated automatically after the user enters a reachable && valid pincode --DONE */
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    if (
      name.length > 3 &&
      email.length > 3 &&
      address.length > 3 &&
      phone.length > 3 &&
      pincode.length > 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, phone, pincode, address]);

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));

    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.token);
    }
  }, []);

  const fetchData = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    setName(res.name);
    setAddress(res.address);
    setPhone(res.phone);
  };

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        if (Object.keys(pinJson).includes(e.target.value)) {
          setCity(pinJson[e.target.value][0]);
          setState(pinJson[e.target.value][1]);
        } else {
          setState("");
          setCity("");
        }
      } else {
        setState("");
        setCity("");
      }
    }
  };
  const intiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    const data = {
      cart,
      subtotal,
      oid,
      email: email,
      name,
      address,
      pincode,
      phone,
    };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let txnRes = await a.json();
    if (txnRes.success) {
      let txnToken = txnRes.txnToken;
      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: oid,
          token: txnToken /* update token value */,
          tokenType: "TXN_TOKEN",
          amount: subtotal /* update amount */,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
        },
      };

      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    } else {
      console.log(txnRes.error);
      if (txnRes.cartClear) {
        clearCart();
      }

      toast.error(txnRes.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className=" px-5 py-24 mx-auto  checkout-container shadow-lg  ">
      <img src="/payment.svg" alt="background" className="background-img" />
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0 user-scalable=0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        crossorigin="anonymous"
      ></Script>

      <h1 className="font-bold text-center my-8 text-xl">checkout</h1>
      <h2 className="font-bold mx-6 my-4  text-xl">Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-black-600">
              name
            </label>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-black-600">
              Email
            </label>
            {user && user.token ? (
              <input
                value={user.email}
                readOnly
                type="email"
                id="email"
                name="email"
                className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            ) : (
              <input
                onChange={handleChange}
                value={email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            )}
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className=" mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-black-600">
            address
          </label>
          <textarea
            onChange={handleChange}
            value={address}
            id="address"
            name="address"
            className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-black-600">
              Phone
            </label>
            <input
              onChange={handleChange}
              value={phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-black-600"
            >
              Pincode
            </label>
            <input
              onChange={handleChange}
              placeholder="Enter 6 Digit Pincode"
              value={pincode}
              type="number"
              id="pincode"
              name="pincode"
              className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-black-600">
              State
            </label>
            <input
              onChange={handleChange}
              placeholder="fetched from pincode"
              value={state}
              type="text"
              id="state"
              name="state"
              className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-black-600">
              city
            </label>
            <input
              value={city}
              onChange={handleChange}
              placeholder="fetched from pincode"
              type="text"
              id="city"
              name="city"
              className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <h2 className="font-bold mx-6 my-4 text-xl  ">
        Review Cart items & Proceed to payment
      </h2>
      <div className=" sideCart px-8 py-10 bg-transparent text-black m-3 rounded border border-gray-300  ">
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
          <button
            onClick={intiatePayment}
            disabled={disabled}
            className=" disabled:bg-gray-300 flex  bg-gray-600 text-white border-0 py-2 px-2 mr-2 focus:outline-none hover:bg-indigo-300 rounded text-sm"
          >
            <BsFillBagCheckFill className="m-1" />
            Pay ${subtotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
