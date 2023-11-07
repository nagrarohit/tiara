import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Link from "next/Link";

const necklace = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && (
              <p>
                Sorry The necklaces are Out of Stock. Stay Tuned They are on the
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
                    <div className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={products[item].img}
                      />
                    </div>
                  </Link>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      Necklace
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
  let products = await Product.find({ category: "necklace" });
  let necklace = {};
  for (let item of products) {
    if (item.title in necklace) {
      if (
        !necklace[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        necklace[item.title].color.push(item.color);
      }
      if (
        !necklace[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        necklace[item.title].size.push(item.size);
      }
    } else {
      necklace[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        necklace[item.title].color = [item.color];
        necklace[item.title].size = [item.size];
      } else {
        necklace[item.title].color = [];
        necklace[item.title].size = [];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(necklace)) },
  };
}
export default necklace;
