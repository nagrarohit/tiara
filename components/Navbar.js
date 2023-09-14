import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div class=" flex justify-between">
      <div class="logo">
        <Image width={200} height={40} src="/textlogo.png" alt=" "></Image>
      </div>
      <div class="nav">
        <ul class="flex ">
          <li>Necklace</li>
          <li>Rings</li>
          <li>Bangles</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
