import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Link from "next/link";
import Head from "next/head";

const earings = ({ products }) => {
  return (
    <div>
      <Head>
        <title>earings</title>
      </Head>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && (
              <p>
                Sorry The earings are Out of Stock. Stay Tuned They are on the
                way!
              </p>
            )}
            {Object.keys(products).map((item) => {
              return (
                <div
                  key={products[item]._id}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer"
                >
                  <Link href={`/product/${products[item].slug}`} passHref>
                    <div className="block relative rounded overflow-hidden image-container">
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={products[item].img}
                      />
                    </div>
                  </Link>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      earings
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">${products[item].price}</p>
                    <div className="mt-1">
                      {products[item].size.includes("S") && (
                        <span className="border-gray-400 border rounded-md px-1 mx-1">
                          S
                        </span>
                      )}
                      {products[item].size.includes("M") && (
                        <span className="border-gray-400 border rounded-md px-1 mx-1">
                          M
                        </span>
                      )}
                      {products[item].size.includes("L") && (
                        <span className="border-gray-400 border rounded-md px-1 mx-1">
                          L
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      {products[item].color.includes("transparent") && (
                        <button className="border-2 border-gray-400 px-1 mx-1 bg-transparent rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("silver") && (
                        <button className="border-2 border-gray-400 px-1 mx-1 bg-stone-200 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("golden") && (
                        <button className="border-2 border-gray-400 px-1 mx-1 bg-orange-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("Black") && (
                        <button className="border-2 border-gray-400 px-1 mx-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "earings" });
  let earings = {};
  for (let item of products) {
    if (item.title in earings) {
      if (
        !earings[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        earings[item.title].color.push(item.color);
      }
      if (
        !earings[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        earings[item.title].size.push(item.size);
      }
    } else {
      earings[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        earings[item.title].color = [item.color];
        earings[item.title].size = [item.size];
      } else {
        earings[item.title].color = [];
        earings[item.title].size = [];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(earings)) },
  };
}
export default earings;
