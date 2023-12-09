import Link from "next/link";
import React from "react";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { SiDiscord } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div>
      <footer className="text-black-600 body-font border-t-4 border-black">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link legacyBehavior href={"/"}>
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-black-900">
              <img src="/Tiara.png" className="w-20 h-20"></img>
              <span className="ml-3 text-xl">Tiara16.com</span>
            </a>
          </Link>

          <p className="text-sm text-black sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-black-200 sm:py-2 sm:mt-0 mt-4">
            © 2023 Tiara16 —
            <a
              href="https://github.com/nagrarohit"
              className="text-black ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @nagrarohit
            </a>
            <a href="/about" className="text-black ml-1">
              | | About
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              href="https://github.com/nagrarohit"
              target="_blank"
              className="text-black-500 text-xl custom-image1"
            >
              <FaGithubSquare />
            </a>
            <a
              href="https://www.linkedin.com/in/nagrarohit"
              target="_blank"
              className="ml-3 text-black-500 text-xl text-blue-900 custom-image1"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:rohit.nagra7861@gmail.com?subject=Let's%20Connect&body=Hello%20RoHit,%0D%0A%0D%0AI%20wanted%20to%20reach%20out%20to%20you.%20..."
              target="_blank"
              className="ml-3 text-black-500 text-xl text-red-700 custom-image1"
            >
              <SiGmail />
            </a>
            <a
              href="https://discord.gg/tFZUqks5"
              target="_blank"
              className="ml-3 text-black-500 text-xl text-indigo-600 custom-image1"
            >
              <SiDiscord />
            </a>
            <a
              href="https://twitter.com/_NagraRohit"
              target="_blank"
              className="ml-3 text-cyan-500 text-xl custom-image1"
            >
              <RiTwitterXFill />
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
