import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const myaccount = () => {
  const router = useRouter();

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.token);
    }
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [password, setPassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [user, setUser] = useState({ value: null });

  const handleUserSubmit = async () => {
    let data = { token: user.token, address, name, phone, pincode };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      toast.success("Details Updated Successfully", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handlePasswordSubmit = async () => {
    let data = { token: user.token, password, cpassword, npassword };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      toast.success("Password Updated Successfully", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Something went wrong", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setPassword("");
    setNpassword("");
    setCpassword("");
  };

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
    setPincode(res.pincode);
    setPhone(res.phone);
  };

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    }
  };

  return (
    <div className="container mx-auto my-12 ">
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
      <h1 className=" text-center font-bold text-4xl ">Update Account</h1>
      <div className="mx-auto flex mt-10">
        <div className="px-2 w-1/2 ">
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
              id="Pincode"
              name="pincode"
              className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handleUserSubmit}
          className="  flex  bg-gray-600 text-white border-0 py-2 px-2  focus:outline-none hover:bg-indigo-300 rounded text-sm"
        >
          Submit
        </button>
      </div>
      <h2 className=" text-center font-bold text-4xl mt-12 ">
        Update Password
      </h2>
      <div className="px-2 mt-8 ">
        <div className="mb-4">
          <label
            htmlFor="password"
            className="leading-7 text-sm text-black-600"
          >
            Current Password
          </label>
          <input
            onChange={handleChange}
            value={password}
            type="password"
            id="password"
            name="password"
            className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="mx-auto flex mt-10">
        <div className="px-2 w-1/2 ">
          <div className=" mb-4">
            <label
              htmlFor="npassword"
              className="leading-7 text-sm text-black-600"
            >
              New Password
            </label>
            <input
              onChange={handleChange}
              value={npassword}
              type="password"
              id="npassword"
              name="npassword"
              className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="cpassword"
              className="leading-7 text-sm text-black-600"
            >
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              value={cpassword}
              type="password"
              id="cpassword"
              name="cpassword"
              className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePasswordSubmit}
          className="  flex  bg-gray-600 text-white border-0 py-2 px-2  focus:outline-none hover:bg-indigo-300 rounded text-sm"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default myaccount;
