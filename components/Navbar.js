import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiShoppingCart } from "react-icons/hi";

const Navbar = () => {
  return (
    <div class=" flex  flex-col md:flex-row md:justify-normal justify-center items-center py-2">
      <div class="logo mx-5">
        <Image width={200} height={25} src="/textlogo.png" alt=" "></Image>
      </div>
      <div class="nav">
        <ul class="flex  items-center space-x-2 font-bold md:text-xl ">
          <Link href={"/"}>
            <li>Necklace</li>
          </Link>
          <Link href={"/"}>
            <li>Rings</li>
          </Link>
          <Link href={"/"}>
            <li>Bangles</li>
          </Link>
        </ul>
      </div>
      <div class="cart absolute right-0 top-9 mx-5 ">
        <HiShoppingCart class="text-xl md:text-4xl "></HiShoppingCart>
      </div>
    </div>
  );
};

export default Navbar;
