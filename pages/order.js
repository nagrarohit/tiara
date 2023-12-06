import { useRouter } from "next/router";
import Order from "@/models/Order";
import React, { useEffect } from "react";
import mongoose from "mongoose";
import { FcShipped } from "react-icons/fc";
import Head from "next/head";

const MyOrder = ({ order, clearCart }) => {
  const router = useRouter();
  const products = order.products;

  useEffect(() => {
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <Head>
        <title>order</title>
      </Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-lg title-font text-black tracking-widest font-extrabold">
              Tiara16
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id: #{order.orderId}
            </h1>

            <p className="leading-relaxed mb-4">
              Your order has been successfully placed. Thanks for shopping with
              us.
            </p>
            <p>Your payment Status is {order.status}</p>
            {Object.keys(products).map((key) => (
              <div key={key}>
                <div className="flex mt-4 border-t border-gray-200 py-2">
                  <span className="text-gray-500">Color</span>
                  <span className="ml-auto italic text-gray-900">
                    {products[key].variant}
                  </span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Size</span>
                  <span className="ml-auto italic text-gray-900">
                    {products[key].size}
                  </span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Per Item Price</span>
                  <span className="ml-auto italic text-gray-900">
                    {products[key].price}
                  </span>
                </div>
                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                  <span className="text-gray-500 ">Quantity</span>
                  <span className="ml-auto italic text-gray-900">
                    {products[key].qty}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                Subtotal: ${order.amount}
              </span>
              <button className="flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">
                Track Order
              </button>
            </div>
          </div>
          <FcShipped className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" />
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;
