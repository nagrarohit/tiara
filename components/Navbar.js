import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiShoppingCart } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className=" flex  flex-col md:flex-row md:justify-normal justify-center items-center py-2 shadow-xl">
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image width={200} height={25} src="/textlogo.png" alt=" "></Image>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex  items-center space-x-4 font-bold md:text-xl ">
          <Link href={"/necklace"}>
            <li>Necklace</li>
          </Link>
          <Link href={"/rings"}>
            <li>Rings</li>
          </Link>
          <Link href={"/bangles"}>
            <li>Bangles</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-9 mx-5 ">
        <HiShoppingCart className="text-xl md:text-4xl "></HiShoppingCart>
      </div>
    </div>
  );
};

export default Navbar;
