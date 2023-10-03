import React from "react";

const order = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-lg title-font text-black tracking-widest font-extrabold">
              Tiara16.com
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id: #43857983475
            </h1>

            <p className="leading-relaxed mb-4">
              Your order has been successfully placed. Thanks for shopping with
              us. Keep buying for exciting offers and best deals!
            </p>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Color</span>
              <span className="ml-auto text-gray-900">Blue</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Size</span>
              <span className="ml-auto text-gray-900">Medium</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
              <span className="text-gray-500">Quantity</span>
              <span className="ml-auto text-gray-900">4</span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                Subtotal: $58.00
              </span>
              <button className="flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">
                Track Order
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
        </div>
      </div>
    </section>
  );
};

export default order;
