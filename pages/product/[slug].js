import Product from "@/models/Product";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Head from "next/head";

const post = ({ buyNow, addToCart, product, variants }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();

  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  useEffect(() => {
    setColor(product.color);
    setSize(product.size);
  }, [router.query]);

  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success("🦄 Yeah! Your Pincode is Servicable", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setService(false);
      toast.error("🦄 Nope! We don't deliver to your Pincode Yet", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const refreshVariants = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]["slug"]}`;
    window.location = url;
  };
  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/* Same as */}
        <ToastContainer />
        <div className="container px-5 py-10 mx-auto ">
          <div className="lg:w-4/5 mx-auto flex flex-wrap min-h-screen">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full  h-64 object-contain object-center lg:h-96 rounded "
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Tiara products
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}({product.size}/{product.color})
              </h1>
              {/* <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-slate-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-slate-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-slate-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-slate-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-slate-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div> */}
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("transparent") &&
                    Object.keys(variants["transparent"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "transparent");
                        }}
                        className={`border-2 rounded-full w-6 h-6 focus:outline-none ${
                          color === "transparent"
                            ? "border-black "
                            : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("silver") &&
                    Object.keys(variants["silver"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "silver");
                        }}
                        className={`border-2 rounded-full w-6 h-6 focus:outline-none ${
                          color === "silver"
                            ? "border-black bg-stone-200"
                            : "border-gray-300 bg-stone-200"
                        }`}
                      ></button>
                    )}

                  {Object.keys(variants).includes("golden") &&
                    Object.keys(variants["golden"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "golden");
                        }}
                        className={`border-2 rounded-full w-6 h-6 focus:outline-none ${
                          color === "golden"
                            ? "border-black bg-orange-300"
                            : "border-gray-300 bg-orange-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("gold") &&
                    Object.keys(variants["gold"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "gold");
                        }}
                        className={`border-2 rounded-full w-6 h-6 focus:outline-none ${
                          color === "gold"
                            ? "border-black bg-yellow-200"
                            : "border-gray-300  bg-yellow-200"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("Black") &&
                    Object.keys(variants["Black"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariants(size, "Black");
                        }}
                        className={`border-2 rounded-full w-6 h-6 focus:outline-none ${
                          color === "Black"
                            ? "border-black bg-black"
                            : "border-gray-300 bg-black"
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVariants(e.target.value, color);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-500 text-base pl-3 pr-10"
                    >
                      {variants[color] &&
                        Object.keys(variants[color]).includes("S") && (
                          <option value={"S"}>S</option>
                        )}
                      {variants[color] &&
                        Object.keys(variants[color]).includes("M") && (
                          <option value={"M"}>M</option>
                        )}
                      {variants[color] &&
                        Object.keys(variants[color]).includes("L") && (
                          <option value={"L"}>L</option>
                        )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {product.availableQty > 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${product.price}
                  </span>
                )}
                {product.availableQty <= 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Out of Stock !
                  </span>
                )}

                <button
                  disabled={product.availableQty <= 0}
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  className="flex ml-auto py-2 md:px-6  disabled:bg-slate-300 focus:outline-none hover:text-white border-2 border-gray-500  hover:border-gray-900  my-awesome-button rounded-md"
                >
                  Add to cart
                </button>
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() => {
                    buyNow(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  className="flex ml-auto py-2 md:px-6 disabled:bg-slate-300 focus:outline-none hover:text-white border-2 border-gray-500  hover:border-gray-900  my-awesome-button rounded-md"
                >
                  Buy Now
                </button>
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
              <div className="pin mt-6 flex space-x-12">
                <input
                  onChange={onChangePin}
                  className="px-2 border-2 border-gray-500 rounded-lg"
                  type="text "
                  placeholder="Please enter pincode"
                />
                <button
                  onClick={checkServiceability}
                  className="py-2 px-6 mb-1 flex-1  focus:outline-none hover:text-white border-2 border-gray-500  hover:border-gray-900  my-awesome-button rounded-md"
                >
                  Check
                </button>
              </div>
              {!service && service != null && (
                <div className="text-red-600 text-sm mt-3">
                  we do not deliver to this pincode
                </div>
              )}
              {service && service != null && (
                <div className="text-green-600 text-sm mt-3">
                  Yeah! we deliver to this pincode
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  if (!product) {
    console.error("Product not found for the given slug:", context.query.slug);
    return {
      notFound: true, // Return a 404 page or handle the error accordingly
    };
  }
  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}

export default post;
